import axios from 'axios';

export function meterAnzeige(meterData) {
  axios.post(
    'https://schrittmesser-34520-default-rtdb.firebaseio.com/meter.json',
    meterData
  );
}

export async function getSavedSteps() {
  try {
    const response = await axios.get('https://schrittmesser-34520-default-rtdb.firebaseio.com/meter.json');
    return response.data; 
  } catch (error) {
    throw new Error('Fehler beim Abrufen der gespeicherten Schritte: ' + error.message);
  }
}

export function saveGoalToFirebase(goalData) {
  return axios.post(
    'https://schrittmesser-34520-default-rtdb.firebaseio.com/goals.json',
    goalData
  );
}

