<script>
    import { createEventDispatcher } from "svelte";
    let dispatch = createEventDispatcher();
    // let flag=false
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

<!-- <div transition:scale class="offerContainer">
    <h3>One time Offer!!</h3>
    <p>Reprehenderit consectetur amet nulla veniam irure labore amet irure. Ipsum consectetur non duis non ea culpa aute aliquip elit. Sunt non commodo velit consequat occaecat veniam eiusmod ut excepteur sint. </p>
</div> -->
<!-- <button on:click={()=>{flag=!flag}}>button</button> -->
<!-- {#if flag} -->
    
    <div class="offerContainer" >
        <div class="header">
            <h3>One time Offer!!</h3>
            <ion-icon on:click="{close}" name="close-outline"></ion-icon>
        </div>
        <p>Reprehenderit consectetur amet nulla veniam irure labore amet irure. Ipsum consectetur non duis non ea culpa aute aliquip elit. Sunt non commodo velit consequat occaecat veniam eiusmod ut excepteur sint. </p>
    </div>
<!-- {/if} -->