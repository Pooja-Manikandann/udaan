<script>
	import { onMount,afterUpdate } from "svelte";
	import Form from "../components/Form.svelte";
	import TripPreference from "../components/TripPreference.svelte";
	import Nav from "../components/Nav.svelte";
	// import Slider from '@bulatdashiev/svelte-slider';
	import Slider from "../components/Slider.svelte"


	import tripLocationStore from "../stores/tripLocationStore";
// import { afterUpdate } from "svelte/types/runtime/internal/lifecycle";

	let departure=[];
	let returnTime=[];
	let priceValue=[0,7000];
	let airline=[];

	let leftPrice = priceValue[0];
	let rightPrice = priceValue[1];

	$: console.log(leftPrice+" "+rightPrice)
	let result;
	let resultCopy;
	// {
	// 	airline: ["indigo","air asia"],
	// 	departure: ["morning","even"]

	// }\

	function clearFilter(){
		departure = [];
		returnTime = [];
		priceValue=[0,7000];
		airline=[];
		result = resultCopy
	}
	

	function getFiltered(data, filterCondition){
		// console
		console.log("called"+filterCondition)
		let length = Object.keys(filterCondition).length
		let result=[];
		let count=0;
		for(let i in data){
			count = 0;
			for(let key in filterCondition){
				if(key == "departure"){
					if(filterCondition[key].includes(data[i].departureTime)){
						count++;
					}
				}
				if(key == "arrival"){
					if(filterCondition[key].includes(data[i].arrivalTime)){
						count++;
					}
				}
				if(key == "airline"){
					console.log(filterCondition[key]+" "+data[i].airlines.name)
					if(filterCondition[key].includes(data[i].airlines.name)){
						count++;
						console.log("inside if of airline : "+count)
					}
				}
				if(key == "price"){
					console.log("inside")
					console.log(data[i].price+" "+priceValue[0]+" "+priceValue[1])
					if(data[i].price>priceValue[0] && data[i].price<=priceValue[1]){
						count++;
					}
				}
				// console.log(filterCondition.length)
				if(count == length){
					result.push(data[i])
				}
			}
		}
		return result;
	}


	if(airline.length!=0){

	}

	let searchPromise;

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

	onMount(()=>{
		let location = JSON.parse(localStorage.getItem("tripLocation"))
		tripLocationStore.set(location)
		
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
				result[i].arrival = (date.getHours()+":"+date.getMinutes())
				result[i].arrivalTime = getTimePeriod(date.getHours())
				
				dateDeparture = new Date(result[i].departure)
				result[i].departure = (dateDeparture.getHours()+":"+dateDeparture.getMinutes())
				result[i].departureTime = getTimePeriod(dateDeparture.getHours())
				var dif = Math.round((date - dateDeparture) / (1000 * 60))
				result[i].duration=Math.round(dif/60) +"h "+ dif%60+"m"
				// console.log(result[i])

			}
			result = result.filter(curentData => curentData.from.IATA_code == "CJB")
			resultCopy = result;
			return data;
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

		console.log(filterCondition)
		if(airline.length!=0 || departure.length!=0 || returnTime!=0 || priceValue[0]!=0 || priceValue[1]!=7000){

			result = getFiltered(resultCopy,filterCondition)
		}
		else{
			result = resultCopy
		}

		// for(let i in resultCopy){
		// 	if(airline.length!=0){
		// 		resultCopy[i].airline.name;
		// 	}
		// }


		let location = JSON.parse(localStorage.getItem("tripLocation"))
		tripLocationStore.set(location)
		// console.log("departure : "+departure)
		// console.log("airline : "+airline)
		// console.log("filter  data : ",filterData.length)
		
			// if(result.status){
			// 	return []
			// }
			// if(airline.length!=0){
			// 	console.log("airline")
			// 	if(filterData.length!=0){
			// 		for(let j in filterData){
			// 			if(airline.includes(filterData[j].airlines.name)){
			// 				console.log("inside airline if")
			// 				// console.log("inside airline")
			// 				if(!result.includes(filterData[j])){

			// 					result.push(filterData[j])
			// 				}
			// 			}
			// 		}
			// 		console.log("before assigning result filter data")
			// 		filterData = result;
			// 	}
			// 	else{

			// 		for(let j in resultCopy){
			// 			if(airline.includes(resultCopy[j].airlines.name)){
			// 				console.log("inside airline else")
			// 				filterData.push(resultCopy[j])
			// 			}
			// 		}
			// 		console.log("filter data inside vairline : ", filterData)
			// 		result = filterData
			// 	}
			// 	// return filterData;
			// }
			// console.log("filter data length : "+filterData.length)
			// if(departure.length!=0){
			// 	console.log("inside dept")
			// 	if(filterData.length!=0){
			// 		let tempfilterData=filterData;
			// 		let temp = [];
			// 		for(let j in tempfilterData){
			// 			console.log(j+" : th iteration"+filterData.length)
			// 			if(departure.includes(filterData[j].departureTime)){
			// 				console.log("inside depature if")
			// 				console.log("before : "+result.length+" "+filterData.length)
			// 				// if(!result.includes(tempfilterData[j])){
			// 					temp.push(tempfilterData[j])
			// 				// }
			// 				console.log("before : "+result.length+" "+filterData.length)
			// 			}
			// 		}
			// 		filterData = temp;
			// 		result = temp;
			// 	}
			// 	else{
			// 		for(let j in resultCopy){
			// 			console.log("inside depature else")
			// 			if(departure.includes(resultCopy[j].departureTime)){
			// 				filterData.push(resultCopy[j])
			// 			}
			// 		}
			// 		result = filterData
			// 	}
			// 	console.log("filter data inside departure : ", filterData)

			// }
			// if(returnTime.length!=0){
			// 	console.log("arrival")
			// }
			// if(airline.length==0 && departure.length==0 && returnTime.length==0){
			// 	console.log("inside else")
			// 	return result;
			// }

		// 	console.log("dept count "+departure.length)
		// 	console.log("dept count var "+departureCount)


		// 	if(departure.length > departureCount){
		// 		console.log("inside deparure")
		// 		departureCount = departure.length
		// 		if(previous.length==0){
		// 			current = "departure"
		// 			previous = "departure"
		// 		}
		// 		else{
		// 			previous = current
		// 			current = "departure";
		// 		}
		// 	}
		// 	else if(returnTime.length > returnCount){
		// 		returnCount = returnTime.length
		// 		if(previous.length==0){
		// 			current = "return"
		// 			previous = "return"
		// 		}
		// 		else{
		// 			previous = current;
		// 			current = "return";
		// 		}
		// 	}
		// 	else if(airline.length > airlineCount){
		// 		airlineCount = airline.length
		// 		if(previous.length==0){
		// 			current = "return"
		// 			previous = "return"
		// 		}
		// 		else{
		// 			previous = current;
		// 			current = "airline";
		// 		}
		// 	}

		// 	console.log(previous+" "+current)

		// 	if(current == previous){
		// 		getFiltered(result,current,)
		// 	}


		})


