<script lang="ts">
  import type { PageData } from "./$types";
  import Post from "$lib/components/Post.svelte";

  export let data: PageData;
</script>

<main>
  <div class="]">
    {#each data.feed as post (post.id)}
      <Post {post} />
      <div class="h-4 bg-secondary"></div>
    {/each}
    <!-- use a code formatter like prettier -->
  </div>
</main>
