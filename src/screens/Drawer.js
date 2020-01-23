import React from 'react';
import SafeAreaView, {SafeAreaProvider} from 'react-native-safe-area-view';
import {DrawerItems} from 'react-navigation-drawer';
import {Text} from 'react-native';

const Drawer = props => {
    return (
        <SafeAreaProvider>
            <SafeAreaView forceInset={{top: 'always', horizontal: 'never'}}>
                <Text>Drawer</Text>
                <DrawerItems {...props} />
            </SafeAreaView>
        </SafeAreaProvider>
    );
};

export default Drawer;