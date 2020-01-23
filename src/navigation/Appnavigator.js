import React from 'react';
import {Platform, View, Text} from 'react-native';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import {createStackNavigator} from 'react-navigation-stack';
import Icon from 'react-native-vector-icons/Ionicons';
import HomeScreen from '../screens/HomeScreen';
import AuthScreen from '../screens/AuthScreen';
import Colors from '../constants/Colors';
import Drawer from '../screens/Drawer';
import ListScreen from '../screens/ListScreen';

const defaultNavOptions = {
    headerStyle: {
        backgroundColor: Platform.OS === 'android' ? Colors.purple : '',
    },
    headerTitleStyle: {
        fontFamily: 'Ubuntu-Medium'
    },
    headerBackTitleStyle: {
        fontFamily: 'Ubuntu-Regular'
    },
    headerTintColor: Platform.OS === 'android' ? '#fff' : Colors.purple,
};

const AuthNavigator = createStackNavigator(
    {
        Auth: AuthScreen,
    },
    {
        defaultNavigationOptions: defaultNavOptions
    }
);

const HomeNavigator = createStackNavigator(
    {
        Home: HomeScreen,
    },
    {
        defaultNavigationOptions: defaultNavOptions,
    }
);

const ListNavigator = createStackNavigator(
    {
        ListScreen: ListScreen,
    },
    {
        defaultNavigationOptions: defaultNavOptions,
    }
);

const DrawerNavigator = createDrawerNavigator(
    {
        List: ListNavigator,
        Home: HomeNavigator,
    },
    {
        // drawerBackgroundColor: Colors.purple,
        // drawerPosition: 'right',
        contentOptions: {
            activeTintColor: Colors.primary,
        },
        contentComponent: props => <Drawer {...props} />,
    },
);

const MainNavigator = createSwitchNavigator(
    {
        // Auth: AuthNavigator,
        Drawer: DrawerNavigator,
    },
);


export default createAppContainer(MainNavigator);
