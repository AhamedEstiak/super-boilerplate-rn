import {Platform, View, Text, SafeAreaView } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createDrawerNavigator, DrawerItems } from 'react-navigation-drawer';
import { createStackNavigator } from 'react-navigation-stack';
import HomeScreen from '../screens/HomeScreen';
import AuthScreen from '../screens/AuthScreen';
import Colors from '../constants/Colors';
import React from 'react';

const defaultNavOptions = {
    headerStyle: {
        backgroundColor: Platform.OS === 'android' ? Colors.purple : ''
    },
    headerTitleStyle: {
        // fontFamily: 'open-sans-bold'
    },
    headerBackTitleStyle: {
        // fontFamily: 'open-sans'
    },
    headerTintColor: Platform.OS === 'android' ? '#fff' : Colors.purple,
};

const AuthNavigator = createStackNavigator(
    {
        Auth: AuthScreen
    },
    {
        defaultNavigationOptions: defaultNavOptions
    }
);

// const TabNavigator = createBottomTabNavigator({
//     Home: HomeScreen,
//     Settings: SettingsScreen,
// });

const HomeNavigator = createDrawerNavigator(
    {
        Home: HomeScreen,
    },
    {
        contentOptions: {
            activeTintColor: Colors.primary
        },
        contentComponent: props => {
            return (
                <View style={{ flex: 1, paddingTop: 20 }}>
                    <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
                        <DrawerItems {...props} />
                        <Text>Drawer</Text>
                    </SafeAreaView>
                </View>
            );
        }
    }
);

// const AppNavigator = createSwitchNavigator({
//     Auth: AuthNavigator,
//     Home: HomeNavigator
// });

const AppNavigator = createStackNavigator(
    {
        Auth: AuthScreen,
        Home: HomeScreen
    },
    {
        initialRouteName: 'Home',
    },
);

export default createAppContainer(AppNavigator);
