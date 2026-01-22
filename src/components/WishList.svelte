<script lang="ts">
  import type { WishListProps } from '../types';
    import FormField from './FormField.svelte';

    let {
        name = $bindable(''),
        onsubmit,
        loading = false,
        error = ''
    }: WishListProps = $props();

    function handleSubmit(e: Event) {
        e.preventDefault();
        onsubmit?.();
    }
</script>

<div class="bg-white rounded-lg shadow p-6">
    <h2 class="text-xl font-semibold mb-4 text-gray-700">Gegevens invoeren</h2>

    <form onsubmit={handleSubmit} class="space-y-4">
        <FormField label="Naam" id="name" bind:value={name} />

        {#if error}
            <div class="bg-red-100 text-red-700 px-4 py-2 rounded-md">{error}</div>
        {/if}

        <button
            type="submit"
            disabled={loading}
            class="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
            {loading ? "Bezig met genereren..." : "Genereer PDF"}
        </button>
    </form>
</div>
