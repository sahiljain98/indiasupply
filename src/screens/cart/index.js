import React, { Component } from 'react';
import { Text, View, Image, ScrollView, TouchableOpacity, TextInput, FlatList, Alert } from 'react-native';
import axios from 'axios';

import Actions from '../../resources/actions';
import Color from '../../resources/color';
import Network from '../../library/network';

import CartListTile from '../../components/cartlisttile';

import * as userActions from '../../reducer/action';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class Cart extends Component {

  constructor(props) {
    super(props);
    this.state = {
      sessionId: this.props.service.sessionId,
      userToken: this.props.service.userToken,
      cartItemList: [],
      isFetching: false,
      defaultText: ''
    }
  }

  render() {
    return (

      (this.state.cartItemList && this.state.cartItemList.length > 0) ?
        < View style={{ flex: 1, backgroundColor: '#fbfbfb' }
        }>

          <ScrollView style={{ flex: 1 }}>

            {/* change this to flatlist */}
            <FlatList
              data={this.state.cartItemList}
              onRefresh={() => this.onRefresh()}
              refreshing={this.state.isFetching}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item, index }) => <CartListTile key={index} item={item} />}
            />


            {/* cart updation */}
            <TouchableOpacity
              onPress={() => this.onRefresh()}
              style={{ margin: 8, borderColor: Color.AccentColor, borderRadius: 4, borderWidth: 1 }}>
              <Text style={{ fontSize: 18, padding: 12, textAlign: 'center', color: Color.AccentColor }}>Update Cart</Text>
            </TouchableOpacity>

            {/* coupen view */}
            {this.getCoupenView()}


            {/* total amount */}
            {/* {this.getTotalAmountView()} */}

          </ScrollView>

          {/* bottom button */}
          {this.getBottomButton()}

        </View > : <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fbfbfb' }}>
          <Text>{this.state.defaultText}</Text></View>
    );
  }

  componentDidMount() {
    this.getCartIdByCustomerToken();
  }


  /**
   * coupen view
   */
  getCoupenView = () => {
    return (<View>
      <Text style={{ fontSize: 16, padding: 12 }}>
        Apply Coupen code
      </Text>
      <View style={{ flexDirection: 'row', marginBottom: 8, marginHorizontal: 12, alignItems: 'center' }}>
        <TextInput
          placeholder="Enter code here..."
          style={{ flex: 1, backgroundColor: 'white', fontSize: 16, color: 'black', borderRadius: 4, paddingVertical: 8, paddingHorizontal: 12, borderColor: Color.HighlightPrimaryColor, borderWidth: 1 }}
        />
        <TouchableOpacity style={{ marginStart: 12 }}>
          <Text style={{ backgroundColor: Color.AccentColor, borderRadius: 4, textAlign: 'center', color: 'white', paddingHorizontal: 12, paddingVertical: 8, fontSize: 14 }}>Apply</Text>
        </TouchableOpacity>
      </View>
    </View>);
  }

  /**
   * total amount view
   */
  getTotalAmountView = () => {
    return (<View style={{ backgroundColor: Color.HighlightPrimaryColor, margin: 8 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={{ fontSize: 16, color: 'black', padding: 8 }}>SubTotal</Text>
        <Text style={{ fontSize: 16, color: 'black', padding: 8 }}>{'₹ ' + 120}</Text>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={{ fontSize: 16, color: 'black', padding: 8 }}>Tax</Text>
        <Text style={{ fontSize: 16, color: 'black', padding: 8 }}>{'₹ ' + 20}</Text>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={{ fontSize: 16, color: 'black', padding: 8 }}>Shipping</Text>
        <Text style={{ fontSize: 16, color: 'black', padding: 8 }}>{'₹ ' + 10}</Text>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={{ fontSize: 16, color: 'black', padding: 8 }}>GrandTotal</Text>
        <Text style={{ fontSize: 16, color: 'black', padding: 8 }}>{'₹ ' + 150}</Text>
      </View>
    </View>);
  }

  /**
   * proceed to checkout button
   */
  getBottomButton = () => {
    return (<TouchableOpacity
      onPress={() => Actions.openComponentProps(this, 'Checkout', null)}
      style={{ justifyContent: 'center', padding: 16, backgroundColor: Color.AccentColor, elevation: 2, borderRadius: 2 }}>
      <Text style={{ textAlign: 'center', fontSize: 16, marginHorizontal: 16, color: 'white' }}>Proceed to Checkout</Text>
    </TouchableOpacity>);
  }


  onRefresh = () => {
    this.setState({ cartItemList: [] });
    this.getCartIdByCustomerToken();
  }

  /**
   * API Hit
   * get cart id by customer token
   */
  getCartIdByCustomerToken = () => {

    let { userToken } = this.state;
    console.log('userToken : ', userToken);

    //set default state
    this.setState({ isFetching: true, defaultText: 'Loading...' })

    var config = {
      headers: { 'Authorization': "bearer " + userToken }
    };
    axios.post(`${Network.url}carts/mine`, {}, config)
      .then((response) => {
        console.log('cartId generator : ', response);

        if (response.data) {
          this.getCartItems();
        } else this.setState({ defaultText: "No Items Found!!!", isFetching: false });
      }).catch((error) => {
        this.setState({ isFetching: false, defaultText: '' });
        this.callAlert('Error in fetching cart id : ' + error);
      });

  }

  /**
   * API Hit
   * get cart items
   */
  getCartItems = () => {

    let { userToken } = this.state;

    var config = {
      headers: { 'Authorization': "bearer " + userToken }
    };
    axios.get(`${Network.url}carts/mine`, config)
      .then((response) => {
        if (response.data && response.data.items && response.data.items.length > 0) {
          console.log('category list data', response.data.items);
          this.setState({ cartItemList: response.data.items, defaultText: "", isFetching: false });
        } else this.setState({ defaultText: "No Items Found!!!", isFetching: false });
      }).catch((error) => {
        this.setState({ isFetching: false, defaultText: '' });
        this.callAlert('Error in fetching cart items : ' + error);
      });

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
    actions: bindActionCreators(userActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
