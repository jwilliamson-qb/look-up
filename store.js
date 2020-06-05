import { combineReducers, createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import AsyncStorage from '@react-native-community/async-storage';
import thunk from 'redux-thunk';

import { businesses } from './stores/businesses';

const businessesPersistConfig = {
  key: 'businesses',
  storage: AsyncStorage,
};

const reducers = combineReducers({
  businesses: persistReducer(businessesPersistConfig, businesses),
});
const middleware = [thunk];
const composeWithDevToolsEnhancer = composeWithDevTools({
  name: 'Redux Dev Tools Logger',
  trace: true,
})(applyMiddleware(...middleware));

export const store = createStore(reducers, composeWithDevToolsEnhancer);

export const persister = persistStore(store);
