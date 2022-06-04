import React from 'react'
import {useState} from 'react';
import {useDispatch} from 'react-redux';
import {getByName} from '../../redux/actions'
import styles from '../SearchBar/SearchBar.module.css';

function SearchBar() {
let dispatch = useDispatch();
let [name, setName] = useState("");//me creo un estado local
//   Armo la logica del renderizado
// Me guardo en mi estado local lo que vaya apareciendo en ese input. FUNCION PARA INPUT
function handleInputChange(e){
e.preventDefault()
// El value del input va a tomar el value del UseState. Entonces voy a setear el name en 
setName(e.target.value)//tomo el value del input
console.log(name)
} 
// FUNCION PARA EL BUTTON
function handleSubmit(e){
e.preventDefault()
// Despacho la accion
dispatch(getByName(name))//este name va a ser mi estado local. Voy a ir guardando lo que esta tipiando el usuario en mi estado local name.Entonces lo que yo tengo en mi estado local derrepente, va a llegarle despues a mi accion, que va a llamar al back y le va a pasar esto(lo que esta escribiendo el usuario)
setName('')
}
  return(
      <div className={styles.cont}>
          <input className={styles.search}
          type='text'
          placeholder='Search Pokemon...'
          value={name}
          onChange={(e)=> handleInputChange(e)}
          />
          <button
           type='submit' onClick={(e)=>handleSubmit(e)} className={styles.btnS}>Search your Pokemon</button>
      </div>
  )
}

export default SearchBar