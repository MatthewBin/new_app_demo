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
    TouchableOpacity
}from 'react-native';
import * as Utils from 'Utils';

export default class MoviesPage extends Component {
    static navigationOptions = {
        tabBar:{
            label: '电影',
            icon: ({ tintColor }) => (
                <Text style={[styles.iconStyle,{color:tintColor,fontSize:20}]}>&#xe606;</Text>),
        },
        header: {
            visible: false,
        },
    }

    constructor(props) {
        super(props);
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows([])
        }
        this.GetMovies = setInterval(() => {
            if (global.family_url) {
                Utils.Utils.postFetch(global.family_url + 'movie/get_list', {}, (success) => {
                    this.setState(prevState => ({
                        dataSource: prevState.dataSource.cloneWithRows(success.msg)
                    }));
                    clearInterval(this.GetMovies);
                }, (err) => {
                    console.log(err)
                });
            }
        }, 3000);
    }

    render() {
        return (
            <View style={[styles.container]}>
                <View style={styles.header}>
                    <Text style={styles.header_text}>电影列表</Text>
                </View>
                <ListView dataSource={this.state.dataSource}
                          enableEmptySections={true}
                          renderRow={this.renderRow.bind(this)}/>
            </View>
        );
    }

    renderRow(rowData, sectionID, rowID) {
        return (
            <TouchableOpacity style={[styles.movie_item,{backgroundColor:rowID%2==0?'#a2d367':'#51c2ea'}]}
                onPress={() => global.RootNavigator.navigate('MovieListPage', {title: rowData, movie: rowData})}>
                <Text style={[styles.iconStyle,{marginLeft:20}]}>&#xe687;</Text>
                <Text style={styles.text}>{rowData}</Text>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    header: {
        backgroundColor: '#222',
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom:10
    },
    header_text: {
        fontSize: 25,
        color: '#fff'
    },
    movie_item: {
        marginHorizontal: 10,
        marginVertical: 5,
        borderRadius:4,
        height:100,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'flex-start'
    },
    text: {
        fontSize:30,
        color: '#666',
        marginLeft:40
    },
    iconStyle: {
        color: '#fff',
        fontFamily: 'iconfont',
        fontSize: 50
    }
});