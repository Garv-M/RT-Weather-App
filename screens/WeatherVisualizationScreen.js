import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, Text, ActivityIndicator } from 'react-native';
import WeatherSummaryChart from '../components/WeatherSummaryChart';
import { fetchDailySummaries } from '../api/WeatherApi';

const WeatherVisualizationScreen = () => {
  const [dailySummaries, setDailySummaries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchDailySummaries();
        setDailySummaries(data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching daily summaries:', err);
        setError('Failed to load data');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#4CAF50" />
        <Text style={styles.loadingText}>Loading data...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.chartContainer}>
        {dailySummaries.length > 0 ? (
          <WeatherSummaryChart dailySummaries={dailySummaries} />
        ) : (
          <Text style={styles.noDataText}>No data available</Text>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5', // Light background for better contrast
  },
  chartContainer: {
    backgroundColor: '#ffffff', // White background for chart area
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
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
  errorText: {
    fontSize: 18,
    color: '#FF5722', // Red for errors
    fontWeight: 'bold',
  },
  noDataText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#888',
  },
});

export default WeatherVisualizationScreen;
