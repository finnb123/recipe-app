<script lang="ts">
    import type {HTMLButtonAttributes} from "svelte/elements";
    export let title:string;
    export let path:string;
    interface $$Props extends HTMLButtonAttributes {
      title: string;
      path: string;
    }
</script>
<!-- 
<a href="{path}" class="contents">
    <div class="flex items-center justify-center bg-button mt-2 py-2 px-4  rounded-lg {$$props.class}">
        
            <div class="text-lg text-buttonText rounded-lg text-center">
                <p class="text-buttonText text-lg">{title}</p>
            </div>

    </div>
</a> -->

<div {...$$restProps} class="flex items-center justify-center {$$props.class}">
    <a href="{path}" class="contents">
        <div class="w-full max-w-96 py-4 px-8 bg-button rounded-lg text-center">
            <p class="text-buttonText text-lg">{title}</p>
        </div>
    </a>
</div>

<!-- <button
  class="text-xl text-buttonText bg-button py-4 px-8 rounded-lg text-center"
  type="submit"
>
  Create
</button> -->