/**
 * Created by maxiaobin on 17/3/28.
 */

/*
 * @providesModule VideoTest
 * */
'use strict'

import React, {Component}from 'react';
import {
    View,
    Text,
    StyleSheet,
    Button,
    TouchableWithoutFeedback,
    Alert,
    Slider
}from 'react-native';
import Video from 'react-native-video';
import {ScreenWidth, ScreenHeight} from 'Utils';
import Orientation from 'react-native-orientation';
export default class VideoTest extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cur_time: 0,
            cur_time_slider: 0,
            total_time: 0,
            manual: false,
            manual_value: 0,
            paused: false,
            source:{uri: 'http://192.168.1.24:4096/media/test.mp4'}
        };
    }

    componentWillMount() {
        // //只允许横屏
        // Orientation.lockToLandscapeLeft();
    }

    componentDidMount() {
        // Later to trigger fullscreen
        this.player.presentFullscreenPlayer()

        // To set video position in seconds (seek)
        this.player.seek(0)

        // var initial = Orientation.getInitialOrientation();
        // if (initial === 'PORTRAIT') {
        //     console.log('竖屏')
        // } else {
        //     console.log('横屏')
        // }
    }

    second_to_str(second) {
        let m = parseInt(parseInt(second) / 60).toString();
        let s = parseInt(parseInt(second) % 60).toString();
        m = m.length == 1 ? '0' + m : m;
        s = s.length == 1 ? '0' + s : s;
        return m + ':' + s;
    }

    click() {
        let value = this.state.paused ? false : true;
        this.setState({
            paused: value
        });
    }

    sliderValueChange(last) {
        this.setState({
            manual: true,
            manual_value: last
        });
    }

    slidingComplate(last) {
        this.setState({
            manual: false,
        });
        this.player.seek(last);
    }

    render() {
        return (
            <TouchableWithoutFeedback style={{flex: 1}} onPress={this.click.bind(this)}>
                <View style={[styles.container]}>
                    <Video
                        source={this.state.source} // 视频的URL地址，或者本地地址，都可以.
                        ref={(ref) => {
                            this.player = ref
                        }}
                        rate={1.0}                   // 控制暂停/播放，0 代表暂停paused, 1代表播放normal.
                        volume={1.0}                 // 声音的放大倍数，0 代表没有声音，就是静音muted, 1 代表正常音量 normal，更大的数字表示放大的倍数
                        muted={false}                // true代表静音，默认为false.
                        paused={this.state.paused}               // true代表暂停，默认为false
                        resizeMode="contain"           // 视频的自适应伸缩铺放行为，
                        repeat={false}                // 是否重复播放
                        playInBackground={false}     // 当app转到后台运行的时候，播放是否暂停
                        playWhenInactive={false}     // [iOS] Video continues to play when control or notification center are shown. 仅适用于IOS
                        onLoadStart={this.loadStart.bind(this)} // 当视频开始加载时的回调函数
                        onLoad={this.setDuration.bind(this)}    // 当视频加载完毕时的回调函数
                        onProgress={this.setTime.bind(this)}    //  进度控制，每250ms调用一次，以获取视频播放的进度
                        onEnd={this.onEnd.bind(this)}           // 当视频播放完毕后的回调函数
                        onError={this.videoError.bind(this)}    // 当视频不能加载，或出错后的回调函数
                        style={styles.player}/>
                    <View style={[styles.slider_container]}>
                        <Text style={[styles.text, {marginLeft: 3}]}>{this.second_to_str(this.state.cur_time)}</Text>
                        <Slider style={{flex: 1}}
                                maximumValue={this.state.total_time}
                                value={this.state.cur_time_slider}
                                onValueChange={this.sliderValueChange.bind(this)}
                                onSlidingComplete={this.slidingComplate.bind(this)}/>
                        <Text style={[styles.text, {marginRight: 3}]}>{this.second_to_str(this.state.total_time)}</Text>
                    </View>
                    <Button title='back' onPress={()=>{}}/>
                    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                        {
                            this.state.paused ?
                                <Text style={{
                                    textAlign: 'center',
                                    color: '#F00',
                                    fontSize: 50,
                                    backgroundColor: '#0004'
                                }}>暂停</Text>
                                : null
                        }
                        {
                            this.state.manual ?
                                <Text style={{
                                    textAlign: 'center',
                                    color: '#FFF',
                                    fontSize: 50,
                                    backgroundColor: '#0004'
                                }}>{this.second_to_str(this.state.manual_value)}</Text>
                                : null
                        }
                    </View>
                </View>
            </TouchableWithoutFeedback>

        );
    }

    loadStart(msg) {
        console.log('loadStart');
        console.log(ScreenWidth)
        console.log(ScreenHeight)
        console.log(msg);
    }

    setDuration(msg) {
        this.setState({
            total_time: msg.duration,
        })
    }

    setTime(msg) {
        this.setState({
            cur_time: msg.currentTime,
        });

        if (!this.state.manual) {
            this.setState({
                cur_time_slider: msg.currentTime,
            })
        }
    }

    onEnd(msg) {
        console.log('onEnd');
        console.log(msg);
    }

    videoError(msg) {
        console.log('videoError');
        console.log(msg);
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
    },
    player: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
    slider_container: {
        backgroundColor: '#fff4',
        flexDirection: 'row',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0
    },
    text: {
        color: '#ccc'
    },
    back:{
        position: 'absolute',
        top: 10,
        left: 10,
    }
});