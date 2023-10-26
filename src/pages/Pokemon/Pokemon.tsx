import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchPokemon } from "../../store/slices/pokemonSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/storeHooks";
import styles from "./Pokemon.module.scss";
import PokemonCard from "../../components/Pokemon/Pokemon";

const Pokemon = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const { pokemon, isLoading, error } = useAppSelector(
    (state) => state.pokemon
  );

  useEffect(() => {
    if (slug) {
      dispatch(fetchPokemon(slug));
    }
  }, [dispatch, slug]);

  const navigateToPokemonList = () => {
    navigate("/");
  };

  if (isLoading || !pokemon) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <button className={styles.btn} onClick={navigateToPokemonList}>
        {"<-"} go to pokemon list
      </button>

      <div className={styles.header}>
        <PokemonCard item={pokemon} />
      </div>

      <div className="mb-5">
        <h2 className={styles.subtitle}>Stats: </h2>
        <div className={styles.list}>
          {pokemon.stats.map((item, idx: number) => (
            <div key={idx} className="p-2 border">
              <p className="text-md text-center font-bold uppercase mb-1 border-b">
                {item.stat.name}
              </p>
              <p>
                Base stat: <span className="font-bold">{item.base_stat}</span>
              </p>
              <p>
                Effort: <span className="font-bold">{item.effort}</span>
              </p>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h2 className={styles.subtitle}>Moves: </h2>
        <div className={styles.list}>
          {pokemon.moves.map((item) => (
            <div
              key={item.move.name}
              className="py-1 px-2 border first-letter:uppercase"
            >
              {item.move.name.replaceAll("-", " ")}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Pokemon;
