import axios from 'axios';
// Las actions esolamente despachar un tipo
// GET POKEMON
export function getPokemon(){
    return async function(dispatch){
        try {
            let pokeJson = await axios.get("http://localhost:3001/pokemons")//aca esta mi conexion etntre mi back y el front
        return dispatch({
            type:'GET_POKEMON',
            payload: pokeJson.data,
        })
            
        } catch (error) {
            console.log(error)
            
        }
        
    }
}
// GET TYPES
export function getTypes(){
    return async function(dispatch){
        try {
            let typesJson = await axios.get("http://localhost:3001/types")
            return dispatch({
                type: 'GET_TYPES',
                payload: typesJson.data,
            })
            
        } catch (error) {
            console.log(error)
            
        }
       
    }
}

// FILTER BY TYPE
export function filterByType(payload){
    return{
        type:'FILTER_BY_TYPE',
        payload
    }
}

// FILTER POKEMON CREATED OR POKEMON BY API
export function filterCreated(payload){
    return{
        type: 'FILTER_CREATED',
        payload
    }
}

// ORDER NAME
export function orderByName(payload){
    return{
        type: 'ORDER_BY_NAME',//despacho la action con este type
        payload
    }

}
// ORDER BY STRENGH
export function orderByStrengh(payload){
    return{
        type: 'OREDER_BY_STRENGH',
        payload
    }
}

// Para crear el componente SearchBar
// GET BY NAME
export function getByName(name){
    return async function(dispatch){
        try {
            let nameJson = await axios.get(`http://localhost:3001/pokemons?name=${name}`)
            // let nameArray=[];
            // nameArray.push(nameJson.data)
            return dispatch({
                type: 'GET_BY_NAME',
                payload: nameJson.data,//es lo que devuelve la ruta una vez que yo le asigno algo por name
                
            })
            
        } catch (error) {
            console.log(error)            
        }
       
    }
}
// Para crear el componente CreatePokemon
// POST POKEMON
export function postPokemon(payload){
    return async function (dispatch){
        try {
            let newPokemon = await axios.post("http://localhost:3001/pokemons", payload)
            console.log(newPokemon);
            return newPokemon;
            
        } catch (error) {
            console.log(error)
            
        }
    }
}




