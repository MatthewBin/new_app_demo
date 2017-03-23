/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

import RootPage from 'RootPage';
import RNStorage from 'ReactNativeStorage';

AppRegistry.registerComponent('new_app_demo', () => RootPage);

// 这段代码加在fetch中，解决fetch中不能设置Timeout问题，参考Evernote
// //[使得fetch增加TimeOut属性,手动添加]
// if (init != null && init.timeout != null) {
//     xhr.timeout = init.timeout;
// }