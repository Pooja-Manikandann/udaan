<script>
	import { afterUpdate, onMount } from 'svelte';
    import tripTypeStore from '../stores/tripTypeStore';
    import Button from "./Button.svelte"
	let oneWay = false;
	let round = false;

	onMount(() => {
		let x = sessionStorage.getItem("tripType") || ""
        if(x.length == 0){
            x = "oneWay"
            tripTypeStore.set(false)
        }
		x == 'oneWay' ? oneWay = true : round = true;
	});
	

	afterUpdate(()=>{
		if(oneWay){
            tripTypeStore.set(false)
			sessionStorage.setItem("tripType","oneWay")
		}
		if(round){
            tripTypeStore.set(true)
			sessionStorage.setItem("tripType","round")
		}
	})
	
	function toggleTrip(tripType){
		if(!tripType){
			oneWay = !oneWay;
			round = !round
		}
	}

</script>

<style>

</style>

<div class="tripPreferenceContainer">
    <Button on:click={toggleTrip(oneWay)} label="One - Way" className={oneWay ? "selected trip left oneway" : "trip left oneway"} />
    <Button on:click={toggleTrip(round)} label="Round Trip" className={round ? "selected trip right round" : "trip right round"} />
</div>