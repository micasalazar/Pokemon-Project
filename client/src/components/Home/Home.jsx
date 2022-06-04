import React from 'react';
// importo los hooks que voy a usar de react
import { useState, useEffect } from 'react';
// importo los hooks de react redux(previamente lo instalo npm i react-redux)
import { useDispatch, useSelector } from 'react-redux';
// importo las action que me interesan usar en ese componente
import { getPokemon, getTypes, filterByType, filterCreated, orderByName, orderByStrengh } from '../../redux/actions';
import { Link } from 'react-router-dom';
// Importo los componentes que voy a usar
import Card from '../Cards/Cards';
import Pagination from '../Pagination/Pagination';
import SearchBar from '../SearchBar/SearchBar';
import styles from '../Home/Home.module.css'
// COMIENZA EL COMPONENTE

export default function Home() {

    const dispatch = useDispatch()// para utilizar esta constante y despachar las acciones
    const allPokemon = useSelector(state => state.filterPokemon)//me traigo a esta constante todo lo que esta en el estado de filterPokemon
    const alltypes = useSelector(state => state.types)
    // voy a definir varios estados locales
    // Primero un estado con la pagina actual, otro estado que me setee la pagina actual
    // console.log("Pokemons", allPokemon)
    const [currentPage, setCurrentPage] = useState(1)//mi estado local. Comienza en 1, porque siempre comienza en la primer pagina. Mi pagina actual va a ser 1
    // Me hago otro estado local que me diga pokemon por pagina-->cuantos personajes tengo por pagina y otro estado local que me setee los pokemons por pagina
    const [pokemonsPerPage, setPokemonPerPage] = useState(12)// Hook para manejar el paginado
    const indexOfLastPokemon = currentPage * pokemonsPerPage;
    const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage
    const currentPokemons = allPokemon.slice(indexOfFirstPokemon, indexOfLastPokemon);// va a contener los personajes que se encuentran en la pagina actual. Me traigo el arreglo del estado global

    const [order, setOrder] = useState('');//para setear los estados de los filtros


    // Creo una constante para el paginado, a la cual le paso el numero de pagina y luego seteo la pagina en ese numero de pagina
    const pagination = (pageNumber) => {
        setCurrentPage(pageNumber)
    }
    // Nos tremos del estado los pokemon cuando el componente se monta
    useEffect(() => {
        dispatch(getPokemon())
        dispatch(getTypes())
    }, [dispatch]);


    function handleClick(e) {
        e.preventDefault();
        dispatch(getPokemon());
    }

    function handleFilterByType(e) {
        e.preventDefault()
        dispatch(filterByType(e.target.value));
        setCurrentPage(1)
    }

    function handleFilterCreated(e) {
        e.preventDefault()
        dispatch(filterCreated(e.target.value))
        setCurrentPage(1)
        setOrder(`Order by ${e.target.value}`)//setOrder es un estado local vacio que para lo unico que lo voy a usar es 
    }//para cuando yo setee esta pagina-->setCurrentPage(1) me modifique el estado local y se renderice

    function handleSortName(e) {
        e.preventDefault()
        dispatch(orderByName(e.target.value));
        setCurrentPage(1)
        setOrder(`Order by ${e.target.value}`)
    }

    function handleSortByStrengh(e) {
        e.preventDefault()
        dispatch(orderByStrengh(e.target.value));
        setCurrentPage(1)
        setOrder(`Order by ${e.target.value}`)
    }



    return (
        <div className={styles.background}>
            <div className={styles.contentPadre}>

                <div className={styles.div3}>
                    <SearchBar />
                    <Link to='/'><button className={styles.btnBack1}>BACK</button></Link>
                    <Link to='/pokemons' ><button className={styles.btnCreate}>Create your Pokemon</button></Link>

                </div>


                <div className={styles.filters}>
                    <button onClick={e => { handleClick(e) }} className={styles.btnReload}>{/*Me resetea los personajes*/}
                        RELOAD..
                    </button>
                    <label className={styles.labels}>ORDER BY NAME
                        <select onChange={(e) => handleSortName(e)} className={styles.options}>
                            {/* <option value="name"></option>*/}
                            <option value="asc">A/Z</option>
                            <option value="des">Z/A</option>
                        </select>
                    </label>
                    <label className={styles.labels}>ORDER BY STRENGH
                        <select onChange={(e) => handleSortByStrengh(e)} className={styles.options}>
                            {/* <option value="strengh"></option> */}
                            <option value="max" >STRONGEST</option>
                            <option value="min">WEAKER</option>
                        </select>
                    </label>
                    <label className={styles.labels}>TYPES
                        <select onChange={(e) => handleFilterByType(e)} className={styles.options}>
                            <option value="all">AL TYPES</option>
                            {
                                alltypes?.map(t => {
                                    // console.log(alltypes)
                                    return (
                                        <option value={t.name} key={t.id}>{t.name}</option>
                                    )
                                })}
                        </select>
                    </label>
                    <label className={styles.labels}>SHOW ALL POKEMON
                        <select onChange={(e) => handleFilterCreated(e)} className={styles.options}>
                            {/* <option value="pokemon">SHOW POKEMON</option>*/}
                            {/* <option value="all">SHOW ALL POKEMON</option> */}
                            <option value="api" >EXISTING</option>
                            <option value="created">CREATED</option>
                        </select>
                    </label>
                </div>
                {/*  Top Pagination */}                

                <div>
                    <Pagination
                        pokemonsPerPage={pokemonsPerPage}//le paso el estado que tengo arriba
                        allPokemon={allPokemon.length}//le paso mi estado de allpokemon.lenght porque necesito un valor numerico
                        pagination={pagination}// como paginado, le paso mi constante paginado                    
                    />
                </div>

                {/* Cars */}

                <div className={styles.containerPokemon}>
                    {//mapeo el estado global y le paso cada iuna de las props que necesita mi card
                        currentPokemons?.map(e => {
                            return (
                                <Link to={'/pokemons/' + e.id} className={styles.card}>
                                    <Card name={e.name} image={e.image} types={e.types} attack={e.attack} key={e.id}/> {/*le paso las props que tenia como destructuring en el componente. y me traigo el estado global*/}
                                </Link>

                            )

                        })
                    }
                </div>
                {/* Lower Pagination */}
                <div>
                    <Pagination
                        pokemonsPerPage={pokemonsPerPage}//le paso el estado que tengo arriba
                        allPokemon={allPokemon.length}//le paso mi estado de allpokemon.lenght porque necesito un valor numerico
                        pagination={pagination}// como paginado, le paso mi constante paginado                    
                    />
                </div>


            </div>
        </div>
    )
}