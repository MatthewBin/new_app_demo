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
    StyleSheet,
    Button
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
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(bodyObj)
        }).then((response) => {
            console.log(response);
            if (response.ok) {
                return response.json();
            } else {

            }
        }).then((responseJson) => {
            console.log(responseJson);
        }).catch((err) => {
            console.log(err);
        })
    }

    render(){
        const { navigate } = this.props.navigation;
        return(
            <View style={[styles.container]}>
                <Text style={[styles.text]}>登录页</Text>
                <Button
                    onPress={() => navigate('Register', { user: 'Lucy' })}
                    title="跳转"
                />
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
