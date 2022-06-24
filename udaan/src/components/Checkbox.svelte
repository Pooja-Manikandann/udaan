<script>
    export let name;
    export let id;

    export let value=[]
    // $: console.log(value)
</script>

<style>
    label{
        width: 50%;
    }
</style>

{#each id as c}
    <label>
        <input type="checkbox" name="{name}" id="{c.id}" value="{c.id}" bind:group={value}>{c.label}
    </label>
{/each}