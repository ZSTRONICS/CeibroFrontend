import { Store, applyMiddleware, createStore, } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import createSagaMiddleware from "redux-saga";
import "regenerator-runtime/runtime";
import { rootReducer } from "./reducers";
import rootSaga from "./sagas/rootSagas";

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
export function purgeStoreStates() {
  persistor.purge()
}

// if (window.location.pathname === '/login') {
//   purgeStoreStates()
// }
export default myStore;
