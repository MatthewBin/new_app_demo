/**
 * Created by maxiaobin on 17/4/21.
 * @providesModule Router
 */

'use strict'


import { StackNavigator, DrawerNavigator, TabNavigator, TabView } from 'react-navigation';

import MoviesPage from 'MoviesPage';
import MovieListPage from 'MovieListPage';
// import VideoPage from 'VideoPage';

export const MovieNavigator = StackNavigator({
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
    initialRouteName: 'MoviesPage',
    headerMode: 'screen',
});
