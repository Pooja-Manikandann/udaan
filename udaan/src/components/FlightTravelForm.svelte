<script>
    // export let tripType;
    export let theme;
    export let location={};
    export let className="formContainer";
    import tripTypeStore from "../stores/tripTypeStore";
    import tripLocationStore from "../stores/tripLocationStore"
	import { onMount } from "svelte";
    import Button from "./Button.svelte"
    import { afterUpdate } from "svelte";
    import CONSTANTS from "../constants/constants"

    import validate from "../helpers/validate"
import Loader from "./loader.svelte";


    let isButtonDisabled = true;


    let buttonClass;
    if(className == "searchForm"){
        buttonClass = "searchFormButton";
    }
    else{
        buttonClass = "search"
    }

    $:if(theme == CONSTANTS.THEME.DARK_THEME && className=="searchForm"){
        buttonClass = "searchFormButton searchFormDark"
    }
    $:if(theme == "Light Theme" && className=="searchForm"){
        buttonClass = "searchFormButton"
    }
    
    $:if(theme == CONSTANTS.THEME.DARK_THEME && className=="formContainer"){
        buttonClass = "search searchDark"
    }
    $:if(theme == "Light Theme" && className=="formContainer"){
        buttonClass = "search"
    }



	let from;
	let destination;
	let departureDate;
	let returnDate;
	let getCities;
	let tripTypeFlag;

    $: if(!isEmpty(location)){
        from = location.from;
        destination = location.to;
        departureDate = location.departureDate
    }

    if($tripTypeStore == "round"){
        tripTypeFlag = true;
    }
    else{
        tripTypeFlag = false;
    }
    function isEmpty(object) {
        for (const property in object) {
            return false;
        }
        return true;
    }
    $: if(typeof(from)=="string" && from!="from" && destination!="destination"){
        isButtonDisabled=false;
    }
    
	onMount(()=>{

		getCities =  fetch(CONSTANTS.API_URLS.CITIES)
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

    afterUpdate(()=>{
        location={}
    })
    
	function handleSubmit(e){
        e.preventDefault();
        if(validate(departureDate,returnDate,$tripTypeStore)){
            tripLocationStore.set({
                from:from,
                to:destination
            })
            localStorage.setItem("tripLocation",JSON.stringify({
                from:from,
                to:destination,
                departureDate:departureDate
            }))
            window.location.href = CONSTANTS.API_URLS.SEARCH
        }
	}

    function swap(){
        if(from !== "from" && destination !== "destination"){
            let temp = from;
            from = destination;
            destination = temp;
            location.from = from;
            location.to=destination;
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
            .swapContainerDark{
                display: flex;
                justify-content: center;
                align-items: center;
                width: 40px;
                height: 40px;
                border-radius: 50%;
                background-color: #fff;
                position: absolute;
                top: 20px;
                left: calc(104%/4);
                cursor: pointer;
                ion-icon{
                    font-size: 25px;
                    color: #002237;
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
            .swapContainerDark{
                display: flex;
                justify-content: center;
                align-items: center;
                width: 40px;
                height: 40px;
                border-radius: 50%;
                background-color: #fff;
                position: absolute;
                top: 20px;
                left: calc(104%/4);
                cursor: pointer;
                ion-icon{
                    font-size: 25px;
                    color: #002237;
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

    .darkSelect{
        background-color: #002237;
        color: #fff;
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

    input:disabled{
        opacity: 0.5;
        cursor: not-allowed;
    }

    .dark{
        ::placeholder {
            color: #fff;
        }
    }

    ::placeholder {
        color: #295589;
    }
    .load{
		text-align: center;
		font-size: 25px;
		display: block;
		margin: 20px auto;
	}
    
</style>

<div class={className}>

    {#if getCities}
    
    {#await getCities}
    <p class="load"><Loader /></p>
    
    {:then cities}
        {#if cities.length!=0}
            <form>
                <div class={theme==CONSTANTS.THEME.DARK_THEME?"swapContainerDark":"swapContainer"} on:click="{swap}">
                    <ion-icon name="swap-horizontal-outline"></ion-icon>
                </div>
                <table>
                    <tr>
                        <td class="place from">
                            <select class="{theme==CONSTANTS.THEME.DARK_THEME?"darkSelect":""}" id="from" bind:value="{from}">
                                <option value="from">From</option>
                                {#each cities as city }
                                    <option value="{city.IATA_code}">{city.IATA_code}({city.city_name})</option>
                                {/each}
                            </select>
                        </td>
                        <td class="place">
                            <select class="{theme==CONSTANTS.THEME.DARK_THEME?"darkSelect":""}" id="destination"  bind:value="{destination}">
                                <option value="destination">Destination</option>
                                {#each cities as city }
                                    <option value="{city.IATA_code}">{city.IATA_code}({city.city_name})</option>
                                {/each}
            
                            </select>
                        </td>

                        <td class={theme==CONSTANTS.THEME.DARK_THEME?"date dark": "date"}>
                            <input class="{theme==CONSTANTS.THEME.DARK_THEME?"darkSelect":""}" id="departureDate" type="text" placeholder="Departure" onfocus="(this.type='date') (this.min='2022-07-24') (this.autofocus)" onblur="(this.type='text')" bind:value="{departureDate}"/>
                        </td>
                        <td class={theme==CONSTANTS.THEME.DARK_THEME?"date dark return": "date return"}>
                            {#if $tripTypeStore}
                                <input class="{theme==CONSTANTS.THEME.DARK_THEME?"darkSelect":""}" type="text" placeholder="Return" onfocus="(this.type='date') (this.min='2022-07-24') (this.autofocus)" onblur="(this.type='text')" bind:value="{returnDate}" />
                                {:else}
                                <input class="{theme==CONSTANTS.THEME.DARK_THEME?"darkSelect":""}" type="text" placeholder="Return" onfocus="(this.type='date') (this.min='2022-07-24') (this.autofocus)" onblur="(this.type='text')" bind:value="{returnDate}" disabled/>
                            {/if}
                        </td>
                    </tr>
                </table>
            </form>
            {#if className == "searchForm"}
                
            <Button className={buttonClass} label={CONSTANTS.BUTTON.UPDATE} on:click={handleSubmit} isButtonDisabled={isButtonDisabled}/>
            {:else}
            <Button className={buttonClass} label={CONSTANTS.BUTTON.SEARCH} on:click={handleSubmit} isButtonDisabled={isButtonDisabled}/>
            {/if}
            {:else}
            <p class="load"><Loader /></p>
        {/if}

    {:catch err}
        <p>{err.message}</p>
            
    {/await}
    {/if}
</div>
