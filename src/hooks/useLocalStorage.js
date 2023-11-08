import { useState, useEffect } from 'react';
import { AsyncStorage } from 'react-native';

export default function useLocalStorage(key, defaultValue) {
    const [value, setValue] = useState(defaultValue);

    useEffect(() => {
        async function loadFromLocalStorage() {
            try {
                const jsonValue = await AsyncStorage.getItem(key);
                if (jsonValue !== null) {
                    setValue(JSON.parse(jsonValue));
                }
            } catch (error) {
                console.error('Error loading data from AsyncStorage:', error);
            }
        }

        loadFromLocalStorage();
    }, [key]);

    useEffect(() => {
        async function saveToLocalStorage() {
            try {
                await AsyncStorage.setItem(key, JSON.stringify(value));
            } catch (error) {
                console.error('Error saving data to AsyncStorage:', error);
            }
        }

        saveToLocalStorage();
    }, [key, value]);

    return [value, setValue];
}
