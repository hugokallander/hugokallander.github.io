<script lang="ts">
    import Login from './lib/components/welcome.svelte';
    import Mission from './lib/components/mission.svelte';
    import { screen } from './lib/stores/store';

</script>

{#if $screen === 'start'}
    <Login />
{:else if $screen === 'game'}
    <Mission />
{/if}
