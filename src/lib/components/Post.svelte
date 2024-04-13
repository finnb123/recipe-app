<script lang="ts">
  import { goto } from "$app/navigation";
  // incorrect type!!! never use PageData in a component
  // try to use a more specific type
  import type { PageData } from "./$types";
  // i have no idea why this is here but it shouldn't.
  // only import global CSS in the root level +layout.svelte
  import "../../app.pcss";

  export let post: PageData;
  $: ({ content, title, id } = post);
  // $: truncated_content = content.substring(0, 500) + "...";
</script>

<!-- if you have to ignore the linter, youre probably doing some supersized weird shit -->
<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<div class="bg-secondary">
  <a href="/p/{id}" class="contents">
    <div
      role="listitem"
      class="container bg-background p-8 w-3/5 h-60 m-auto mt-8 hover:shadow-xl border-solid border-2 border-stroke overflow-hidden rounded-md"
    >
      <h2 class="text-3xl mb-2 text-headline">{title}</h2>
      <small class="text-xl text-paragraph"
        >{post.author?.username ? `By ${post.author.username}` : "Unknown author"}</small
      >
      <p class="text-md text-paragraph whitespace-pre-wrap">{content}</p>
    </div>
  </a>
</div>
