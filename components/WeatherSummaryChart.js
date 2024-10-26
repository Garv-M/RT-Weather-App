import React from 'react';
import { View, Text, Dimensions, StyleSheet, ScrollView } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const WeatherSummaryChart = ({ dailySummaries }) => {
  if (!dailySummaries || dailySummaries.length === 0) {
    return <Text>No data to display</Text>;
  }

  // Group data by city
  const groupedByCity = dailySummaries.reduce((acc, summary) => {
    if (!acc[summary.city]) {
      acc[summary.city] = [];
    }
    acc[summary.city].push(summary);
    return acc;
  }, {});

  return (
    <ScrollView>
      {Object.keys(groupedByCity).map((city) => {
        const cityData = groupedByCity[city];

        // Reverse labels (dates) and temperature data for reversed X-axis
        const labels = cityData.map(summary => summary.date).reverse();  // Reverse dates
        const temperatureData = cityData.map(summary => summary.averageTemperature).reverse();  // Reverse temperatures

        const chartData = {
          labels,
          datasets: [
            {
              data: temperatureData,
              strokeWidth: 2, // optional, default 3
              color: (opacity = 1) => `rgba(75,192,192,${opacity})`, // Line color
            },
          ],
        };

        return (
          <View key={city} style={styles.chartContainer}>
            <Text style={styles.title}>{`Average Temperature in ${city}`}</Text>
            <LineChart
              data={chartData}
              width={Dimensions.get('window').width - 65} // from react-native
              height={220}
              yAxisLabel=""
              yAxisSuffix="°C"
              chartConfig={{
                backgroundColor: '#e26a00',
                backgroundGradientFrom: '#2196F3',
                backgroundGradientTo: '#4CAF50',
                decimalPlaces: 2, // optional, defaults to 2dp
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                style: {
                  borderRadius: 16,
                },
                propsForDots: {
                  r: '6',
                  strokeWidth: '2',
                  stroke: '#ffa726',
                },
              }}
              bezier
              style={{
                marginVertical: 8,
                borderRadius: 16,
              }}
            />
          </View>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  chartContainer: {
    marginBottom: 30,
  },
  title: {
    textAlign: 'center',
    fontSize: 18,
    marginVertical: 10,
  },
});

export default WeatherSummaryChart;
