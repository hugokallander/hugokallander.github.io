<script>
    import { onMount } from 'svelte';
    import { currentView, playerId } from '../stores/store';

    let playerName = '';
    let selectedTeamId = '';
    let email = '';
    let teams = [];

    async function getTeams() {
        const response = await fetch('/api/teams', {
            method: 'GET',
            headers: {
                'content-type': 'application/json'
            }
        });

        return await response.json();
    }

    async function handleSubmit() {
        const response = await fetch('/api/player', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: playerName,
                email: email,
                team_id: selectedTeamId
            })
        });
        playerId.set((await response.json()).id);
        currentView.set('game');
    }

    onMount(async () => {
        currentView.set('start');
        teams = await getTeams();
    });
</script>

<div class="flex flex-col items-center justify-center h-screen">
    <input type="text" bind:value={playerName} placeholder="Enter your name" class="mb-4 p-2 border rounded" />
    <input type="text" bind:value={email} placeholder="Enter your email" class="mb-4 p-2 border rounded" />
    <select bind:value={selectedTeamId} class="mb-4 p-2 border rounded">
        <option value="" disabled selected>Select your team</option>
        {#each teams as team}
            <option value={team.id}>{team.name}</option>
        {/each}
    </select>
    <button on:click={handleSubmit} class="p-2 bg-blue-500 text-white rounded" disabled={!playerName || !selectedTeamId || !email}>Submit</button>
</div>