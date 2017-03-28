/**
 * Created by maxiaobin on 17/3/24.
 */

/*
 * @providesModule Utils
 * */

'use strict'

import {
    Dimensions,
} from 'react-native';

const Utils = {};

Utils.postFetch = function (url, body, successCallback, errorCallback) {
    if (!url || !body) {
        if (errorCallback) {
            errorCallback("body或url为空");
        }
        return;
    }

    let initpara = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
    };

    fetch(url, initpara)
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw response;
            }
        }).then((responseJson) => {
        if (successCallback) {
            successCallback(responseJson);
        }
    }).catch((error) => {
        if (errorCallback) {
            errorCallback(error);
        }
    });

};

export const ScreenWidth = Dimensions.get('window').width;

export const ScreenHeight = Dimensions.get('window').height;

export {Utils};
