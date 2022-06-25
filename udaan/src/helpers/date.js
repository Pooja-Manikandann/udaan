import CONSTANTS from "../constants/constants"

/**
 * 
 * @param {Number} hours 
 * @returns string that has the hour value
 */
function getTimePeriod(hours){
    if(hours<11){
        return CONSTANTS.TIME_PERIOD.MORNING
    }
    else if(hours>=11 && hours<17){
        return CONSTANTS.TIME_PERIOD.AFTERNOON
    }
    else if(hours>=17 && hours<21){
        return CONSTANTS.TIME_PERIOD.EVENING
    }
    else if(hours>=21){
        return CONSTANTS.TIME_PERIOD.NIGHT
    }
}

/**
 * 
 * @param {Number} value 
 * @returns returns string that is two digit hours
 */
function getFullTime(value){
    if(value.toString().length==1){
        return "0"+value;
    }
    else{
        return value;
    }

}
/**
 * 
 * @param {object} result 
 * @returns object with date and time correction
 */
export function ISODateFormat(result){
    let date = new Date(result.arrival)
    result.arrival = (getFullTime(date.getHours())+":"+getFullTime(date.getMinutes()))
    result.arrivalTime = getTimePeriod(date.getHours())
    
    let dateDeparture = new Date(result.departure)
    let departureDate = dateDeparture.getDate()+"/"+(dateDeparture.getMonth()+1)+"/"+dateDeparture.getFullYear();
    result.departure = (getFullTime(dateDeparture.getHours())+":"+getFullTime(dateDeparture.getMinutes()))
    result.departureTime = getTimePeriod(dateDeparture.getHours())
    result.departureDate = departureDate;
    var dif = Math.round((date - dateDeparture) / (1000 * 60))
    result.duration=Math.round(dif/60) +"h "+ dif%60+"m"
    return result;
}