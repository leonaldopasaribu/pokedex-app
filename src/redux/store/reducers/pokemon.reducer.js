import {
  GET_POKEMON_REQUEST,
  GET_POKEMON_SUCCESS,
  GET_POKEMON_ERROR,
} from "../../actionTypes";

const initialState = {
  isLoading: false,
  data: [],
  message: null,
};

const pokemonReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_POKEMON_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case GET_POKEMON_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: action.payload,
        message: action.payload.Error,
      };
    case GET_POKEMON_ERROR:
      return {
        ...state,
        isLoading: false,
        message: action.payload.Error,
      };
    default:
      return state;
  }
};

export default pokemonReducer;
