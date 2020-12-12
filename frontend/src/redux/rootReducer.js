import operationsReducer from './reducers/operationReducer';
import userReducer from './reducers/userReducer';
const {combineReducers} = require('redux');

const rootReducer = combineReducers({
    operations: operationsReducer,
    users: userReducer
})

export default rootReducer