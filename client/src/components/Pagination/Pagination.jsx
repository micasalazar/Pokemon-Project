import React from 'react';
import styles from '../Pagination/Pagination.module.css'
// 1-Declaro mi paginado y me traigo destructurado y me traigo props de mi otro componente
function Pagination({pokemonsPerPage, allPokemon, pagination, }) {
  const pageNumbers=[];//2- Declaro un arreglo vacio
  for (let i = 0; i < Math.ceil(allPokemon/pokemonsPerPage); i++){//3- Voy a recorrer un arreglo en el que voy a tomar un  numero redondo que resulta de dividir todos mis pokemones, por los pokemones por pagina
      pageNumbers.push(i+1)//4- Pusheo el numero que me dio en el paso anterior en mi pageNumbers
  }
  return(
    //   Este componente va a ser el que renderice los numeritos en si
    <nav>
        <ul className={styles.pages}>
            {pageNumbers?.map(number=>(
                <li key={number.id} className={styles.li}>
                <button onClick={()=> pagination(number)} className={styles.btnPagination} >{number}</button>
                </li>
            ))}
        </ul>
    </nav>
  )
}

export default Pagination