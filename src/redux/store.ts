import { combineReducers, createStore } from "redux";
import { authReducer } from "./authState";
import { configureStore } from "@reduxjs/toolkit";

//single rudcer - before react 18
//export const store = createStore(authReducer)

//multiple reducers - before react 18
// const reducers = combineReducers({authState:authReducer});
// const store = createStore(reducers);

//react 18 -> reducers for store
const reducers = combineReducers({ authState: authReducer });
export const store = configureStore({ reducer: reducers });

//The STORE will give us the 3: DISPATCH, GETSTATE,
//SUBSCRIBE. They come from the Store.

//to npm install for this project
// @types/redux 
// @reduxjs/toolkit 
// redux 