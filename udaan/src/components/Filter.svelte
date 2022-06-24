<script>
import Checkbox from "./Checkbox.svelte";
import OfferCard from "./OfferCard.svelte";
import Slider from "./Slider.svelte"
import {fade,fly, slide,scale} from "svelte/transition"
import {onMount} from "svelte"
    let flag=false

    export let departure=[];
	export let returnTime=[];
	export let priceValue=[0,7000];
	export let airline=[];

    function clearFilter(){
		departure = [];
		returnTime = [];
		priceValue=[0,7000];
		airline=[];
		result = resultCopy
	}

    const timeData = [
        {
            id:"morning",
            label:"Before 11am"
        },
        {
            id:"afternoon",
            label:"11am - 5pm"
        },
        {
            id:"evening",
            label:"5pm - 9pm"
        },
        {
            id:"night",
            label:"After 9pm"
        }
    ]

    const airlineData = [
        {
            id: "Indigo",
            label:"Indigo Airlines"
        },
        {
            id:"Spicejet",
            label:"Spicejet"
        },
        {
            id: "Air India",
            label:"Air India"
        },
        {
            id:"Air Asia",
            label:"AirAsia India"
        }

    ]
    function removeOffer(){
        flag=false;
    }

    onMount(()=>{
        flag=true;
        const myTimeout = setTimeout(removeOffer, 3000);
    })

    $: console.log(departure)

</script>

<style lang="scss">
    .leftContainer{
        width: 22%;
        // border: 1px solid black;
        .filterHeader{
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 20px;
            .filter{
                font-size: 20px;
                font-weight: 700;
            }
            .reset{
                color: #808080;
                font-size: 15px;
                font-weight: 400;
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
		}
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


<div class="leftContainer">
    <div class="filterHeader">
        <span class="filter">Filters</span>
        <span class="reset" on:click="{clearFilter}">Reset all</span>
    </div>
    <div class="departure">
        <p>Departure</p>
        <div class="departureCheckboxContainer">
            <Checkbox id={timeData} name="departure" bind:value={departure} />
        </div>
    </div>
    <div class="returnFilter">
        <p>Return</p>
        <div class="returnFilterContainer">
            <Checkbox id={timeData} name="return" bind:value={returnTime} />
        </div>
    </div>
    <div class="priceFilter">
        <p>Price</p>
        <Slider bind:value={priceValue}  />
    </div>
    <div class="airlineFilter">
        <p>Preferred Airline</p>
        <div class="airlineFilterContainer">
            <Checkbox id={airlineData} name="airline" bind:value={airline} />
        </div>
    </div>
    
    {#if flag}
        
        <div transition:fly={{ x:-500, duration:1000 }}>

            <OfferCard on:close={removeOffer} />
        </div>
    {/if}
</div>