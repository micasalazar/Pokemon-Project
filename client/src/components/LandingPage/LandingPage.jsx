import React from 'react';
import {Link} from 'react-router-dom';

export default function LandinPage(){
    return (
        <div>
            <div>
                <h1>WELCOME TO POKEMON APP</h1>
                <Link to='/home'>
                <button>Enter</button>
                </Link>

            </div>

        </div>
    )
}
