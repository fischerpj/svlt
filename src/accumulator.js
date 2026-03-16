// ============================================================================
// FILE: lib/accumulator.js
// LOGIC layer: class, store, pure functions, no rendering
// ============================================================================

import { writable } from 'svelte/store'

class Accumulator {
  constructor() {
    this.items = []
  }

  add(x) {
    this.items.push(x)
  }

  toObject() {
    return { items: [...this.items] }
  }
}

export const accumulator = writable(new Accumulator())

export function addItem(x) {
  accumulator.update(acc => {
    acc.add(x)
    return acc
  })
}

export function getSnapshot() {
  let snapshot
  accumulator.subscribe(acc => {
    snapshot = acc.toObject()
  })()
  return snapshot
}
