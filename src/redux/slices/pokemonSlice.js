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
      state.allPokemon = action.payload;
      state.next = action.payload.next;
      state.loading = false;
    },
    getPokemon(state, action) {
      state.pokemon = action.payload;
      state.loading = false;
    },
    getPokemonDatabase(state, action) {
      state.pokemonDataBase = [ ...state.pokemonDataBase , ...action.payload ];
      state.allPokemon = [...state.pokemonDataBase, ...action.payload];
      state.loading = false;
    },
    getSearch(state, action) {
      state.searchResults = action.payload; 
      state.pokemonDataBase = action.payload;   
      state.loading = false;
    },
    nextPage(state, action) {
      state.allPokemon = [...state.allPokemon, ...action.payload.results];
      state.next = action.payload.next;
      state.loading = false;
    },
  },
});

export const { loading, getAllPokemon, getPokemon, getPokemonDatabase, getSearch, nextPage } = pokemonSlice.actions;


export default pokemonSlice.reducer;
