import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllPokemon,
  realTimeSearch,
  fetchNextPage,
} from "@/redux/actions/pokemonActions"; 
import Router from "next/router";

export default function Home() {
  const dispatch = useDispatch();
  const allPokemonData = useSelector((state) => state.pokemon.pokemonDataBase);
  const searchResults = useSelector((state) => state.pokemon.searchResults);
  const next = useSelector((state) => state.pokemon.next);
  const loading = useSelector((state) => state.pokemon.loading);
  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(fetchAllPokemon());
  }, [dispatch]);

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(realTimeSearch(search));
  };

  const displaySearchResults = () => {
    // Implement the display logic for search results if needed
    // Example: return <div>{/* JSX to display search results */}</div>;
  };

  return (
    <main>
      <form action="" className="search-form" onSubmit={handleSearch}>
        <div className="input-control">
          <input
            type="text"
            value={search}
            onChange={handleChange}
            placeholder="Search for a Pokemon..."
          />
          <button className="submit-btn" type="submit">
            Search
          </button>
        </div>
      </form>

      {search && searchResults.length > 0 && (
        <div className="search-results">{displaySearchResults()}</div>
      )}

      <div className="all-pokemon">
        {allPokemonData.length > 0 ? (
          allPokemonData.map((pokemon) => (
            <div
              key={pokemon.id}
              className="card"
              onClick={() => {
                Router.push(`/pokemon/${pokemon.name}`);
              }}
            >
              <div className="card-image">
              <img
                src={pokemon.sprites.other.home.front_shiny}
                alt={pokemon.name}
              />              </div>              
              <div className="card-body">
                <h3>{pokemon.name}</h3>
                <p>More Details &nbsp; &rarr;</p>
              </div>
            </div>
          ))
        ) : loading ? (
          <h1>Loading...</h1>
        ) : (
          <h1>No Pokemon found</h1>
        )}
      </div>
      <div className="next">
        {next && (
          <button className="next-btn" onClick={() => dispatch(fetchNextPage())}>
            Load More &darr;
          </button>
        )}
      </div>
    </main>
  );
}
