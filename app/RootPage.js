/**
 * Created by maxiaobin on 17/3/23.
 */
/*
 * @providesModule RootPage
 * 根页面
 * */
'use strict'

import React, {Component}from 'react';
import {
    View,
    Text,
    StyleSheet
}from 'react-native';

import NavigationPage from 'NavigationPage';
import NetInfoPage from 'NetInfoPage';
import NotePage from 'NotePage';
import { TabNavigator } from 'react-navigation';

const RootTabNavigator = TabNavigator({
    NavigationPage:{screen:NavigationPage},
    Note: {screen: NotePage},
    NetInfo: {screen: NetInfoPage},
})

export default class RootPage extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <View style={[styles.container]}>
                {/*<NavigationPage/>*/}
                <RootTabNavigator/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#052',
    },
});