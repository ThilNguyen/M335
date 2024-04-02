// App.js
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Pedometer } from 'expo-sensors';
import WelcomeScreen from './screens/WelcomeScreen';
import MainScreen from './screens/MainScreen';
import ComparisonScreen from './screens/ComparisonScreen';

const Stack = createStackNavigator();

export default function App() {
  const [isPedometerAvailable, setIsPedometerAvailable] = useState(false);
  const [pastStepCount, setPastStepCount] = useState(0);
  const [currentStepCount, setCurrentStepCount] = useState(0);
  const [subscription, setSubscription] = useState(null);

  useEffect(() => {
    (async () => {
      const isAvailable = await Pedometer.isAvailableAsync();
      setIsPedometerAvailable(isAvailable);

      if (isAvailable) {
        const end = new Date();
        const start = new Date();
        start.setDate(end.getDate() - 1);

        const pastStepCountResult = await Pedometer.getStepCountAsync(start, end);
        if (pastStepCountResult) {
          setPastStepCount(pastStepCountResult.steps);
        }

        const newSubscription = Pedometer.watchStepCount(result => {
          setCurrentStepCount(result.steps);
        });
        setSubscription(newSubscription);
      }
    })();

    return () => {
      if (subscription) {
        subscription.remove();
      }
    };
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Main" component={MainScreen} />
        <Stack.Screen name="Comparison" component={ComparisonScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
