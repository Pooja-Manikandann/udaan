<script>
	import TripPreference from "../components/TripPreference.svelte";
	import Form from "../components/FlightTravelForm.svelte";
	import Nav from "../components/Nav.svelte";
	import CONSTANTS from "../constants/constants"
	import { afterUpdate, onMount } from "svelte";

	let theme;

	onMount(()=>{

		localStorage.removeItem("tripLocation")
		let x = sessionStorage.getItem("theme") || ""
			theme = x;
		// }
	})

	afterUpdate(()=>{
		if(theme == "off"){
			theme = CONSTANTS.THEME.LIGHT_THEME
			sessionStorage.setItem("theme",CONSTANTS.THEME.LIGHT_THEME)
		}
		if(sessionStorage.getItem("theme")!=theme){
			sessionStorage.setItem("theme",theme)
		}

		theme = sessionStorage.getItem("theme")
	})
	
	

</script>


<style lang="scss">
	.container{
		width: 100%;
		height: 100vh;
		background-image: url('../image.png');
		background-repeat: no-repeat;
		background-size: 100% 100%;
		overflow: hidden;
		.wrapper{
			width: 65%;
			margin-left: 150px;
			margin-top: 30vh;
		}
	}

</style>

<div class="container">
	<Nav bind:multiValue={theme}/>
	<div class="wrapper">
		<TripPreference theme={theme} />
		<Form  theme={theme}/>	
	</div>
</div>

