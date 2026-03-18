<!-- this line is needed to add your svelte component to quarto! -->
<svelte:options customElement={{ 
  tag: 'my-osisparser', 
  shadow: 'none',
  props: {
    data: { type: "Array" }
  } 
}} />

<script>
  import { bcv_parser } from "bible-passage-reference-parser/esm/bcv_parser.js";
  import * as lang from "bible-passage-reference-parser/esm/lang/en.js";
  
  // 1. Initialize the parser
  const bcv = new bcv_parser(lang);
  
  // 2. Configure strategies to prevent skipping
  bcv.set_options({
    "consecutive_combination_strategy": "combine",
    "sequence_combination_strategy": "combine",
  });

  let userInput = "Galatians 1:16; 2:4";
  let osisResult = "";

  /** 
  * 3. Reactive Statement
   * This re-runs automatically whenever 'userInput' changes.
   */
  $: {
    osisResult = bcv.parse(userInput).osis();
    }
</script>

<div class="container">
  <label for="bible-input">Enter Bible Reference:</label>
  <input 
    id="bible-input"
    type="text" 
    bind:value={userInput} 
    placeholder="e.g. John 3:16"
  />
  
  <hr/>

  <div class="output">
    <strong>OSIS Echo:</strong> <span>{osisResult}</span>
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

