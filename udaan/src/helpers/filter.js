/**
 * 
 * @param {Object} data 
 * @param {Object} filterCondition 
 * @returns filtered Object
 */
export function getFiltered(data, filterCondition){
    let length = Object.keys(filterCondition).length
    let result=[];
    let count=0;
    for(let i of data){
        count = 0;
        for(let key in filterCondition){
            if(key == "departure"){
                if(filterCondition[key].includes(i.departureTime)){
                    count++;
                }
            }
            if(key == "arrival"){
                if(filterCondition[key].includes(i.arrivalTime)){
                    count++;
                }
            }
            if(key == "airline"){
                if(filterCondition[key].includes(i.airlines.name)){
                    count++;
                }
            }
            if(key == "price"){
                if(i.price>filterCondition[key][0] && i.price<=filterCondition[key][1]){
                    count++;
                }
            }
            if(count == length){
                result.push(i)
            }
        }
    }
    return result;
}