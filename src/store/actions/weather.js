import {GET_WEATHER} from './actionTypes';

export const loadWeather = () => {
    return async dispatch => {
        try {
            dispatch({
                type: GET_WEATHER,
                weather: '100deg'
            });
        } catch (err) {
            throw err;
        }
    };
};
