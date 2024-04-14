<script lang="ts">
  import type { PageData } from "./$types";
  import FormButton from "$lib/components/buttons/FormButton.svelte";

  export let data: PageData;
  $: ({ post, userId } = data);
</script>

<div class="flex flex-col items-center justify-center">
  <div class="flex flex-col w-3/4 rounded-xl bg-background py-12">
    <h2 class="my-0 mx-auto text-center text-3xl text-headline">
      {post.title}
    </h2>
    <p class="my-0 mx-auto mt-4 text-center text-paragraph text-xl">
      {post.author?.username ? `Author: ${post.author.username}` : "Unknown author"}
    </p>
    <div class=" w-3/4 my-0 mx-auto text-left pt-4 pb-8 p-3/20 text-lg">
      <p class="text-paragraph whitespace-pre-wrap">{post.content}</p>
    </div>
  </div>
  <div class="my-0 mx-auto mt-12 mb-8 text-center">
    <form method="post" class="actions">
      {#if !post.published}
        <FormButton title="Publish" action="publishPost"/>
      {/if}
      {#if post.author?.id === userId}
        <FormButton title="Delete" action="deletePost"/>
      {/if}
    </form>
  </div>
</div>

