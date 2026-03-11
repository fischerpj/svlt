<!-- this line is needed to add your svelte component to quarto! -->
<svelte:options customElement={{ 
  tag: 'my-mirrorfull', 
  shadow: 'none',
  props: {
    data: { type: "Array" }
  } 
}} />

<script>
  let text = $state("");
</script>

<div class="card p-4 shadow-sm">
  <div class="mb-3">
    <label for="m-input" class="form-label fw-bold">Enter Text</label>
    <input 
      id="m-input"
      type="text" 
      class="form-control form-control-lg" 
      placeholder="Start typing..."
      bind:value={text}
      onkeydown={e => e.stopPropagation()} 
    />
  </div>

  <div class="d-grid gap-2">
    <button class="btn btn-primary" onclick={() => alert(text)}>
      Process Mirror
    </button>
  </div>

  {#if text}
    <div class="mt-3 p-2 bg-light border rounded text-center">
       <span class="text-muted small">Live Preview:</span> 
       <p class="mb-0 h4">{text}</p>
    </div>
  {/if}
</div>