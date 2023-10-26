import React, { FC } from "react";
import clsx from "clsx";
import styles from "./PokemonListFilter.module.scss";

type Props = {
  types: string[];
  selectedType: string;
  setSelectedType: (type: string) => void;
  search: string;
  setSearch: (value: string) => void;
};
const PokemonListFilter: FC<Props> = (props) => {
  const { types, selectedType, setSelectedType, search, setSearch } = props;

  return (
    <div className={styles.filter}>
      <div className={styles.types}>
        {types.map((type) => (
          <div
            key={type}
            className={clsx(
              styles.type,
              type === selectedType && styles.typeActive
            )}
            onClick={() => {
              setSelectedType(selectedType === type ? "" : type);
            }}
          >
            {type}
          </div>
        ))}
      </div>
      <div className={styles.search}>
        <span className="">Search:</span>
        <input
          className={styles.input}
          type="text"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search by name"
        />
      </div>
    </div>
  );
};

export default PokemonListFilter;
