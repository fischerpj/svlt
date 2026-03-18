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

<script>
  import { RefAccu, addValue, resetRefAccu } from './refstore.js'
  
  // BCV_PARSER
  import { bcv_parser } from "bible-passage-reference-parser/esm/bcv_parser.js";
  import * as lang from "bible-passage-reference-parser/esm/lang/en.js";
  
  // 1. Initialize the parser
  const bcv = new bcv_parser(lang);
  
  // 2. Configure strategies to prevent skipping
  bcv.set_options({
    "consecutive_combination_strategy": "combine",
    "sequence_combination_strategy": "combine",
  });

  let n = 0
  let text = ""
  
  // this is ActionBar stuff
  let inputValue = "Gen1:1";
  let lastAction = "None";
  let osisResult = "";

  let userInput = "Gal 1:16";
  let responseText = "";
  let loading = false;
  let timer;
  
    // The fetch function
  async function getPassage(query) {
    if (!query.length > 0) {
      responseText ='yapas';
      return;
    }  
    loading = true;
    
    const url = `https://hsub.pjafischer.workers.dev/bgw/api/?param=${encodeURIComponent(query)}`;
    
    try {
      const response = await fetch(url);
      const data = await response.json();
      // Adjust 'data.text' based on your actual Worker JSON structure
      responseText = data.content || JSON.stringify(data);
    } catch (err) {
      responseText = "Error fetching data.";
    } finally {
      loading = false;
    }
  }


  /** 
  * 3. Reactive Statement
  * This re-runs automatically whenever 'userInput' changes.
  */
      $: {
        osisResult = bcv.parse(inputValue).osis();
      }
      
  /* REACTIVE LOGIC: 
    Whenever 'userInput' changes, clear the old timer and start a new one.
    This "debounces" the input so it only fetches 500ms after you STOP typing.
  */
  $: {
    clearTimeout(timer);
    timer = setTimeout(() => {
      getPassage(osisResult);
    }, 100);
  }

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
          placeholder="Type Ref ..." 
          bind:value={inputValue}
        />
      </div>
    </div>
    
    <div class="flex-fill px-1">
      <button 
        class="btn btn-primary w-100 h-100" 
        type="button"
        on:click={() => { addValue(osisResult); text = "" }}
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
        <strong class="text-muted small text-uppercase me-2">Last Valid Ref:</strong> {osisResult || "(Invalid)"} <br>
      </div>
    </div>
  {/if}
  
  {#if loading}
    <p>Loading...</p>
  {:else}
  
     <div class="d-flex w-100 px-1">
      <div class="w-100 p-3 border rounded bg-white shadow-sm">
        <strong class="text-muted small text-uppercase me-2">Last Valid Response:</strong> {responseText || "(Invalid)"} <br>
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