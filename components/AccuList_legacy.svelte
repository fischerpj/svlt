<!-- this line is needed to add your svelte component to quarto! -->
<svelte:options customElement={{ 
  tag: 'my-acculist', 
  shadow: 'none',
  props: {
    data: { type: "Array" }
  } 
}} />

// ============================================================================
// FILE: components/AccumulatorList.svelte
// Rendering layer: visual UI, subscribes to store, delegates logic
// ============================================================================

<script>
  import { accumulator, addItem } from '../src/accumulator.js'

  let input = ''

  function submit() {
    if (input.trim() !== '') {
      addItem(input)
      input = ''
    }
  }
</script>

<div class="accumulator">
  <h2>Accumulator (Visual)</h2>

  <input bind:value={input} placeholder="Add something" />
  <button on:click={submit}>Add</button>

  <ul>
    {#each $accumulator.items as item}
      <li>{item}</li>
    {/each}
  </ul>
</div>
