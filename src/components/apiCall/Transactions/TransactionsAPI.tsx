import { useCallback, useState } from "react";
import { Platform } from "react-native";

export default () => {
    const address = Platform.OS === 'ios' ? 'localhost' : '10.0.2.2';

    const [transactions, setTransactions] = useState(null);
    
    const getTransactions = useCallback(async () => {
        await fetch(`http://${address}:8080/api/transactions/get`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            "start_date": '2018-01-01',  
            "end_date": '2024-02-01'   
          }),
        })
        .then((response) => response.json())
        .then((data) => {
          setTransactions(data);
        })
        .catch((err) => {
          console.log(err);
        });
      }, []);

      if (transactions == null){
        getTransactions();
      }
    
      if (transactions != null) {
        return {
            transactions
          }
      }
      
}
