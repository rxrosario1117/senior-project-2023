import React, {useState} from 'react';
import { View, Text, Image, StyleSheet, useWindowDimensions, ScrollView } from 'react-native';
import CustomButton from '../../components/CustomButton';
import BudgetCard from '../../components/BudgetCard';
import { useBudgets } from '../../contexts/BudgetsContext';
import AddBudgetModal from '../../components/AddBudgetModal';
import AddExpenseModal from '../../components/AddExpenseModal';
import ViewExpensesModal from '../../components/ViewExpensesModal';



const GoalsScreen = () => {
 

    const [showMod, setShowMod] = useState(false);
    const { expenses, budgets, getBudgetExpenses } = useBudgets()

    const [showAddExpenseMod, setShowAddExpenseMod] = useState(false)
    const [addExpenseModalBudgetId, setAddExpenseModalBudgetId] = useState()

    const [showViewExpenseMod, setShowViewExpenseMod] = useState(false)
    const [viewExpensesModalBudgetId, setViewExpensesModalBudgetId] = useState(0)


    const totalAmount = expenses.reduce((total, expense) => total + expense.amount, 0)
    const totalMax = budgets.reduce((total, budget) => total + budget.max, 0)

    
    function openAddExpenseModal(budgetId) {

      

      if (budgets.some(budget => budget.id === budgetId)) {

        
        setAddExpenseModalBudgetId(budgetId)
      }
      else {
        setAddExpenseModalBudgetId(0)
      }
   
      
      setShowAddExpenseMod(true)
      
      
    }

    function openShowExpenseModal(budgetId) {
      console.warn(budgetId)
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
  

    <View>
    
    
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

          const amount = getBudgetExpenses(budget.id).reduce(
            (total, expense) => total + expense.amount, 0)

          
          return(

            <BudgetCard 
            key={budget.id}
            name={budget.name} 
            amount={amount} 
            max={budget.max} 
            onAddExpenseClick={() => openAddExpenseModal(budget.id)}
            onViewExpenseClick={() => openShowExpenseModal(budget.id)}
            />
          )

        })}

        
      {budgets.length > 0 && (
        <BudgetCard amount={totalAmount} name="Total" max={totalMax} hideButtons/>
      )}
  




        

        

       

     

        
   
    </View>
   
    
    
    <AddBudgetModal show={showMod} onClose={closeModal}/>
    
    <AddExpenseModal 
    show={showAddExpenseMod} 
    defaultBudgetId={addExpenseModalBudgetId}
    onClose={closeModal}/>

<ViewExpensesModal
    show={showViewExpenseMod}
    budgetId={viewExpensesModalBudgetId}
    onClose={closeModal}

  />



   

    
 


    
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

//<BudgetCard amount={totalAmount} name="Total" max={totalMax} hideButtons/>

/*
 <ViewExpensesModal
    budgetId={viewExpensesModalBudgetId}
    handleClose={() => setViewExpensesModalBudgetId()}

    />
*/