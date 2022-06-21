<script>
    // export let tripType;
    import tripTypeStore from "../stores/tripTypeStore";
	import { onMount } from "svelte";
    import Button from "./Button.svelte"
	// import CircularProgress from '@smui/circular-progress';
	// import Demo from '$lib/Demo.svelte';
	import CircularProgress from '@smui/circular-progress';
	// import  SnackbarComponentDev from '@smui/snackbar';
	// import Snackbar, { Actions, Label } from '@smui/snackbar';
	// import Button from '@smui/button';
	// import IconButton from '@smui/icon-button';
   
	// let snackbarWithClose: SnackbarComponentDev;
	// let snackbarWithoutClose: SnackbarComponentDev;
	
	// let snackbarWithClose= SnackbarComponentDev;
	// let snackbarWithoutClose= SnackbarComponentDev;

    // console.log('form '+tripType)

    // $: console.log('store in form '+$tripTypeStore)

	let from;
	let destination;
	let departureDate;
	let returnDate;
	let getCities;
	let tripTypeFlag;

	

    if($tripTypeStore == "round"){
        tripTypeFlag = true;
    }
    else{
        tripTypeFlag = false;
    }
	onMount(()=>{
		getCities =  fetch("https://api.jsonbin.io/b/610c2c91f098011544abe18f")
		.then((res)=>{
			if(res.status == 200){
				return res.json();
			}
			return res;
		})
		.then(data=>{
			if(data.status){
				return []
			}
			return data;
		})
		.catch(err=>{
			console.log(err)
			return err;
		})
	})

	function handleSubmit(e){
        e.preventDefault();
		if(from == "from" || destination == "destination"){
			alert("choose starting and destination points")
            // return;
		}
		if(from === destination){
			alert("choose differnt starting and destination points")
		}
        if($tripTypeStore){
            if(departureDate == undefined || returnDate == undefined){
                alert("choose departure and return dates")
            }
        }
        else{
            if(departureDate == undefined){
                alert("choose departure date")
            }
        }
        const date = new Date();
        const depDate = new Date(departureDate)
        if(date>depDate){
            alert("choose date greater than current date")
        }
        // console.log(date+" "+departureDate)
        window.location.href = "/blog"
	}

    function swap(){
        if(from !== "from" && destination !== "destination"){
            let temp = from;
            from = destination;
            destination = temp;
        }
    }

</script>


<style lang="scss">

    .formContainer{
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        margin-top: 40px;
        form{
            width: 100%;
            position: relative;
            .swapContainer{
                display: flex;
                justify-content: center;
                align-items: center;
                width: 40px;
                height: 40px;
                border-radius: 50%;
                background-color: #295589;
                position: absolute;
                top: 20px;
                left: calc(104%/4);
                cursor: pointer;
                ion-icon{
                    font-size: 25px;
                    color: #fff;
                }
            }
        }
        

    }
    table,td,tr{
        border-collapse:collapse;

        /* border: 1px solid black; */

    }
    table{
        width: 100%;
        tr{
            height: 80px;
        }
        .place{
            width: 25%;
        }
        .date{
            width: 20%;
        }
        td{
            border-right: 2px solid #a9a2a2;
        }
    }

    select{
        width: 100%;
    }
    select, input{
        // width: 100%;
        color: #295589;
        height: 80px;
        border: none;
        padding: 0 25px;
        font-size: 18px;
        font-weight: 600;
    }

    input{
        font-size: 20px;
        // width: 81%;
        width: 100%;
    }

	[type="text"] {
        color: #295589;
        // width: 100%;
		background:#fff url("../calender.png")  87% 53% no-repeat;
        background-size: 30px;
	}
	[type="text"]::-webkit-inner-spin-button {
		display: none;
	}
	[type="text"]::-webkit-calendar-picker-indicator {
		opacity: 0;
	}

    .from{
        select{
            border-radius: 10px 0 0 10px;
        }

    }

    .return{
        border: none;
        input{
            border-radius: 0 10px 10px 0;
        }
    }
    ::placeholder {
        color: #295589;
    }
    
</style>

<div class="formContainer">

	{#if getCities}
	
	{#await getCities}
	<p>Loading....</p>
	
	{:then cities}
		{#if cities.length!=0}
			<form>
                <div class="swapContainer" on:click="{swap}">
                    <!-- <ion-icon name="swap"></ion-icon> -->
                    <ion-icon name="swap-horizontal-outline"></ion-icon>
                </div>
                <table>
                    <tr>
                        <td class="place from">
                            <select bind:value="{from}">
                                <option value="from">From</option>
                                {#each cities as city }
                                    <option value="{city.IATA_code}({city.city_name})">{city.IATA_code}({city.city_name})</option>
                                {/each}
            
                            </select>
                        </td>
                        <td class="place">
                            <select  bind:value="{destination}">
                                <option value="destination">Destination</option>
                                {#each cities as city }
                                    <option value="{city.IATA_code}({city.city_name})">{city.IATA_code}({city.city_name})</option>
                                {/each}
            
                            </select>
                        </td>
                        <td class="date">
                            <input type="text" placeholder="Departure" onfocus="(this.type='date')" onblur="(this.type='text')" bind:value="{departureDate}"/>
                        </td>
                        <td class="date return">
                            {#if $tripTypeStore}
                                <input type="text" placeholder="Return" onfocus="(this.type='date')" onblur="(this.type='text')" bind:value="{returnDate}" />
                                {:else}
                                <input type="text" placeholder="Return" onfocus="(this.type='date')" onblur="(this.type='text')" bind:value="{returnDate}" disabled/>
                            {/if}
                        </td>
                    </tr>
                </table>
			</form>
            <Button className="search" label="Search" on:click={handleSubmit} />
			{:else}
			<div style="display: flex; justify-content: center">
				<CircularProgress style="height: 32px; width: 32px;" indeterminate />
			  </div>
		{/if}

	{:catch err}
		<p>{err.message}</p>
			
	{/await}
	{/if}
</div>


<!-- <Snackbar bind:this={snackbarWithClose}>
	<Label>This is a snackbar.</Label>
	<Actions>
	  <IconButton class="material-icons" title="Dismiss">close</IconButton>
	</Actions>
  </Snackbar>
   
  <Snackbar bind:this={snackbarWithoutClose}>
	<Label>This is a snackbar.</Label>
  </Snackbar>
   
  <Button on:click={() => snackbarWithClose.open()}>
	<Label>Open Snackbar With Dismiss</Label>
  </Button>
  <Button on:click={() => snackbarWithoutClose.open()}>
	<Label>Open Snackbar Without Dismiss</Label>
  </Button> -->