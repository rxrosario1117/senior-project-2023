import { useCallback, useState } from "react";
import { Platform } from "react-native";

export default () => {
    const address = Platform.OS === 'ios' ? 'localhost' : '10.0.2.2';

    const [identity, setIdentity] = useState(null);

    const getIdentity = useCallback(async () => {
        await fetch(`http://${address}:8080/api/identity`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => response.json())
        .then((data) => {
          setIdentity(data);
        })
        .catch((err) => {
          console.log(err);
        });
      }, []);

      if (identity == null){
        getIdentity();
      }
    
      if (identity != null) {
        return {
            identity
          }
      }
}