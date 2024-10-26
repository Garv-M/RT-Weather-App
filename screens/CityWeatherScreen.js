import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet,ActivityIndicator } from 'react-native';
import WeatherItem from '../components/CityWeather';
import { fetchCityWeather } from '../api/WeatherApi';  // Import API call

const CityWeatherScreen = ({ route }) => {
  const { city } = route.params;
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadWeatherData = async () => {
      try {
        const data = await fetchCityWeather(city);  // Use the API function
        setWeatherData(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching city weather data:', error);
        setLoading(false);
      }
    };

    loadWeatherData();
  }, [city]);

  return (
    <View style={styles.container}>
      {loading ? (
        <View style={styles.centered}>
          <ActivityIndicator size="large" color="#4CAF50" />
          <Text style={styles.loadingText}>Loading data...</Text>
        </View>
      ) : (
        weatherData && (
          <WeatherItem
            city={weatherData.city}
            temperature={weatherData.temperature.toFixed(1)}
            feelsLike={weatherData.feelsLike.toFixed(1)}
            humidity={weatherData.humidity || 'N/A'}
            windspeed={weatherData.windSpeed || 'N/A'}
            mainCondition={weatherData.mainCondition}
            timestamp={weatherData.timestamp}
          />
        )
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 18,
    color: '#333',
  },
});

export default CityWeatherScreen;
