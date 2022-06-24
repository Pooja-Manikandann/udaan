<script>

    import FlightItem from "./FlightItem.svelte";
    import Graph from "./Graph.svelte";
    export let result=[];

</script>

<style lang="scss">
    .rightContainer{
        width: 78%;
        padding: 0 3rem;
        height: 100vh;
        overflow: scroll;
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
</style>

<div class="rightContainer">
    <p>Flight Prices</p>
    <Graph />
    {#if result}
        <table>
            <tr class="tableTitle">
                <th>Departure</th>
                <th>Duration</th>
                <th class="arrivalTitle">Arrival</th>
                <th class="priceTitle">Price</th>
                <th></th>
            </tr>
            {#each result as data}
                <FlightItem data={data} />
                <tr class="space"></tr>
            {/each}
        </table>
        {:else}
        <p>empty</p>
    {/if}
</div>
