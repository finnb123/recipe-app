<!-- <script lang="ts">
  import type { ActionData, PageServerData } from "./$types";
  import Button from "$lib/components/buttons/Button.svelte";
  import Logout from "$lib/components/auth/Logout.svelte";
  export let data: PageServerData;
  // const { slug, title } = data;
  export let form: ActionData;
  import { enhance } from "$app/forms";

  let show_password = false;
  $: type = show_password ? "text" : "password";
  console.log(data.slug);

  // this shouldve been separate routes
</script>

<div class="p-12 rounded-lg flex items-center justify-center">
  <div class="rounded-lg flex flex-col items-center justify-center">
    <form
      class="flex flex-col bg-background p-12 rounded-lg"
      method="post"
      action="?/{data.slug}"
      use:enhance
    >
      {#if data.slug !== "signout"}
        <h1 class="text-center text-4xl text-headline">{data.title}</h1>
        {#if form?.bad}
          <p class="text-highlight">Error with email or password</p>
        {/if}
        {#if form?.message}
          <p class="text-highlight">
            {form.message}
          </p>
        {/if}
        <input
          class="w-full mt-4 p-2 my-2 mx-0 border-2 border-stroke bg-main rounded placeholder-paragraph text-stroke"
          placeholder="Email address"
          type="text"
          name="username"
          value={form?.username ?? ""}
          required
        />
        <input
          class="w-full p-2 mt-2 mb-0 mx-0 border-2 border-stroke bg-main rounded placeholder-paragraph text-stroke"
          placeholder="Password"
          {type}
          name="password"
          required
        />
        {#if data.slug === "signup"}
          <input
            class="w-full p-2 mt-2 mb-0 mx-0 border-2 border-stroke bg-main rounded placeholder-paragraph text-stroke"
            placeholder="Repeat password"
            {type}
            name="passwordTwo"
            required
          />
        {/if}
        {#if data.slug === "delete_account"}
          <div class="flex flex-row justify-center align-middle">
            <input type="checkbox" name="checkbox" />
            <p class="ml-4 text-headline">Delete all posts?</p>
          </div>
        {/if}
        <button
          class="text-sm mt-1 py-2 px-4 border border-stroke rounded text-buttonText text-center bg-button hover:shadow-md"
          type="button"
          on:click={() => (show_password = !show_password)}
        >
          {show_password ? "Hide" : "Show"}
        </button>
        <button
          class="text-lg mt-2 py-4 px-8 border border-stroke rounded text-buttonText text-center bg-button hover:shadow-md"
          type="submit">{data.title}</button
        >
        {#if data.slug !== "delete_account"}
          <div class="mt-2 flex text-center align-center justify-center">
            {#if data.slug === "signin"}
              <a
                class="text-sm p-2 px-4 w-max text-buttonText text-center bg-button hover:shadow-md rounded"
                href="/auth/signup">Click here to sign up</a
              > -->
              <!-- <Button title="Click here to sign up" path="/auth/signup"/>
            {/if}
            {#if data.slug === "signup"}
             <a
                class="text-sm p-2 px-4 w-max text-buttonText text-center bg-button hover:shadow-md rounded"
                href="/auth/signin">Click here to sign in</a
              > -->
              <!-- <Button title="Click here to sign in" path="/auth/signin"/>
            {/if}
          </div>
        {/if}
      {:else} --> 
        <!-- <button type="submit" class="flex items-center justify-center">
          <img
            class="w-1/4"
            src="https://thumbs.dreamstime.com/b/logout-isolated-special-red-round-button-abstract-illustration-logout-special-red-round-button-103921368.jpg"
            alt="Logout button"
          />
        </button> -->
      <!-- {/if}
    </form>
  </div>
</div> --> 
