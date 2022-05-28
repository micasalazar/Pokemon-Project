import axios from 'axios';

export function getPokemon(){
    return async function(dispatch){
        let pokeJson = await axios.get("http://localhost:3001/pokemons")//aca esta mi conexion etntre mi back y el front
        return dispatch({
            type:'GET_POKEMON',
            payload: pokeJson.data,
        })
    }
}