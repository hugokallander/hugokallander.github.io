<script lang="ts">
    import { onMount } from "svelte";
    import { Team, Player, Station } from "../../objects";
    import { playerId } from "../stores/store";
    import AccountGroup from "~icons/mdi/account-group";
    import AccountCircle from "~icons/mdi/account-circle";
    import StarCircle from "~icons/mdi/star-circle";
    import CrosshairsGps from "~icons/mdi/crosshairs-gps";
    import CloseThick from "~icons/mdi/close-thick";

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

<div class="flex flex-col h-screen animate-gradient bg-gradient-to-r from-blue-500 via-teal-600 to-teal-400 bg-[length:200%_200%]">
    {#if player && team}
        <div class="flex items-center w-screen justify-center flex-col h-[56px] drop-shadow-md text-sm">
            <div class={`max-w-[45rem] w-[calc(100%-1rem)] mx-4 mt-4 bg-${team.color}-500 rounded-2xl flex justify-between items-center py-4 text-white`}>
                <div class={"flex items-center ml-4"}>
                    <AccountGroup />
                    <p class="ml-2">{team.name}</p>
                </div>
                <div class={"flex items-center"}>
                    <AccountCircle />
                    <div class={"ml-2"}>{player.name}</div>
                </div>
                <div class={"flex items-center mr-4"}>
                    <div class={"mr-2"}>{currentScore}</div>
                    <StarCircle />                  
                </div>
            </div>
        </div>
    {:else}
        <div class="flex flex-col items-center justify-center h-screen">
            <div class="animate-spin h-20 w-20 rounded-[50%] border-t-[#fff] border-transparent border-4"></div>
        </div>
    {/if}
    {#if currentStation}
        <div class="flex flex-col items-center justify-center flex-grow max-h-[calc(100vh-310px)] mx-4 mt-[75px]">
            <h1 class="text-xl mb-4 text-white italic">Where is this?</h1>
            <img src={currentStation.image} alt={currentStation.name} class="max-h-full max-w-[120rem] max-w-full rounded-xl drop-shadow-xl" />
            <div class="absolute bottom-4 w-full flex flex-row justify-center">
                <button class="text-3xl h-14 w-14 mr-4 my-auto rounded-full max-w-[45rem] bg-gradient-to-t from-red-600 to-red-400 text-white shadow-lg">
                    <CloseThick class="m-auto text-red-100" />
                </button>
                <button on:click={checkProximity} class="text-4xl h-28 w-28 rounded-full max-w-[45rem] bg-gradient-to-t from-green-600 to-green-400 text-white shadow-lg">
                    <CrosshairsGps class="m-auto text-green-100" />
                </button>
            </div>
        </div>
    {/if}
</div>