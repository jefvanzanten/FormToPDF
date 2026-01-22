<script lang="ts">
  import FormField from './FormField.svelte';
  import PdfFormWrapper from './PdfFormWrapper.svelte';
  import { createPdfForm } from '../hooks/usePdfForm.svelte';

  const form = createPdfForm({
    name: '',
    address: '',
    postalCode: '',
    city: '',
    email: '',
    phone: ''
  });

  const labels = {
    name: 'Naam',
    address: 'Adres',
    postalCode: 'Postcode',
    city: 'Plaats',
    email: 'E-mail',
    phone: 'Telefoon'
  };

  function handleSubmit(e: Event) {
    e.preventDefault();
    form.generatePdf('adresgegevens.pdf');
  }
</script>

<PdfFormWrapper data={form.data} {labels} title="Adresgegevens" bind:previewEl={form.previewEl}>
  <h2 class="card-title">Gegevens invoeren</h2>

  <form onsubmit={handleSubmit} class="form">
    <FormField label="Naam" id="name" bind:value={form.data.name} />
    <FormField label="Adres + huisnummer" id="address" bind:value={form.data.address} />

    <div class="form-row">
      <FormField label="Postcode" id="postalCode" bind:value={form.data.postalCode} />
      <FormField label="Plaats" id="city" bind:value={form.data.city} />
    </div>

    <FormField label="E-mail" id="email" type="email" bind:value={form.data.email} />
    <FormField label="Telefoonnummer" id="phone" type="tel" bind:value={form.data.phone} />

    {#if form.error}
      <div class="error">{form.error}</div>
    {/if}

    <button type="submit" disabled={form.loading} class="submit-btn">
      {form.loading ? "Bezig met PDF downloaden..." : "Download PDF"}
    </button>
  </form>
</PdfFormWrapper>

<style>
  .card-title {
    font-size: 1.25rem;
    font-weight: 600;
    margin-bottom: 1rem;
    color: #374151;
  }

  .form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }

  .error {
    background-color: #fee2e2;
    color: #b91c1c;
    padding: 0.5rem 1rem;
    border-radius: 0.375rem;
  }

  .submit-btn {
    width: 100%;
    background-color: #2563eb;
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 0.375rem;
    border: none;
    cursor: pointer;
    transition: background-color 0.15s;
  }

  .submit-btn:hover {
    background-color: #1d4ed8;
  }

  .submit-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
</style>
