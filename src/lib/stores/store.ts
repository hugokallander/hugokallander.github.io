import { writable } from 'svelte/store';

export const currentView = writable<string>('start');
export const playerId = writable<string>('');