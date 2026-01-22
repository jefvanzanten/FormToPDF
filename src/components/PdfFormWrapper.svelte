<script lang="ts">
  import type { Snippet } from 'svelte';

  interface Props {
    children: Snippet;
    data: Record<string, unknown>;
    labels?: Record<string, string>;
    previewEl?: HTMLElement;
    title?: string;
  }

  let {
    children,
    data,
    labels = {},
    previewEl = $bindable(),
    title = 'Preview'
  }: Props = $props();

  let showPreview = $state(true);

  function formatValue(value: unknown): string {
    if (Array.isArray(value)) {
      return value.join(', ');
    }
    return String(value ?? '');
  }
</script>

<div class="container">
  <div class="card">
    {@render children()}
  </div>

  <div class="card">
    <div class="preview-header">
      <h2 class="card-title">Preview</h2>
      <button type="button" onclick={() => (showPreview = !showPreview)} class="toggle-btn">
        {showPreview ? "Verbergen" : "Tonen"}
      </button>
    </div>

    <div class="preview-container" class:hidden={!showPreview}>
      <div bind:this={previewEl}>
        <div class="preview-content">
          <h1 class="preview-title">{title}</h1>

          <div class="preview-fields">
            {#each Object.entries(data) as [key, value]}
              {#if value}
                <div class="preview-row">
                  <span class="preview-label">{labels[key] ?? key}:</span>
                  <span class="preview-value">{formatValue(value)}</span>
                </div>
              {/if}
            {/each}
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  .container {
    display: grid;
    gap: 2rem;
  }

  @media (min-width: 768px) {
    .container {
      grid-template-columns: 1fr 1fr;
    }
  }

  .card {
    background-color: white;
    border-radius: 0.5rem;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    padding: 1.5rem;
  }

  .card-title {
    font-size: 1.25rem;
    font-weight: 600;
    margin-bottom: 0;
    color: #374151;
  }

  .preview-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
  }

  .toggle-btn {
    font-size: 0.875rem;
    color: #2563eb;
    background: none;
    border: none;
    cursor: pointer;
  }

  .toggle-btn:hover {
    color: #1e40af;
  }

  .preview-container {
    border: 1px solid #e5e7eb;
    border-radius: 0.375rem;
    padding: 1rem;
    background-color: #f9fafb;
  }

  .preview-container.hidden {
    visibility: hidden;
    height: 0;
    overflow: hidden;
    padding: 0;
    border: 0;
  }

  .preview-content {
    background-color: white;
    padding: 2rem;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  }

  .preview-title {
    font-size: 1.5rem;
    font-weight: 700;
    color: #1f2937;
    margin-bottom: 1.5rem;
    border-bottom: 2px solid #1f2937;
    padding-bottom: 0.5rem;
  }

  .preview-fields {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .preview-row {
    display: flex;
  }

  .preview-label {
    font-weight: 600;
    color: #4b5563;
    width: 8rem;
  }

  .preview-value {
    color: #1f2937;
  }
</style>
