<script lang="ts">
  import type { HTMLButtonAttributes } from "svelte/elements";

  export let title: string;
  export let path: string;
  interface $$Props extends HTMLButtonAttributes {
    title: string;
    path: string;
  }
</script>

<div {...$$restProps} class="flex items-center justify-center {$$props.class}">
  <a href={path} class="contents">
    <div class="w-full max-w-96 py-4 px-8 bg-button rounded-lg text-center">
      <p class="text-buttonText text-lg">{title}</p>
    </div>
  </a>
</div>
