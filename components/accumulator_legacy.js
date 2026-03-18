// ============================================================
// File: components/accumulator.js
// (Pure logic — no Svelte imports, no DOM, no side effects)
// ============================================================

export class Accumulator {
  constructor() {
    this.total = 0
    this.items = []
  }

  add(x) {
    this.items.push(x)
    this.total += x
  }

  reset() {
    this.total = 0
    this.items = []
  }
}