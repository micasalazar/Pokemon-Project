const initialState = {
    allPokemon: [], //estado para traerme todos los pokemon
    filterPokemon:[],//hago el filtro y me guardo el state
    types:[],
    details:[]
}

function rootReducer (state = initialState, action){
    switch(action.type){
        case 'GET_POKEMON':
            return{
                ...state,
                allPokemon: action.payload, //en allPokemon que hasta ahora es un arreglo vacio, manda todo lo que te mande la accion GET_POKEMON,
                filterPokemon: action.payload

            }
        case 'GET_TYPES':
            return{
                ...state,
                types: action.payload

            }
        case 'FILTER_BY_TYPE':
            let pokemon = state.allPokemon;//pokemon, es la copia del estado global donde me traigo allPokemon
            const typesFilter = action.payload === 'all'? pokemon
            :pokemon.filter(p=>p.types.map(t=>t.name).includes(action.payload))
            return{
                ...state,
                filterPokemon: typesFilter,

            }
        case 'FILTER_CREATED':
            const pokemonFilter = state.allPokemon;
            const filterCreated = action.payload === 'created'?pokemonFilter.filter(e=> e.createdInDb): pokemonFilter.filter(e=>!e.createdInDb)
            return{
                ...state,
                filterPokemon: action.payload ==='all'? pokemonFilter : filterCreated
            }
            // const pokemonCreated = [];
            // if(action.payload==='all'){
            //     pokemonCreated=state.allPokemon;
            // }else if(action.payload==='created'){
            //     pokemonCreated=state.allPokemon.filter(e=>e.createdInDb);
            // }else if(action.payload==='api'){
            //     pokemonCreated = state.allPokemon.filter(e=>!e.createdInDb)
            // }
            // console.log(action.payload)
            // return{
            //     ...state,
            //     filterPokemon : pokemonCreated
            // }
        
        case 'ORDER_BY_NAME':
            let orderPokeByName = action.payload === 'asc'
            ?state.filterPokemon.sort( function (a,b){
                if(a.name.toLowerCase() > b.name.toLowerCase()){
                    return 1;
                }if(b.name.toLowerCase() > a.name.toLowerCase()){
                    return -1;
                }
                return 0;
            })
            :state.filterPokemon.sort( function (a,b){
                if(a.name.toLowerCase() > b.name.toLowerCase()){
                    return -1;
                }if(b.name.toLowerCase() > a.name.toLowerCase()){
                    return 1;
                }
                return 0;
            })
            return {
                ...state,
                filterPokemon : orderPokeByName
            }
        case 'OREDER_BY_STRENGH':
            let orderPokeByStrengh = action.payload === 'min'
            ?state.filterPokemon.sort( function (a,b){
                if(a.attack > b.attack){
                    return 1;
                }if(b.attack > a.attack){
                    return -1;
                }
                return 0;
            })
            :state.filterPokemon.sort( function (a,b){
                if(a.attack > b.attack){
                    return -1;
                }if(b.attack > a.attack){
                    return 1;
                }
                return 0;
            })
            return {
                ...state,
                filterPokemon : orderPokeByStrengh
            }
            
        case 'GET_BY_NAME':
            return{
                ...state,
                filterPokemon: action.payload//filterPokemon-->porque es el arreglo que estoy renderizando
            }
        case 'POST_POKEMON':
            return{
                ...state,//devuelve el estado como esta porque voy a crearlo en una ruta nueva
            }
        case 'GET_DETAILS':
            return{
                ...state,
                details: action.payload

            }
            default:
                return state;
    }

}


export default rootReducer;