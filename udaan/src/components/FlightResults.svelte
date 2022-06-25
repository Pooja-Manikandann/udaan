<script>
    import CONSTANTS from "../constants/constants";
    import FlightItem from "./FlightItem.svelte";
    import Graph from "./Graph.svelte";
    export let result=[];
    export let theme;

</script>

<style lang="scss">
    .rightContainer{
        width: 78%;
        padding: 0 3rem;
        height: 64vh;
        overflow: scroll;
    }
    .rightDarkContainer{
        background-color: #16222b;
        color: #fff;
    }
    table{
		width: 100%;
        margin-top: 30px;
		th{
            text-align: left;
            padding: 21px 0
		}
	}
    .tableTitle{
        height: 40px;
    }
    .tableDarkTitle{
        background-color: #002237;
        color: white;
        /* padding: 25px 0; */
        height: 80px;
    }
    .space{
        height: 34px;
        
    }
    .arrivalTitle{
        text-align: left;
        padding-left: 48px;
    }
    .priceTitle{
        padding-left: 20px;
    }
    .load{
        text-align: center;
        font-size: 25px;
    }
</style>

<div class={theme==CONSTANTS.THEME.DARK_THEME?"rightDarkContainer rightContainer":"rightContainer"}>
    <p>Flight Prices</p>
    <Graph theme={theme} />
    {#if result.length!=0}
        <table>
            <tr class={theme==CONSTANTS.THEME.DARK_THEME?"tableDarkTitle tableTitle":"tableTitle"}>
                <th>Departure</th>
                <th>Duration</th>
                <th class="arrivalTitle">Arrival</th>
                <th class="priceTitle">Price</th>
                <th></th>
            </tr>
            {#each result as data}
            <tr class="space"></tr>
                <FlightItem theme={theme} data={data} />
            {/each}
        </table>
        {:else}
        <p class="load">Empty</p>
    {/if}
</div>
