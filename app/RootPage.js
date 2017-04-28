/**
 * Created by maxiaobin on 17/3/23.
 */
/*
 * @providesModule RootPage
 * 根页面
 * */
'use strict'

import React, {Component}from 'react';
import {
    View,
    Text,
    StyleSheet,
    Keyboard,
    Platform,
    BackAndroid,
    ToastAndroid
}from 'react-native';

import * as Utils from 'Utils';

import {
    FuckNavigator
} from 'Router';
var canExitApp = false;

export default class RootPage extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        if (Platform.OS === 'android') {
            BackAndroid.addEventListener('hardwareBackPress', this.onBackAndroid);
        }
    }

    componentWillUnmount() {
        if (Platform.OS === 'android') {
            BackAndroid.removeEventListener('hardwareBackPress', this.onBackAndroid.bind(this));
        }
    }

    componentDidMount() {
        if (this.navigator) {
            global.RootNavigator = this.navigator._navigation;
        }
    }

    onBackAndroid() {
        console.log('--- back ---')
        if (canExitApp) {
            BackAndroid.exitApp();
        } else {
            canExitApp = true;
            setTimeout(() => {
                canExitApp = false;
            }, 3000);
            ToastAndroid.show('再按一次退出', ToastAndroid.SHORT);
        }
        return true;
    }


    render() {
        return (
            // <NotePage/>
            <FuckNavigator ref={navigator => this.navigator = navigator}
                              onNavigationStateChange={(prevState, currentState) => {
                                  const currentScreen = Utils.getCurrentRouteName(currentState);
                                  const prevScreen = Utils.getCurrentRouteName(prevState);

                                  global.currentScrern = currentScreen;
                                  {/*console.log('-- name --')*/}
                                  {/*console.log(prevScreen)*/}
                                  {/*console.log(currentScreen)*/}
                                  // global.reduxStore.dispatch(Actions.setScreenName('MainNavigator', currentScreen));
                                  // switch (currentScreen) {
                                  //     case 'VideoPage':
                                  //         StatusBar.setBarStyle('light-content', true);
                                  //         break;
                                  //     case 'VideoTestPage':
                                  //         StatusBar.setBarStyle('light-content', true);
                                  //         break;
                                  {/*case 'HomePage':*/
                                  }
                                  {/*break;*/
                                  }
                                  {/*default:*/
                                  }
                                  {/*StatusBar.setBarStyle('default', true);*/
                                  }
                                  {/*break;*/
                                  }
                                  {/*}*/
                                  }
                              }}/>
        );
    }
}