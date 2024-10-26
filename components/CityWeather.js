import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card } from 'react-native-elements';

const CityWeather = ({ city, temperature, feelsLike, mainCondition,humidity, windspeed, timestamp }) => {
  const tempCelsius = temperature ?? 'N/A';
  const feelsLikeCelsius = feelsLike ?? 'N/A';
  const mainConditionItem = mainCondition ?? 'N/A';
  const humidityItem = humidity ?? 'N/A';
  const windspeedItem = windspeed ?? 'N/A';

  return (
    <Card containerStyle={styles.card}>
      <Card.Title style={styles.cityTitle}>{city}</Card.Title>
      <Card.Divider />
      <View style={styles.container}>
        <Text style={styles.label}>Temperature: <Text style={styles.value}>{tempCelsius}°C</Text></Text>
        <Text style={styles.label}>Feels Like: <Text style={styles.value}>{feelsLikeCelsius}°C</Text></Text>
        <Text style={styles.label}>Condition: <Text style={styles.value}>{mainConditionItem}</Text></Text>
        <Text style={styles.label}>Humidity: <Text style={styles.value}>{humidityItem}</Text>%</Text>
        <Text style={styles.label}>Windspeed: <Text style={styles.value}>{windspeedItem}</Text></Text>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  cityTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  container: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginTop: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginVertical: 4,
  },
  value: {
    fontWeight: '600',
    color: '#000',
  },
});

export default CityWeather;
