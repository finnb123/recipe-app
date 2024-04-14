<script lang="ts">
  import type { PageData } from "./$types";
  import Post from "$lib/components/Post.svelte";
  
  export let data: PageData;
  let {feed} = data;
</script>

<main class="bg-secondary">
  {#await feed}
  <div class="h-screen flex items-center justify-center">
      <div class="bg-background rounded-lg p-4 mb-64">
        <p class="text-4xl text-headline">
          ...loading
        </p>
      </div>
  </div>
  {:then feed}
    {#each feed as post (post.id)}
      <Post {post}/>
      <div class="h-4"></div>
    {/each}
  {/await}
</main>
