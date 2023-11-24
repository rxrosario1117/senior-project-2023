import { Modal, TextInput, Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { useState, useEffect, useRef } from 'react';
import CustomButton from "./CustomButton";
import Icon from 'react-native-vector-icons/FontAwesome';
import { useBudgets } from "../contexts/BudgetsContext"
import firestore from '@react-native-firebase/firestore';



export default function AddBudgetModal({ show = false, onClose, updateBudgets }) {

    const [visible, setVisible] = useState(show);
    const { addBudget } = useBudgets()

    useEffect(() => {
        setVisible(show); // Update the visibility state when the 'show' prop changes

      }, [show]);

    
    const [formData, setFormData] = useState({
        name: '',
        maxSpend: '',
    });

    const handleInputChange = (field, text) => {
        setFormData({
          ...formData,
          [field]: text,
        });
    };

    useEffect(() => {
 
      }, [visible]);

    const closeModal = () => {
        onClose();
        setVisible(false)
        
    }



    function handleSubmit(){
        // Handle form submission logic here
        // Get the values from the formData state
        const { name, maxSpend } = formData;

        // Convert maxSpend to a float
        const max = parseFloat(maxSpend);
        const randID = Math.floor(Math.random() * (9999 - 1 + 1)) + 1;

        firestore()
        .collection('Budgets')
        .add({
            budgetID: randID,
            budgetMax: max,
            budgetName: name,
        })
        .then(() => {
            updateBudgets()
            console.log('Budget added!');
        });
    
        
        closeModal()
        

    };

    return (

   
        
        <Modal visible={visible} animationType="slide">
        <View style={{padding: 15, marginTop: 10, borderWidth: 2, borderColor: 'black'}}>

            <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                <Text style={{color: 'black', fontSize: 25, marginBottom: 25}}>
                    New Budget
                </Text>

              
                <TouchableOpacity style={styles.container} onPress={closeModal}>
                    <Icon name="times" size={35} color="gray" />
                </TouchableOpacity>
            </View>

            <Text style={{marginLeft: 5}}>Name</Text>
            <TextInput 
                
                value={formData.name}
                onChangeText={(text) => handleInputChange('name', text)}
                style={styles.input}
               
            />

            <Text style={{marginLeft: 5}}>Max Spending</Text>
            <TextInput 
                keyboardType="numeric"
                value={formData.maxSpend}
                onChangeText={(text) => handleInputChange('maxSpend', text)}
                style={styles.input}
              
            />
            <View>
                <CustomButton 
                text="Add"
                onPress={handleSubmit}/>
            </View>

        </View>
        </Modal>

       
    )
}

const styles = StyleSheet.create({

    input: {
        borderColor: 'gray', 
        borderWidth: 1, 
        borderRadius: 3,
        marginTop: 5,
        marginBottom: 15

    }, 
    container: {
        backgroundColor: 'white', // Background color
        borderRadius: 30, // Adjust this to your preference
        width: 30,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
      },


});

