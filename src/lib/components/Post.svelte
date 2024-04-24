<script lang="ts">
  interface Post {
    content: string | null;
    title: string;
    id: number;
    author: {
      username: string;
    } | null;
  }
  export let post: Post;
  $: ({ content, title } = post);
</script>

<!-- <div class="flex flex-col w-full rounded-xl bg-background py-12"> -->
<h2 class="my-0 mx-auto text-center text-3xl text-headline">
  {title}
</h2>
<p class="my-0 mx-auto mt-4 text-center text-paragraph text-xl">
  {post.author?.username ? `Author: ${post.author.username}` : "Unknown author"}
</p>
<div class=" w-3/4 my-0 mx-auto text-left pt-4 pb-8 p-3/20 text-lg">
  <p class="text-paragraph whitespace-pre-wrap">{content}</p>
</div>
<!-- </div> -->
