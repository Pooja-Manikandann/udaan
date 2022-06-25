<script>
    export let name;
    export let id;
    export let theme="";
    export let value=[]
    export let variant;
</script>

<style lang="scss">
    label{
        
        border-radius: 5px;
        text-align: center;
    }
    .boxContainer{
        display: flex;
        flex-wrap: wrap;
        width: 100%;
        gap: 25px;
    }
    .box{
        width: 100px;
        // height: 50px;
        width: 45%;
        
        // border: 1px solid black;
        input[type="checkbox"]{
            display: none;
            // width: 50px;
        }
        span{
            width: 100%;
            display: block;
            border-radius: 5px;
            // border: 1px solid black;
        }
        input[type="checkbox"]:checked ~ span{
            background-color: #837d7d;
            width: 100%;
        }
    }
    .light{
        background-color: #d7d3d3;
    }
    .dark{
        background-color: #7296ac71;
        input[type="checkbox"]:checked ~ span{
            background-color: #192d3ad8;
            width: 100%;
        }
    }
    .selected{
        width: 100px;
        background-color: #e4ebf3;
        input[type="checkbox"]{
            display: none;
        }
    }

    .defaultContainer{
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: flex-start;
        .default{
            margin: 5px 0;
            input{
                margin-right: 10px;
            }
        }
    }
    span{
        width: 100%;
    }
    

</style>

<div class="{variant}Container">
    {#each id as c}
        <!-- {#if changeClass[i++]} -->
            <!-- <label id={uuidv4()} class="{variant} {theme} selected" on:click={()=>{call(i-1)}}>
                <input type="checkbox" name="{name}" id="{c.id}" value="{c.id}" bind:group={value}>{c.label}
            </label>
            {:else} -->
            <label class="{variant} {theme}" >
                <input type="checkbox" name="{name}" id="{c.id}" value="{c.id}" bind:group={value} />
                <span>{c.label}</span>
            </label>
            
        <!-- {/if} -->
        
    {/each}
</div>
