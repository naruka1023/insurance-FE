import { createStore, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
const initialState = {
  plans: [],
  premiumResult: null
};

const reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case "SET_PLANS":
      return { ...state, plans: action.payload };
    case "SET_PREMIUM":
      return { ...state, premiumResult: action.payload };
    default:
      return state;
  }
};

export const store = createStore(reducer, applyMiddleware(thunk));
