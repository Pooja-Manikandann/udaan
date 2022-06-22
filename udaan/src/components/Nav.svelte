<script>
	export let className='';
	import { afterUpdate } from 'svelte';
	import themeStore from "../stores/themeStore"

	import Switch from './Switch.svelte'
	

	let multiValue;

	afterUpdate(()=>{
		// console.log('after update '+multiValue)
		themeStore.set(multiValue);
	})

	// $: console.log('theme store : '+$themeStore)

</script>

<style lang="scss">
	nav{
		.navSearch{
			background-color: #295589;
			margin: 0;
			padding: 20px 50px;
		}
	}

	ul{
		display: flex;
		align-items: center;
		justify-content: space-between;
		li{
			list-style-type: none;
		}
		.switch{
			color: #fff;
			margin-right: 30px;
		}
	}
	
</style>

<nav>
	<ul class={className}>
		<li><a href="."><img src="logo.svg" alt="logo"></a></li>
		<li><a href="/search">Search</a></li>
		<li class="switch">
			<Switch bind:value={multiValue} label="" design="multi" options={['Light Theme', 'Dark Theme']} fontSize={12}/>
		</li>
	</ul>
</nav>
