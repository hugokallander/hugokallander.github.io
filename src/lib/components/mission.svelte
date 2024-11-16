<script lang="ts">
    import { onMount } from "svelte";
    import { Team, Player, Station } from "../../routes/objects";

    let team: Team;
    let player: Player;
    let currentStation: Station;
    let currentScore = 0;

    onMount(async () => {
        const playerResponse = await fetch("/api/player");
        const playerStats = await playerResponse.json();
        player = playerStats.player;
        currentStation = playerStats.station;
        team = playerStats.team;
        currentScore = playerStats.score;
    });

    function checkProximity() {
        navigator.geolocation.getCurrentPosition(async (position) => {
            const { latitude, longitude } = position.coords;
            const response = await fetch(`/api/station?lat=${latitude}&long=${longitude}`);
            
            if (response.ok) {
                alert('Congratulations! You found the station!');
            }
        });
    }
</script>

<div class="flex flex-col h-screen">
    <div class="flex justify-between p-4 bg-gray-800 text-white">
        <div>{team.name}</div>
        <div>{player.name}</div>
        <div>Points: {currentScore}</div>
    </div>
    {#if currentStation}
        <div class="flex flex-col items-center justify-center flex-grow">
            <h1 class="text-2xl mb-4">{currentStation.name}</h1>
            <img src={currentStation.image} alt={currentStation.name} class="w-full h-64 object-cover mb-4" />
            <button on:click={checkProximity} class="p-2 bg-green-500 text-white rounded">Search nearby</button>
        </div>
    {:else}
        <div class="flex flex-col items-center justify-center h-screen">
            <h1 class="text-2xl mb-4">No missions available at the moment. Sit tight for more!</h1>
        </div>
    {/if}
</div>