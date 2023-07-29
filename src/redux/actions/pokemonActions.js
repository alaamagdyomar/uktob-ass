import { loading, getAllPokemon, getPokemon, getPokemonDatabase, getSearch, nextPage } from "../slices/pokemonSlice";

const baseUrl = "https://pokeapi.co/api/v2/";


export const fetchAllPokemon = () => async (dispatch) => {
  dispatch(loading());

  try {
    const res = await fetch(`${baseUrl}pokemon?limit=20`);
    const data = await res.json();
    dispatch(getAllPokemon(data));

    const allPokemonData = await Promise.all(
      data.results.map((pokemon) => fetch(pokemon.url).then((res) => res.json()))
    );
    dispatch(getPokemonDatabase(allPokemonData));
  } catch (error) {
    // Dispatch an error action if needed
  }
};

export const fetchPokemon = (name) => async (dispatch) => {
  dispatch(loading());

  try {
    const res = await fetch(`${baseUrl}pokemon/${name}`);
    const data = await res.json();
    dispatch(getPokemon(data));
  } catch (error) {
    // Dispatch an error action if needed
  }
};

export const fetchPokemonDatabase = () => async (dispatch) => {
  dispatch(loading());

  try {
    const res = await fetch(`${baseUrl}pokemon?limit=100000&offset=0`);
    const data = await res.json();
    dispatch(getPokemonDatabase(data.results));
  } catch (error) {
    // Dispatch an error action if needed
  }
};

export const fetchNextPage = () => async (dispatch, getState) => {
  const { next } = getState().pokemon;

  dispatch(loading());

  try {
    const res = await fetch(next);
    const data = await res.json();
    dispatch(nextPage(data));

    // Fetch the new Pokemon data
    const newPokemonData = await Promise.all(
      data.results.map((pokemon) => fetch(pokemon.url).then((res) => res.json()))
    );
    // Dispatch success action with the fetched data
    // (Note: You may want to store the data in a normalized format or separate the fetching logic)
    dispatch(getPokemonDatabase(newPokemonData));
  } catch (error) {
    // Dispatch an error action if needed
  }
};

export const realTimeSearch = (search) => (dispatch, getState) => {
  dispatch(loading());

  const { pokemonDataBase } = getState().pokemon;
  const res = pokemonDataBase.filter((pokemon) =>
    pokemon.name.includes(search.toLowerCase())
  );
  dispatch(getSearch(res));
};
