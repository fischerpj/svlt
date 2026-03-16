import { writable } from 'svelte/store'

class Accumulator {
  constructor() {
    this.items = []
  }
  
  add(x) {
    this.items.push(x)
  }
}

export const accumulator = writable(new Accumulator())

export function addItem(x) {
  accumulator.update(acc => {
    acc.add(x)
    return acc
  })
}