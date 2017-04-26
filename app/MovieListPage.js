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
    Button,
    ToastAndroid
}from 'react-native';
import * as Utils from 'Utils';

export default class MovieListPage extends Component {
    static navigationOptions = {
        title: ({state}) => state.params.title,
        // // 重写导航的头
        // header: (navigation) => {
        //     const tintColor = '#333333';
        //     const left = (<Button onPress={() => navigation.goBack()} title='back'/>);
        //     const titleStyle = {
        //         fontSize: 16,
        //         fontWeight: 'normal'
        //     };
        //     const style = {backgroundColor: 'white'};
        //     return {tintColor, left, titleStyle, style};
        // }
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
    }

    componentDidMount() {
        Utils.Utils.postFetch(global.family_url + 'movie/get_movie_list', {
            movie_name: this.props.navigation.state.params.movie,
            dynimic_root_path:global.family_url
        }, (success) => {
            this.setState(prevState => ({
                dataSource: prevState.dataSource.cloneWithRows(success.msg)
            }));
        }, (err) => {
            console.log(err)
        });
    }

    render() {
        return (
            <View style={[styles.container]}>
                <View style={styles.header}>
                    <Text style={styles.header_text}>{this.props.navigation.state.params.title}</Text>
                </View>
                <ListView dataSource={this.state.dataSource}
                          enableEmptySections={true}
                          renderRow={this.renderRow.bind(this)}/>
            </View>
        );
    }

    renderRow(rowData) {
        console.log(rowData)
        return (
            <TouchableOpacity style={[styles.movie_list_item]}
                              onPress={()=>global.RootNavigator.navigate('PlayerPage',{title:rowData.name,url:rowData.url})}
                              //onPress={() => global.RootNavigator.goBack(null)}
            >
                <Text style={[styles.iconStyle,{marginLeft:20}]}>&#xe605;</Text>
                <Text style={styles.text}>{rowData.name}</Text>
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
    movie_list_item: {
        marginHorizontal: 10,
        marginVertical: 3,
        borderRadius: 4,
        backgroundColor: '#4bceac',
        height: 45,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    text: {
        fontSize: 20,
        color: '#fff',
        marginLeft: 40
    },
    iconStyle: {
        color: '#fff',
        fontFamily: 'iconfont',
        fontSize: 30
    }
});