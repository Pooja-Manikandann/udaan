
<script>
    import Chart from "chart.js/auto"
    import { onMount, afterUpdate } from "svelte";
    import CONSTANTS from "../constants/constants";
    import {generateRandomNumbers} from "../helpers/graph"

    export let theme;

    let graphColor

    if(theme == CONSTANTS.THEME.DARK_THEME){
        graphColor="#ffffff"
    }
    else{
        graphColor='#295589'
    }
    let data = generateRandomNumbers(5000,6000,15)

    let ctx;
    
    onMount(()=>{
        const myChart = new Chart(ctx, {
            
            type: 'line',
            data: {
                labels: CONSTANTS.GRAPH.LABEL,
                datasets: [{
                    label: CONSTANTS.GRAPH.NAME,
                    data: data,
                    backgroundColor: [
                        graphColor
                    ],
                    borderColor: [
                        graphColor
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    x:{
                        grid: {display:false}
                    },
                    y: {
                        grid: {display:false}
                    }
                }
            }
        });
    })

</script>

<style>
    .dark{
        background-color: #002237;
    }
    .light{
        background-color: #E3EBF4;
    }
</style>

<canvas class={theme==CONSTANTS.THEME.DARK_THEME?"dark":"light"} id="myChart" width="300" height="30" bind:this="{ctx}"></canvas>