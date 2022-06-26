<script>
    export let theme;
	import { afterUpdate, onMount } from 'svelte';
    import tripTypeStore from '../stores/tripTypeStore';
    import Button from "./Button.svelte"
	import CONSTANTS from "../constants/constants"
	let oneWay = false;
	let round = false;

	onMount(() => {
		let x = sessionStorage.getItem(CONSTANTS.TRIP_TYPE.LABEL) || ""
        if(x.length == 0){
            x = CONSTANTS.TRIP_TYPE.ONE_WAY
            tripTypeStore.set(false)
        }
		x == CONSTANTS.TRIP_TYPE.ONE_WAY ? oneWay = true : round = true;
	});
	

	afterUpdate(()=>{
		if(oneWay){
            tripTypeStore.set(false)
			sessionStorage.setItem(CONSTANTS.TRIP_TYPE.LABEL,CONSTANTS.TRIP_TYPE.ONE_WAY)
		}
		if(round){
            tripTypeStore.set(true)
			sessionStorage.setItem(CONSTANTS.TRIP_TYPE.LABEL,CONSTANTS.TRIP_TYPE.ROUND)
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
	{#if (theme) == "off"}
	<Button on:click={toggleTrip(oneWay)}  label="One - Way" className={oneWay ? CONSTANTS.TRIP_TYPE.ONE_WAY_SELECTED_CLASS : CONSTANTS.TRIP_TYPE.ONE_WAY_CLASS} />
	<Button on:click={toggleTrip(round)}  label="Round Trip" className={round ? CONSTANTS.TRIP_TYPE.ROUND_SELECTED_CLASS : CONSTANTS.TRIP_TYPE.ROUND_CLASS} />
	{:else}
    {#if theme=="Light Theme"}
	<Button on:click={toggleTrip(oneWay)}  label="One - Way" className={oneWay ? CONSTANTS.TRIP_TYPE.ONE_WAY_SELECTED_CLASS : CONSTANTS.TRIP_TYPE.ONE_WAY_CLASS} />
	<Button on:click={toggleTrip(round)}  label="Round Trip" className={round ? CONSTANTS.TRIP_TYPE.ROUND_SELECTED_CLASS : CONSTANTS.TRIP_TYPE.ROUND_CLASS} />
        {:else}
        <Button on:click={toggleTrip(oneWay)}  label="One - Way" className={oneWay? CONSTANTS.TRIP_TYPE.ONE_WAY_DARK_SELECTED_CLASS : CONSTANTS.TRIP_TYPE.ONE_WAY_DARK_CLASS} />
        <Button on:click={toggleTrip(round)}  label="Round Trip" className={round ? CONSTANTS.TRIP_TYPE.ROUND_DARK_SELECTED_CLASS : CONSTANTS.TRIP_TYPE.ROUND_DARK_CLASS} />
    {/if}
	{/if}
</div>