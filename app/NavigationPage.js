/**
 * Created by maxiaobin on 17/3/23.
 */
/*
 * @providesModule NavigationPage
 * 导航页
 * */
'use strict'

import React, {Component}from 'react';
import {
    View,
    StyleSheet
}from 'react-native';
import { TabNavigator } from 'react-navigation';
import LoginPage from 'LoginPage';
import RegisterPage from 'RegisterPage';

const MTabNavigator = TabNavigator({
    Login: {screen: LoginPage},
    Register: {screen: RegisterPage},
});

export default class NavigationPage extends Component{
    constructor(props){
        super(props);
    }
    static navigationOptions = {
        title: 'MTabNavigator',
    };

    render(){
        return(
            <View style={[styles.container]}>
                <MTabNavigator/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#CCC',
    },
    text:{
        color:'#520',
    }
});