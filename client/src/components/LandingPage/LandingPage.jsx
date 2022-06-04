import React from 'react';
import {Link} from 'react-router-dom';
import styles from '../LandingPage/LandingPage.module.css'

export default function LandinPage(){
    return (
        <div className={styles.background}>
            <div className={styles.title}>
                <h1>WELCOME TO POKEMON APP</h1>
                {/* <p className={styles.neon2}>POKEMON APP</p> */}
            </div>
            <br/>
            <Link to='/home'>
            <button className={styles.btn}>START</button>
            </Link>

        </div>
    )
}
