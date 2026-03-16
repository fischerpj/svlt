// src/State.js

import { writable } from 'svelte/store';

// A shared counter or data object
export const sharedCount = writable(0);