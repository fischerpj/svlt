// ============================================================
// File: components/refclass.js
// (Pure logic — no Svelte imports, no DOM, no side effects)
// ============================================================

console.log("loading refclass.js ONLY ONCE but in each Svelte widget however")

export class RefAccumulator {
  constructor() {
    this.total = 0
    this.items = []
  }

  add(x) {
    this.items.push(x)
//    this.total += x
  }

  reset() {
//    this.total = 0
    this.items = []
  }
}