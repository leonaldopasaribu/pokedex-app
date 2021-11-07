import {
  GET_POKEMON_REQUEST,
  GET_POKEMON_SUCCESS,
  GET_POKEMON_ERROR,
} from "../../actionTypes";

import axios from "axios";

const baseUrl = "https://pokeapi.co/api/v2/pokemon";

export const getAllPokemons = (offset, limit) => async (dispatch) => {
  try {
    dispatch({ type: GET_POKEMON_REQUEST });

    const response = await axios
      .get(`${baseUrl}?limit=${limit}&offset=${offset}`)
      .catch((err) => console.log("Error:", err));

    dispatch({
      type: GET_POKEMON_SUCCESS,
      payload: response.data.results,
    });
  } catch (error) {
    dispatch({
      type: GET_POKEMON_ERROR,
      payload: error,
    });
  }
};
