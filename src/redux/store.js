const {createStore, combineReducers} = require('redux');
const {ContactReducer} = require('./reducer');

function configureStore() {
  const rootReducer = combineReducers({
    contact: ContactReducer,
  });
  const store = createStore(rootReducer);
  return store;
}

export {configureStore};
