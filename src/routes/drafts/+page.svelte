<script lang="ts">
  import PostCard from "$lib/components/PostCard.svelte";
  // use prettier 👇
  import type { PageData } from "./$types";
  import MinorButton from "$lib/components/buttons/MinorButton.svelte";

  export let data: PageData;
</script>

<div class="bg-secondary">
  <h1 class="text-3xl text-center text-headline">Recipe Drafts</h1>
  <main>
    <div class="text-lg text-center mt-6">
      <!-- <a
        href="/create"
        class="p-2 px-4 bg-button text-buttonText rounded-md hover:shadow-md text-xl"
      >
        Create new recipe
      </a> -->
      <MinorButton title="Create new recipe" path="/create" class="" />
    </div>
    <div>
      {#each data.drafts as post (post.id)}
        <PostCard {post} />
      {/each}
    </div>
  </main>
</div>
