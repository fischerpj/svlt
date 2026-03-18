// ============================================================
// File: components/accustore.js
// (Canonical shared store — SINGLETON across all components)
// ============================================================

import { writable } from 'svelte/store'
import { Accumulator } from './accumulator.js'

// Create ONE shared instance at module evaluation time
const instance = new Accumulator()

// Export the store that wraps the singleton
export const accumulator = writable(instance)

// Canonical update helpers
export function addValue(x) {
  accumulator.update(acc => {
    acc.add(x)
    return acc
  })
}

export function resetAccumulator() {
  accumulator.update(acc => {
    acc.reset()
    return acc
  })
}

