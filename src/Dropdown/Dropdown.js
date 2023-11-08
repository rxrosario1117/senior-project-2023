import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native'
import {Picker} from '@react-native-picker/picker';


const Dropdown = ( ) => {
  state = {user: ''}
  updateUser = (user) => {
    this.setState({ user: user})
  }

 
    return (
      <View>
        <Picker selectedValue={this.state.user} onValueChange = {this.updateUser}>


        </Picker>
      </View>
    )
  }


export default Dropdown 