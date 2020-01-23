import React from 'react';
import {View, Text, Button, Animated, FlatList, StyleSheet, Platform} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Colors from '../constants/Colors';
import formatMoney from '../utils/FormatMoney';

const ListItem = ({ item }) => {
    return (
        <View style={styles.itemContainer}>
            <Text style={[styles.faceTextStyle, {fontSize: item.size}]}>{item.face}</Text>
            {/*<Ionicons name="md-list" size={20}/>*/}
            <Text style={styles.priceTextStyle}>${formatMoney(item.price)}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    itemContainer: {
        padding: 20,
        margin: 20,
        backgroundColor: Colors.accent,
        // justifyContent: 'center',
        // alignItems: 'center',
    },
    faceTextStyle: {
        fontFamily: 'Ubuntu-Medium',
        color: Colors.purple,
        // fontSize: 20,
        alignSelf: 'center'
    },
    priceTextStyle: {
        fontFamily: 'Ubuntu-Regular',
        color: Colors.dark,
        fontSize: 14,
        marginTop: 15
    }
});

export default ListItem;