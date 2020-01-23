import React from 'react';
import {
    View,
    ActivityIndicator,
    StyleSheet,
    Platform
} from 'react-native';
import Colors from '../constants/Colors';

const ProgressBar = () => (
    <View style={styles.container}>
        <View style={styles.progressBar}>
            <ActivityIndicator size="large" color={Colors.primary} />
        </View>
    </View>
);

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'transparent',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    progressBar: {
        flex: 1,
        justifyContent: 'center'
    }
});

export default ProgressBar;
