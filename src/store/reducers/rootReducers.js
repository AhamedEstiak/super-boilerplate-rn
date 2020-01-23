import {combineReducers} from 'redux';
import weatherReducer from './weather';
import productsReducer from './products';
import loadingReducer from './loading';

const rootReducer = combineReducers({
    weather: weatherReducer,
    products: productsReducer,
    loading: loadingReducer,
});

export default rootReducer;
