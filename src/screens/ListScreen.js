import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {View, Text, FlatList, Platform, StyleSheet} from 'react-native';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton';
import * as productsAction from '../store/actions/products';
import ListItem from '../components/ListItem';
import ProgressBar from '../components/ProgressBar';

const ListScreen = props => {
    const dispatch = useDispatch();
    const products = useSelector(state => state.products.products);
    const isLoading = useSelector(state => state.loading.isLoading);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(5);

    useEffect(() => {
        dispatch(productsAction.loadProducts(page, limit));
    }, [dispatch]);

    const renderItem = ({item}) => <ListItem item={item}/>;

    if (isLoading) {
        return <ProgressBar/>;
    }

    if (!isLoading && products.length === 0) {
        return (
            <View style={styles.centered}>
                <Text>No products found</Text>
            </View>
        );
    }

    return (
        <FlatList
            data={products}
            keyExtractor={item => item.id}
            renderItem={renderItem}
        />
    );
};

ListScreen.navigationOptions = navData => {
    return {
        title: 'List',
        headerLeft: (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                    title="Menu"
                    iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
                    onPress={() => navData.navigation.toggleDrawer()}
                />
            </HeaderButtons>
        ),
    };
};

const styles = StyleSheet.create({
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default ListScreen;
