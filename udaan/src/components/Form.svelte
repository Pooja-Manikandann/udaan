<script>
    // export let tripType;
    export let className="formContainer";
    import tripTypeStore from "../stores/tripTypeStore";
    import tripLocationStore from "../stores/tripLocationStore"
	import { onMount } from "svelte";
    import Button from "./Button.svelte"
	import CircularProgress from '@smui/circular-progress';

    let buttonClass;
    if(className == "searchForm"){
        buttonClass = "searchFormButton";
    }
    else{
        buttonClass = "search"
    }

	let from;
	let destination;
	let departureDate;
	let returnDate;
	let getCities;
	let tripTypeFlag;

    $: console.log($tripLocationStore)

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
        tripLocationStore.set({
            from:from,
            to:destination
        })
        localStorage.setItem("tripLocation",JSON.stringify({
            from:from,
            to:destination
        }))
        
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
    .searchForm{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
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

<div class={className}>

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
                                    <option value="{city.IATA_code}">{city.IATA_code}({city.city_name})</option>
                                {/each}
            
                            </select>
                        </td>
                        <td class="place">
                            <select  bind:value="{destination}">
                                <option value="destination">Destination</option>
                                {#each cities as city }
                                    <option value="{city.IATA_code}">{city.IATA_code}({city.city_name})</option>
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
            <Button className="{buttonClass}" label="Search" on:click={handleSubmit} />
            {:else}
            <p>empty</p>
        {/if}

    {:catch err}
        <p>{err.message}</p>
            
    {/await}
    {/if}
</div>
