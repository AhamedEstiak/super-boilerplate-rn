import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {View, Text, Button, Animated } from 'react-native';
import SimpleLineIcon from 'react-native-vector-icons/SimpleLineIcons';
import {loadWeather} from '../store/actions/weatherActions';

const HomeScreen = props => {
    const weather = useSelector(state => state.weather);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadWeather());
    }, [dispatch]);

    return (
        <View>
            <SimpleLineIcon name="drop" size={30}/>
            <Text style={{color: 'black', fontFamily: 'Ubuntu-Light'}}>{weather}</Text>

            <Button
                title="Go to Auth"
                onPress={() => props.navigation.replace('Auth')}
            />
            <Button
                title="Go back"
                onPress={() => props.navigation.goBack()}
            />
        </View>
    );
};

HomeScreen.navigationOptions = {
    title: 'Home',
};

export default HomeScreen;