</script>

<style lang="scss">
	.searchContainer{
		background-color: #e4ebf3;
		.wrapper{
			width: 90%;
			margin-left: 50px;
			margin-top: 50px;
		}
	}

	.resultContainer{
		display: flex;
		flex-direction: row;
		.leftContainer{
			width: 22%;
			border: 1px solid black;
			.filterHeader{
				display: flex;
				justify-content: space-between;
				padding: 20px;
			}
		}
		.rightContainer{
			width: 77%;
			height: 100vh;
			overflow: scroll;
			border: 1px solid black;
		}
	}

	table{
		border: 1px solid black;
		width: 100%;
		th,td{
			width: 20%;
			border: 1px solid black;

		}
		td{
			padding: 10px;
		}
	}

	.airline{
		display: flex;
		align-items: center;
		gap: 10px;
		.logo{
			width: 30px;
			height: 30px;
			img{
				object-fit: cover;
			}
		}
	}
	.departure{
		padding: 0 20px;
		.departureCheckboxContainer{
			display: flex;
			flex-wrap: wrap;
			label{
				width: 50%;
			}
		}
	}

	.returnFilter{
		padding: 0 20px;
		.returnFilterContainer{
			display: flex;
			flex-wrap: wrap;
			label{
				width: 50%;
			}
		}
	}

	.price{
		text-align: center;
	}

	.airlineFilter{
		padding: 0 20px;
		.airlineFilterContainer{
			display: flex;
			flex-direction: column;
		}
	}

	.priceFilter{
		padding: 0 20px;
	}

	.reset{
		cursor: pointer;
	}


