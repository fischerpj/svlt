<!-- this line is needed to add your svelte component to quarto! -->
<svelte:options customElement={{ 
  tag: 'my-mirrorreset', 
  shadow: 'none',
  props: {
    data: { type: "Array" }
  } 
}} />

<!-- START -->
<script>
  let output = $state("");

  function action1() { output = "Action 1: " + text }
  function action2() { output = "Action 2: " + text }
  function action3() { output = "Action 3: " + text }
  
  

   // Svelte 5 Rune for reactive state
  let userInput = $state('');
  let userIn = $state('');
  let userInput2 = $state('');
  let text = $state("");
  let text2 = $state("input ref here");

  const reset = () => userInput = '';
  const shout = () => userInput = userInput.toUpperCase();
  const whisper = () => userInput = userInput.toLowerCase();
  const handleReset = () => {
    userInput = '';
  };

</script>








<div class="container py-5">
  <div class=" row g-2 mb-4">
  
  <div class="mb-3">
  <label for="m-input2" class="form-label fw-bold">Enter Text</label>
  <input 
      id="m-input2"
      type="text" 
      class="form-control form-control-lg" 
      placeholder="Start typing..."
      bind:value={text2}
      onkeydown={e => e.stopPropagation()} 
  />
</div>

    
    <div class="col">
      <button onclick={shout} class="btn btn-outline-primary shadow-sm w-100 h-100 text-truncate">
        Shout
      </button>
    </div>

    <div class="col">
      <button onclick={whisper} class="btn btn-outline-secondary shadow-sm w-100 h-100 text-truncate">
        Whisper
      </button>
    </div>

    <div class="col">
      <button onclick={reset} class="btn btn-dark shadow-sm w-100 h-100 text-truncate">
        Reset
      </button>
    </div>
  </div>

  <div class="card border-0 shadow-sm">
    <div class="card-body p-4">
      <h6 class="text-muted small text-uppercase mb-3">Result</h6>
      <div class="fs-4 text-break">
        {userInput || "..."}
      </div>
    </div>
  </div>
</div>



<!-- END   -->









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



<div class="container py-4" style="max-width: 600px;">
  <div class="row g-2 mb-3">
    <div class="col">
      <input 
        type="text" 
        class="form-control border-0 shadow-sm" 
        placeholder="Type here..." 
        bind:value={userIn} 
      />
    </div>
    <div class="col-auto">
      <button 
        class="btn btn-light border shadow-sm" 
        onclick={handleReset}
      >
        Reset
      </button>
    </div>
  </div>

  <div class="card border-0 shadow-sm">
    <div class="card-body">
      <p class="text-muted small mb-1">Live Output</p>
      <div class="fs-5 text-break">
        {userIn || 'Waiting for input...'}
      </div>
    </div>
  </div>
</div>


<div class="container py-5" style="max-width: 600px;">
  
  <div class="row g-2 mb-4">
    <div class="col">
      <input 
        type="text" 
        bind:value={userInput2}
        class="form-control border-0 shadow-sm p-3" 
        placeholder="Enter text..."
      />
    </div>
    <div class="col-auto">
      <button 
        onclick={reset} 
        class="btn btn-dark shadow-sm h-100 px-4"
      >
        Reset
      </button>
    </div>
  </div>

  <div class="card border-0 shadow-sm">
    <div class="card-body p-4">
      <h6 class="text-uppercase text-muted small fw-bold mb-3">Output Result</h6>
      <div class="fs-5 text-break">
        {userIn || "Nothing to show yet..."}
      </div>
    </div>
  </div>

</div>

   <div class="col">
      <input 
        type="text" 
        bind:value={userInput}
        class="form-control border-0 shadow-sm h-100" 
        placeholder="Input..."
      />
    </div>
