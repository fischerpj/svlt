// store.js
import { writable } from 'svelte/store';

export const sharedMessage = writable("Hello from the store!");

if (!window.__shared_counter__) {
  console.log("STORE INSTANCE CREATED");
  window.__shared_counter__ = writable(0);
}

export const globalCounter = window.__shared_counter__;