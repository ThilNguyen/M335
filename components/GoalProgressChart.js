import React from 'react';
import { View, Text, Button } from 'react-native';
import { PieChart } from 'react-native-svg-charts';

const GoalProgressChart = ({ currentSteps, goalSteps }) => {
  const progress = currentSteps / goalSteps;

  const data = [
    {
      key: 1,
      value: progress,
      svg: { fill: 'green' },
    },
    {
      key: 2,
      value: 1 - progress,
      svg: { fill: 'lightgrey' },
    },
  ];

  return (
    <View style={{ alignItems: 'center' }}>
      <PieChart style={{ height: 200, width: 200 }} data={data} />
      <Text style={{ marginTop: 10 }}>Fortschritt zum Ziel: {Math.round(progress * 100)}%</Text>
    </View>
  );
};

export default GoalProgressChart;
