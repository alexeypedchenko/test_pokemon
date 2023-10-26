import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { POKEMON_URL } from "../../utils/api";
import { PokemonList } from "../../types/pokemonList";
import { Pokemon } from "../../types/pokemon";

export const fetchPokemon = createAsyncThunk<
  Pokemon,
  string,
  { rejectValue: string }
>("pokemon/fetchPokemon", async (slug, thunkApi) => {
  const { rejectWithValue } = thunkApi;

  try {
    const response = await axios.get<Pokemon>(`${POKEMON_URL}/${slug}`);
    console.log("response:", response);

    if (!response.data) {
      throw new Error();
    }

    return response.data;
  } catch (err) {
    return rejectWithValue("Something went wrong");
  }
});
export const fetchPokemonList = createAsyncThunk<
  PokemonList,
  { limit: number; page: number },
  { rejectValue: string }
>("pokemon/fetchPokemonList", async (params, thunkApi) => {
  const { limit, page } = params;
  const { rejectWithValue } = thunkApi;

  try {
    const response = await axios.get<PokemonList>(POKEMON_URL, {
      params: {
        limit,
        offset: (page - 1) * limit,
      },
    });

    if (!response.data) {
      throw new Error();
    }

    return response.data;
  } catch (err) {
    return rejectWithValue("Something went wrong");
  }
});

type PokemonState = {
  isLoading: boolean;
  value: number;
  list: PokemonList;
  error?: string;
  pokemon: Pokemon | null;
};

const initialState: PokemonState = {
  isLoading: false,
  value: 0,
  list: {
    count: 0,
    next: null,
    previous: null,
    results: [],
  },
  pokemon: null,
};

export const pokemonSlice = createSlice({
  name: "pokemon",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(fetchPokemonList.pending, (state) => {
        state.isLoading = true;
        state.error = undefined;
      })
      .addCase(fetchPokemonList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = undefined;
        state.list = action.payload;
      })
      .addCase(fetchPokemonList.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(fetchPokemon.pending, (state) => {
        state.isLoading = true;
        state.error = undefined;
      })
      .addCase(fetchPokemon.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = undefined;
        state.pokemon = action.payload;
      })
      .addCase(fetchPokemon.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount } = pokemonSlice.actions;

export default pokemonSlice.reducer;
