<!-- this line is needed to add your svelte component to quarto! -->
<svelte:options customElement={{ 
  tag: 'my-componentb', 
  shadow: 'none',
  props: {
    data: { type: "Array" }
  } 
}} />

<script>
  import { globalCounter } from './store.js';
</script>

<pre>counter is {$globalCounter}</pre>