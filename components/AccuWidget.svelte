<!-- this line is needed to add your svelte component to quarto! -->
<svelte:options customElement={{ 
  tag: 'my-accuwidget', 
  shadow: 'none',
  props: {
    data: { type: "Array" }
  } 
}} />


// ============================================================
// File: src/components/AccumulatorWidget.svelte
// (Example Svelte component using the shared store)
// ============================================================

<script>
  import { accumulator, addValue, resetAccumulator } from './accustore.js'

  let n = 0
</script>

<div class="accumulator-widget">
  <input type="number" bind:value={n} />

  <button on:click={() => addValue(+n)}>
    Add
  </button>

  <button on:click={resetAccumulator}>
    Reset
  </button>

  <p>Total: {$accumulator.total}</p>

  <ul>
    {#each $accumulator.items as item}
      <li>{item}</li>
    {/each}
  </ul>
</div>