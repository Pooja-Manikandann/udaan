<script>
    import Slider from "./Slider.svelte"
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

    $: console.log(departure)

</script>

<style lang="scss">
    .leftContainer{
        width: 22%;
        border: 1px solid black;
        .filterHeader{
            display: flex;
            justify-content: space-between;
            padding: 20px;
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