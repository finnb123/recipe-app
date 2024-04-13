<script lang="ts">
  import type { ActionData } from "./$types";

  export let form: ActionData;
</script>

<div id="main" class=" bg-secondary p-12 flex justify-center items-center">
  <div id="content" class="w-3/4 bg-background p-12 py-16 rounded-xl">
    <form method="post" class="flex flex-col justify-center items-center">
      <h1 class="text-3xl text-headline pb-4">Create Draft</h1>
      {#if form?.missing}<p class="text-highlight">Missing field required!</p>{/if}
      <input
        class="w-full p-2 my-2 mx-0 border border-solid border-stroke rounded-md text-lg"
        name="title"
        placeholder="Title"
        type="text"
        value={form?.title ?? ""}
      />
      <textarea
        class="w-full p-2 my-2 mx-0 border border-solid border-stroke rounded-md text-lg"
        name="content"
        cols="50"
        placeholder="Content"
        rows="8"
        value={form?.content ?? ""}
      />
      <div class="flex flex-col pt-4 w-3/4">
        <button
          class="text-xl text-buttonText bg-button py-4 px-8 rounded-lg text-center"
          type="submit"
        >
          Create
        </button>
        <a class="mt-2 text-lg text-buttonText bg-button py-2 px-4 rounded-lg text-center" href="/"
          >Cancel
        </a>
      </div>
    </form>
  </div>
</div>
