import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { saveGoalToFirebase } from '../util/http.js';

const WelcomeScreen = ({ navigation }) => {
  const [goal, setGoal] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');

  const isNumeric = value => {
    return /^\d+$/.test(value);
  };

  const isDateValid = value => {
    // Überprüfen, ob das Datum im Format TT.MM.JJJJ ist
    const dateRegex = /^\d{2}\.\d{2}\.\d{4}$/;
    return dateRegex.test(value);
  };

  const handleFormSubmit = () => {
    // Überprüfen, ob das Schrittziel eine gültige Zahl ist
    if (!isNumeric(goal) || Number(goal) < 0) {
      Alert.alert('Fehler', 'Bitte geben Sie eine gültige positive Zahl für das Schrittziel ein.');
      return;
    }

    // Überprüfen, ob das Datum gültig ist
    if (!isDateValid(date)) {
      Alert.alert('Fehler', 'Bitte geben Sie ein gültiges Datum im Format TT.MM.JJJJ ein.');
      return;
    }

    // Daten speichern, wenn die Validierung erfolgreich ist
    const goalData = { goal, description, date };

    saveGoalToFirebase(goalData)
      .then(response => {
        console.log('Schrittziel erfolgreich gespeichert:', response.data);
        navigation.navigate('Main', { goalSteps: Number(goal) });
      })
      .catch(error => {
        console.error('Fehler beim Speichern des Schrittziels:', error);
      });
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Willkommen zur Schrittmesser-App!</Text>
      <TextInput
        placeholder="Geben Sie Ihr Schrittziel ein (nur positive ganze Zahl)"
        value={goal}
        onChangeText={text => setGoal(text)}
        keyboardType="numeric"
      />
      <TextInput
        placeholder="Geben Sie eine Beschreibung ein"
        value={description}
        onChangeText={text => setDescription(text)}
      />
      <TextInput
        placeholder="Geben Sie ein Datum ein (TT.MM.JJJJ)"
        value={date}
        onChangeText={text => setDate(text)}
      />
      <Button title="Speichern" onPress={handleFormSubmit} />
    </View>
  );
};

export default WelcomeScreen;
