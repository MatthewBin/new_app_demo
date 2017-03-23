/**
 * Created by maxiaobin on 17/3/23.
 */
/*
 * @providesModule NotePage
 * 笔记页
 * */
'use strict'

import React, {Component}from 'react';
import {
    View,
    Text,
    TextInput,
    Button,
    StyleSheet,
    ToastAndroid
}from 'react-native';

export default class NotePage extends Component {
    constructor(props) {
        super(props);
        this.state = {txt: '默认值'};
    }

    componentDidMount() {
        storage.load({
            key: 'test',

            // autoSync(默认为true)意味着在没有找到数据或数据过期时自动调用相应的sync方法
            autoSync: true,

            // syncInBackground(默认为true)意味着如果数据过期，
            // 在调用sync方法的同时先返回已经过期的数据。
            // 设置为false的话，则始终强制返回sync方法提供的最新数据(当然会需要更多等待时间)。
            syncInBackground: true,

            // 你还可以给sync方法传递额外的参数
            syncParams: {
                extraFetchOptions: {
                    // 各种参数
                },
                someFlag: true,
            },
        }).then(ret => {
            // 如果找到数据，则在then方法中返回
            // 注意：这是异步返回的结果（不了解异步请自行搜索学习）
            // 你只能在then这个方法内继续处理ret数据
            // 而不能在then以外处理
            // 也没有办法“变成”同步返回
            // 你也可以使用“看似”同步的async/await语法

            this.setState({txt: ret});
        }).catch(err => {
            //如果没有找到数据且没有sync方法，
            //或者有其他异常，则在catch中返回
            console.log(err.message);
            switch (err.name) {
                case 'NotFoundError':
                    // TODO;
                    break;
                case 'ExpiredError':
                    // TODO
                    break;
            }
        })
    }

    save() {
        // 使用key来保存数据。这些数据一般是全局独有的，常常需要调用的。
        // 除非你手动移除，这些数据会被永久保存，而且默认不会过期。
        storage.save({
            key: 'test',  // 注意:请不要在key中使用_下划线符号!
            rawData: this.state.txt,

            // 如果不指定过期时间，则会使用defaultExpires参数
            // 如果设为null，则永不过期
            expires: null
        });
        ToastAndroid.show('保存成功', ToastAndroid.SHORT);
    }

    render() {
        return (
            <View style={[styles.container]}>
                <Text style={[styles.text]}>笔记页</Text>
                <TextInput style={{height: 40, width: 200}}
                           value={this.state.txt}
                           onChangeText={(txt) => this.setState({txt})}/>
                <Text>{this.state.txt}</Text>
                <Button onPress={this.save.bind(this)} title='保存'/>
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
    text: {
        color: '#520',
    }
});