<script>
    import ConfirmationModel from "./ConfirmationModel.svelte";
    import CONSTANTS from "../constants/constants";
    export let data;
    export let theme;

    let currentTicket;
    let tripId=1;

    import Button from "./Button.svelte";

    let showModel=false;

    function openModel(e){
        currentTicket=JSON.parse(e.target.id);
        showModel = true;
    }
    function closeModel(){
        showModel = false
    }

</script>

<style lang="scss">
    .flightItem{
        background-color: #E3EBF4;
    }
    .flightDarkItem{
        background-color: #002237;
        color: #fff;
    }
    .airline{
		display: flex;
		align-items: center;
		gap: 10px;
        margin: 6px 0;
		.logo{
			width: 30px;
			height: 30px;
			img{
                width: 100%;
                height: 100%;
				object-fit: cover;
			}
		}
	}
    .city{
        font-size: 13px;
        color: grey;
        font-weight: 500;
        margin: 4px 0;
    }
    .departure{
        width: 15%;
        font-size: 13px;
        font-weight: 700;
    }
    .duration{
        width: 15%;
    }
    .arrival{
        width: 30%;
        text-align: left;
        
        .arrivalcity{
            font-size: 13px;
            color: grey;
            font-weight: 500;
            margin-left: 40px;
        }
        .arrivalDate{
            margin-left: 40px;
            font-size: 13px;
            font-weight: 700;
        }
        
    }
    .price{
        width: 15%;
		text-align: left;
	}
    td{
        padding: 10px;
    }
    .header{
        display: flex;
        justify-content: space-between;
        width: 100%;
        background-color: #295589;
        color: #fff;
        padding: 10px;
        img{
            box-shadow: 0px 5px 10px 0px rgba(1, 1, 1, 0.5); 
        }
    }
    .darkHeader{
        background-color: #002237;
    }
    .content{
        width: 100%;
        span{
            font-size: 18px;
            font-weight: 500;
            
        }
    }
    .darkContent{
        background-color: #002237;
        color: #fff;
        span{
            font-size: 18px;
            font-weight: 500;
            
        }
    }
    .book{
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 30px;
        text-align: center;
        flex-direction: column;
        border-radius: 20px 0px 20px 0;
        box-shadow: 0px 5px 10px 0px rgba(1, 1, 1, 0.5);
        background-color: #E3EBF4;
    }
    .darkBook{
        background-color: #08192361;
        box-shadow: 5px 5px 10px 10px #8d7c7c80;
    }

    .footer{
        p{

            color: #bcbcbc;
        }
    }
    .bookColumn{
        width: 20%;
        text-align: center;
    }
</style>

<tr class={theme==CONSTANTS.THEME.DARK_THEME?"flightDarkItem":"flightItem"}>
    <td class="departure">
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
        <div class="departureDate">
            {data.departure}
        </div>
    </td>
    <!-- <td class="space"></td> -->
    <td class="duration">{data.duration}</td>
    <!-- <td class="space"></td> -->
    <td class="arrival">
        <div class="arrivalcity">
            {data.to.IATA_code}, {data.to.city_name}
        </div>
        <div class="arrivalDate">
            {data.arrival}
        </div>
    </td>
    <!-- <td class="space"></td> -->
    <td class="price">₹ {data.price}</td>
    <!-- <td class="space"></td> -->
    <td class="bookColumn">
        {#if theme==CONSTANTS.THEME.DARK_THEME}
            <Button on:click={openModel} label="Book" className="book darkBook" id={JSON.stringify(data)} />
            {:else}
                <Button on:click={openModel} label="Book" className="book" id={JSON.stringify(data)} />
        {/if}
    </td>
</tr>


{#if showModel}
    
    <ConfirmationModel theme={theme} on:closeOverlay={closeModel}>
        <div class={theme==CONSTANTS.THEME.DARK_THEME?"header darkHeader":"header"} slot="header">
            <h2>Confirmed Booking</h2>
            <img src="{currentTicket.airlines.logo}" width="80" alt="">
        </div>
        <div class={theme==CONSTANTS.THEME.DARK_THEME?"content darkContent":"content"} slot="content">
            <p class="confirm">{currentTicket.from.IATA_code} to {currentTicket.to.IATA_code} is confirmed</p>
            <p>We will email you shortly</p>
            <span class="tripId">Your trip ID {tripId}. Please use this id for any communication with us</span>
            <div class={theme==CONSTANTS.THEME.DARK_THEME?"book darkBook":"book"}>
                <h3>Just booked</h3>
                <span>{currentTicket.airlines.name}</span>
                <span>{currentTicket.from.IATA_code} <ion-icon name="arrow-forward-outline"></ion-icon> {currentTicket.to.IATA_code}</span>
                <span>{currentTicket.departureDate}</span>

            </div>
        </div>
        <div class="footer" slot="footer">
            <p>&#169; Udaan Private Limited</p>
        </div>

    </ConfirmationModel>
{/if}
