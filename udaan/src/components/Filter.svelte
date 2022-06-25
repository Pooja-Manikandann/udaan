<script>
import Checkbox from "./Checkbox.svelte";
import OfferCard from "./OfferCard.svelte";
import Slider from "./Slider.svelte"
import {fade,fly, slide,scale} from "svelte/transition"
import CONSTANTS from '../constants/constants';
import {onMount} from "svelte"
    let flag=false
    export let theme;

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
    
    function removeOffer(){
        flag=false;
    }

    onMount(()=>{
        flag=true;
        const myTimeout = setTimeout(removeOffer, 3000);
    })

</script>

<style lang="scss">
    .leftContainer{
        width: 22%;
        height: 65vh;
        overflow: scroll;
        padding-left: 30px;
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
    .leftDarkContainer{
        background-color: #002237;
        color: #fff;
    }
    .departure{
		padding: 0 20px;
		.departureCheckboxContainer{
			display: flex;
			flex-wrap: wrap;
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


<div class={theme==CONSTANTS.THEME.DARK_THEME?"leftContainer leftDarkContainer":"leftContainer"}>
    <div class="filterHeader">
        <span class="filter">Filters</span>
        <span class="reset" on:click="{clearFilter}">Reset all</span>
    </div>
    <div class="departure">
        <p>Departure</p>
        <div class="departureCheckboxContainer">
            {#if theme==CONSTANTS.THEME.DARK_THEME}
                <Checkbox id={CONSTANTS.TIME_DATA} name="departure" bind:value={departure} theme="dark" variant="box"/>
                {:else}
                <Checkbox id={CONSTANTS.TIME_DATA} name="departure" bind:value={departure} theme="light" variant="box"/>
            {/if}
        </div>
    </div>
    <div class="returnFilter">
        <p>Return</p>
        <div class="returnFilterContainer">
            {#if theme==CONSTANTS.THEME.DARK_THEME}
            <Checkbox id={CONSTANTS.TIME_DATA} name="return" bind:value={returnTime} theme="dark"  variant="box"/>
                {:else}
                <Checkbox id={CONSTANTS.TIME_DATA} name="return" bind:value={returnTime} theme="light" variant="box"/>
            {/if}
            
        </div>
    </div>
    <div class="priceFilter">
        <p>Price</p>
        <Slider bind:value={priceValue}  />
    </div>
    <div class="airlineFilter">
        <p>Preferred Airlines</p>
        <div class="airlineFilterContainer">
            <Checkbox id={CONSTANTS.AIRLINE_DATA} name="airline" bind:value={airline} variant="default"/>
        </div>
    </div>
    
    {#if flag}
        
        <div transition:fly={{ x:-500, duration:1000 }}>

            <OfferCard on:close={removeOffer} />
        </div>
    {/if}
</div>