import React from 'react';
// importo los hooks que voy a usar de react
import {useState, useEffect} from 'react';
// importo los hooks de react redux(previamente lo instalo npm i react-redux)
import {useDispatch, useSelector} from 'react-redux';
// importo las action que me interesan usar en ese componente
import {getPokemon,getTypes, filterByType, filterCreated, orderByName, orderByStrengh} from '../../redux/actions';
import {Link} from 'react-router-dom';
// Importo los componentes que voy a usar
import Card from '../Cards/Cards';
import Pagination from '../Pagination/Pagination';
import SearchBar from '../SearchBar/SearchBar';
// COMIENZA EL COMPONENTE

export default function Home(){

const dispatch = useDispatch()// para utilizar esta constante y despachar las acciones
const allPokemon = useSelector(state=> state.filterPokemon)//me traigo a esta constante todo lo que esta en el estado de filterPokemon
const alltypes = useSelector(state=>state.types)
// voy a definir varios estados locales
// Primero un estado con la pagina actual, otro estado que me setee la pagina actual
// console.log("Pokemons", allPokemon)
const [currentPage, setCurrentPage] = useState(1)//mi estado local. Comienza en 1, porque siempre comienza en la primer pagina. Mi pagina actual va a ser 1
// Me hago otro estado local que me diga pokemon por pagina-->cuantos personajes tengo por pagina y otro estado local que me setee los pokemons por pagina
const [pokemonsPerPage, setPokemonPerPage]= useState(12)// Hook para manejar el paginado
const indexOfLastPokemon = currentPage * pokemonsPerPage;
const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage 
const currentPokemons = allPokemon.slice(indexOfFirstPokemon, indexOfLastPokemon);// va a contener los personajes que se encuentran en la pagina actual. Me traigo el arreglo del estado global

const [order, setOrder] = useState('');//para setear los estados de los filtros


// Creo una constante para el paginado, a la cual le paso el numero de pagina y luego seteo la pagina en ese numero de pagina
const pagination = (pageNumber)=>{
    setCurrentPage(pageNumber)
}
    // Nos tremos del estado los pokemon cuando el componente se monta
useEffect(()=>{
    dispatch(getPokemon())
    dispatch(getTypes())
},[dispatch]);


function handleClick(e){
e.preventDefault();
dispatch(getPokemon());
}

function handleFilterByType(e){
e.preventDefault()
dispatch(filterByType(e.target.value));
setCurrentPage(1)
}

function handleFilterCreated(e){
e.preventDefault()
dispatch(filterCreated(e.target.value))
setCurrentPage(1)
setOrder(`Order by ${e.target.value}`)//setOrder es un estado local vacio que para lo unico que lo voy a usar es 
}//para cuando yo setee esta pagina-->setCurrentPage(1) me modifique el estado local y se renderice

function handleSortName(e){
e.preventDefault()
dispatch(orderByName(e.target.value));
setCurrentPage(1)
setOrder(`Order by ${e.target.value}`)
}

function handleSortByStrengh(e){
e.preventDefault()
dispatch(orderByStrengh(e.target.value));
setCurrentPage(1)
setOrder(`Order by ${e.target.value}`)
}



    return(
        <div>
            <div>
                <div>
                    <Link to='/'><button>POKEMON</button></Link>
                </div>
                
                <div>
                <Link to='/pokemons'>Create your Pokemon</Link>
                </div>                
                <button onClick={e=>{handleClick(e)}}>{/*Me resetea los personajes*/}
                Get all Pokemon
                </button>            
                <div>                      
                    <select onChange={(e)=>handleSortName(e)}>
                        <option value="name">ORDER BY NAME</option>                        
                        <option value="asc">A/Z</option>
                        <option value="des">Z/A</option>
                    </select>                                       
                    
                    <select onChange= {(e)=> handleSortByStrengh(e)}>
                        <option value="strengh">ORDER BY STRENGH</option>                        
                        <option value="max">STRONGEST</option>
                        <option value="min">WEAKER</option>
                    </select>                    
                    
                    <select onChange={(e)=>handleFilterByType(e)}>
                        <option value="all">AL TYPES</option>                                             
                        {
                        alltypes?.map(t=>{
                            // console.log(alltypes)
                            return(                               
                                <option value={t.name} key={t.id}>{t.name}</option>                                
                            )
                        })}
                    </select>                    
                    
                    <select onChange={(e)=>handleFilterCreated(e)}>
                    {/* <option value="pokemon">SHOW POKEMON</option>*/}
                    <option value="all">SHOW ALL POKEMON</option>
                    <option value="api">EXISTING</option>
                    <option value="created">CREATED</option>
                    </select>                               
                    
                    <div>
                    <Pagination
                    pokemonsPerPage = {pokemonsPerPage}//le paso el estado que tengo arriba
                    allPokemon = {allPokemon.length}//le paso mi estado de allpokemon.lenght porque necesito un valor numerico
                    pagination = {pagination}// como paginado, le paso mi constante paginado                    
                    />
                    <SearchBar/>
                    </div>
                    
                    {//mapeo el estado global y le paso cada iuna de las props que necesita mi card
                       currentPokemons?.map(e=>{
                            return(                                
                                    <Link to= {'/pokemons/' + e.id}>
                                    <Card name={e.name} image={e.image} types={e.types} attack={e.attack} key={e.id}/> {/*le paso las props que tenia como destructuring en el componente. y me traigo el estado global*/}
                                    </Link>                   

                            )
                        
                        })
                    }
                </div>
            </div>
        </div>
    )
}