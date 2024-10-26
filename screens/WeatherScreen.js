import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import WeatherItem from '../components/CityWeather';
import { fetchAllWeather, fetchTriggeredAlerts } from '../api/WeatherApi';  // Import API call
import { Button } from 'react-native-elements';

const WeatherScreen = ({ navigation }) => {
  const [weatherData, setWeatherData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [breachedAlerts, setBreachedAlerts] = useState([]);

  // Function to load weather data
  const loadWeatherData = async () => {
    try {
      const data = await fetchAllWeather();
      setWeatherData(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching weather data:', error);
      setLoading(false);
    }
  };

  const loadTriggeredAlerts = async () => {
    try {
      const alerts = await fetchTriggeredAlerts();
      if (alerts.length > 0) {
        setBreachedAlerts(alerts); // Store breached alerts
        setShowAlertModal(true); // Show the alert modal
      }
    } catch (error) {
      console.error('Error fetching triggered alerts:', error);
    }
  };

  useEffect(() => {
    loadWeatherData();
    loadTriggeredAlerts();

    const intervalId = setInterval(() => {
      console.log('Fetching new weather data...');
      loadWeatherData();
      loadTriggeredAlerts();
    }, 300000);

    return () => clearInterval(intervalId);
  }, []);

  const closeModal = () => {
    setShowAlertModal(false);
    setBreachedAlerts([]); // Clear alerts
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button
          title="Configuration of Alert"
          onPress={() => navigation.navigate('AlertConfigForm')}
          buttonStyle={styles.buttonStyle}
          titleStyle={styles.buttonTitle}
        />
        <Button
          title="Weather Summary"
          onPress={() => navigation.navigate('WeatherVisualizationScreen')}
          buttonStyle={styles.buttonStyle}
          titleStyle={styles.buttonTitle}
        />
      </View>
      <View style={{ alignItems: "center" }}>
        <Text style={styles.modalTitle}>Today's Weather Details</Text>
      </View>

      {loading ? (
        <Text style={styles.loadingText}>Loading weather data...</Text>
      ) : (
        <FlatList
          data={weatherData}
          keyExtractor={item => item.city}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => navigation.navigate('CityWeather', { city: item.city })}>
              <WeatherItem
                city={item.city}
                temperature={item.temperature.toFixed(1) || 'N/A'}  // Check that the value is being passed correctly
                feelsLike={item.feelsLike.toFixed(1) || 'N/A'}
                humidity={item.humidity || 'N/A'}
                windspeed={item.windSpeed || 'N/A'}
                mainCondition={item.mainCondition || 'N/A'}
                timestamp={item.timestamp}
              />
            </TouchableOpacity>
          )}
        />
      )}

      {/* Modal for alert when threshold is breached */}
      <Modal visible={showAlertModal} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Threshold Breach Alert!</Text>
            {breachedAlerts.length > 0 ? (
              breachedAlerts.map((alert, index) => (
                <View key={index}>
                  {alert.attributeType === "temperature" ? (
                    <Text style={styles.modalText}>
                      {`Temperature ${alert.condition} ${alert.threshold}°C`}
                    </Text>
                  ) : alert.attributeType === "condition" ? (
                    <Text style={styles.modalText}>
                      {`Weather condition matched: ${alert.conditionValue}`}
                    </Text>
                  ) : (
                    <Text style={styles.modalText}>Unknown alert type</Text>
                  )}
                </View>
              ))
            ) : (
              <Text>No alerts found.</Text>
            )}
            <Button title="OK" onPress={closeModal} buttonStyle={styles.modalButtonStyle} />
          </View>
        </View>
      </Modal>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5', // Lighter background for a cleaner look
  },
  buttonContainer: {
    marginBottom: 20,
  },
  buttonStyle: {
    backgroundColor: '#4CAF50', // Modern green color
    borderRadius: 10,
    marginBottom: 10,
    paddingVertical: 15,
  },
  buttonTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  loadingText: {
    fontSize: 18,
    color: '#333',
    textAlign: 'center',
    marginVertical: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)', // Dark overlay background
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 30,
    borderRadius: 15,
    width: '80%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 10,
    color: '#555',
  },
  modalButtonStyle: {
    backgroundColor: '#FF5722',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 20,
  },
});

export default WeatherScreen;
