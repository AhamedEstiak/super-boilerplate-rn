import {GET_WEATHER} from '../actions/actionTypes';


const initialState = {
    weather: '',
};

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_WEATHER:
            return {
                weather: action.weather
            };
        default:
            return state;
    }
};
