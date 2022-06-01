import React from 'react';
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { useEffect } from 'react';
import {getDetail} from '../../redux/actions'
import { useParams } from 'react-router-dom';
import errorPikachu from '../Assets/errorPikachu.jpg'
import loadingGif from '../Assets/loadingGif.gif'

export default function DetailPokemon(){
// console.log(props)
const dispatch = useDispatch()
const {id} = useParams()
console.log(id)
let pokemonDetail = useSelector((state)=>state.details)
console.log(pokemonDetail)
useEffect(()=>{
    dispatch(getDetail(id))// de esta forma accedo al id de ese detalle
},[dispatch])

return(
    <div>
        <div>
            <Link to='/home'><button>BACK</button></Link> 
            {
            pokemonDetail.length>0?
            <div>
                <h1>{pokemonDetail[0].name.toUpperCase()}</h1>
              <div>
                <img src={pokemonDetail[0].image?pokemonDetail[0].image:errorPikachu} alt='' width="150em" height="200em"/>
                <div>
                    <p>Hp:{pokemonDetail[0].hp}</p>
                    <p>Attack:{pokemonDetail[0].attack}</p>
                    <p>Defense:{pokemonDetail[0].defense}</p>
                    <p>Speed:{pokemonDetail[0].speed}</p>
                    <p>Weight:{pokemonDetail[0].weight}</p>
                    <p>Height:{pokemonDetail[0].height}</p>
                    <h3>Types:</h3>
                    <p>{pokemonDetail[0].types.map(m=><div key={m.id}>{m.name}</div>)}</p> 
                </div>
              </div>                
            </div>:
            <div>
                <img src={loadingGif} alt=''/>
                <p>Loading...</p>

            </div>
        }       
        </div>
    </div>
)

}