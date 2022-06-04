import React from 'react';
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { useEffect } from 'react';
import {getDetail} from '../../redux/actions'
import { useParams } from 'react-router-dom';
import errorPikachu from '../Assets/Card/Pikachu.gif';
import loadingGif from '../Assets/loadingGif.gif';
import styles from '../DetailsPokemon/DetailPokemon.module.css'

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
    <div className={styles.div}>
       
            <Link className={styles.link} to='/home'><button className={styles.btn}>BACK</button></Link> 
            {
            pokemonDetail.length>0?
                        
            <div className={styles.div1}>
                <h1 className={styles.h1}>{pokemonDetail[0].name.toUpperCase()}</h1>
              <div className={styles.div2}>
                <img className={styles.img} src={pokemonDetail[0].image?pokemonDetail[0].image:errorPikachu} alt='' width="150em" height="200em"/>
                <div className={styles.div3}>
                    <p className={styles.p}>HP:{pokemonDetail[0].hp}</p>
                    <p  className={styles.p}>ATTACK:{pokemonDetail[0].attack}</p>
                    <p  className={styles.p}>DEFENSE:{pokemonDetail[0].defense}</p>
                    <p  className={styles.p}>SPEED:{pokemonDetail[0].speed}</p>
                    <p  className={styles.p}>WEIGHT:{pokemonDetail[0].weight}</p>
                    <p  className={styles.p}>HEIGHT:{pokemonDetail[0].height}</p>
                    <h3  className={styles.h3}>TYPES:</h3>
                    <p className={styles.p}>{pokemonDetail[0].types.map(m=><div key={m.id}>{m.name}</div>)}</p> 
                </div>
              </div>                
            </div>:
            <div className={styles.Loading}>               
                <img className={styles.img} src={loadingGif} alt=''/>           
                
                <p className={styles.load}>Loading...</p>

            </div>
        }       
        
    </div>
)

}