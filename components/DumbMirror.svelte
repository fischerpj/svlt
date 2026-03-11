<!-- this line is needed to add your svelte component to quarto! -->
<svelte:options customElement={{ 
  tag: 'mirror-display', 
  shadow: 'none',
  props: {
    data: { type: "Array" }
  }  
}} />

<script>
  let { text = "" } = $props();
</script>

<div class="alert alert-info shadow-sm mt-3">
  <i class="bi bi-info-circle me-2"></i> 
  <strong>Reflected:</strong> {text}
</div>