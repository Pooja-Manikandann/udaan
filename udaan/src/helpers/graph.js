export function generateRandomNumbers(min,max,limit){
    let data = []
    for(let i=0;i<limit;i++){
        data.push(getRandomInt(min,max))
    }
    return data;
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}