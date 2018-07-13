import React, { Component } from 'react';
import { TouchableOpacity, Text, View, Image, TouchableHighlight } from 'react-native';

import Actions from '../../resources/actions';
import Color from '../../resources/color';
import DataRetriver from '../../library/dataRetriver';
import Network from '../../library/network';
import Constants from '../../resources/constants';

import CloseIcon from '../../resources/icons/cancel.png';

export default class CartListTile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            item: this.props.item
        }
    }

    render() {
        let { item } = this.state;
        return (
            <View
                style={{ flex: 1, flexDirection: 'row', backgroundColor: 'white', elevation: 1, marginVertical: 4, borderRadius: 2, paddingBottom: 12, marginHorizontal: 2 }}>

                <View style={{ flexDirection: 'row', flex: 1 }}>
                    <View style={{ marginVertical: 16, marginStart: 16, marginEnd: 8 }}>
                        <Image
                            source={{ uri: 'http://www.asuntospublicos.org/upload/2017/12/26/21-table-decoration-ideas-for-a-summer-garden-party-garden-table-setting-l-fa89616578453aaf.jpg' }}
                            style={{ height: 56, width: 56, resizeMode: 'cover', borderRadius: 2 }}
                        />
                    </View>
                    <View style={{ flex: 1, marginTop: 8 }}>
                        <Text style={{ fontSize: 16, paddingHorizontal: 8, paddingVertical: 4, color: 'black' }}>
                            {item.name}
                        </Text>
                        {/* <Text style={{ fontSize: 14, paddingHorizontal: 8, color: 'grey' }}>
                        hey
                        </Text> */}
                        <View style={{ flexDirection: 'row', paddingVertical: 4, paddingHorizontal: 8 }}>
                            <Text style={{ fontSize: 16, color: Color.AccentColor, }}>{'₹ ' + item.price}</Text>

                        </View>
                    </View>
                </View>
                <View
                    style={{ justifyContent: 'space-between', marginEnd: 8, marginTop: 12 }}>
                    <TouchableOpacity style={{ alignItems: 'flex-end' }} >
                        <Image source={CloseIcon} style={{ width: 16, height: 16 }} />
                    </TouchableOpacity>
                    <Text
                        style={{ borderColor: 'grey', borderWidth: 1, color: 'grey', fontSize: 14, paddingVertical: 2, paddingHorizontal: 4, borderRadius: 4, textAlign: 'center' }}>
                        {item.qty}
                    </Text>
                </View>
            </View>
        );
    }
}



