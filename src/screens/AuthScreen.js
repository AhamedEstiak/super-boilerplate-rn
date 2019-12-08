import React from 'react';
import {View, Text, Button} from 'react-native';

const AuthScreen = props => {
    return (
        <View>
            <Text>Auth Screen</Text>
            <Button title="Go Home" onPress={() => props.navigation.replace('Home')} />
        </View>
    );
};

export default AuthScreen;
