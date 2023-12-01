import {
    View, 
    Text, 
    StyleSheet, 
    ScrollView, 
    SafeAreaView, 
    ActivityIndicator,
} from 'react-native';
import URLButton from '../../components/URLButton/URLButton';

const url1 = 'https://www.investopedia.com/financial-edge/0712/money-management-for-college-students.aspx';
const url2 = 'https://www.investopedia.com/how-to-save-money-4589942';
const url3 = 'https://www.investopedia.com/articles/personal-finance/031215/why-saving-money-important.asp';

export default function EducationScreen() {

    return (
        <SafeAreaView>
        <ScrollView>
            <Text style={styles.title}>Financial Tips</Text>

            <View style={styles.container}>
                <URLButton url={url1} style={styles.button}>Money Management for College Students</URLButton>
                <URLButton url={url2}>How to Save Money for Your Big Financial Goals</URLButton>
                <URLButton url={url3}>Why Saving Money is Important</URLButton>
            </View>
        </ScrollView>
        </SafeAreaView>
   )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    padding: 10,

  }
});
