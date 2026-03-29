<!-- this line is needed to add your svelte component to quarto! -->
<svelte:options customElement={{ 
  tag: 'my-osisparserui', 
  shadow: 'none',
  props: {
    data: { type: "Array" }
  } 
}} />

<script>

//--------------------------------------------------------- windows.STORE ------
  import { RefAccu, addValue, resetRefAccu, setValue } from './refstore.js'
  
// ---------------------------------------------------------------- PARSING ---- 
  import { ParserRef } from "./ParserRef.js";

  import { bcv_parser } from "bible-passage-reference-parser/esm/bcv_parser.js";
  import * as lang from "bible-passage-reference-parser/esm/lang/fr.js";
  
  // Configure parsing strategies to prevent skipping
  const options = {
          punctuation_strategy: "us",
          "consecutive_combination_strategy": "separate",
          "sequence_combination_strategy": "combine",
        }
        
  // Initialize the parser externally to my class
  const bcv = new bcv_parser(lang);
  const parser = new ParserRef(bcv, options)

// ----------------------------------------------------------- VARIABLES -------

  let inputValue =  "Gal 1:16!SG21 ge1:5 (2tim1:1!KJV) rom5:8 Ap4:2";
  let osisResult = "";
  let hsubResult = "";
  let wrapResult = "";
  let n = 0

// ---------------------------------------------------  REACTIVE TRANSFORMS ----

  /**  3. Reactive Statement
   * This re-runs automatically whenever 'userInput' changes.
  */
  $: {
    osisResult = JSON.stringify(parser.parse(inputValue).osis_entities(),null,0);
    hsubResult = JSON.stringify(parser.parse(inputValue).hsub_entities(),null,0);
    wrapResult = parser.parse(inputValue).osis_idempotent();
    }
   
   $: {
    setValue(wrapResult);
   }

