import React, { useEffect } from 'react';
import {screensEnabled} from 'react-native-screens';
import {Provider} from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
import store from './src/store/createStore';
import AppNavigator from './src/navigation/Appnavigator';

screensEnabled();

const App = () => {

    useEffect(() => {
        SplashScreen.hide();
    }, []);

    return (
        <Provider store={store}>
            <AppNavigator/>
        </Provider>
    );
};

export default App;
