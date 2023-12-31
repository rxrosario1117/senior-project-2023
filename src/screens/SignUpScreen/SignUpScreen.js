import React, {useState} from 'react';
import { View, Text, StyleSheet, useWindowDimensions, ScrollView } from 'react-native';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';

const SignUpScreen = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState(''); 
    const [passwordRepeat, setPasswordRepeat] = useState('');

    const navigation = useNavigation();

    const onRegisterPressed = async () => {

        auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
            console.log('User account created & signed in!');
            navigation.navigate('SignIn')
        })
        .catch(error => {
            if (error.code === 'auth/email-already-in-use') {
            console.log('That email address is already in use!');
            }

            if (error.code === 'auth/invalid-email') {
            console.log('That email address is invalid!');
            }

            console.error(error);
        });
        
    };


    const onSignInGoogle = () => {
        console.warn('onSignInGoogle');
    };
 

    const onSignInPressed = () => {
        navigation.navigate('SignIn')
    }; 

    const onTermsOfUsePressed = () => {
        console.warn('onTermsOfUsePressed');
    };

    const onPrivacyPressed = () => {
        console.warn('onPrivacyPressed');
    };



    return (

        <ScrollView>
        <View style={styles.root}>

            <Text style={styles.title}>
                Create an Account
            </Text>
       
            <CustomInput 
                placeholder="Username"
                value={username}
                setValue={setUsername}
         
            />
            
            <CustomInput 
                placeholder="Email"
                value={email}
                setValue={setEmail}
         
            />

            <CustomInput 
                placeholder="Password"
                value={password}
                setValue={setPassword}
                secureTextEntry
         
            />

            <CustomInput 
                placeholder="Repeat Password"
                value={passwordRepeat}
                setValue={setPasswordRepeat}
                secureTextEntry
            />

            <Text style={styles.text}>
                By registering, you confirm that you accept our{' '}
                <Text style={styles.link} onPress={onTermsOfUsePressed}>Terms of Use</Text> and{' '}
                <Text style={styles.link} onPress={onPrivacyPressed}>Privacy Policy</Text>
            </Text>

            <CustomButton text="Register" onPress={onRegisterPressed} />
           
            
            <CustomButton 
              text="Sign In with Google" 
              onPress={onSignInGoogle} 
              bgColor="#FAE9EA"
              fgColor="#DD4D44"
            />

            <CustomButton 
              text="Have an account? Sign in" 
              onPress={onSignInPressed} 
              type="TERTIARY"
            />


        </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    root: {
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#051C60',
        margin: 10,
    },
    text: {
        color: 'gray',
        marginVertical: 10,
    },
    link: {
        color: '#FDB075',
    }
});

export default SignUpScreen