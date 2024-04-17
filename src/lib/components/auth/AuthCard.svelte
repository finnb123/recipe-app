<script lang="ts">
  import { enhance } from "$app/forms";
</script>

<div
  {...$$restProps}
  class="w-full w-max-36 p-12 rounded-lg flex items-center justify-center {$$props.class}"
>
  <div class="bg-background p-12 py-16 rounded-lg items-center justify-center">
    <form class="rounded-lg" method="post" use:enhance>
      <slot>Fallback content</slot>
    </form>
  </div>
</div>
