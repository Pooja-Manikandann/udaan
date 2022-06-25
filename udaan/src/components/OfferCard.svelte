<script>
    import { createEventDispatcher } from "svelte";
    import CONSTANTS from "../constants/constants"
    let dispatch = createEventDispatcher();
    function close(){
        dispatch('close','clicked')
    }
</script>

<style lang="scss">
    .offerContainer{
        width: 300px;
        position: absolute;
        bottom: 5%;
        background-color: #c7d5e5;
        padding: 15px;
        .header{
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 5px 0;
        }
    }
</style>

    
    <div class="offerContainer" >
        <div class="header">
            <h3>{CONSTANTS.OFFER_CARD.TITLE}</h3>
            <ion-icon on:click="{close}" name="close-outline"></ion-icon>
        </div>
        <p>{CONSTANTS.OFFER_CARD.DESCRIPTION}</p>
    </div>
