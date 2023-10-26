import React, { FC } from "react";
import styles from "./Pokemon.module.scss";
import { Pokemon as TPokemon } from "../../types/pokemon";

type Props = {
  item: TPokemon;
};
const Pokemon: FC<Props> = ({ item }) => {
  return (
    <div className={styles.item} data-testid="pokemon">
      <img
        className={styles.img}
        src={item.sprites.front_default}
        alt={item.name}
      />
      <h3 className={styles.name}>{item.name}</h3>
      <div className={styles.types}>
        {item.types.map((el) => (
          <div className={styles.type} key={el.type.name} data-testid="type">
            {el.type.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Pokemon;
