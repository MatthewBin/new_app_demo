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
    Button
}from 'react-native';
import * as Utils from 'Utils';

export default class MovieListPage extends Component{
    static navigationOptions = {
        title: ({ state }) => state.params.title,
        // 重写导航的头
        header: (navigation) => {
            const tintColor = '#333333';
            const left = (<Button onPress={() => navigation.goBack()} title='back'/>);
            const titleStyle = {
                fontSize: 16,
                fontWeight: 'normal'
            };
            const style = { backgroundColor: 'white' };
            return { tintColor, left, titleStyle, style };
        }
    }

    constructor(props){
        super(props);
        let ds = new ListView.DataSource({rowHasChanged:(r1,r2)=>r1!==r2});
        this.state={
            dataSource:ds.cloneWithRows([])
        }
    }

    componentDidMount(){
        Utils.Utils.postFetch(global.family_url+'movie/get_movie_list',{movie_name:this.props.navigation.state.params.movie},(success)=>{
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
            <TouchableOpacity onPress={()=>global.RootNavigator.goBack(null)}>
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