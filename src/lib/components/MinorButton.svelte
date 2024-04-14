<script lang="ts">
    export let title:string;
    export let path:string;
</script>


<div class="flex items-center justify-center">
    <a href="{path}" class="contents">
        <div class="mt-2 text-lg text-buttonText bg-button py-2 px-4 rounded-lg text-center">
        <p class="text-buttonText text-lg">{title}</p>
        </div>
    </a>
</div>
