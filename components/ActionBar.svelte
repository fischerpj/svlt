<!-- this line is needed to add your svelte component to quarto! -->
<svelte:options customElement={{ 
  tag: 'my-actionbar2', 
  shadow: 'none',
  props: {
    data: { type: "Array" }
  } 
}} />

<script>
  let inputValue = "";
  let lastAction = "None";

  // Button Handlers
  function handleAction(name) {
    lastAction = name;
    console.log(`Action triggered: ${name} with query: ${searchQuery}`);
  }

  // Reactive echo logic
  $: echoText = inputValue.length > 0 ? inputValue : "Waiting for input...";
  
  // Copy to clipboard logic (CLIP)
  async function handleClip() {
    if (inputValue) {
      try {
        await navigator.clipboard.writeText(inputValue);
        console.log("Copied to clipboard!");
      } catch (err) {
        console.error("Failed to copy: ", err);
      }
    }
  }

  // Reset function (RAZ)
  function handleRaz() {
    inputValue = "";
  }
  
</script>

<div class="container-fluid d-flex flex-column w-100 p-3">
  
  <div class="d-flex align-items-stretch w-100 mb-2">
  
    <div class="flex-fill px-1">
      <div class="input-group h-100">
        <span class="input-group-text bg-light">
          <i class="bi bi-search"></i>
        </span>
        <input 
          id="search-input"
          type="text" 
          class="form-control form-control-lg" 
          placeholder="Type to echo..." 
          bind:value={inputValue}
        />
      </div>
    </div>

    <div class="flex-fill px-1">
      <button 
        class="btn btn-primary w-100 h-100" 
        type="button"
        >
        <i class="bi bi-folder-plus me-1"></i>
        ADD</button>
    </div>
    
    <div class="flex-fill px-1">
      <button 
        class="btn btn-warning w-100 h-100" 
        type="button"
        on:click={handleClip}
        disabled={!inputValue}
      >
        <i class="bi bi-clipboard me-1"></i>
        CLIP
      </button>
    </div>
    
    <div class="flex-fill px-1">
      <button 
        class="btn btn-danger w-100 h-100" 
        type="button" 
        on:click={handleRaz}
      >
        <i class="bi bi-eraser me-1"></i>
        RAZ
      </button>
    </div>
    
    <div class="flex-fill px-1">
      <button 
        class="btn btn-info w-100 h-100" 
        type="button"
        on:click={() => handleAction('HELP')}
      >
        <i class="bi bi-info me-1"></i>
        HELP
      </button>
    </div>

  </div>

  {#if inputValue}
    <div class="d-flex w-100 px-1">
      <div class="w-100 p-3 border rounded bg-white shadow-sm">
      
        <strong class="text-muted small text-uppercase me-2">Typed Query Echo:</strong> {inputValue || "(Empty)"} <br>
        <strong>Last Clicked:</strong> {lastAction}
      </div>
    </div>
  {/if}

</div>

<style>
  /* Ensure even distribution: each flex-fill takes exactly 25% */
  .flex-fill {
    flex: 1 1 0;
    min-width: 0;
  }

  /* Focus styling for a cleaner look */
  input:focus {
    box-shadow: none;
    border-color: #dee2e6;
  }
</style>
