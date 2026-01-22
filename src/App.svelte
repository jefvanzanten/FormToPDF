<script lang="ts">
  import AddressForm from './components/AddressForm.svelte';
</script>

<main class="page">
  <div class="wrapper">
    <h1 class="title">PDF Generator</h1>
    <AddressForm />
  </div>
</main>

<style>
  .page {
    min-height: 100vh;
    background-color: #f3f4f6;
    padding: 2rem 1rem;
  }

  .wrapper {
    max-width: 56rem;
    margin: 0 auto;
  }

  .title {
    font-size: 1.875rem;
    font-weight: 700;
    color: #1f2937;
    margin-bottom: 2rem;
  }
</style>
