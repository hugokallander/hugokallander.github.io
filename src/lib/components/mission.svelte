<script lang="ts">
    import { onMount } from "svelte";
    import { Team, Player, Station } from "../../objects";
    import { playerId } from "../stores/store";

    let team: Team;
    let player: Player;
    let currentStation: Station;
    let currentScore = 0;

    onMount(async () => {
        const player_id = $playerId;
        const playerResponse = await fetch(`/api/player?player_id=${player_id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const playerStats = await playerResponse.json();
        player = playerStats.player;
        currentStation = playerStats.station;
        team = playerStats.team;
        currentScore = playerStats.score;
    });

    function checkProximity() {
        navigator.geolocation.getCurrentPosition(async (position) => {
            const { latitude, longitude } = position.coords;
            const response = await fetch(`/api/mission`, {
                method: "Post",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    player_id: player.id,
                    lat: latitude,
                    long: longitude,
                }),
            });
            
            if (response.ok) {
                alert('Congratulations! You found the station!');
                currentStation = await response.json();
            }
            else {
                alert('You are not close enough to the station. Keep looking!');
            }
        });
    }
</script>

<div class="flex flex-col h-screen animate-gradient bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-[length:200%_200%]">
    {#if player && team}
        <div class="flex items-center w-screen justify-center flex-col h-[56px] drop-shadow-md text-sm">
            <div class={`max-w-[45rem] w-[calc(100%-1rem)] mx-4 mt-4 bg-${team.color}-500 rounded-2xl flex justify-between items-center py-4 text-white`}>
                <div class={"flex items-center ml-4"}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
                        <path fill-rule="evenodd" d="M8.25 6.75a3.75 3.75 0 1 1 7.5 0 3.75 3.75 0 0 1-7.5 0ZM15.75 9.75a3 3 0 1 1 6 0 3 3 0 0 1-6 0ZM2.25 9.75a3 3 0 1 1 6 0 3 3 0 0 1-6 0ZM6.31 15.117A6.745 6.745 0 0 1 12 12a6.745 6.745 0 0 1 6.709 7.498.75.75 0 0 1-.372.568A12.696 12.696 0 0 1 12 21.75c-2.305 0-4.47-.612-6.337-1.684a.75.75 0 0 1-.372-.568 6.787 6.787 0 0 1 1.019-4.38Z" clip-rule="evenodd" />
                        <path d="M5.082 14.254a8.287 8.287 0 0 0-1.308 5.135 9.687 9.687 0 0 1-1.764-.44l-.115-.04a.563.563 0 0 1-.373-.487l-.01-.121a3.75 3.75 0 0 1 3.57-4.047ZM20.226 19.389a8.287 8.287 0 0 0-1.308-5.135 3.75 3.75 0 0 1 3.57 4.047l-.01.121a.563.563 0 0 1-.373.486l-.115.04c-.567.2-1.156.349-1.764.441Z" />
                    </svg>
                    <p class="ml-2">{team.name}</p>
                </div>
                <div class={"flex items-center"}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
                        <path fill-rule="evenodd" d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" clip-rule="evenodd" />
                    </svg>
                    <div class={"ml-2"}>{player.name}</div>
                </div>
                <div class={"flex items-center mr-4"}>
                    <div class={"mr-2"}>{currentScore}</div>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
                        <path fill-rule="evenodd" d="M3 2.25a.75.75 0 0 1 .75.75v.54l1.838-.46a9.75 9.75 0 0 1 6.725.738l.108.054A8.25 8.25 0 0 0 18 4.524l3.11-.732a.75.75 0 0 1 .917.81 47.784 47.784 0 0 0 .005 10.337.75.75 0 0 1-.574.812l-3.114.733a9.75 9.75 0 0 1-6.594-.77l-.108-.054a8.25 8.25 0 0 0-5.69-.625l-2.202.55V21a.75.75 0 0 1-1.5 0V3A.75.75 0 0 1 3 2.25Z" clip-rule="evenodd" />
                    </svg>                  
                </div>
            </div>
        </div>
    {:else}
        <div class="flex flex-col items-center justify-center h-screen">
            <div class="animate-spin h-20 w-20 rounded-[50%] border-t-[#fff] border-transparent border-4"></div>
        </div>
    {/if}
    {#if currentStation}
        <div class="flex flex-col items-center justify-center flex-grow max-h-[calc(100vh-280px)] mx-4 mt-[75px]">
            <h1 class="text-xl mb-4 text-white italic">Where is this?</h1>
            <img src={currentStation.image} alt={currentStation.name} class="max-h-full max-w-[120rem] max-w-full rounded-xl drop-shadow-xl" />
            <button on:click={checkProximity} class="h-[60px] [text-shadow:_0_1px_0_rgb(0_0_0_/_40%)] absolute bottom-4 w-[calc(100%-1rem)] max-w-[45rem] bg-gradient-to-t from-green-600 to-green-400 text-white rounded-xl shadow-lg">Probe</button>
        </div>
    {/if}
</div>