<script lang="ts">
    interface Button{
        title: string;
        path: string;
    }
    export let button:Button;

    const {title, path} = button;
</script>


<div class="flex items-center justify-center">
    <div class=" w-32 mt-32 p-1 px-2 bg-button border border-stroke rounded-lg text-center">
    <a href="{path}" class="text-buttonText text-xl"> {title} </a>
    </div>
</div>