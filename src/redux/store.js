import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";

const initialState = {
  token: null,
};

// Reducer to handle token state
function reducer(state = initialState, action) {
  switch (action.type) {
    case "SET_TOKEN":
      console.log("SET_TOKEN");
      return { ...state, token: action.payload };
    default:
      return state;
  }
}

// const store = createStore(reducer);
const store = createStore(reducer, applyMiddleware(thunkMiddleware));

export default store;
