import React, { FC, useEffect, useState } from "react";
import axios from "axios";
import { PokemonListItem } from "../../types/pokemonList";
import styles from "./PokemonList.module.scss";
import { POKEMON_URL } from "../../utils/api";
import Pokemon from "../Pokemon/Pokemon";
import PokemonListFilter from "./PokemonListFilter";
import { Link } from "react-router-dom";
import { Pokemon as TPokemon } from "../../types/pokemon";

const placeholderItem = {
  name: "loading",
  sprites: {
    front_default: "https://placehold.co/100x100",
  },
  types: [{ type: { name: "type" } }],
} as TPokemon;

const fetchPokemons = async (list: PokemonListItem[]) => {
  const response = await Promise.all(
    list.map((item) => {
      return axios.get(`${POKEMON_URL}/${item.name}`);
    })
  );
  return response.map((el) => el.data);
};

type Props = {
  list: PokemonListItem[];
};

const PokemonList: FC<Props> = ({ list }) => {
  const [types, setTypes] = useState<Array<string>>([]);
  const [selectedType, setSelectedType] = useState("");
  const [search, setSearch] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [pokemons, setPokemons] = useState<TPokemon[]>([]);
  const [filtredPokemons, setFiltredPokemons] = useState<TPokemon[]>([]);

  useEffect(() => {
    setIsLoading(true);

    fetchPokemons(list)
      .then((res) => {
        setPokemons(res);
        setFiltredPokemons(res);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [list]);

  useEffect(() => {
    setSelectedType("");
    if (pokemons.length > 0) {
      const types = pokemons
        .map((el) => el.types.map((type) => type.type.name))
        .flat();
      setTypes(Array.from(new Set(types)));
    }
  }, [pokemons]);

  useEffect(() => {
    if (selectedType || search) {
      setFiltredPokemons(
        pokemons.filter((el) => {
          const withType = el.types.some((type) => {
            return selectedType ? type.type.name === selectedType : true;
          });
          const searchByName = el.name
            .toLowerCase()
            .includes(search.toLowerCase().trim());
          return withType && searchByName;
        })
      );
    } else {
      setFiltredPokemons(pokemons);
    }
  }, [selectedType, pokemons, search]);

  if (isLoading) {
    return (
      <div>
        <div className={styles.list}>
          <Pokemon item={placeholderItem} />
        </div>
      </div>
    );
  }

  return (
    <div>
      <PokemonListFilter
        types={types}
        selectedType={selectedType}
        setSelectedType={setSelectedType}
        search={search}
        setSearch={setSearch}
      />
      <div className={styles.list}>
        {filtredPokemons.map((item) => (
          <Link key={item.name} to={`/pokemon/${item.name}`}>
            <Pokemon item={item} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PokemonList;
