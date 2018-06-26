import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, Alert, Share, TouchableHighlight, BackHandler, SafeAreaView, Platform } from 'react-native';
import ImageSlider from './react-native-image-slider';

import AppConfig from '../../resources/appconfig';
import Actions from '../../resources/actions';
import Network from '../../library/network';
import Colors from '../../resources/color';

import * as userActions from '../../reducer/action';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';


class PhotoPreviewer extends Component {

    static navigatorStyle = {
        navBarHidden: true
    };

    constructor(props) {
        super(props);
        this.state = {
            images: this.props.propsData
        }
    }

    render() {
        return (
            <ImageSlider
                style={{ flex: 1, alignSelf: 'center', backgroundColor: 'black' }}
                images={this.state.images}

            />
        );
    }


}



function mapStateToProps(state, ownProps) {
    return {
        service: state.service
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(userActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(PhotoPreviewer);


// customButtons={(position, move) => (
//     <View style={{
//         zIndex: 1, marginTop: -24, marginBottom: 16, justifyContent: 'center', alignItems: 'center', flexDirection: 'row',
//     }}>
//         {/* show scoller */}
//         {(this.convertMultimediaListIntoArray(item.childFeedIds).map((image, index) => {
//             return (
//                 <TouchableHighlight
//                     key={index}
//                     underlayColor="#000000"
//                     onPress={() => move(index)}
//                     style={{ margin: 2, width: 12, height: 12, opacity: 0.9, alignItems: 'center', justifyContent: 'center' }}>

//                     <Image style={{ height: 8, width: 8 }} source={(position === index) ? dotPinkIcon : dotGreyIcon} />

//                 </TouchableHighlight>
//             );
//         }))}
//     </View>
// )}