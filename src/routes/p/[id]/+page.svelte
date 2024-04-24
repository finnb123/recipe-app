<script lang="ts">
  import type { PageData } from "./$types";
  import Post from "$lib/components/Post.svelte";
  import FormButton from "$lib/components/buttons/FormButton.svelte";
  import Button from "$lib/components/buttons/Button.svelte";

  export let data: PageData;
  $: ({ post, userId } = data);
  let editPost = false;
</script>

<div class="flex flex-col items-center justify-center bg-secondary basis-3/4">
  <div class="w-3/4 h-3/4 rounded-xl bg-background py-12">
    {#if editPost}
      <form method="post" class="flex flex-col justify-center items-center">
        <h1 class="text-3xl text-headline pb-4">Edit Post</h1>
        <input
          class="w-full p-2 my-2 mx-0 border border-solid border-stroke rounded-md text-lg"
          name="title"
          placeholder={post.title}
          type="text"
          value={post.title ?? ""}
        />

        <FormButton title="Save Changes" action="updatePost" />
      </form>
    {:else}
      <Post {post} />
    {/if}
  </div>

  <div class="my-0 mx-auto mt-12 mb-8 text-center">
    <form method="post" class="actions">
      {#if !post.published}
        <FormButton title="Publish" action="publishPost" />
      {/if}
      {#if post.author?.id === userId}
        <FormButton title="Delete" action="deletePost" />
        <button
          class="w-40 p-2 rounded-lg bg-button text-buttonText text-2xl peer-last:ml-8"
          type="button"
          on:click={() => (editPost = !editPost)}
        >
          Edit Post
        </button>
        <p>{editPost}</p>
      {/if}
    </form>
  </div>
</div>
