import { link } from 'fs';
import React, {useState, useEffect, useCallback} from 'react';
import { Platform, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import {PlaidLink, LinkExit, LinkSuccess } from 'react-native-plaid-link-sdk';

var styles = require('./style');


const HomeScreen = ({ navigation }: any) => {
  const [linkToken, setLinkToken] = useState(null);
  const [isTokenAvailable, setIsTokenAvailable] = useState(null);
  const address = '10.0.2.2';

  const createLinkToken = useCallback(async () => {   
    await fetch(`http://${address}:8080/api/create_link_token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ address: address })
    })
    .then((response) => response.json())
    .then((data) => {
      setLinkToken(data.link_token);
          })
    .catch((err) => {
      console.log(err);
    });
  }, [setLinkToken])

  const searchToken = useCallback(async () => {   
    await fetch(`http://${address}:8080/api/useExistingToken`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
    })
    .then((response) => response.json())
    .then((data) => {
      setIsTokenAvailable(data.access_token); 
      console.log(data);     
    })
    .catch((err) => {
      console.warn(err);
    });
  }, [setIsTokenAvailable])

  useEffect(() => { 
    // If the token is good, move to the options screen (bypass login)
    // searchToken() doesn't have a public_token to use and will block connections to Plaid
    // if (isTokenAvailable == null) {
    //   console.log('searching')
    //   searchToken();
    // }
    if (isTokenAvailable) {
      console.log('found')
      navigation.navigate('BottomScreenNavigator', true);
    }
    if (linkToken == null) {
      console.log('create link token')
      createLinkToken();

      // navigation.navigate('BottomScreenNavigator', true);
    }  
  }, [linkToken]);
  console.log("HomeScreen Start")

  return (
    <View style={{flex: 1}}>
      <View style={styles.heading}>
        <Text style={styles.titleText}>Connect to Your Bank</Text>
      </View>
      <View style={styles.bottom}>
        <PlaidLink
          tokenConfig={{
            token: linkToken,
            noLoadingState: false,
          }}
          onSuccess={async (success: LinkSuccess) => {
            console.log(success);
            await fetch(`http://${address}:8080/api/exchange_public_token`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ public_token: success.publicToken }),            
            })
            .catch((err) => {
              console.log(err);
            });
            navigation.navigate('BottomScreenNavigator', success);
          }}
          onExit={(response: LinkExit) => {
            console.log(response);
          }}>
          <View style={styles.buttonContainer}>
            <Text style={styles.buttonText}>Connect</Text>
          </View>
        </PlaidLink>
      </View>
    </View>
  );
};

export default HomeScreen;
