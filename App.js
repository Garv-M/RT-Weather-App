import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import WeatherScreen from './screens/WeatherScreen';
import CityWeatherScreen from './screens/CityWeatherScreen';
import AlertConfigForm from './screens/AlertConfigForm';
import WeatherVisualizationScreen from './screens/WeatherVisualizationScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Weather">
        <Stack.Screen name="Weather" component={WeatherScreen} options={{ title: 'All Cities Weather' }} />
        <Stack.Screen name="AlertConfigForm" component={AlertConfigForm} options={{ title: 'Configure Condition for Delhi' }}/>
        <Stack.Screen name="WeatherVisualizationScreen" component={WeatherVisualizationScreen} options={{ title: 'Summary' }}/>
        <Stack.Screen name="CityWeather" component={CityWeatherScreen} options={({ route }) => ({ title: route.params.city })} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
