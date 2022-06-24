<script>
	import TripPreference from "../components/TripPreference.svelte";
	import Form from "../components/Form.svelte";
	import Nav from "../components/Nav.svelte";
	import { onMount } from "svelte";

	onMount(()=>{
		localStorage.removeItem("tripLocation")
	})
	let theme;
	if(theme == "off"){
		theme = "Light Theme"
	}

	$: console.log(theme)

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

