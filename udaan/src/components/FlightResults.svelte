<script>
    export let result=[];
</script>

<style lang="scss">
    .rightContainer{
        width: 77%;
        height: 100vh;
        overflow: scroll;
        border: 1px solid black;
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
    .price{
		text-align: center;
	}
</style>

<div class="rightContainer">
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