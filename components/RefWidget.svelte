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
  //-------- STORE 
  import { RefAccu, addValue, resetRefAccu } from './refstore.js'
  
  //-------- BCV_PARSER
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

  // REACTIVE
  /** 
  * This re-runs automatically whenever 'userInput' changes.
  */
      $: {
        osisResult = bcv.parse(inputValue).osis();
      }
      
      $: {
        setValue(osisResult);
      }

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

<div class="container-fluid d-flex flex-column w-100 p-1">
  
  <div class="d-flex align-items-stretch w-100 mb-2 gap-1">
  
    <div class="flex-fill px-0">
      <div class="input-group">
        <span class="input-group-text bg-light d-none d-md-flex">
          <i class="bi bi-search"></i>
        </span>
        <input 
          class="form-control px-2 py-1" 
          type="text" 
          placeholder="bootstrap form-control padding" 
          id="inputStd2"
          bind:value={inputValue}
        />
      </div>
    </div>
    
    <div class="flex-fill px-0">
      <button 
        class="btn btn-primary w-100 px-2 py-1" 
        type="button"
        on:click={() => { addValue(osisResult); text = "" }}
        >
        <span>
          <i class="bi bi-folder-plus me-1 d-none "></i>
          ADD
        </span>
      </button>
    </div>    

    <div class="flex-fill px-0">
      <button 
        class="btn btn-warning w-100 px-2 py-1" 
        type="button"
        on:click={handleClip}
        disabled={!inputValue}
      >
        <span>
          <i class="bi bi-clipboard me-1 d-none"></i>
          CLIP
        </span>
      </button>
    </div>
    
    <div class="flex-fill px-0">
      <button 
        class="btn btn-danger w-100 px-2 py-1" 
        type="button" 
        on:click={handleRaz}
      >
        <span>
          <i class="bi bi-eraser me-1 d-none"></i>
          RAZ
        </span>
      </button>
    </div>
    
  </div>

<hr/>

<!--  VIEW RT Accu -->
  <div class="RefAccu-widget">
    <pre>{JSON.stringify(osisResult, null, 0)}</pre>
  </div>

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