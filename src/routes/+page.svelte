<script lang="ts">
  import type { PageData } from "./$types";
  import Post from "$lib/components/Post.svelte";
  import Loading from "$lib/components/Loading.svelte";

  export let data: PageData;
  let { feed } = data;
</script>

<main class="bg-secondary">
  {#await feed}
    <Loading />
  {:then feed}
    {#each feed as post (post.id)}
      <Post {post} />
      <div class="h-4"></div>
    {/each}
  {/await}
</main>
