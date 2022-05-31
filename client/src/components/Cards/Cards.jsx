import React from 'react';
import img from '../Assets/TransparentBall.png'

export default function Card({name, image, types, attack}){
    var regexUrl = /[a-z0-9-\.]+\.[a-z]{2,4}\/?([^\s<>\#%"\,\{\}\\|\\\^\[\]`]+)?$/;
    return(
        <div>
            <h3>{name}</h3>
            <h5>TYPE: {types?.map(e=><div key={e}>{e.name}</div>)}</h5>
            <h5>ATTACK:{attack}</h5>
            <img src={regexUrl.test(image)?image:img} alt={`Img about${name}`} width='200px' height='250px'/>
        </div>
    )

}