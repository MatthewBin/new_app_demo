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
    Button,
    NetInfo,
    ToastAndroid
}from 'react-native';

export default class NetInfoPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isConnected: null,
            connectionInfo: null,
            isConnectionExpensive:null
        };
    }

    componentDidMount() {
        NetInfo.isConnected.addEventListener(
            'change',
            this._handleConnectivityChange.bind(this)
        );
        //检测网络是否连接
        NetInfo.isConnected.fetch().done(
            (isConnected) => {
                this.setState({isConnected});
            }
        );
        //检测网络连接信息
        NetInfo.fetch().done(
            (connectionInfo) => {
                this.setState({connectionInfo});
            }
        );
    }

    componentWillUnmount() {
        NetInfo.isConnected.removeEventListener(
            'change',
            this._handleConnectivityChange
        );
    }

    _handleConnectivityChange(isConnected) {
        ToastAndroid.show((isConnected ? 'online' : 'offline'), ToastAndroid.SHORT);
        this.setState({
            isConnectionExpensive:NetInfo.isConnectionExpensive,
            isConnected:isConnected,
        });
        //检测网络连接信息
        NetInfo.fetch().done(
            (connectionInfo) => {
                this.setState({connectionInfo});
            }
        );
    }

    render() {
        return (
            <View style={[styles.container]}>
                <Text style={[styles.text]}>网络状态页</Text>
                <View >
                    <Text style={styles.welcome}>
                        当前的网络状态：{this.state.isConnected ? '网络在线' : '离线'}
                    </Text>
                    <Text style={styles.welcome}>
                        当前网络连接类型：{this.state.connectionInfo}
                    </Text>
                    <Text style={styles.welcome}>
                        当前连接网络是否计费：{this.state.isConnectionExpensive === true ? '需要计费' : '不要'}
                    </Text>
                </View>
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