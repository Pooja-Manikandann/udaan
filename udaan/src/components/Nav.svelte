<script>
import { afterUpdate } from 'svelte';

	import Switch from './Switch.svelte'
	

	let multiValue;

	afterUpdate(()=>{
		console.log('after update '+multiValue)
	})

</script>

<style lang="scss">
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
	<ul>
		<li><a href="."><img src="logo.svg" alt="logo"></a></li>
		<li class="switch">
			<Switch bind:value={multiValue} label="" design="multi" options={['Dark Theme', 'Light Theme']} fontSize={12}/>
		</li>
	</ul>
</nav>
