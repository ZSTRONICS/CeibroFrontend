import createSagaMiddleware from "redux-saga";
import { createStore, applyMiddleware, Store, } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import "regenerator-runtime/runtime";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import rootSaga from "./sagas/rootSagas";
import { rootReducer } from "./reducers";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const sagaMiddleware = createSagaMiddleware();

const store: Store = createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware))
);

let persistor = persistStore(store);

sagaMiddleware.run(rootSaga);
const myStore = { store, persistor };

// remove the saved data in LocalStorage
export function purgeStoreStates(){
  persistor.purge()
}

if(window.location.pathname==='/login'){  
  purgeStoreStates()
}
export default myStore;
