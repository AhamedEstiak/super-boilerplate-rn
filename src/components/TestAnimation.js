import React, {useEffect, useState} from 'react';
import {Animated, View, Image, Easing, TouchableOpacity, Text, ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const TestAnimation = () => {
    let animatedValue = new Animated.Value(0);
    let timeAnimation = new Animated.Value(0);

    // Similar to componentDidMount and componentDidUpdate:
    useEffect(() => {
        spin();
    });

    const spin = () => {
        animatedValue.setValue(0);
        Animated.timing(
            animatedValue,
            {
                toValue: 1,
                duration: 4000,
                easing: Easing.linear,
                // easing: Easing.inOut(Easing.quad),
                useNativeDriver: true
            },
        ).start(() => spin());
    };

    const rotateSpin = animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });

    const marginLeft = animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 200],
    });

    const opacity = animatedValue.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: [0, 1, 0],
    });
    const movingMargin = animatedValue.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: [0, 300, 0],
    });
    const textSize = animatedValue.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: [18, 32, 18],
    });
    const rotateX = animatedValue.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: ['0deg', '180deg', '0deg'],
    });

    const clockSize = 150;
    const rotation = timeAnimation.interpolate({
        inputRange: [0, 360],
        outputRange: ['0deg', '360deg'],
    });

    return (
        <ScrollView>
            {/*<Animated.View*/}
            {/*style={{*/}
            {/*marginLeft,*/}
            {/*// height: 30,*/}
            {/*// width: 40,*/}
            {/*padding: 25,*/}
            {/*margin: 25,*/}
            {/*backgroundColor: 'red'}}>*/}
            {/*<TouchableOpacity onPress={spin}>*/}
            {/*<Text style={{color: 'white'}}>Rotate image</Text>*/}
            {/*</TouchableOpacity>*/}
            {/*</Animated.View>*/}
            <Animated.Image
                source={{uri: 'https://s3.amazonaws.com/media-p.slid.es/uploads/alexanderfarennikov/images/1198519/reactjs.png'}}
                style={{
                    height: 200,
                    width: 227,
                    transform: [{rotate: rotateSpin}],
                }}
            />

            {/*<Animated.View*/}
            {/*style={{*/}
            {/*opacity,*/}
            {/*marginTop: 10,*/}
            {/*height: 30,*/}
            {/*width: 40,*/}
            {/*backgroundColor: 'blue'}} />*/}
            {/*<Animated.View*/}
            {/*style={{*/}
            {/*marginLeft: movingMargin,*/}
            {/*marginTop: 10,*/}
            {/*height: 30,*/}
            {/*width: 40,*/}
            {/*backgroundColor: 'orange',*/}
            {/*}}/>*/}

            {/*<Animated.Text*/}
            {/*style={{*/}
            {/*fontSize: textSize,*/}
            {/*marginTop: 10,*/}
            {/*color: 'green',*/}
            {/*}}>*/}
            {/*Animated Text!*/}
            {/*</Animated.Text>*/}


            {/*<Animated.View*/}
            {/*style={{*/}
            {/*transform: [{rotateX}],*/}
            {/*marginTop: 50,*/}
            {/*height: 30,*/}
            {/*width: 40,*/}
            {/*backgroundColor: 'black',*/}
            {/*}}>*/}
            {/*<Text style={{color: 'white'}}>Hello from TransformX</Text>*/}
            {/*</Animated.View>*/}

            <Animated.View
                height={clockSize}
                width={clockSize}
                style={{
                    marginTop: 100,
                    backgroundColor: '#dfdfdf',
                    transform: [{rotate: rotation}],
                }}
            >
                <View
                    style={{
                        height: clockSize / 2,
                        width: clockSize / 2,
                        borderRightWidth: 2,
                    }}/>
            </Animated.View>
        </ScrollView>
    );
};

export default TestAnimation;
