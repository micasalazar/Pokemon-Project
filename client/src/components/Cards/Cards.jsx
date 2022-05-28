import React from 'react';

export default function Card({name, image, type}){
    return(
        <div>
            <h3>{name}</h3>
            <h5>TYPE: {type}</h5>
            <img src={image} alt={`Img about${name}`} width='200px' height='250px'/>

        </div>
    )

}