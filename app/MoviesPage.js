/**
 * Created by maxiaobin on 17/3/23.
 */
/*
* @providesModule MoviesPage
* 电影页
* */
'use strict'

import React, {Component}from 'react';
import {
    View,
    Text,
    ListView,
    StyleSheet,
    TouchableOpacity,
    Alert
}from 'react-native';
import VideoPlyer from 'VideoPlayer';
import * as Utils from 'Utils';

export default class MoviesPage extends Component{
    static navigationOptions = {
        title: '电影页',
        header: {
            visible: true,
        },
    }

    constructor(props){
        super(props);
        let ds = new ListView.DataSource({rowHasChanged:(r1,r2)=>r1!==r2});
        this.state={
            dataSource:ds.cloneWithRows([])
        }
    }

    componentDidMount(){
        console.log('---')
        Utils.Utils.postFetch('http://192.168.1.23:4096/api/movie/get_list',{},(success)=>{
            this.setState(prevState => ({
                dataSource: prevState.dataSource.cloneWithRows(success.msg)
            }));
        },(err)=>{
            console.log(err)
        });
    }

    render(){
        return(
            <View style={[styles.container]}>
                <Text style={[styles.text]}>电影页</Text>
                <Text style={styles.iconStyle}>&#xe677;</Text>
                <Text style={styles.iconStyle}>&#xe67d;</Text>
                {/*<VideoPlyer/>*/}
                <ListView dataSource={this.state.dataSource}
                          enableEmptySections={true}
                          renderRow={this.renderRow.bind(this)}/>
            </View>
        );
    }

    renderRow(rowData){
        return (
            <TouchableOpacity onPress={()=>Alert.alert(rowData)}>
                <Text>{rowData}</Text>
            </TouchableOpacity>
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
    },
    iconStyle: {
        color: 'orange',
        fontFamily:'iconfont',
        fontSize: 30
    }
});