import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View, Text, FlatList, Platform, StyleSheet, Button, ActivityIndicator } from 'react-native';
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
        isRefreshing: false,
        error: null,
    };


    loadProducts = async () => {
        const {page } = this.state;
        this.setState({isRefreshing: true, error: null});

        try {
            const fetchedPr = await this.props.dispatch(productsAction.fetchProducts(this.state.page, this.state.limit));
            this.setState({
                products: page === 1 ? fetchedPr : [...this.state.products, ...fetchedPr],
            });
        } catch (err) {
            this.setState({error: err });
        }
        this.setState({isRefreshing: false});
    };


    componentDidMount() {
        this.willFocusSub = this.props.navigation.addListener(
            'willFocus', this.loadProducts
        );
    }

    componentWillUnmount() {
        this.willFocusSub.remove();
    }

    renderItem = ({item}) => <ListItem item={item}/>;

    renderFooter = () => (
        <View style={styles.footer}>

        </View>
    );

    handleLoadMore = () => {
        this.setState({
            page: this.state.page + 1
        }, () => this.loadProducts);
    };

    render() {
        const { error, isRefreshing, products } = this.state;
        const { isLoading, loadedProducts } = this.props;

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
                onRefresh={this.loadProducts}
                refreshing={isRefreshing}
                onEndReached={this.handleLoadMore}
                onEndReachedThreshold={0.5}
                // ListFooterComponent={}
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
    footer: {
        marginTop: 10,
        alignItems: 'center'
    }
});

const mapStateToProps = state => {
    return {
        isLoading: state.loading.isLoading,
        loadedProducts: state.products.products,
    };
};

export default connect(mapStateToProps)(ListScreen);