// --------------------------------------------------------------- FUNCTONS ----

  // Copy to clipboard logic (CLIP)
  async function handleClip() {
    if (inputValue) {
      try {
        await navigator.clipboard.writeText(wrapResult);
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

<!-- ----------------------------------------------------------------------- -->
<!-- --------------------------------------------------------------- UI ---- -->


<!-- ------------------------------------------------------------- UI_1 ---- -->

<div class='d-flex justify-content-evenly' gap-2>

  <input 
    class="form-control px-2 py-1" 
    type="text" 
    placeholder="UI_1 bootstrap form-control padding" 
    id="inputStd"
  >

  <button class="btn btn-primary  px-2 py-1">Add1</button>
  <button class="btn btn-success  px-2 py-1">Clip1</button>
  <button class="btn btn-info  px-2 py-1">Help1</button>

</div>

<hr/>



<!-- --------------------------------------------------------------STORE_UI --->
<!-- ------------------------------------------------------------- UI_2 ---- -->

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
          placeholder="UI_2 bootstrap form-control padding" 
          id="inputStd2"
          bind:value={inputValue}
        />
      </div>
    </div>
    
    <div class="flex-fill px-0">
      <button 
        class="btn btn-primary w-100" 
        type="button"
        >
        <span>
          <i class="bi bi-folder-plus me-1 d-none "></i>
          ADD
        </span>
      </button>
    </div>    

    <div class="flex-fill px-0">
      <button 
        class="btn btn-warning w-100" 
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
        class="btn btn-danger w-100" 
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
  
</div>

<hr/>

<!-- ------------------------------------------------------------- UI_3 ---- -->

div.d-flex > input + button Good Heights

<div class='d-flex justify-content-evenly' gap-2>

  <input 
    class="form-control px-2 py-1" 
    type="text" 
    placeholder="UI3 bootstrap form-control padding" 
    id="inputStd"
  >

  <button class="btn btn-primary  px-2 py-1">Add</button>
  <button class="btn btn-success  px-2 py-1">Clip</button>
  <button class="btn btn-info  px-2 py-1">Help</button>

</div>


<!-- ------------------------------------------------------------- UI_3b ---- -->

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
          placeholder="UI_3b bootstrap form-control padding" 
          id="inputStd2"
          bind:value={inputValue}
        />
      </div>
    </div>
    
    <div class="flex-fill px-0">
      <button class="btn btn-primary w-100 px-2 py-1">Add</button></div>
    <div class="flex-fill px-0">
      <button class="btn btn-success w-100 px-2 py-1">Clip</button></div>
    <div class="flex-fill px-0">
      <button class="btn btn-info w-100 px-2 py-1">Help</button></div>
  
  </div>
</div>
<hr/>

<!-- ------------------------------------------------ end of BUTTONS_mobile --->



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

<!-- BUTTONS -->

<!-- ------------------------------------------------------------- UI_4 ---- -->

div.d-flex > input + div.flex-fill button

<div class="container-fluid d-flex flex-column w-100 p-3">
  
  <div class="d-flex justify-content-evenly mb-2">
  
    <div class="flex-fill px-0">
      <div class="input-group h-100">
        <span class="input-group-text bg-light">
          <i class="bi bi-search"></i>
        </span>
        <input 
          id="search-input"
          type="text" 
          class="form-control px-2 py-1" 
          placeholder="UI4 Type to echo..." 
          bind:value={inputValue}
        />
      </div>
    </div>

<!--
    <div class="flex-fill px-0">
      <button 
        class="btn btn-primary  px-2 py-1"
        type="button"
        >
        <i class="bi bi-folder-plus me-1 d-none"></i>
        ADD</button>
    </div>
-->

    <div class="flex-fill px-0">
      <button 
        class="btn btn-warning  px-2 py-1" 
        type="button"
        on:click={handleClip}
        disabled={!inputValue}
      >
        <i class="bi bi-clipboard me-1 d-none"></i>
        CLIP
      </button>
    </div>
    
    <div class="flex-fill px-0">
      <button 
        class="btn btn-danger  px-2 py-1" 
        type="button" 
        on:click={handleRaz}
      >
        <i class="bi bi-eraser me-1 d-none"></i>
        RAZ
      </button>
    </div>
    
    <div class="flex-fill px-0">
      <button 
        class="btn btn-info  px-2 py-1" 
        type="button"
        on:click={() => handleAction('HELP')}
      >
        <i class="bi bi-info me-1 d-none"></i>
        HELP
      </button>
    </div>

  </div>

<!-- ----------------------------------------------------- OUTPUT AREA  ---- -->

  {#if inputValue}
    <div class="d-flex w-100 px-1">
      <div class="w-100 p-3 border rounded bg-white shadow-sm">
        <div><strong class="text-muted small text-uppercase me-2">OSIS:</strong>
          {@html wrapResult}</div>
        <div><strong class="text-muted small text-uppercase me-2">hsub:</strong>
          {@html hsubResult}</div>
<!-- this is refUI portion         --> 
        <div><strong class="text-muted small text-uppercase me-2">store:</strong>
          {@html JSON.stringify($RefAccu.items)}</div>
      </div>
    </div>
  {/if}

</div>

<!-- --------------------------------------------------------- STYLING  ---- -->

<style>
  .container {
    font-family: sans-serif;
    max-width: 400px;
    margin: 2rem auto;
    padding: 1rem;
    border: 1px solid #ddd;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }

  label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: bold;
  }

  input {
    width: 100%;
    padding: 10px;
    box-sizing: border-box;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 1rem;
  }

  hr {
    margin: 1.5rem 0;
    border: 0;
    border-top: 1px solid #eee;
  }

  .output {
    margin-bottom: 0.75rem;
  }

  .long-string {
    overflow-wrap : break-word;
  }

  code {
    background: #f4f4f4;
    padding: 2px 6px;
    border-radius: 4px;
    color: #d11010;
  }

  .error {
    color: #999;
    font-style: italic;
  }
</style>

