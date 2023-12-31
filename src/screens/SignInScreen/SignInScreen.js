import React, {useState} from 'react';
import { View, Text, Image, StyleSheet, useWindowDimensions, ScrollView } from 'react-native';
import Logo from '../../../assets/images/Logo_1.png';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import { useNavigation } from '@react-navigation/native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';



const SignInScreen = () => {


    const [username, setUsername] = useState('');
    const [password, setPassword] = useState(''); 
    const [loginFail, setLoginFail] = useState(false);
    const [err, setErr] = useState(''); 

    const {height} = useWindowDimensions();
    const navigation = useNavigation();

    


    GoogleSignin.configure({
        webClientId: '425443338100-fie9nft3pg27c43a3pef88f3cpmvmmm1.apps.googleusercontent.com',
      });

    const onSignInPressed = async () => {
        // validate user
        try {
            await auth().signInWithEmailAndPassword(username, password);
            setLoginFail(false);
            navigation.navigate('BottomScreenNavigator'); 
        } catch (error) {
            setLoginFail(true);
            setErr(error.message);
        }
        
    };

    const onForgotPasswordPressed = () => {

        navigation.navigate('ForgotPassword');

    };

    async function onSignInGoogle() {
        
        // Check if your device supports Google Play
        await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
        // Get the users ID token
        const { idToken } = await GoogleSignin.signIn();
        console.warn(idToken);
      
        // Create a Google credential with the token
        const googleCredential = auth.GoogleAuthProvider.credential(idToken);

        if (idToken != null) {
            navigation.navigate('BottomScreenNavigator')
          }
      
        // Sign-in the user with the credential
        return auth().signInWithCredential(googleCredential);

      }
 

    const onSignUpPressed = () => {
        navigation.navigate('SignUp'); 
    }; 



    return (

        <ScrollView>
        <View style={styles.root}>
            <Image 
                source={Logo} 
                style={[styles.logo, {height: height * 0.3}]} 
                resizeMode="contain" 
            />
       
            <CustomInput 
                placeholder="Email"
                value={username}
                setValue={setUsername}
         
            />
            <CustomInput 
                placeholder="Password"
                value={password}
                setValue={setPassword}
                secureTextEntry
            />

            <CustomButton text="Sign In" onPress={onSignInPressed} />

            {loginFail && (
                <Text style={{color: 'red'}}>
                   *{err}
                </Text>
            )}
           
            <CustomButton 
              text="Forgot password" 
              onPress={onForgotPasswordPressed} 
              type="TERTIARY"
            />
            
            <CustomButton 
              text="Sign In with Google" 
              onPress={onSignInGoogle} 
              bgColor="#FAE9EA"
              fgColor="#DD4D44"
            />

            <CustomButton 
              text="Don't have an account? Create one" 
              onPress={onSignUpPressed} 
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
    logo: {
        width: '70%',
        maxWidth: 300,
        maxHeight: 200,
    },
});

export default SignInScreen