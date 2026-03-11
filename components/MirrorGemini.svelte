<!-- this line is needed to add your svelte component to quarto! -->
<svelte:options customElement={{ 
  tag: 'my-mirrorgemini', 
  shadow: 'none',
  props: {
    data: { type: "Array" }
  } 
}} />

<script>
  let text = $state(""); // Svelte 5 reactive state
</script>

<div class="p-3 border rounded shadow-sm">
  <input 
    type="text" 
    class="form-control" 
    placeholder="Type 's' safely..."
    bind:value={text}
    onkeydown={e => e.stopPropagation()} 
  />

  <div class="mt-2 p-2 bg-light border-start border-primary border-4">
    {text || "Waiting..."}
  </div>

  <button class="btn btn-sm btn-danger mt-2" onclick={() => text = ""}>
    Clear
  </button>
</div>
