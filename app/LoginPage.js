/**
 * Created by maxiaobin on 17/3/23.
 */

/*
 * @providesModule LoginPage
 * 登录页
 * */
'use strict'

import React, {Component}from 'react';
import {
    View,
    Text,
    StyleSheet
}from 'react-native';

export default class LoginPage extends Component{
    constructor(props){
        super(props);
    }

    componentDidMount() {
        let request = 'http://192.168.1.34:4096/api/test/get_list';
        let bodyObj = {name: 'xxx', pwd: 'xxx'};
        fetch(request, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                // 'Timeout':5
            },
            body: JSON.stringify(bodyObj)
        }).then((response) => {
            console.log('--------1--------');
            console.log(response);
            if (response.ok) {
                return response.json();
            } else {

            }
        }).then((responseJson) => {
            console.log('--------2--------');
            console.log(responseJson);
        }).catch((err) => {
            console.log('--------3--------');
            console.log(err);
        })
    }

    render(){
        return(
            <View style={[styles.container]}>
                <Text style={[styles.text]}>登录页</Text>
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
        color:'#339',
    }
});
