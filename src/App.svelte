<script lang="ts">
    import { onMount } from 'svelte';
    import { generateUUID } from './utils';
    import { Station, Player, Team } from './objects';
    import { Game } from './game';

    let player: Player;
    let team: Team;
    let game: Game = Game.getInstance();
    let playerName = '';
    let selectedTeamId = '';
    let screen = 'start';
    let currentStation: Station;
    let currentScore = 0;

    const stations: Station[] = [
        new Station(generateUUID(), 'Station 1', 59.3293, 18.0686, 'src/assets/station1.png', 10),
        new Station(generateUUID(), 'Station 2', 59.3293, 18.0686, 'src/assets/station2.png', 20),
        new Station(generateUUID(), 'Station 3', 59.3295, 18.0688, 'src/assets/station3.png', 30),
        new Station(generateUUID(), 'Station 4', 59.3296, 18.0689, 'src/assets/station4.png', 40),
    ];
    const teams: Team[] = [
        new Team(generateUUID(), 'Cool dudes'),
        new Team(generateUUID(), 'Awesome possums'),
        new Team(generateUUID(), 'Fantastic foxes'),
    ];
    game.addGameObjects(...teams, ...stations);
    teams.forEach(team => giveTeamRandomMission(team));

    function giveTeamRandomMission(team: Team) {
        const station = game.getRandomStation();
        game.giveMission(team, station);
    };

    function takeStation(player: Player, station: Station) {
        game.takeStation(station, player);
    }

    function handleSubmit() {
        player = new Player(generateUUID(), playerName, 59.3293, 18.0686, 'player1@example.com');
        game.addGameObjects(player);
        team = game.getTeam(selectedTeamId);
        game.addTeamPlayer(team, player);
        currentStation = game.getMission(team);
        screen = 'game';
    }

    function checkProximity() {
        currentStation = game.getMission(team);
        if (currentStation && game.isNearStation(player, currentStation)) {
            alert('Congratulations! You found the station.');
            takeStation(player, currentStation);
            giveTeamRandomMission(team);
            currentStation = game.getMission(team);
            currentScore = game.getTeamScore(team);
            (`Gave mission to ${team.name}: ${currentStation.name}`);
        } else {
            alert('The station is not close enough. Better luck next time!');
        }
    }
</script>

{#if screen === 'start'}
    <div class="flex flex-col items-center justify-center h-screen">
        <input type="text" bind:value={playerName} placeholder="Enter your name" class="mb-4 p-2 border rounded" />
        <select bind:value={selectedTeamId} class="mb-4 p-2 border rounded">
            <option value="" disabled selected>Select your team</option>
            {#each Array.from(game.getTeams()) as team}
                <option value={team.id}>{team.name}</option>
            {/each}
        </select>
        <button on:click={handleSubmit} class="p-2 bg-blue-500 text-white rounded" disabled={!playerName || !selectedTeamId}>Submit</button>
    </div>
{:else if screen === 'game'}
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
                <h1 class="text-2xl mb-4">No missions available</h1>
                <button on:click={() => screen = 'start'} class="p-2 bg-blue-500 text-white rounded">Go back</button>
            </div>
        {/if}
    </div>
{/if}
