/**
 * Created by maxiaobin on 17/4/21.
 * @providesModule MovieListPage
 */
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
import * as Utils from 'Utils';

export default class MovieListPage extends Component{
    constructor(props){
        super(props);
        let ds = new ListView.DataSource({rowHasChanged:(r1,r2)=>r1!==r2});
        this.state={
            dataSource:ds.cloneWithRows([])
        }
    }

    componentDidMount(){
        Utils.Utils.postFetch('http://192.168.1.23:4096/api/movie/get_movie_list',{movie_name:'movies'},(success)=>{
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
                <Text style={[styles.text]}>电影列表页</Text>
                <ListView dataSource={this.state.dataSource}
                          enableEmptySections={true}
                          renderRow={this.renderRow.bind(this)}/>
            </View>
        );
    }

    renderRow(rowData){
        return (
            <TouchableOpacity onPress={()=>Alert.alert(rowData.url)}>
                <Text>{rowData.name}</Text>
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