<!-- this line is needed to add your svelte component to quarto! -->
<svelte:options customElement={{ 
  tag: 'my-refwidget', 
  shadow: 'none',
  props: {
    data: { type: "Array" }
  } 
}} />


<!--
// ============================================================
// File: src/components/RefWidget.svelte
// (Example Svelte component using the shared store)
// ============================================================
-->


<!--
// ======================================================================
// ComponentA.svelte — Text Input Component (adds text to global store)
// ======================================================================

<script>
  import { addText, resetItems } from './store.js'
  let text = ""
</script>

<div style="padding:1rem; border:1px solid #ccc;">
  <h3>Component A — Text Input</h3>

  <input type="text" bind:value={text} />

  <button on:click={() => { addText(text); text = "" }}>
    Add Text
  </button>

  <button on:click={resetItems}>
    Reset
  </button>
</div>
-->


<script>
  import { RefAccu, addValue, resetRefAccu } from './refstore.js'
  let n = 0
  let text = ""
  
  // this is ActionBar stuff
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

  function handleAdd() {
    inputValue = "toototui";
  }
  
  function handleRaz() {
    inputValue = "";
  }
  
</script>

<h4>RefWidget:</h4>

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
        on:click={() => { addValue(inputValue); text = "" }}
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
        <strong class="text-muted small text-uppercase me-2">Last Typed Query Echo:</strong> {inputValue || "(Empty)"} <br>
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


<!--

<div class="RefAccu-widget">
  <input type="number" bind:value={n} />

  <button on:click={() => addValue(+n)}>
    Add
  </button>

  <button on:click={resetRefAccu}>
    Reset
  </button>

  <ul>
    {#each $RefAccu.items as item}
      <li>{item}</li>
    {/each}
  </ul>
</div>
-->