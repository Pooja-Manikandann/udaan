
<!-- <script type="module" src="flight.js">
	import flight from "../stores/flights"

</script> -->
<script>
	import { onMount,afterUpdate } from "svelte";
	import Form from "../components/Form.svelte";
	import TripPreference from "../components/TripPreference.svelte";
	import Nav from "../components/Nav.svelte";
	import {getFiltered} from "../helpers/filter"
	import tripLocationStore from "../stores/tripLocationStore";
	import Filter from "../components/Filter.svelte";
	import FlightResults from "../components/FlightResults.svelte";
	import store from "../stores/flights"

	const getFlight = store.retrieveFlights()

	let departure=[];
	let returnTime=[];
	let priceValue=[0,7000];
	let airline=[];

	let result;
	let resultCopy;

	console.log($getFlight);

	function getTimePeriod(hours){
		if(hours<11){
			return "morning"
		}
		else if(hours>=11 && hours<17){
			return "afternoon"
		}
		else if(hours>=17 && hours<21){
			return "evening"
		}
		else if(hours>=21){
			return "night"
		}
	}

	let location;

	onMount(()=>{
		location = JSON.parse(localStorage.getItem("tripLocation"))
		tripLocationStore.set(location)
		console.log("location in searcg",location)
		
		searchPromise = fetch("https://run.mocky.io/v3/6229c6e5-4d44-4d1b-8060-78a5160e13f6",{
		})
		.then(data => {
			return data.json();
		})
		.then(data=>{
			if(data.status){
				return []
			}
			result = data;
			let date;
			let dateDeparture;
			for(let i in result){
				date = new Date(result[i].arrival)
				// departureDate = date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear();
				// console.log(dateDeparture)
				result[i].arrival = (date.getHours()+":"+date.getMinutes())
				result[i].arrivalTime = getTimePeriod(date.getHours())
				
				dateDeparture = new Date(result[i].departure)
				let departureDate = dateDeparture.getDate()+"/"+(dateDeparture.getMonth()+1)+"/"+dateDeparture.getFullYear();
				result[i].departure = (dateDeparture.getHours()+":"+dateDeparture.getMinutes())
				result[i].departureTime = getTimePeriod(dateDeparture.getHours())
				result[i].departureDate = departureDate;
				var dif = Math.round((date - dateDeparture) / (1000 * 60))
				result[i].duration=Math.round(dif/60) +"h "+ dif%60+"m"
			}
			result = result.filter(curentData => curentData.from.IATA_code == location.from && curentData.to.IATA_code == location.to)
			resultCopy = [...result];
			store.add(result)
			// return data;
		})
		.catch(err=>{
			console.log(err)
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

	.resultContainer{
		display: flex;
		flex-direction: row;
		background-color: #fff;
		padding: 0 4rem;
	}
</style>

<div class="searchContainer">
	<Nav className="navSearch" />
	<div class="wrapper">
		<TripPreference />
		<Form className="searchForm" location={location} />
	</div>

	<div class="resultContainer">
		<Filter 
			bind:departure={departure} 
			bind:returnTime={returnTime} 
			bind:priceValue={priceValue} 
			bind:airline={airline}
		/>
		{#if result}
			<FlightResults result={result} />
			{:else}
			<p>empty</p>
		{/if}

	</div>
</div>