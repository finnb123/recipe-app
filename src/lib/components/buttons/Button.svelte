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
    <div class=" w-full max-w-96 p-1 px-2 bg-button rounded-lg border border-stroke text-center">
      <!-- <a href="{path}" class="text-buttonText text-xl"> {title} </a> -->
      <p class="text-buttonText text-xl">{title}</p>
    </div>
  </a>
</div>
