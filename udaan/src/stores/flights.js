import {writable} from "svelte/store"

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