<script>
    export let label;
    export let className;
    export let id=''
</script>

<style>
    .trip{
		width: 200px;
		height: 60px;
		border: none;
		cursor: pointer;
        font-size: 18px;
        font-weight: 600;
        letter-spacing: 1px;
        background-color: #fff;
	}
	.left{
		border-radius: 10px 0 0 10px;

	}
	.right{
		border-radius: 0 10px 10px 0;
		margin: -4px;
	}

	.selected{
		background-color: #295589;
		color: #fff;
	}
    .search{
        width: 22%;
        height: 80px;
        margin-top: 40px;
        border: none;
        border-radius: 5px;
        font-size: 18px;
        background-color: #295589;
        color: #fff;
        font-weight: 600;
    }
    .searchFormButton{
        width: 22%;
        height: 80px;
        border: none;
        border-radius: 5px;
        font-size: 18px;
        background-color: #295589;
        color: #fff;
        font-weight: 600;
        margin-left: 70px;
    }
    .book{
        padding: 20px 40px;
        color: #fff;
        background-color: #295589;
    }
    .darkTheme{
        background-color: #fff;
        color: #021724;
    }
    .darkTheme.selected{
        background-color: #021724;
        color: #fff;
        
    }
</style>

<!-- {#if theme == "darkTheme"} -->
    <button on:click id="{id}" class={className}>{label}</button>
    <!-- {:else}
    <button on:click id="{id}" class={`${className} darkTheme`}>{label}</button>
    
{/if} -->