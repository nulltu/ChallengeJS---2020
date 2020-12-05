import operationsReducer from './reducers/operationReducer';
const {combineReducers} = require('redux');

const rootReducer = combineReducers({
    operations: operationsReducer
})

export default rootReducer