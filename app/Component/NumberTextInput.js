/**
 * Created by maxiaobin on 17/3/27.
 */

/*
* @providesModule NumberTextInput
* */
'use strict'


import React, {Component}from 'react';
import {
    TextInput,
    Keyboard
}from 'react-native';

class NumberTextInput extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <TextInput onBlur={()=>{Keyboard.dismiss()}}
                       keyboardType="numeric"
                       placeholderTextColor='#999'
                       style={{fontSize:18,color:'#fc0',flex: 1}}
                       {...this.props} />
        );
    }
}

export {NumberTextInput};