import { useCallback, useState } from "react";
import { Platform } from "react-native";

export default () => {
    const address = Platform.OS === 'ios' ? 'localhost' : '10.0.2.2';

    const [balance, setBalance] = useState(null);
    
    const getBalance = useCallback(async () => {
        await fetch(`http://${address}:8080/api/balance`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => response.json())
        .then((data) => {
          setBalance(data);
        })
        .catch((err) => {
          console.log(err);
        });
      }, []);

      if (balance == null){
        getBalance();
      }
    
      if (balance != null) {
        return {
            balance
          }
      }
      
}
