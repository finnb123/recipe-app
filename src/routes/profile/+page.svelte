<script lang="ts">
  import type { PageServerData } from "./$types.js";
  import Button from "$lib/components/buttons/Button.svelte";
  import Loading from "$lib/components/Loading.svelte";
  export let data: PageServerData;
  $: ({ username, posts } = data);
</script>

<main class="bg-secondary">
    <h2 class="mx-auto text-center text-3xl text-headline">Profile</h2>
    <p class="mx-auto mt-2 text-center text-xl text-headline">Hello {username}!</p>
    <h4 class="mx-auto mt-4 text-center text-2xl text-headline">Your Posts</h4>
    <div class="flex items-center justify-center relative overflow-x-auto mt-6">
      {#await posts}
        <Loading />
      {:then posts}
      <table
        class="w-1/2 text-sm text-left rtl:text-right text-headline table-auto border-2 border-stroke"
      >
        <thead class="text-2xl text-headline uppercase bg-highlight">
          <tr>
            <th scope="col" class="px-4 py-3 w-8">#</th>
            <th scope="col" class="px-2 py-3">Title</th>
            <th scope="col" class="px-2 pr-8 py-3 w-12">Published</th>
          </tr>
        </thead>

          <tbody class="text-xl text-headline">
            {#each posts as { title, published, id }, i}
            <a href="/p/{id}" class="contents">
              <tr
                class="odd:bg-background even:bg-secondary odd:hover:text-highlight even:hover:text-background"
              >
                <th
                  scope="row"
                  class="px-4 py-4 first-letter:font-mediumext-headline whitespace-nowrap">{i + 1}</th
                >
                <td class="px-2 py-4">{title}</td>
                <td class="px-2 py-4 text-center">
                  {#if published}
                    <p>✅</p>
                  {:else}
                    <p>❌</p>
                  {/if}
                </td>
              </tr>
            </a>
            {/each}
          </tbody>
        </table>
      {/await}
    </div>
    <Button title="Delete Account" path="/auth/delete" class="mt-64" />
</main>
