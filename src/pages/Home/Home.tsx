import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/storeHooks";
import { fetchPokemonList } from "../../store/slices/pokemonSlice";
import PokemonList from "../../components/PokemonList/PokemonList";
import Pagination from "../../components/Pagination/Pagination";

const Home = () => {
  const dispath = useAppDispatch();
  const { list, isLoading } = useAppSelector((state) => state.pokemon);

  const [page, setPage] = useState(1);
  const limit = 12;

  useEffect(() => {
    dispath(fetchPokemonList({ limit, page }));
  }, [dispath, limit, page]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <PokemonList list={list.results} />

      <div className="flex mt-5 justify-center">
        <Pagination
          onPageChange={setPage}
          totalCount={list.count}
          currentPage={page}
          pageSize={limit}
        />
      </div>
    </div>
  );
};

export default Home;
