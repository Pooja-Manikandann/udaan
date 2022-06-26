<script>
	export let className='';
	import { afterUpdate } from 'svelte';
	import themeStore from "../stores/themeStore"
	import CONSTANTS from '../constants/constants';

	import Switch from './Switch.svelte'
	

	export let multiValue;

	if(multiValue == "off"){
		multiValue = CONSTANTS.THEME.LIGHT_THEME
	}

	afterUpdate(()=>{

		let x = sessionStorage.getItem("theme") || ""
		
		if(x.length==0){
			multiValue = CONSTANTS.THEME.LIGHT_THEME
			sessionStorage.setItem("theme",CONSTANTS.THEME.LIGHT_THEME)
		}
		else{

			if(typeof(multiValue)=="undefined"){
				multiValue = x;
				sessionStorage.setItem("theme",x)
			}
			else if(x!=multiValue){
				sessionStorage.setItem("theme",multiValue)
			}
		}

		themeStore.set(multiValue);
	})
</script>

<style lang="scss">
	nav{
		.navSearch{
			background-color: #295589;
			margin: 0;
			padding: 20px 50px;
		}
		.navDarkSearch{
			background-color: #002237;
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
		<li class="switch">
			<Switch bind:value={multiValue} label="" design="multi" options={[CONSTANTS.THEME.DARK_THEME, CONSTANTS.THEME.LIGHT_THEME]} fontSize={12}/>
		</li>
	</ul>
</nav>
