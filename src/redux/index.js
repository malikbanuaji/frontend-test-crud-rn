const {createStore, combineReducers} = require('redux');
const {ContactReducer} = require('./reducer');

const rootReducer = combineReducers({
  contact: ContactReducer,
});

const store = createStore(rootReducer);

export {store};
