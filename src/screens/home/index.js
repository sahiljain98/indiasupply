import React, { Component } from 'react';
import { View, Image, TouchableHighlight, ScrollView, Text, FlatList, TouchableOpacity,AsyncStorage } from 'react-native';
import { Navigation } from 'react-native-navigation';
import axios from 'axios';

import ImageSlider from './react-native-image-slider';
import Actions from '../../resources/actions';
import Color from '../../resources/color';
import Network from '../../library/network';
import AsyncStore from '../../library/asyncStore';

import CategoryTile from '../../components/categorytile';

import dotGreyIcon from '../../resources/icons/dot_grey.png';
import dotPinkIcon from '../../resources/icons/dot_pink.png';
import upArrow from '../../resources/icons/up-arrow.png';
import downArrow from '../../resources/icons/down-arrow.png';

export default class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {

      layoutWidth: null,
      promotionalBannerList: ["https://www.bmw.ca/content/dam/bmw/common/all-models/4-series/gran-coupe/2017/images-and-videos/images/BMW-4-series-gran-coupe-images-and-videos-1920x1200-10.jpg.asset.1487328157424.jpg",
        "http://tw.mensuno.asia/sites/default/files/ferrari-f12-tdf-01-960x640.jpg", "https://www.bmw.ca/content/dam/bmw/common/all-models/4-series/gran-coupe/2017/images-and-videos/images/BMW-4-series-gran-coupe-images-and-videos-img-890x501-01.jpg/_jcr_content/renditions/cq5dam.resized.img.890.medium.time1487328154325.jpg"],

      wearCategoryList: [
        { url: 'https://content3.jdmagicbox.com/comp/mumbai/c6/022pxx22.xx22.141119140050.z9c6/catalogue/destiny-ethnic-wear-dadar-west-mumbai-ethnic-wear-retailers-14mjzz9.jpg', name: 'Ethinic wear' },
        { url: 'http://www.acetshirt.com/wp-content/uploads/2017/07/casual-wear-for-men-fall-staples-for-men-galla-zywtzan-.jpg', name: 'Casuals' },
        { url: 'https://i.pinimg.com/736x/8f/b8/53/8fb85391c23600ca203f2ec56b7f9373--mens-fashion-accessories-shoe-photography.jpg', name: 'Footwear' },
        { url: 'https://www.ifazone.in/ItemImages/2018/Product_317201855423PMBG7AD01_Main_BG7AD01_3.jpg', name: 'Formals' }
      ],
      electronicsCategoryList: [
        { url: 'https://img.bfmtv.com/c/630/420/081b/38d96f223c90df99fd7422669e7f.png', name: 'Laptops' },
        { url: 'https://images.techhive.com/images/article/2016/12/iphone-mac-pixabay-100698865-large.jpg', name: 'Mobiles' },
        { url: 'http://im.hunt.in/cg/Him/Palampur/City-Guide/electronics.jpg', name: 'Home Applicances' },
        { url: 'https://pisces.bbystatic.com/image2/BestBuy_US/store/ee/2015/global/outlet/flex_wearable_tech.jpg', name: 'Wearables' }
      ],
      suggestionCategoryList: [
        { url: 'https://i.pinimg.com/736x/8f/b8/53/8fb85391c23600ca203f2ec56b7f9373--mens-fashion-accessories-shoe-photography.jpg', name: 'Footwear' },
        { url: 'https://www.ifazone.in/ItemImages/2018/Product_317201855423PMBG7AD01_Main_BG7AD01_3.jpg', name: 'Formals' },
        { url: 'https://content3.jdmagicbox.com/comp/mumbai/c6/022pxx22.xx22.141119140050.z9c6/catalogue/destiny-ethnic-wear-dadar-west-mumbai-ethnic-wear-retailers-14mjzz9.jpg', name: 'Ethinic wear' },
        { url: 'https://images.techhive.com/images/article/2016/12/iphone-mac-pixabay-100698865-large.jpg', name: 'Mobiles' },
        { url: 'http://im.hunt.in/cg/Him/Palampur/City-Guide/electronics.jpg', name: 'Home Applicances' },
        { url: 'http://www.acetshirt.com/wp-content/uploads/2017/07/casual-wear-for-men-fall-staples-for-men-galla-zywtzan-.jpg', name: 'Casuals' }
      ]


    }

    //initialize navigator event
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));

  }

  render() {

    return (
      <ScrollView style={{ flex: 1 }}
        onLayout={(event) => { this.setState({ layoutWidth: event.nativeEvent.layout.width }) }}>
        {/* image crausel */}
        {this.getImageCrausel(this.state.promotionalBannerList, 3000)}

        {/* for categery header */}
        <Text
          style={{ fontSize: 18, alignContent: 'center', paddingTop: 8, paddingBottom: 12, paddingHorizontal: 16, color: Color.PrimaryTextColor }}>
          Pick Your Interest
        </Text>

        {this.state.suggestionCategoryList.map((item, index) => {
          return (
            <CategoryTile key={index} item={item} />
          );
        })}

      </ScrollView>
    );
  }

  componentWillMount(){

    this.getSession('priti','admin123');
  }




  /**
   * get images crausel
   * @param {*} imageList list of images
   * @param {*} timer interval time
   */
  getImageCrausel = (imageList, timer) => {
    let { layoutWidth } = this.state;
    return (
      <View style={{ height: layoutWidth * 0.5625 }}>
        <ImageSlider
          style={{ flex: 1 }}
          images={imageList}
          autoPlayWithInterval={timer}
          customButtons={(position, move) => (
            <View
              style={{ zIndex: 1, marginTop: -24, marginBottom: 16, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', }}>
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
      </View>);

  }



  /**
 * api hit
 * get session
 */
  getSession = async (username, password) => {
    var userParms = {
      "username": username,
      "password": password
    }
    axios.post(`${Network.url}integration/admin/token`, userParms)
      .then((response) => {
       console.log('session token',response.data);
       AsyncStore.put(AsyncStore.Constants.SESSION_ID,response.data);
      })
      .catch((error) => {
        this.callAlert("Session Id not generated")
      });

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

    /**
  * calling alert with value title
  * @param {*} value title
  */
 callAlert = (value) => {
  Alert.alert(
    value,
    "",
    [
      { text: 'OK', onPress: () => console.log('OK pressed') },
    ],
    { cancelable: false }
  )
}

}
