import React, { useState, useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
import { getSavedSteps } from '../util/http'; 

const ComparisonScreen = () => {
  const [savedSteps, setSavedSteps] = useState([]);

  useEffect(() => {
    const fetchSavedSteps = async () => {
      try {
        const savedStepsData = await getSavedSteps(); 
        console.log('Gespeicherte Schritte:', savedStepsData);
        setSavedSteps(savedStepsData); 
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchSavedSteps();
  }, []);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Gespeicherte Schritte:</Text>
      {savedSteps && Object.keys(savedSteps).length > 0 ? (
        <FlatList
          data={Object.values(savedSteps)}
          renderItem={({ item }) => (
            <View>
              <Text>{item.steps} Schritte</Text>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      ) : (
        <Text>Keine gespeicherten Schritte vorhanden</Text>
      )}
    </View>
  );
} 

export default ComparisonScreen;
