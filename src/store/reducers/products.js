import { LOAD_PRODUCTS } from '../actions/actionTypes';

const initialState = {
    products: [],
};

export default (state = initialState, action) => {
    switch (action.type) {
        case LOAD_PRODUCTS:
            return {
                products: action.products
            };
        default:
            return state;
    }
};
