import Config from 'react-native-config';

const faceApiBase = Config.FACE_API_URL;

export const faceListUrl = faceApiBase + '/api/products';
export const faceListFilterUrl = (page, limit, sort) => faceApiBase + `/api/products?_page=${page}&_limit=${limit}&_sort=${sort}`;