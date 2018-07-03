import React, { Component } from 'react';
import { Text, View, Image, ScrollView, TouchableOpacity, TextInput } from 'react-native';

import Actions from '../../resources/actions';
import Color from '../../resources/color';

import CartListTile from '../../components/cartlisttile';

import * as userActions from '../../reducer/action';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class Cart extends Component {

  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#fbfbfb' }}>
        <ScrollView style={{ flex: 1 }}>

          {/* cheange this to flatlist */}
          <ScrollView>
            <CartListTile />
            <CartListTile />
          </ScrollView>

          {/* cart updation */}
          <TouchableOpacity style={{ margin: 8, borderColor: Color.AccentColor, borderRadius: 4, borderWidth: 1 }}>
            <Text style={{ fontSize: 18, padding: 12, textAlign: 'center', color: Color.AccentColor }}>Update Cart</Text>
          </TouchableOpacity>

          {/* coupen view */}
          <View>
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
          </View>

          {/* total amount */}
          <View style={{ backgroundColor: Color.HighlightPrimaryColor, margin: 8 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ fontSize: 16, color: 'black', padding: 8 }}>SubTotal</Text>
              <Text style={{ fontSize: 16, color: 'black', padding: 8 }}>{'₹ '+120}</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ fontSize: 16, color: 'black', padding: 8 }}>Tax</Text>
              <Text style={{ fontSize: 16, color: 'black', padding: 8 }}>{'₹ '+20}</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ fontSize: 16, color: 'black', padding: 8 }}>Shipping</Text>
              <Text style={{ fontSize: 16, color: 'black', padding: 8 }}>{'₹ '+10}</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ fontSize: 16, color: 'black', padding: 8 }}>GrandTotal</Text>
              <Text style={{ fontSize: 16, color: 'black', padding: 8 }}>{'₹ '+150}</Text>
            </View>
          </View>
        </ScrollView>

        {/* bottom button */}
        <TouchableOpacity
          onPress={() => Actions.openComponentProps(this, 'Checkout', null)}
          style={{ justifyContent: 'center', padding: 16, backgroundColor: Color.AccentColor, elevation: 2, borderRadius: 2}}>
          <Text style={{ textAlign: 'center', fontSize: 16, marginHorizontal: 16, color: 'white' }}>Proceed to Checkout</Text>
        </TouchableOpacity>
      </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
