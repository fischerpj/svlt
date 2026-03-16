<!-- this line is needed to add your svelte component to quarto! -->
<svelte:options customElement={{ 
  tag: 'my-accudata', 
  shadow: 'none',
  props: {
    data: { type: "Array" }
  } 
}} />

<!--
// ============================================================================
// FILE: components/AccumulatorData.svelte
// Data-access layer: non-visual, exposes accumulator as plain JS object
// ============================================================================
-->

<script>
  import { accumulator } from '../src/accumulator.js'
  
  let snapshot
  
  $: snapshot = $accumulator.toObject()
</script>

<pre>{JSON.stringify(snapshot, null, 2)}</pre>
