<script lang="ts">
    import Login from './lib/components/welcome.svelte';
    import Mission from './lib/components/mission.svelte';
    import { screen } from './lib/stores/store';

</script>

<div class="bg-gray-400">
    {#if $screen === 'start'}
        <Login />
    {:else if $screen === 'game'}
        <Mission />
    {/if}
</div>