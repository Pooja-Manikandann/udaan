import CONSTANTS from "../constants/constants";

export default function validate(departureDate,returnDate,$tripTypeStore){
    if($tripTypeStore){
        if(departureDate == undefined || returnDate == undefined){
            alert(CONSTANTS.VALIDATION.DEPARTURE_DATE_GREATER)
            return false;
        }
        else if(departureDate>returnDate){
            alert(CONSTANTS.VALIDATION.EMPTY_DATES)
            return false;
        }
    }
    else if(!$tripTypeStore){
        if(departureDate == undefined){
            alert(CONSTANTS.VALIDATION.EMPTY_DEPARTURE)
            return false;
        }
    }
    return true;
    
}