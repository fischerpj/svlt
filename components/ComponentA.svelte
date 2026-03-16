<!-- this line is needed to add your svelte component to quarto! -->
<svelte:options customElement={{ 
  tag: 'my-componenta', 
  shadow: 'none',
  props: {
    data: { type: "Array" }
  } 
}} />

<script>
  import { globalCounter } from './store.js';
</script>

<button on:click={() => $globalCounter++}>
  Count is {$globalCounter}
</button>