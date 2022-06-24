<script>
    // export let currentTicket;
    // console.log(currentTicket)
    import { createEventDispatcher } from "svelte/internal";

    let dispatch = createEventDispatcher();
    function closeOverLay(){
        dispatch('closeOverlay','clicked')
    }
</script>

<style lang="scss">
    .overlay{
        position: fixed;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0,0,0,0.5);
        z-index: 2;
        cursor: pointer; 
    }

    .model{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center; 
        position: fixed;
        z-index: 4;
        background-color: #fff;
        width: 50%;
        padding: 20px;
        border-radius: 20px;
        margin-top: -360px;
        .header{
            width: 100%;
            padding: 1rem 2rem;
            font-size: 20px;
            div{
                display: flex;
                justify-content: space-between;
            }
        }
        .content{
            width: 100%;
            padding: 0 2rem;
        }

        .footer{
            // padding: 20px;
        }
    }
    // .header{
    //     div{
    //         display: flex;
    //         justify-content: space-between;
    //     }
    // }

</style>

<div class="overlay" on:click="{closeOverLay}"></div>

<div class="model">
    <div class="header">
        <slot name="header" />
    </div>

    <div class="content">
        <slot name="content" />
    </div>

    <div class="footer">
        <slot name="footer" />
    </div>

</div>