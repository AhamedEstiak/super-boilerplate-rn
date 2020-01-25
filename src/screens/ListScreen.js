import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
    View, Text, FlatList, Platform, StyleSheet, Button, ActivityIndicator,
    TouchableOpacity, ToastAndroid
} from 'react-native';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton';
import * as productsAction from '../store/actions/products';
import ListItem from '../components/ListItem';
import ProgressBar from '../components/ProgressBar';
import Colors from '../constants/Colors';

class ListScreen extends Component {
    willFocusSub;
    state = {
        products: [],
        page: 1,
        limit: 10,
        isLoading: false,
        isLoadMore: false,
        isRefreshing: false,
        listEnd: false,
        error: null,
    };


    loadProducts = async () => {
        const { page, isLoadMore } = this.state;

        this.setState({ error: null, listEnd: false });

        try {
            const fetchedProduct = await this.props.dispatch(productsAction.fetchProducts(this.state.page, this.state.limit));
            console.log('fetchedProduct--',fetchedProduct.length);

            if (fetchedProduct.length > 0) {
                this.setState({
                    products: page === 1 ? fetchedProduct : [...this.state.products, ...fetchedProduct],
                });

                // for showing loading from page number
                if (isLoadMore) {
                    ToastAndroid.show(`loading from page ${this.state.page}`, ToastAndroid.SHORT);
                }
            } else {
                this.setState({ listEnd: true });
                ToastAndroid.show('No more data found', ToastAndroid.SHORT);
            }
        } catch (err) {
            this.setState({error: err});
        }

        this.setState({
            isRefreshing: false,
            isLoading: false,
            isLoadMore: false
        });
    };


    componentDidMount() {
        this.setState({ isLoading: true });

        // it is a react navigation feature. when navigate from drawer every time calling otherwise not calling
        this.willFocusSub = this.props.navigation.addListener(
            'willFocus', this.loadProducts,
        );
    }

    componentWillUnmount() {
        this.willFocusSub.remove();
    }

    renderItem = ({item}) => <ListItem item={item}/>;

    handleRefresh = () => {
        this.setState(
            {
                page: 1,
                isRefreshing: true,
            },
            () => this.loadProducts(),
        );
    };

    // for pagination / infinite scrolling
    handleLoadMore = () => {
        console.log('called load more');
        this.setState(
            {
                page: this.state.page + 1,
                isLoadMore: true,
            },
            () => this.loadProducts(),
        );
    };

    renderFooter = () => {
        if (this.state.isLoading) return null;

        if (this.state.listEnd) {
            return (
                <View style={[styles.centered, { marginBottom: 10}]}>
                    <Text>~ End of catalogue ~</Text>
                </View>
            );
        }

        return (
            <View style={styles.centered}>
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={this.handleLoadMore}
                    style={styles.loadMore}
                >
                    <Text style={{color: '#fff'}}>Load more...</Text>
                    {this.state.isLoadMore ?
                        <ActivityIndicator size="small" color='#fff' />
                        : null
                    }
                </TouchableOpacity>

            </View>
        );
    };

    render() {
        const {error, isRefreshing, products, isLoading} = this.state;

        if (error) {
            return (
                <View style={styles.centered}>
                    <Text>An error occurred!</Text>
                    <Button
                        title="Try again"
                        onPress={this.loadProducts}
                        color={Colors.primary}
                    />
                </View>
            );
        }

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

        console.log('products---', products.length);

        return (
            <FlatList
                data={products}
                keyExtractor={item => item.id}
                renderItem={this.renderItem}
                onRefresh={this.handleRefresh}
                refreshing={isRefreshing}
                // onEndReached={this.handleLoadMore} // if uncomment infinite scroll automatic when reach end
                onEndReachedThreshold={0.5}
                ListFooterComponent={this.renderFooter}
                // ListEmptyComponent={this.renderListEmpty}
            />
        );
    }

}

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
    loadMore: {
        flexDirection: 'row',
        padding: 10,
        backgroundColor: 'green',
        marginTop: 10,
        marginBottom: 10,
    },
});

export default connect(null)(ListScreen);
