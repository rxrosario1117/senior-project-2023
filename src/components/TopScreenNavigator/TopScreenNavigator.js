import React, {useState, useEffect, useCallback} from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import {
  View, 
  Text, 
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
  RefreshControl } from 'react-native';

import SavingsScreen from '../../screens/SavingsScreen';
import CashScreen from '../../screens/CashScreen'; 
import BalanceScreen from '../../screens/BalanceScreen';
import CreditCardScreen from '../../screens/CreditCardScreen';
import SettingsScreen from '../../screens/SettingsScreen/SettingsScreen';
var styles = require('../../screens/style');

const Tab = createMaterialTopTabNavigator();

export default function TopScreenNavigator() {

  const [itemID, setItemID] = useState(null);
  const [refreshing, setRefreshing] = React.useState(false);
  const address = '10.0.2.2';  
  

  const getItem = useCallback(async () => {
    await fetch(`http://${address}:8080/api/item/get`, {
        method: "POST",
        headers: {
            "Content-Type" : "application/json",
        },                
    })
    .then((response) => response.json())
    .then((data) => {
        if (data != null) {
          setItemID(data.item.item.item_id);
        }
    })
    .catch((err) => {
        console.log(err);
    });
}, []);

const onRefresh = React.useCallback(() => {
  setRefreshing(true);
  setTimeout(() => {
    setRefreshing(false);
  }, 2000);
}, []);



useEffect(() => {
  if (itemID == null) {
    getItem();
  }

}) 

function setItemIDNull() {
  setItemID(null);
}

  if (itemID != null) {
    return (      
      <Tab.Navigator initialRouteName='Savings'>
        <Tab.Screen name="Savings" component={SavingsScreen} />
        <Tab.Screen name="Cash" component={CashScreen} />
        <Tab.Screen name="Balance" component={BalanceScreen} />
        <Tab.Screen name="Credit" component={CreditCardScreen} />
      </Tab.Navigator>
    );
  } else {
    return (
      <SafeAreaView>
        <ScrollView 
        refreshControl={ 
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
          <View>
            <Text style={styles.titleText}>
              Connect to your bank please
            </Text>
            <Text style={styles.subTitleText}>
              Pull from top to refresh when bank is connected
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    )
  }

  
}