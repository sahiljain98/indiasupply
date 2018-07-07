import React, { Component } from 'react';
import { View, Image, TouchableHighlight, ScrollView, Text, FlatList, TouchableOpacity, AsyncStorage, Alert } from 'react-native';
import axios from 'axios';

import ImageSlider from './react-native-image-slider';
import Actions from '../../resources/actions';
import Color from '../../resources/color';
import Network from '../../library/network';
import AsyncStore from '../../library/asyncStore';

import CategoryTile from '../../components/categorytile';

import dotGreyIcon from '../../resources/icons/dot_grey.png';
import dotPinkIcon from '../../resources/icons/dot_white.png';
import upArrow from '../../resources/icons/up-arrow.png';
import downArrow from '../../resources/icons/down-arrow.png';

import * as userActions from '../../reducer/action';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {

      layoutWidth: null,
      promotionalBannerList: ["https://www.bmw.ca/content/dam/bmw/common/all-models/4-series/gran-coupe/2017/images-and-videos/images/BMW-4-series-gran-coupe-images-and-videos-1920x1200-10.jpg.asset.1487328157424.jpg",
        "http://tw.mensuno.asia/sites/default/files/ferrari-f12-tdf-01-960x640.jpg", "https://www.bmw.ca/content/dam/bmw/common/all-models/4-series/gran-coupe/2017/images-and-videos/images/BMW-4-series-gran-coupe-images-and-videos-img-890x501-01.jpg/_jcr_content/renditions/cq5dam.resized.img.890.medium.time1487328154325.jpg"],

      categoryList: [],
      isFetching: false,
      defaultText: ' ',
      isLogined: false
    }

    //initialize navigator event
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));

  }

  componentWillMount() {

    if (!this.state.isLogined) {
      console.log('isLogined');
      
      Actions.openModalProps(this, 'Login', null);
    }
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
          {this.state.defaultText}
        </Text>

        <FlatList
          style={{ flex: 1, minHeight: 120 }}
          data={this.state.categoryList}
          onRefresh={() => this.onRefresh()}
          refreshing={this.state.isFetching}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => <CategoryTile reference={this} key={index} item={item} />}
        />

      </ScrollView>
    );
  }

  componentDidMount() {
    this.getSession();
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
    * refresh feed
    */
  onRefresh = () => {
    this.setState({ isFetching: true, categoryList: [] });
    // console.log("timeline", this.state.selectedAuthorFilteredFeed, this.state.selectedPublisherFilteredFeed, this.state.selectedlocationFilteredFeed, this.state.selectedCategoryFilteredFeed)
    this.getSession();
  }


  /**
   * get session id from local else hit api
   */
  getSession = async () => {
    try {
      AsyncStorage.getItem(AsyncStore.Constants.SESSION_ID)
        .then((sessionId) => {
          console.log("session id is ", sessionId);

          if (sessionId == null) {
            this.getSessionByCredentials('priti', 'admin123');
          } else {
            //hit api
            this.getCategoryList(sessionId);

            //put session id in redux
            let { action } = this.props;
            action.sessionId(sessionId)
          }
        });
    } catch (e) {
      this.callAlert('Error!!!', e);
      console.log('Error in session');
    }

  }


  /**
   * api hit
   * get session
   * @param {*} username user name
   * @param {*} password password
   */
  getSessionByCredentials = async (username, password) => {
    var userParms = {
      "username": username,
      "password": password
    }
    axios.post(`${Network.url}integration/admin/token`, userParms)
      .then((response) => {
        console.log('session token', response.data);

        //put data into async store
        try {
          AsyncStorage.setItem(AsyncStore.Constants.SESSION_ID, response.data);
        } catch (e) {
          console.log('error in saving data', e);
        }
        //hit api
        this.getCategoryList(response.data);

        //put session id in redux
        let { action } = this.props;
        action.sessionId(response.data);
      })
      .catch((error) => {
        this.callAlert("Session Id not generated");
      });

  }

  /**
    * api Hit
    * get category list
    * @param {*} sessionId token id
    */
  getCategoryList = (sessionId) => {

    //set default state
    this.setState({ isFetching: true, defaultText: 'Loading...' })

    var config = {
      headers: { 'Authorization': "bearer " + sessionId }
    };
    axios.get(`${Network.url}categories/`, config)
      .then((response) => {
        if (response.data.children_data && response.data.children_data.length > 0) {
          console.log('category list data', response.data.children_data);

          this.setState({ categoryList: response.data.children_data, defaultText: "Pick your Interest", isFetching: false });
        } else this.setState({ defaultText: "No Data Found!!!", isFetching: false });
      }).catch((error) => {
        this.setState({ isFetching: false, defaultText: ' ' });
        this.callAlert('Error in fetching catrgories : ' + error);
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


function mapStateToProps(state, ownProps) {
  return {
    service: state.service
  };
}

function mapDispatchToProps(dispatch) {
  return {
    action: bindActionCreators(userActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
