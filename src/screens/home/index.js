import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableHighlight,Dimensions } from 'react-native';
import { Navigation } from 'react-native-navigation';

import ImageSlider from './react-native-image-slider';
import Actions from '../../resources/actions';


import dotGreyIcon from '../../resources/icons/dot_grey.png';
import dotPinkIcon from '../../resources/icons/dot_pink.png';

export default class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      promotionalBannerList: ["https://www.bmw.ca/content/dam/bmw/common/all-models/4-series/gran-coupe/2017/images-and-videos/images/BMW-4-series-gran-coupe-images-and-videos-1920x1200-10.jpg.asset.1487328157424.jpg",
        "http://tw.mensuno.asia/sites/default/files/ferrari-f12-tdf-01-960x640.jpg", "https://www.bmw.ca/content/dam/bmw/common/all-models/4-series/gran-coupe/2017/images-and-videos/images/BMW-4-series-gran-coupe-images-and-videos-img-890x501-01.jpg/_jcr_content/renditions/cq5dam.resized.img.890.medium.time1487328154325.jpg"]
    }

    //initialize navigator event
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));

  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ height:Dimensions.get('window').width*0.5625 }}>
          <ImageSlider
            style={{ flex: 1 }}
            images={this.state.promotionalBannerList}
            autoPlayWithInterval={3000}
            customButtons={(position, move) => (
              <View style={{
                zIndex: 1, marginTop: -24, marginBottom: 16, justifyContent: 'center', alignItems: 'center', flexDirection: 'row',
              }}>
                {/* show scoller */}
                {(this.state.promotionalBannerList.map((image, index) => {
                  return (
                    <TouchableHighlight
                      key={index}
                      underlayColor="#000000"
                      onPress={() => move(index)}
                      style={{ margin: 2, width: 12, height: 12, opacity: 0.9, alignItems: 'center', justifyContent: 'center' }}>

                      <Image style={{ height: 8, width: 8 }} source={(position === index) ? dotPinkIcon : dotGreyIcon} />

                    </TouchableHighlight>
                  );
                }))}
              </View>
            )}
          />
        </View>

      </View>
    );
  }

  /**
  * handling navigator event
  * @param {*} event event name
  */
  onNavigatorEvent = (event) => {
    if (event.type == 'NavBarButtonPress') {
      if (event.id == 'menu') {
        Actions.startToggleDrawer(this);
      }
      else if (event.id == 'Cart') {
        Actions.openModalProps(this, 'Cart', null);

      }
      else if (event.id == 'Search') {
        Actions.openModalProps(this, 'Search', null);
      }
    }
  }

}
