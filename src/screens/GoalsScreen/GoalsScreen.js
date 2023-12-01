import React, {useState, useEffect} from 'react';
import { View, Text, Image, StyleSheet, useWindowDimensions, ScrollView } from 'react-native';
import CustomButton from '../../components/CustomButton';
import BudgetCard from '../../components/BudgetCard';
import { useBudgets } from '../../contexts/BudgetsContext';
import AddBudgetModal from '../../components/AddBudgetModal';
import AddExpenseModal from '../../components/AddExpenseModal';
import ViewExpensesModal from '../../components/ViewExpensesModal';
import firestore from '@react-native-firebase/firestore';


const GoalsScreen = () => {
 

    const [showMod, setShowMod] = useState(false);
    const [expenses, setExpenses] = useState([])
    const [budgets, setBudgets] = useState([]);
    

    const [showAddExpenseMod, setShowAddExpenseMod] = useState(false)
    const [addExpenseModalBudgetId, setAddExpenseModalBudgetId] = useState()

    const [showViewExpenseMod, setShowViewExpenseMod] = useState(false)
    const [viewExpensesModalBudgetId, setViewExpensesModalBudgetId] = useState(0)


    const totalAmount = expenses.reduce((total, expense) => total + expense.amount, 0)
    const totalMax = budgets.reduce((total, budget) => total + budget.budgetMax, 0)


    const fetchBudgets = async () => {
      try {

        const budgetsSnapshot = await firestore().collection('Budgets').get();
        const budgetsData = budgetsSnapshot.docs.map((doc) => doc.data());

        const expensesSnapshot = await firestore().collection('Expenses').get();
        const expenseData = expensesSnapshot.docs.map((doc) => doc.data());
 
        setExpenses([]);
        setBudgets([]);
        

        setExpenses(expenseData);
        setBudgets(budgetsData);
        

      } catch (error) {
        console.error('Error fetching budgets:', error);
      }
    };

    function getBudgetExpenses(budgetID) {
      
   
      return expenses.filter(expense => expense.budgetID === budgetID)

    }
    

    useEffect(() => {
  
      fetchBudgets();


    }, []);
    
    
    function openAddExpenseModal(budgetId) {

      

      if (budgets.some(budget => budget.budgetID === budgetId)) {

        
        setAddExpenseModalBudgetId(budgetId)
      }
      else {
        setAddExpenseModalBudgetId(0)
      }
   
      
      setShowAddExpenseMod(true)
      
      
    }

    function openShowExpenseModal(budgetId) {
      setViewExpensesModalBudgetId(budgetId)
      setShowViewExpenseMod(true)
    }



    const onAddBudgetPressed = () => {  


      setShowMod(true)   

    }

    const closeModal = () => {
      setShowMod(false);
      setShowAddExpenseMod(false);
      setShowViewExpenseMod(false);
    }

  

    return (

    <>
  
    <ScrollView>
    
    
        <View
            style={[
                styles.container,
                

            ]}>

            <View style={{flex: 1, justifyContent: "center", marginRight: 10}}>
              <Text style={{fontSize: 30, 
                
                fontWeight: 'bold', 
                color: 'black', 
    
                }}>
                Budgets</Text>
            </View>
        
            <View style={{flex: 2, justifyContent: "center", maxWidth: 110, marginLeft: 10}}>
              <CustomButton text="Add Budget" onPress={onAddBudgetPressed}/>
            </View>

                    
            <View style={{flex: 3, justifyContent: "center", maxWidth: 120, marginLeft: 10}}>
              <CustomButton text="Add Expense" type="SECONDARY" onPress={openAddExpenseModal}/>
            </View>

        </View>

        
        {budgets.map(budget => {

          const amount = 
          getBudgetExpenses(budget.budgetID).reduce(
          (total, expense) => total + expense.amount, 0)
       
         
        
          return(

            <BudgetCard 
            key={budget.budgetID}
            name={budget.budgetName} 
            amount={amount} 
            max={budget.budgetMax} 
            onAddExpenseClick={() => openAddExpenseModal(budget.budgetID)}
            onViewExpenseClick={() => openShowExpenseModal(budget.budgetID)}
            />
          )

        })}

        
      {budgets.length > 0 && (
        <BudgetCard amount={totalAmount} name="Total" max={totalMax} hideButtons/>
      )}
  

    </ScrollView>
   
    
    
    <AddBudgetModal show={showMod} onClose={closeModal} updateBudgets={fetchBudgets}/>
    
    <AddExpenseModal 
    show={showAddExpenseMod} 
    defaultBudgetId={addExpenseModalBudgetId}
    onClose={closeModal}
    updateBudgets={fetchBudgets}/>

    <ViewExpensesModal
    show={showViewExpenseMod}
    budgetId={viewExpensesModalBudgetId}
    onClose={closeModal}
    updateBudgets={fetchBudgets}/>


 


    
    </>
    

    

    );

    
   
};



const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      paddingTop: 20,
      paddingBottom: 20,
      paddingLeft: 5,
      paddingRight: 5,
      height: 100,
      
    },

  });

export default GoalsScreen; 

