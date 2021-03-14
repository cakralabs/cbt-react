import { applyMiddleware, createStore } from "redux";
import thunkMiddleware from "redux-thunk";
import { verifyAuth } from "./controller/Auth";
import rootReducer from "./reducers";
import {loadState,saveState} from "./reducers";



export default function configureStore(persistedState) {
  //console.log(persistedState);
  persistedState = loadState();
  const store = createStore(
    rootReducer,
    persistedState,
    applyMiddleware(thunkMiddleware)
  );
  //console.log(persistedState);
  store.subscribe(() => {
    saveState(store.getState());
  })

  store.dispatch(verifyAuth(store.getState()));
  return store;
}