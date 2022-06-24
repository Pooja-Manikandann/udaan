<canvas id="myChart" width="300" height="30" bind:this="{ctx}"></canvas>
<script>
    import Chart from "chart.js/auto"
import { onMount } from "svelte";
// import random from "random-numbers.js"
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// console.log(getRandomInt(1,10))
    let data = []
    for(let i=0;i<15;i++){

        data.push(getRandomInt(5000,6000))
    }
    // console.log(data)
    // const Chart = require('chart.js');
    let ctx;
    onMount(()=>{
        // const ctx = document.getElementById('myChart');
        const myChart = new Chart(ctx, {
            
            type: 'line',
            data: {
                labels: ['Jun 1', 'Jun 2', 'Jun 3', 'Jun 4', 'Jun 5', 'Jun 6', 'Jun 7', 'Jun 8', 'Jun 9', 'Jun 10','Jun 11','Jun 12','Jun13','Jun 14','Jun 15'],
                datasets: [{
                    label: "price",
                    data: data,
                    backgroundColor: [
                        '#295589'
                    ],
                    borderColor: [
                        '#295589'
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
                        // beginAtZero: true
                        
                    }
                }
            }
        });
    })

</script>
