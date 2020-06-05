import { combineReducers, createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import thunk from 'redux-thunk';

const reducers = combineReducers();
const middleware = [thunk]
const composeWithDevToolsEnhancer = composeWithDevTools({
  name: "Redux Dev Tools Logger",
  trace: true,
})(applyMiddleware(...middleware))

export const store = createStore(reducers, composeWithDevToolsEnhancer);

export const persister = persistStore(store);
