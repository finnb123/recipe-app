<script lang="ts">
  import Post from "$lib/components/Post.svelte";
  // use prettier 👇
  import type { PageData } from "./$types";

  export let data: PageData;
</script>

<div>
  <h1 class="text-3xl text-center text-headline">Recipe Drafts</h1>
  <main>
    <div class="text-lg text-center mt-6">
      <a
        href="/create"
        class="p-2 px-4 bg-button text-buttonText rounded-md hover:shadow-md text-xl"
      >
        Create new recipe
      </a>
    </div>
    <div>
      {#each data.drafts as post (post.id)}
        <Post {post} />
      {/each}
    </div>
  </main>
</div>
