<script lang="ts">
  export let title: string;
  export let action: string;
</script>

<button
  class="w-40 p-2 rounded-lg bg-button text-buttonText text-2xl peer-last:ml-8"
  formaction="?/{action}"
>
  {title}
</button>
