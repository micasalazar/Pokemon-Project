import React from "react";
import img from "../Assets/Card/Pikachu.gif";
import styles from "../Cards/Cards.module.css";

export default function Card({ name, image, types, attack }) {
  var regexUrl =
    /[a-z0-9-\.]+\.[a-z]{2,4}\/?([^\s<>\#%"\,\{\}\\|\\\^\[\]`]+)?$/;
  return (
    <div className={styles.contentCards}>
      <div className={styles.wrapper}>
        <div className={styles.clashCard}>
          <div className={styles.clashCard__image }>
            <img
              className={styles.clashCard__imagePokemon}
              src={regexUrl.test(image)? image : img}
              alt={`Img about${name}`}
              width="200px"
              height="250px"              
            />
          </div>

          <div className={styles.cardName}>
            <h3>{name.toUpperCase()}</h3>
          </div>
            <h5 className={styles.h5}>
              TYPE:{" "}
              {types?.map((e) => (
                <div key={e.id}>{e.name.toUpperCase()}</div>
              ))}
            </h5>
            <h5 className={styles.attack}>ATTACK:{attack}</h5>
          
        </div>
      </div>
    </div>//---------->End contentCards
  );
}
