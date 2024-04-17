<script lang="ts">
  import AuthCard from "$lib/components/auth/AuthCard.svelte";
  import Button from "$lib/components/buttons/Button.svelte";
  import type { ActionData } from "./$types";

  export let form: ActionData;
  let showPassword = false;
  $: type = showPassword ? "text" : "password";
</script>

<AuthCard>
  <h1 class="text-center text-4xl text-headline">Log In</h1>
  {#if form?.msg}
    <div class="flex flex-col items-center justify-center">
      <p class="w-1/2 w-max-96 text-highlight">{form.msg}</p>
    </div>
  {/if}
  <input
    class="w-full mt-4 p-2 bg-main rounded placeholder-paragraph text-stroke"
    placeholder="Email address"
    type="text"
    name="username"
    required
  />
  <input
    class="w-full p-2 mt-2 bg-main rounded placeholder-paragraph text-stroke"
    placeholder="Password"
    {type}
    name="password"
    required
  />
  <div class="flex flex-col items-center justify-center mt-4">
    <button
      class="w-full max-w-96 py-2 px-4 bg-button rounded-lg text-center text-buttonText text-lg"
      type="button"
      on:click={() => (showPassword = !showPassword)}
    >
      Show Password
    </button>
    <button
      class="w-full max-w-96 mt-2 py-4 px-8 bg-button rounded-lg text-center text-buttonText text-xl"
      type="submit"
    >
      Sign In
    </button>
    <Button title="Click here to  sign up" path="/auth/signup" class="mt-8 w-full w-max-96" />
  </div>
</AuthCard>
