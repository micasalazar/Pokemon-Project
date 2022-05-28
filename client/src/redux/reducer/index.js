const initialState = {
    allPokemon: [], //estado para traerme todos los pokemon
    filterPokemon:[]
}

function rootReducer (state = initialState, action){
    switch(action.type){
        case 'GET_POKEMON':
            return{
                ...state,
                allPokemon: action.payload, //en allPokemon que hasta ahora es un arreglo vacio, manda todo lo que te mande la accion GET_POKEMON,
                filterPokemon: action.payload

            }
            default:
                return state;
    }

}


export default rootReducer;