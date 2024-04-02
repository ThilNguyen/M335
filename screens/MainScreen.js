import React, { useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import { Pedometer } from 'expo-sensors';
import { meterAnzeige } from '../util/http';
import GoalProgressChart from '../components/GoalProgressChart';

const MainScreen = ({ navigation, route }) => {
  const [currentSteps, setCurrentSteps] = useState(0);
  const [initialStepCount, setInitialStepCount] = useState(null);
  const [subscription, setSubscription] = useState(null);
  const [isUpdatingSteps, setIsUpdatingSteps] = useState(false);
  const [goalSteps, setGoalSteps] = useState(route.params.goalSteps || 10000); 

  useEffect(() => {
    let previousStepCount = initialStepCount || 0;

    if (!subscription) {
      Pedometer.isAvailableAsync().then(isAvailable => {
        if (isAvailable) {
          setSubscription(
            Pedometer.watchStepCount(result => {
              const newSteps = result.steps - previousStepCount;
              setCurrentSteps(prevSteps => prevSteps + newSteps);
              previousStepCount = result.steps;
            })
          );
        }
      });
    }

    return () => {
      if (subscription) {
        subscription.remove();
        setSubscription(null);
      }
    };
  }, [subscription]);

  const handleSaveSteps = async () => {
    if (!isUpdatingSteps) {
      setIsUpdatingSteps(true);
      try {
        await meterAnzeige({ steps: currentSteps });
        setIsUpdatingSteps(false);
      } catch (error) {
        setIsUpdatingSteps(false);
        console.error('Fehler beim Speichern der Schritte:', error);
      }
    }
  };

  const progress = Math.min(currentSteps / goalSteps, 1); // Fortschritt begrenzen auf 1 (100%)

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <GoalProgressChart currentSteps={currentSteps} goalSteps={goalSteps} progress={progress} />
      <Text>Schritte von heute: {currentSteps}</Text> 
      <Button title='Speichern' onPress={handleSaveSteps} disabled={isUpdatingSteps} />
      <Button title='Vergleich' onPress={() => navigation.navigate('Comparison')} disabled={isUpdatingSteps} />
    </View>
  );
};

export default MainScreen;
