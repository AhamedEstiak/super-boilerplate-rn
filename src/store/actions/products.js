import axios from 'axios';
import {faceListFilterUrl} from '../../constants/Urls';
import {LOAD_PRODUCTS} from './actionTypes';
import {startLoading, stopLoading} from './loading';

export const fetchProducts = (page, limit) => {
    return async (dispatch, getState) => {
        // any async code you want!
        dispatch(startLoading());
        try {
            const response = await axios.get(faceListFilterUrl(page, limit));

            if (!response.data.status === 200) {
                dispatch(stopLoading());
                throw new Error('Something went wrong!');
            }

            const resData = await response.data;

            // console.log('resData-----', resData);
            dispatch({
                type: LOAD_PRODUCTS,
                products: resData,
            });
            dispatch(stopLoading());
            return resData;
        } catch (err) {
            console.log('error in actions:::',err);
            dispatch(stopLoading());
            throw err;
        }
    };
};