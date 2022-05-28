import React from 'react';
import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getPokemon} from '../../redux/actions';
import {Link} from 'react-router-dom';
import Card from '../Cards/Cards'

export default function Home(){

const dispatch = useDispatch()// para utilizar esta constante y despachar las acciones
const allPokemon = useSelector((state)=> state.filterPokemon)//me traigo a esta constante todo lo que esta en el estado de filterPokemon

    // Nos tremos del estado los pokemon cuando el componente se monta
useEffect(()=>{
    dispatch(getPokemon())
},[dispatch]);

function handleClick(e){
// e.preventDefault();
dispatch(getPokemon());
}


    return(
        <div>
            <div>
            <Link to='/pokemons'>Create your Pokemon</Link>
            <button onClick={e=>{handleClick(e)}}>{/*Me resetea los personajes*/}
                Get all Pokemon
            </button>
                <div>
                    <select>
                        <option value="order">ORDER BY NAME</option>
                        <option value="asc">A/Z</option>
                        <option value="des">Z/A</option>
                    </select>
                    <select>
                        <option value="order">ORDER BY STRENGH</option>
                        <option value="max">STRONGEST</option>
                        <option value="min">WEAKER</option>
                    </select>
                    <select>
                    <option value="types">FILTER BY TYPE</option>
                    <option value="all">ALL TYPES</option>
                    <option value="api">EXISTING</option>
                    <option value="created">CREATED</option>
                    </select>
                    {//mapeo el estado global y le paso cada iuna de las props que necesita mi card
                        allPokemon?.map(e=>{
                            return(
                                <fragment>
                                    <Link to= {'/home' + e.id}>
                                    <Card name={e.name} image={e.image} type={e.type} key={e.id}/> {/*le paso las props que tenia como destructuring en el componente. y me traigo el estado global*/}
                                    </Link>
                                </fragment>

                            )
                        
                        })
                    }
                </div>
            </div>
        </div>
    )
}