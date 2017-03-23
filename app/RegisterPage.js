/**
 * Created by maxiaobin on 17/3/23.
 */

/*
 * @providesModule RegisterPage
 * 注册页
 * */
'use strict'

import React, {Component}from 'react';
import {
    View,
    Text,
    StyleSheet
}from 'react-native';

export default class RegisterPage extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <View style={[styles.container]}>
                <Text style={[styles.text]}>注册页</Text>
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
        color:'#fc0',
    }
});
