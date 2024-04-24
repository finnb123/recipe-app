<script lang="ts">
  interface Post {
    content: string | null;
    title: string;
    id: number;
  }
  export let post: Post;
  $: ({ content, title, id } = post);
</script>

<div class="bg-secondary group">
  <a href="/p/{id}" class="contents">
    <div
      role="listitem"
      class="container bg-background p-8 w-3/5 h-60 m-auto mt-8 hover:shadow-xl border-solid border-2 border-stroke overflow-hidden rounded-md"
    >
      <h2 class="text-3xl mb-2 text-headline group-hover:text-highlight transition-all">{title}</h2>
      <!-- <small class="text-xl text-paragraph"
        >{post.author?.username ? `By ${post.author.username}` : "Unknown author"}</small
      > -->
      <p class="text-md text-paragraph whitespace-pre-wrap">{content}</p>
    </div>
  </a>
</div>
