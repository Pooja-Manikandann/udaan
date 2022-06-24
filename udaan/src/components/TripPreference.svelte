<script>
    export let theme;
	import { afterUpdate, onMount } from 'svelte';
    import tripTypeStore from '../stores/tripTypeStore';
    import Button from "./Button.svelte"
	import {TRIP_TYPE} from "../constants/constants"
	let oneWay = false;
	let round = false;

	

	onMount(() => {
		let x = sessionStorage.getItem("tripType") || ""
        console.log("x : "+x)
        if(x.length == 0){
            x = "oneWay"
            tripTypeStore.set(false)
        }
		x == 'oneWay' ? oneWay = true : round = true;
		 console.log(typeof(theme)=="undefined")
	});
	

	afterUpdate(()=>{
        console.log(oneWay+" "+round)
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
	<!-- {typeof(theme)} -->
	{#if (theme) == "off"}
	<Button on:click={toggleTrip(oneWay)}  label="One - Way" className={oneWay ? "selected trip left oneway" : "trip left oneway"} />
	<Button on:click={toggleTrip(round)}  label="Round Trip" className={round ? "selected trip right round" : "trip right round"} />
	{:else}
    {#if theme=="Light Theme"}
        <Button on:click={toggleTrip(oneWay)}  label="One - Way" className={oneWay ? "selected trip left oneway" : "trip left oneway"} />
        <Button on:click={toggleTrip(round)}  label="Round Trip" className={round ? "selected trip right round" : "trip right round"} />
        {:else}
        <Button on:click={toggleTrip(oneWay)}  label="One - Way" className={oneWay ? "selected darkTheme trip left oneway" : "darkTheme trip left oneway"} />
        <Button on:click={toggleTrip(round)}  label="Round Trip" className={round ? "selected darkTheme trip right round" : "darkTheme trip right round"} />
    {/if}
	{/if}
</div>