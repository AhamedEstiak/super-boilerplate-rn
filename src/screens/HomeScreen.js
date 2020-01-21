import React, {useEffect, useLayoutEffect} from 'react';
import {useSelector, useDispatch, connect} from 'react-redux';
import {View, Text, Button, Animated, StyleSheet} from 'react-native';
import Config from 'react-native-config';
import SimpleLineIcon from 'react-native-vector-icons/SimpleLineIcons';
import {loadWeather} from '../store/actions/weatherActions';
import TestAnimation from '../components/TestAnimation';

const HomeScreen = props => {
    const weather = useSelector(state => state.weather);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadWeather());

        console.log('mounted or updated');
        return () => {
            console.log('will unmount');
        };
    }, [dispatch]);

    console.log('api weather---', weather);

    return (
        <View style={styles.container}>
            {/*<SimpleLineIcon name="drop" size={30}/>*/}
            {/*<Text style={{color: 'black', fontFamily: 'Ubuntu-Regular'}}>{weather}</Text>*/}
            {/*<Text style={{color: 'black', fontFamily: 'Ubuntu-Medium'}}>{Config.ACCUAWEATHER_API_URL}</Text>*/}

            {/*<TestAnimation/>*/}

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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageStyle: {
        height: 200,
        width: 227,
    },
});

const mapStateToProps = (state) => {
    return {
        weather: state.weather,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadWeather: () => dispatch(loadWeather()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