</style>


<div class="searchContainer">
	<Nav className="navSearch" />
	<div class="wrapper">
		<TripPreference />
		<Form className="searchForm" />
	</div>

	<div class="resultContainer">
		<div class="leftContainer">
			<div class="filterHeader">
				<span>Filters</span>
				<span class="reset" on:click="{clearFilter}">Reset all</span>
			</div>
			<div class="departure">
				<p>Departure</p>
				<div class="departureCheckboxContainer">
					<label for="">
						<input type="checkbox" name="departure" id="morning" value="morning" bind:group="{departure}"> Before 11am
					</label>
					<label for="">
						<input type="checkbox" name="departure" id="afternoon" value="afternoon" bind:group="{departure}"> 11am - 5pm
					</label>
					<label for="">
						<input type="checkbox" name="departure" id="evening" value="evening" bind:group="{departure}"> 5pm - 9pm
					</label>
					<label for="">
						<input type="checkbox" name="departure" id="night" value="night" bind:group="{departure}"> After 9pm
					</label>
				</div>
			</div>
			<div class="returnFilter">
				<p>Return</p>
				<div class="returnFilterContainer">
					<label for="">
						<input type="checkbox" name="return" id="morning" value="morning" bind:group="{returnTime}"> Before 11am
					</label>
					<label for="">
						<input type="checkbox" name="return" id="afternoon" value="afternoon" bind:group="{returnTime}"> 11am - 5pm
					</label>
					<label for="">
						<input type="checkbox" name="return" id="evening" value="evening" bind:group="{returnTime}"> 5pm - 9pm
					</label>
					<label for="">
						<input type="checkbox" name="return" id="night" value="night" bind:group="{returnTime}"> After 9pm
					</label>
				</div>
			</div>
			<div class="priceFilter">
				<p>Price</p>
				<Slider bind:value={priceValue}  />
			</div>
			<div class="airlineFilter">
				<p>Preferred Airline</p>
				<div class="airlineFilterContainer">
					<label for="">
						<input type="checkbox" name="airline" id="Indigo Airlines" value="Indigo" bind:group="{airline}"> Indigo Airlines
					</label>
					<label for="">
						<input type="checkbox" name="airline" id="Spicejet" value="Spicejet" bind:group="{airline}"> Spicejet
					</label>
					<label for="">
						<input type="checkbox" name="airline" id="Air India" value="Air India" bind:group="{airline}"> Air India
					</label>
					<label for="">
						<input type="checkbox" name="airline" id="AirAsia India" value="Air Asia" bind:group="{airline}"> AirAsia India
					</label>
				</div>
			</div>
		</div>
		<div class="rightContainer">
			<!-- {#await searchPromise}
				<p>loading....</p>
			{:then result} -->
			{#if result}
				<table>
					<tr>
						<th>Departure</th>
						<th>Duration</th>
						<th>Arrival</th>
						<th>Price</th>
						<th></th>
					</tr>
					{#each result as data}
						<tr>
							<td>
								<div class="airline">
									<div class="logo">
										<img src="{data.airlines.logo}" alt="logo">
									</div>
									<div class="airlineName">
										{data.airlines.name}
									</div>
								</div>
								<div class="city">
									{data.from.IATA_code}, {data.from.city_name}
								</div>
								<div class="departure">
									{data.departure}
								</div>
							</td>
							<td>{data.duration}</td>
							<td>{data.arrival}</td>
							<td class="price">{data.price}</td>
							<td><button>Book</button></td>
						</tr>
					{/each}
				</table>
				{:else}
				<p>empty</p>
			{/if}
				
			<!-- {/await} -->
		</div>

	</div>
</div>