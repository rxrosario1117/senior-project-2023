import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import SavingsScreen from '../../screens/SavingsScreen';
import CashScreen from '../../screens/CashScreen'; 
import BalanceScreen from '../../screens/BalanceScreen';
import AvailableProductsScreen from '../../screens/AvailableProductsScreen';
import TempScreen from '../../screens/TempScreen';

const Tab = createMaterialTopTabNavigator();

export default function TopScreenNavigator() {
  return (
    <Tab.Navigator initialRouteName='temp'>
      <Tab.Screen name="Savings" component={SavingsScreen} />
      <Tab.Screen name="Cash" component={CashScreen} />
      <Tab.Screen name="Balance" component={BalanceScreen} />
      <Tab.Screen name="temp" component={TempScreen} />
    </Tab.Navigator>
  );
}