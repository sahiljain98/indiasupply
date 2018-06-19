import React, { Component } from 'react';
import { Text, View, Image,TextInput } from 'react-native';
import { Navigation } from 'react-native-navigation';

import AppConfig from '../../resources/appconfig';
import Actions from '../../resources/actions';
import Colors from '../../resources/color';

import SearchIcon from '../../resources/icons/search_light.png';

export default class Search extends Component {

  constructor(props) {
    super(props);
    this.state = {
      searchString: '',
    }
  }
  render() {
    let { searchString } = this.state;
    return (
      <View style={{ flex: 1,backgroundColor:'white' }}>
        <View style={{ backgroundColor: Colors.PrimaryColor, elevation: 2 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 16, marginVertical: 8, padding: 8, borderRadius: 32, backgroundColor: "white" }}>
            <Image source={SearchIcon} style={{ width: 20, height: 20, marginVertical: 8, marginRight: 12, marginLeft: 4 }} />
            <TextInput
              placeholder="Type here..."
              style={{ height: 40, width: '90%', fontSize: 16 }}
              value={searchString}
              // onChangeText={searchData => this.searchFriends(searchData)}
              underlineColorAndroid='transparent'
            />
          </View>
        </View>
      </View>
    );
  }

}

