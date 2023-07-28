import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allPokemon: [],
  pokemon: {},
  pokemonDataBase: [],
  searchResults: [],
  next: "",
  loading: false,
};

const pokemonSlice = createSlice({
  name: "pokemon",
  initialState,
  reducers: {
    loading(state) {
      state.loading = true;
    },
    getAllPokemon(state, action) {
      // ... (Copy the entire getAllPokemon reducer from the previous code snippet)
    },
    getPokemon(state, action) {
      // ... (Copy the entire getPokemon reducer from the previous code snippet)
    },
    getPokemonDatabase(state, action) {
      // ... (Copy the entire getPokemonDatabase reducer from the previous code snippet)
    },
    getSearch(state, action) {
      // ... (Copy the entire getSearch reducer from the previous code snippet)
    },
    nextPage(state, action) {
      // ... (Copy the entire nextPage reducer from the previous code snippet)
    },
  },
});

export const { loading, getAllPokemon, getPokemon, getPokemonDatabase, getSearch, nextPage } = pokemonSlice.actions;

export default pokemonSlice.reducer;
