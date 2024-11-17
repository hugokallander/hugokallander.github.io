<script lang="ts">
    import Login from '/src/lib/components/welcome.svelte';
    import Mission from '/src/lib/components/mission.svelte';
    import { currentView } from '../stores/store';

</script>

<div class="topography">
    {#if $currentView === 'start'}
        <Login />
    {:else if $currentView === 'game'}
        <Mission />
    {/if}
</div>
<link rel="stylesheet" href="/src/app.css">