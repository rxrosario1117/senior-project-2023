import React from 'react';
import {SafeAreaView, StyleSheet, Text} from 'react-native';
import SignInScreen from './src/screens/SignInScreen';
import GoalsScreen from './src/screens/GoalsScreen';
import { BudgetsProvider } from './src/contexts/BudgetsContext';
import Dropdown from './src/Dropdown';

const AppHome = () => {
    return (
        <SafeAreaView style={styles.root}>
            
            <BudgetsProvider>
            <GoalsScreen/>
            </BudgetsProvider>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: '#F9FBFC'
    },
});

export default AppHome; 