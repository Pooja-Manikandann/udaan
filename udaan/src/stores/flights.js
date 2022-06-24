import {writable} from "svelte/store"
// console.log(localStorage === window.localStorage);
// console.log(typeof(window))
// const getFlights = () => {
//     const notes = JSON.parse(localStorage.getItem("flights")) || []
//     return notes; 
// }
// console.log(localStorage)

// const flights = JSON.parse(localStorage.getItem("flights")) || []

const flightStore = writable()


const store = {
    add: (data) => {
        localStorage.setItem("flights",JSON.stringify(data))
        flightStore.set(data)
    },
    retrieveFlights : () => {
        return flightStore;
        // localStorage.getItem("flights")
    }
}

export default store;