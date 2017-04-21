/**
 * Created by maxiaobin on 17/4/21.
 * @providesModule Router
 */

'use strict'


import {StackNavigator, DrawerNavigator, TabNavigator, TabView} from 'react-navigation';

import MoviesPage from 'MoviesPage';
import MovieListPage from 'MovieListPage';
// import VideoPage from 'VideoPage';
import NotePage from 'NotePage';
import JoinFamilyPage from 'JoinFamilyPage';

export const MovieNavigator = StackNavigator({
    JoinFamilyPage:{
        screen: JoinFamilyPage
    },
    MoviesPage: {
        screen: MoviesPage
    },
    MovieListPage: {
        screen: MovieListPage
    },
    // VideoPage: {
    //     screen: VideoPage
    // }
}, {
    initialRouteName: 'JoinFamilyPage',
    headerMode: 'screen',
});

export const MainTabNavigator = TabNavigator({
    NotePage: {
        screen: NotePage
    },
    MovieNavigator: {
        screen: MovieNavigator
    },
}, {
    initialRouteName: 'NotePage',
    headerMode: 'screen',
});

