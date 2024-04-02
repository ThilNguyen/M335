import React, { useState } from 'react';
import { View, Text, Button, TextInput, Alert } from 'react-native';

const GoalForm = ({ onSubmit }) => {
  const [stepsGoal, setStepsGoal] = useState('');
  const [error, setError] = useState('');

  const validateInput = () => {
    const goal = parseInt(stepsGoal);
    if (isNaN(goal) || goal <= 0) {
      setError('Bitte geben Sie eine gültige Anzahl von Schritten ein.');
      return false;
    }
    return true;
  };

  const handleSubmit = () => {
    if (validateInput()) {
      onSubmit(parseInt(stepsGoal));
      setStepsGoal('');
      setError('');
    }
  };

  return (
    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, paddingHorizontal: 10 }}
        placeholder='Schrittziel eingeben'
        keyboardType='numeric'
        value={stepsGoal}
        onChangeText={(text) => setStepsGoal(text)}
      />
      {error ? <Text style={{ color: 'red', marginBottom: 10 }}>{error}</Text> : null}
      <Button title='Speichern' onPress={handleSubmit} />
    </View>
  );
};

export default GoalForm;
