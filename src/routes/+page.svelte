<script lang="ts">
  import type { PageData } from "./$types";
  import PostCard from "$lib/components/PostCard.svelte";
  import Loading from "$lib/components/Loading.svelte";

  export let data: PageData;
  const { feed } = data;
</script>

<main class="bg-secondary">
  {#await feed}
    <Loading />
  {:then loaded}
    {#each loaded as post (post.id)}
      <PostCard {post} />
      <div class="h-4"></div>
    {/each}
  {/await}
</main>
