import React, {useCallback} from 'react';
import {
    View, 
    Text, 
    StyleSheet, 
    ScrollView, 
    SafeAreaView, 
    ActivityIndicator,
    Alert, 
    Button, 
    Linking
} from 'react-native';

const URLButton = ({url, children}) => {
  const handlePress = useCallback(async () => {
    // Checking if the link is supported for links with custom URL scheme.
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      // Opening the link with some app, if the URL scheme is "http" the web link should be opened
      // by some browser in the mobile
      await Linking.openURL(url);
    } else {
      Alert.alert(`Don't know how to open this URL: ${url}`);
    }
  }, [url]);

  return <Button title={children} onPress={handlePress} />;
};

export default URLButton;