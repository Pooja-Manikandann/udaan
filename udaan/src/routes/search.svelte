<script>
	import { onMount,afterUpdate } from "svelte";
	import Form from "../components/FlightTravelForm.svelte";
	import TripPreference from "../components/TripPreference.svelte";
	import Nav from "../components/Nav.svelte";
	import {getFiltered} from "../helpers/filter"
	import tripLocationStore from "../stores/tripLocationStore";
	import Filter from "../components/Filter.svelte";
	import FlightResults from "../components/FlightResults.svelte";
	import store from "../stores/flights"
	import CONSTANTS from "../constants/constants"
	// import CONSTANTS from "../constants/constants"
	import {ISODateFormat} from "../helpers/date"
	import Loader from "../components/loader.svelte";

	const getFlight = store.retrieveFlights()
	let theme;

	let departure=[];
	let returnTime=[];
	let priceValue=[0,7000];
	let airline=[];

	let result;
	let resultCopy;
	let location;

	onMount(()=>{
		location = JSON.parse(localStorage.getItem("tripLocation"))
		tripLocationStore.set(location)
		
		fetch(CONSTANTS.API_URLS.FLIGHTS)
		.then(data => {
			return data.json();
		})
		.then(data=>{
			if(data.status){
				return []
			}
			result = data;
			for(let i of result){
				i = ISODateFormat(i)
				
			}
			result = result.filter(curentData => curentData.from.IATA_code == location.from && curentData.to.IATA_code == location.to)
			resultCopy = [...result];
			store.add(result)
		})
		.catch(err=>{
			console.log("error : "+err)
			if(err=="TypeError: Failed to fetch"){
				result=[];
			}
			if(err=="TypeError: Cannot read properties of null (reading 'from')"){
				alert("choose from and destination")
				window.location.href = "./"
			}
			result=[];
			resultCopy = [];
		})
		
	})

	afterUpdate(()=>{

		let filterCondition={};

		if(airline.length!=0){
			filterCondition.airline = airline;
		}
		if(departure.length!=0){
			filterCondition.departure = departure;
		}
		if(returnTime!=0){
			filterCondition.arrival = returnTime;
		}
		if(priceValue[0]!=0 || priceValue[1]!=7000){
			filterCondition.price = priceValue
		}
		if(airline.length!=0 || departure.length!=0 || returnTime!=0 || priceValue[0]!=0 || priceValue[1]!=7000){

			result = getFiltered(resultCopy,filterCondition)
		}
		else{
			result = resultCopy
		}
		let location = JSON.parse(localStorage.getItem("tripLocation"))
		tripLocationStore.set(location)
		})
</script>

<style lang="scss">
	.searchContainer{
		background-color: #e4ebf3;
		.wrapper{
			padding: 2rem;
			width: 95%;
			/* margin-left: 50px; */
			margin: 0 auto;
			margin-top: 30px;
		}
	}
	.searchDarkContainer{
		background-color: #021724;
	}

	.resultContainer{
		display: flex;
		flex-direction: row;
		background-color: #fff;
		// padding-right: 4rem;
	}
	.load{
		text-align: center;
		font-size: 25px;
		display: block;
		margin: 20px auto;
	}
</style>

<div class={theme=="Dark Theme"?"searchDarkContainer searchContainer":"searchContainer"}>
	<Nav className={theme=="Dark Theme"? "navDarkSearch":"navSearch"} bind:multiValue={theme} />
	<div class="wrapper">
		<TripPreference theme={theme} />
		<Form theme={theme} className="searchForm" location={location} />
	</div>

	<div class="resultContainer">
		<Filter 
			theme={theme}
			bind:departure={departure} 
			bind:returnTime={returnTime} 
			bind:priceValue={priceValue} 
			bind:airline={airline}
		/>
		{#if typeof(result)=="object"}
			{#if result.length!=0}
				
				<FlightResults theme={theme} result={result} />
				{:else}
				<p class="load">
					<img src="https://c.tenor.com/unvXyxtdn3oAAAAC/no-result.gif" width="500" alt="no results found">
				</p>
			{/if}
			{:else}
			
			<p class="load"><Loader /></p>
		{/if}

	</div>
</div>