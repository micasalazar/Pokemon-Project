import React from 'react';

export default function Card({name, image, types, attack}){
    return(
        <div>
            <h3>{name}</h3>
            <h5>TYPE: {types}</h5>
            <h5>ATTACK:{attack}</h5>
            <img src={image} alt={`Img about${name}`} width='200px' height='250px'/>
        </div>
    )

}