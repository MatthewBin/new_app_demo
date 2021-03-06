/**
 * Created by maxiaobin on 17/4/21.
 * @providesModule Router
 */

'use strict'


import {StackNavigator, DrawerNavigator, TabNavigator, TabView} from 'react-navigation';

import MoviesPage from 'MoviesPage';
import MovieListPage from 'MovieListPage';
import PlayerPage from 'PlayerPage';
import NotePage from 'NotePage';
import JoinFamilyPage from 'JoinFamilyPage';


export const MovieNavigator = StackNavigator({
    MoviesPage: {
        screen: MoviesPage
    },
    MovieListPage: {
        screen: MovieListPage
    }
}, {
    initialRouteName: 'MoviesPage',
    headerMode: 'screen',
});

export const MainTabNavigator = TabNavigator({
    NotePage: {
        screen: NotePage
    },
    MovieNavigator: {
        screen: MovieNavigator
    },
    JoinFamilyPage: {
        screen: JoinFamilyPage
    },
}, {
    ...TabNavigator.Presets.iOSBottomTabs,
    initialRouteName: 'NotePage',
    headerMode: 'screen',
    tabBarOptions:{
        activeTintColor:'#fc0',
        activeBackgroundColor:'#000',
        inactiveTintColor:'#fff',
        inactiveBackgroundColor:'#000',
    }
});

export const FuckNavigator = StackNavigator({
    MainTabNavigator: {
        screen: MainTabNavigator
    },
    PlayerPage: {
        screen: PlayerPage
    }
}, {
    initialRouteName: 'MainTabNavigator',
    headerMode: 'screen',
});

