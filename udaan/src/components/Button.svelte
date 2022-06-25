<script>
    export let label;
    export let className;
    export let id=''
    export let isButtonDisabled=false;
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
        color: #295589;
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
    .search:disabled,.searchFormButton:disabled{
        /* background-color: #476a94fb; */
        opacity: 0.4;
        cursor: not-allowed;
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
    .searchDark{
        background-color: #002237;
        color: #fff;
    }
    .searchFormDark{
        background-color: #002237;
        color: #fff;
    }
    .book{
        padding: 20px 40px;
        color: #fff;
        background-color: #295589;
        font-weight: 800;
        /* font-size: 12px; */
        border-radius: 5px;
    }
    .darkBook{
        background-color: #fff;
        color: #021724;
    }
    .darkTheme{
        background-color: #fff;
        color: #002237;
    }
    .darkTheme.selected{
        background-color: #002237;
        color: #fff;
        
    }
</style>


<button on:click id="{id}" class={className} disabled={isButtonDisabled}>{label}</button>
