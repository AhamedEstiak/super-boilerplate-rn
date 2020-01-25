import axios from 'axios';
import {faceListFilterUrl} from '../../constants/Urls';

export const fetchProducts = (page, limit) => {
    return async (dispatch, getState) => {
        try {
            const response = await axios.get(faceListFilterUrl(page, limit));

            if (!response.data.status === 200) {
                throw new Error('Something went wrong!');
            }

            const resData = await response.data;

            // console.log('resData-----', resData);
            // dispatch({
            //     type: LOAD_PRODUCTS,
            //     products: resData,
            // });
            return resData;
        } catch (err) {
            console.log('error in actions:::',err);
            throw err;
        }
    };
};