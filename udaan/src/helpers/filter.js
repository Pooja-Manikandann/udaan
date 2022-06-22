export function getFiltered(data, filterCondition){
    console.log("inside")
    let length = Object.keys(filterCondition).length
    let result=[];
    let count=0;
    for(let i in data){
        count = 0;
        for(let key in filterCondition){
            if(key == "departure"){
                if(filterCondition[key].includes(data[i].departureTime)){
                    count++;
                }
            }
            if(key == "arrival"){
                if(filterCondition[key].includes(data[i].arrivalTime)){
                    count++;
                }
            }
            if(key == "airline"){
                if(filterCondition[key].includes(data[i].airlines.name)){
                    count++;
                }
            }
            if(key == "price"){
                if(data[i].price>filterCondition[key][0] && data[i].price<=filterCondition[key][1]){
                    count++;
                }
            }
            if(count == length){
                result.push(data[i])
            }
        }
    }
    return result;
}