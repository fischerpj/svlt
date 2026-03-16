<!-- this line is needed to add your svelte component to quarto! -->
<svelte:options customElement={{ 
  tag: 'my-refdata', 
  shadow: 'none',
  props: {
    data: { type: "Array" }
  } 
}} />

<!--
// ============================================================
// File: src/components/RefData.svelte
// (Example Svelte component using the shared store)
// ============================================================
-->

<script>
  import { RefAccu, addValue, resetRefAccu } from './refstore.js'
</script>

<div class="RefAccu-widget">
  
  <h4>RefData:</h4>

  <pre>{JSON.stringify($RefAccu.items, null, 0)}</pre>

</div>