/**
 * Created by maxiaobin on 17/3/23.
 */
/*
 * @providesModule NetInfoPage
 * 网络状态页
 * */
'use strict'

import React, {Component}from 'react';
import {
    View,
    Text,
    StyleSheet,
    Button
}from 'react-native';

export default class NetInfoPage extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <View style={[styles.container]}>
                <Text style={[styles.text]}>网络状态页</Text>
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