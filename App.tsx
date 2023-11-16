import React, {useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { 
  StatusBar, 
  StyleSheet,
  SafeAreaView,
  useColorScheme,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import SplashScreen from 'react-native-splash-screen';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import SuccessScreen from './src/screens/SuccessScreen';
import { PlaidTheme } from './src/screens/style';
import CashScreen from './src/screens/CashScreen';
import BalanceScreen from './src/screens/BalanceScreen';
import AvailableProductsScreen from './src/screens/AvailableProductsScreen';
import SavingsScreen from './src/screens/SavingsScreen';
import AppHome from './AppHome'
import SignInScreen from './src/screens/SignInScreen';
import SignUpScreen from './src/screens/SignUpScreen/SignUpScreen';
import ConfirmEmailScreen from './src/screens/ConfirmEmailScreen';
import ForgotPasswordScreen from './src/screens/ForgotPasswordScreen';
import NewPasswordScreen from './src/screens/NewPasswordScreen';
import EducationScreen from './src/screens/EducationScreen';

import TempScreen from './src/screens/TempScreen'

import BottomScreenNavigator from './src/components/BottomScreenNavigator';
import TopScreenNavigator from './src/components/TopScreenNavigator';

// const Tab = createBottomTabNavigator();

const App = (): React.ReactElement => {
  
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  const Stack = createNativeStackNavigator();

  // Removed for better readability, SHOULD PROB PUT BACK after component in each Stack.Screen tag
    // options={{
    //   headerStyle: {
    //     backgroundColor: '#000000',
    //   },
    //   headerTintColor: '#fff',
    // }}

  return (
    <SafeAreaProvider>
      <NavigationContainer theme={PlaidTheme}>
        
        <StatusBar barStyle="light-content" backgroundColor="#000000" />

        <Stack.Navigator> 
          <Stack.Screen name="SignInScreen" component={SignInScreen} options={{headerShown: false}} />       


          <Stack.Screen name="BottomScreenNavigator" component={BottomScreenNavigator} options={{headerShown: false}} />    



          <Stack.Screen name="TopScreenNavigator" component={TopScreenNavigator} />

          <Stack.Screen name="Success" component={SuccessScreen} />

          <Stack.Screen name="Cash" component={CashScreen} />

          <Stack.Screen name="Balance" component={BalanceScreen} />

          <Stack.Screen name="Products" component={AvailableProductsScreen} />

          <Stack.Screen name="Savings" component={SavingsScreen} />

          <Stack.Screen name="SignIn" component={SignInScreen} />

          <Stack.Screen name="SignUp" component={SignUpScreen} />

          <Stack.Screen name="Confirm" component={ConfirmEmailScreen} />

          <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />

          <Stack.Screen name="NewPassword" component={NewPasswordScreen} />

          <Stack.Screen name="Education" component={EducationScreen} />

          <Stack.Screen name="TempScreen" component={TempScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  root: {
      flex: 1,
      backgroundColor: '#F9FBFC'
  },
});

export default App;
