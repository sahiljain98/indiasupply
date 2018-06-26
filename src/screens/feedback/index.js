import React, { Component } from 'react';
import { Text, View, Image, AsyncStorage, TextInput, Picker, TouchableOpacity } from 'react-native';
import { Navigation } from 'react-native-navigation';

import Actions from '../../resources/actions';
import AsyncStore from '../../library/asyncStore';
import Color from '../../resources/color';

import * as userActions from '../../reducer/action';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class Feedback extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedPickerValue: 'Type of Enquiry',
      enquiryType: [
        { value: 'Type of Enquiry' },
        { value: 'Place a new Order' },
        { value: 'Order Status' },
        { value: 'Feedback on an existing order' },
        { value: 'Website Feedback' },
        { value: 'General Feedback' },
        { value: 'Other Request' }
      ],
      name: null,
      emailId: null,
      mobileNo: null,
      description: null
    }

    //initialize navigator event
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'space-around' }}>
        <Picker
          selectedValue={this.state.selectedPickerValue}
          style={{ height: 48, backgroundColor: Color.HighlightPrimaryColor, marginTop: 16, marginHorizontal: 16, borderRadius: 2, paddingHorizontal: 12 }}
          onValueChange={(itemValue, itemIndex) => this.setState({ selectedPickerValue: itemValue })}>
          {this.state.enquiryType.map((item, index) => {
            return (<Picker.Item key={index} label={item.value} value={item.value} />);
          })}
        </Picker>
        <TextInput
          style={{ paddingHorizontal: 12, height: 48, backgroundColor: Color.HighlightPrimaryColor, marginHorizontal: 16, borderRadius: 2, fontSize: 16 }}
          underlineColorAndroid='transparent'
          placeholder='Name'
          autoCapitalize="words"
          onChangeText={(text) => this.setState({ name: text })}
          value={this.state.name}
        />
        <TextInput
          style={{ paddingHorizontal: 12, height: 48, backgroundColor: Color.HighlightPrimaryColor, marginHorizontal: 16, borderRadius: 2, fontSize: 16 }}
          underlineColorAndroid='transparent'
          keyboardType='email-address'
          placeholder='Email Id'
          onChangeText={(text) => this.setState({ emailId: text })}
          value={this.state.emailId}
        />
        <TextInput
          style={{ paddingHorizontal: 12, height: 48, backgroundColor: Color.HighlightPrimaryColor, marginHorizontal: 16, borderRadius: 2, fontSize: 16 }}
          underlineColorAndroid='transparent'
          keyboardType='phone-pad'
          placeholder='Mobile No.'
          onChangeText={(text) => this.setState({ mobileNo: text })}
          value={this.state.mobileNo}
        />

        <View style={{ paddingHorizontal: 8, minHeight: 120, backgroundColor: Color.HighlightPrimaryColor, marginHorizontal: 16, borderRadius: 2, }}>
          <TextInput
            style={{ fontSize: 16 }}
            multiline={true}
            autoCapitalize="sentences"
            underlineColorAndroid='transparent'
            placeholder='Write Feedback here...'
            onChangeText={(text) => this.setState({ description: text })}
            value={this.state.description}
          />
        </View>

        <TouchableOpacity style={{ backgroundColor: Color.AccentColor, borderRadius: 4, margin: 16 }}>
          <Text style={{ fontSize: 16, color: 'white', padding: 16, fontWeight: 'bold', textAlign: 'center' }}>Submit Your Feedback</Text>
        </TouchableOpacity>


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

export default connect(mapStateToProps, mapDispatchToProps)(Feedback);
