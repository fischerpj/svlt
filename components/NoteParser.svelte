<!-- this line is needed to add your svelte component to quarto! -->
<svelte:options customElement={{ 
  tag: 'my-noteparser', 
  shadow: 'none',
  props: {
    data: { type: "Array" }
  } 
}} />

<script>
  import { ParserRef } from "./ParserRef.js";

  import { bcv_parser } from "bible-passage-reference-parser/esm/bcv_parser.js";
  import * as lang from "bible-passage-reference-parser/esm/lang/fr.js";
  
  // 2. Configure strategies to prevent skipping
  const options = {
          punctuation_strategy: "us",
          "consecutive_combination_strategy": "separate",
          "sequence_combination_strategy": "combine",
        }
        
  // 1. Initialize the parser externally
  const bcv = new bcv_parser(lang);
  const parser = new ParserRef(bcv, options)

  let userInput = "Gal 1:16!SG21 ge1:5 (2tim1:1!KJV) rom5:8 Ap4:2";
  let osisResult = "";
  let hsubResult = "";
  let wrapResult = "";
  let userNote = "foi: eph2:8 heb11:1,6";

  /** 
  * 3. Reactive Statement
   * This re-runs automatically whenever 'userInput' changes.
   */
  $: {
    osisResult = JSON.stringify(parser.parse(userInput).osis_entities(),null,0);
    hsubResult = JSON.stringify(parser.parse(userNote).hsub_entities(),null,0);
    wrapResult = parser.parse(userNote).osis_idempotent();
    }
</script>

<div class="container">
  <!-- Free Text Area of User Input --> 
  <label for="freenote">Free Notes</label>
  <textarea 
    id="freenote" 
    rows= "6" 
    cols="40"
    placeholder="foi: eph2:8 heb11:1,6"
    bind:value={userNote}
  />
  
  <!--
  <label for="bible-input">Enter Bible Reference:</label>
  <input 
    id="bible-input"
    type="text" 
    bind:value={userInput} 
    placeholder="e.g. John 3:16"
  />
  -->
  
  <div class="output">
  <!--    <div class='long-string'><strong>OSIS Echo:</strong> <span>{@html osisResult}</span></div>   -->
    <div class='long-string'><strong>hsub_Array:</strong> <span>{hsubResult}</span></div>
    <div><strong>OSIS_Idem:</strong> {@html wrapResult}</div>
  </div>

</div>

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