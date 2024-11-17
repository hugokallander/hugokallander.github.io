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
        console.log(playerStats);
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
        });
    }
</script>

<div class="flex flex-col h-screen">
    {#if player && team}
        <div class="flex justify-between p-4 bg-gray-800 text-white">
            <div>{team.name}</div>
            <div>{player.name}</div>
            <div>Points: {currentScore}</div>
        </div>
    {:else}
        <div class="flex flex-col items-center justify-center h-screen">
            <h1 class="text-2xl mb-4">Loading...</h1>
        </div>
    {/if}
    {#if currentStation}
        <div class="flex flex-col items-center justify-center flex-grow">
            <h1 class="text-2xl mb-4">{currentStation.name}</h1>
            <img src={currentStation.image} alt={currentStation.name} class="w-full h-64 object-cover mb-4" />
            <button on:click={checkProximity} class="p-2 bg-green-500 text-white rounded">Search nearby</button>
        </div>
    {:else}
        <div class="flex flex-col items-center justify-center h-screen">
            <h1 class="text-2xl mb-4">You don't have any missions at the moment. Contact admin!</h1>
        </div>
    {/if}
</div>