<script lang="ts">
  interface Props {
    label: string;
    id: string;
    type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url';
    value?: string;
    placeholder?: string;
    required?: boolean;
    disabled?: boolean;
    error?: string;
  }

  let {
    label,
    id,
    type = 'text',
    value = $bindable(''),
    placeholder = '',
    required = false,
    disabled = false,
    error = ''
  }: Props = $props();
</script>

<div class="field">
  <label for={id} class="label">
    {label}
    {#if required}<span class="required">*</span>{/if}
  </label>
  <input
    {id}
    {type}
    bind:value
    {placeholder}
    {required}
    {disabled}
    class="input"
    class:input-error={error}
    class:input-disabled={disabled}
  />
  {#if error}
    <p class="error-text">{error}</p>
  {/if}
</div>

<style>
  .field {
    display: flex;
    flex-direction: column;
  }

  .label {
    display: block;
    font-size: 0.875rem;
    font-weight: 500;
    color: #4b5563;
    margin-bottom: 0.25rem;
  }

  .required {
    color: #ef4444;
  }

  .input {
    width: 100%;
    padding: 0.5rem 0.75rem;
    border: 1px solid #d1d5db;
    border-radius: 0.375rem;
    outline: none;
  }

  .input:focus {
    outline: none;
    box-shadow: 0 0 0 2px #3b82f6;
  }

  .input-error {
    border-color: #ef4444;
  }

  .input-disabled {
    background-color: #f3f4f6;
    cursor: not-allowed;
  }

  .error-text {
    margin-top: 0.25rem;
    font-size: 0.875rem;
    color: #ef4444;
  }
</style>
