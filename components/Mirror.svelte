<!-- this line is needed to add your svelte component to quarto! -->
<svelte:options customElement={{
  tag: "my-mirror",
  props: {
    data: { type: "Array" }
  }
}} />

<script>
  let text = $state("");
</script>

<div class="mirror">
  <input 
    bind:value={text} 
    onkeydown={(e) => e.stopPropagation()} 
    placeholder="Type here… Typing 's' won't trigger search..." />
  <p><strong>Output:</strong> {text}</p>
</div>

<style>
  .mirror {
    font-family: system-ui, sans-serif;
    padding: 1rem;
    max-width: 400px;
  }
  input {
    padding: 0.5rem;
    width: 100%;
    margin-bottom: 0.75rem;
    font-size: 1rem;
  }
</style>