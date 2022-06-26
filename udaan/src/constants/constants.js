const CONSTANTS = {
    THEME : {
        DARK_THEME: "Dark Theme",
        LIGHT_THEME: "Light Theme"
    },
    TRIP_TYPE : {
        ONE_WAY: "oneWay",
        ROUND: "round",
        LABEL: "tripType",
        ONE_WAY_LABEL: "One - Way",
        ROUND_LABEL: "Round",
        ONE_WAY_CLASS: "trip left oneway",
        ONE_WAY_SELECTED_CLASS: "selected trip left oneway",
        ROUND_CLASS:"trip right round",
        ROUND_SELECTED_CLASS:"selected trip right round",
        ONE_WAY_DARK_CLASS:"darkTheme trip left oneway",
        ONE_WAY_DARK_SELECTED_CLASS: "selected darkTheme trip left oneway",
        ROUND_DARK_CLASS:"darkTheme trip right round",
        ROUND_DARK_SELECTED_CLASS:"selected darkTheme trip right round"
    },
    API_URLS : {
        CITIES:"https://run.mocky.io/v3/8b1d2b79-0b1f-4f9f-bd56-17c5aad99ac5",
        FLIGHTS:"https://run.mocky.io/v3/6229c6e5-4d44-4d1b-8060-78a5160e13f6",
        SEARCH: "/search"
    },
    TIME_DATA : [
        {
            id:"morning",
            label:"Before 11am"
        },
        {
            id:"afternoon",
            label:"11am - 5pm"
        },
        {
            id:"evening",
            label:"5pm - 9pm"
        },
        {
            id:"night",
            label:"After 9pm"
        }
    ],
    AIRLINE_DATA :[
        {
            id: "Indigo",
            label:"Indigo Airlines"
        },
        {
            id:"Spicejet",
            label:"Spicejet"
        },
        {
            id: "Air India",
            label:"Air India"
        },
        {
            id:"Air Asia",
            label:"AirAsia India"
        }
    
    ],
    BUTTON : {
        SEARCH:"Search",
        UPDATE: "UPDATE"
    },
    GRAPH:{
        NAME: "Price",
        LABEL: ['Jun 1', 'Jun 2', 'Jun 3', 'Jun 4', 'Jun 5', 'Jun 6', 'Jun 7', 'Jun 8', 'Jun 9', 'Jun 10','Jun 11','Jun 12','Jun13','Jun 14','Jun 15']
    },
    OFFER_CARD:{
        TITLE:"One time Offer!!",
        DESCRIPTION: "Reprehenderit consectetur amet nulla veniam irure labore amet irure. Ipsum consectetur non duis non ea culpa aute aliquip elit. Sunt non commodo velit consequat occaecat veniam eiusmod ut excepteur sint."
    },
    TIME_PERIOD:{
        MORNING:"morning",
        AFTERNOON:"afternoon",
        EVENING:"evening",
        NIGHT:"night"
    },
    VALIDATION:{
        DEPARTURE_DATE_GREATER:"choose departure date less than return date",
        EMPTY_DATES:"choose departure and return dates",
        EMPTY_DEPARTURE:"choose departure date"
    }

}

export default CONSTANTS;