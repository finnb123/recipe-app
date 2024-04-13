<script lang="ts">
  import type { PageData } from "./$types";

  export let data: PageData;
  // don't do it this way. pageload data
  // can change during runtime and this destructure
  // will still point to the old data
  // const { post, userId } = data;
  // instead, do this
  $: ({ post, userId } = data);
</script>

<div>
  <!-- 
    a cleaner way to do this is having a +error.svelte that displays
    the error message instead of an if. just throw in the pageserverload
    function and let +error handle
   -->
  {#if post}
    <main class="flex flex-col items-center justify-center">
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
            <button
              class="w-40 p-2 rounded bg-button text-buttonText text-2xl"
              formaction="?/publishPost">Publish</button
            >
          {/if}
          {#if post.author?.id === userId}
            <button
              class="w-40 p-2 rounded bg-button text-buttonText text-2xl peer-last:ml-8"
              formaction="?/deletePost">Delete</button
            >
          {/if}
        </form>
      </div>
    </main>
  {:else}
    <div class="flex items-center justify-center">
      <h1 class="text-4xl text-headline text-center p-4 rounded-xl bg-background mt-16">
        No such post
      </h1>
    </div>
  {/if}
</div>
