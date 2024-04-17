<script lang="ts">
  import AuthCard from "$lib/components/auth/AuthCard.svelte";
  import type { ActionData } from "./$types";

  export let form: ActionData;
  let showPassword = false;
  $: type = showPassword ? "text" : "password";
</script>

<AuthCard>
  <h1 class="text-center text-4xl text-headline">Delete Account</h1>
  {#if form?.msg}
    <div class="flex flex-col items-center justify-center">
      <p class="w-1/2 w-max-12 text-highlight text-center">{form.msg}</p>
    </div>
  {/if}
  <input
    class="w-full mt-4 p-2 my-2 mx-0 border-2 border-stroke bg-main rounded placeholder-paragraph text-stroke"
    placeholder="Email address"
    type="text"
    name="username"
    required
  />
  <input
    class="w-full p-2 mt-2 mb-0 mx-0 border-2 border-stroke bg-main rounded placeholder-paragraph text-stroke"
    placeholder="Password"
    {type}
    name="password"
    required
  />

  <div class="flex flex-row justify-center align-middle">
    <input type="checkbox" name="checkbox" />
    <p class="ml-4 text-headline">Delete all posts?</p>
  </div>

  <div class="flex flex-col items-center justify-center mt-2">
    <button
      class="w-full max-w-96 py-2 px-4 bg-button rounded-lg text-center text-buttonText text-md"
      type="button"
      on:click={() => (showPassword = !showPassword)}
    >
      Show Password
    </button>
    <button
      class="w-full max-w-96 mt-2 py-4 px-8 bg-button rounded-lg text-center text-buttonText text-lg"
      type="submit"
    >
      Delete Account
    </button>
  </div>
</AuthCard>
