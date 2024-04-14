<script lang="ts">
    interface Button{
        title: string;
        path: string;
    }
    export let title:string;
    export let path:string;
</script>


<div class="flex items-center justify-center">
    <a href="{path}" class="contents">
        <div class=" w-32 mt-32 p-1 px-2 bg-button border border-stroke rounded-lg text-center">
        <!-- <a href="{path}" class="text-buttonText text-xl"> {title} </a> -->
        <p class="text-buttonText text-xl">{title}</p>
        </div>
    </a>
</div>
<!-- 
<div class="bg-secondary group">
  <a href="/p/{id}" class="contents">
    <div
      role="listitem"
      class="container bg-background p-8 w-3/5 h-60 m-auto mt-8 hover:shadow-xl border-solid border-2 border-stroke overflow-hidden rounded-md"
    >
      <h2 class="text-3xl mb-2 text-headline group-hover:text-highlight transition-all">{title}</h2>
      <small class="text-xl text-paragraph"
        >{post.author?.username ? `By ${post.author.username}` : "Unknown author"}</small
      >
      <p class="text-md text-paragraph whitespace-pre-wrap">{content}</p>
    </div>
  </a>
</div> -->