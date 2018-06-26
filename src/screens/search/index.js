import React, { Component } from 'react';
import { Text, View, Image, TextInput, ScrollView } from 'react-native';

import axios from 'axios';

import AppConfig from '../../resources/appconfig';
import Actions from '../../resources/actions';
import Network from '../../library/network';
import Colors from '../../resources/color';

import ProductListTile from '../../components/productlisttile';

import SearchIcon from '../../resources/icons/search_light.png';

import * as userActions from '../../reducer/action';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class Search extends Component {

  constructor(props) {
    super(props);
    this.state = {
      sessionId: this.props.service.sessionId,
      searchString: '',
      searchProducts: []
    }
  }
  render() {
    let { searchString } = this.state;
    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={{ backgroundColor: Colors.PrimaryColor, elevation: 2 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 16, marginVertical: 8, padding: 8, borderRadius: 32, backgroundColor: "white" }}>
            <Image source={SearchIcon} style={{ width: 20, height: 20, marginVertical: 8, marginRight: 12, marginLeft: 4 }} />
            <TextInput
              placeholder="Type here..."
              style={{ height: 40, width: '90%', fontSize: 16 }}
              value={searchString}
              onChangeText={searchData => this.searchProducts(searchData)}
              underlineColorAndroid='transparent'
            />
          </View>
        </View>
        {/* suggestions */}
        <ScrollView style={{ marginVertical: 4, flex: 1 }}>
          {this.state.searchProducts.map((item, index) => {
            return (
              <ProductListTile key={index} item={item} reference={this} />);
          })}
        </ScrollView>
      </View>
    );
  }

  searchProducts = (text) => {


    text = text.trim()

    this.setState({ searchString: text })

    var config = {
      headers: { 'Authorization': "bearer " + this.state.sessionId }
    };

    if (text == '') {
      this.setState({ searchProducts: [] })
      return false;
    }
    else if (text.length <= 2) {
      return false;
    }
    else {
      axios.get(`${Network.url}products?searchCriteria[filter_groups][0][filters][0][field]=name&searchCriteria[filter_groups][0][filters][0][value]=%${text}%25&searchCriteria[filter_groups][0][filters][0][condition_type]=like`, config)
        .then((Response) => {
          console.log(Response)
          if (Response.data.items) {
            this.setState({ searchProducts: Response.data.items })
          }
        })
        .catch(error => console.log(error));
    }
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

export default connect(mapStateToProps, mapDispatchToProps)(Search);

