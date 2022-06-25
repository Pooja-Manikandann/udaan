export default function validate(departureDate,returnDate,$tripTypeStore){
    if($tripTypeStore){
        if(departureDate == undefined || returnDate == undefined){
            alert("choose departure and return dates")
            return false;
        }
        else if(departureDate>returnDate){
            alert("choose departure date less than return date")
            return false;
        }
    }
    else if($tripTypeStore){
        if(departureDate == undefined){
            alert("choose departure date")
            return false;
        }
    }
    return true;
    
}