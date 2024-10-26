import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { submitAlertConfig } from '../api/WeatherApi';

const AlertConfigForm = () => {
  const [email, setEmail] = useState('');
  const [alertType, setAlertType] = useState('temperature'); // Added alert type state
  const [condition, setCondition] = useState('>'); // Condition for temperature
  const [threshold, setThreshold] = useState(35); // Temperature threshold
  const [conditionValue, setConditionValue] = useState('Rain'); // Specific condition

  const handleSubmit = async () => {
    if (!email.includes('@')) {
      Alert.alert('Invalid Email', 'Please enter a valid email address');
      return;
    }

    // Prepare data based on alert type
    const configData = {
      email,
      attributeType: alertType,
      condition: alertType === 'temperature' ? condition : 'equals',
      threshold: alertType === 'temperature' ? parseFloat(threshold) : 0,
      conditionValue: alertType === 'condition' ? conditionValue: null,
    };

    const result = await submitAlertConfig(configData);

    // Show the result message to the user
    Alert.alert('Submission Status', result.message);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Email:</Text>
      <TextInput 
        style={styles.input} 
        value={email} 
        onChangeText={setEmail} 
        placeholder="Enter your email" 
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <Text style={styles.label}>Alert Type:</Text>
      <Picker
        selectedValue={alertType}
        onValueChange={(value) => setAlertType(value)}
        style={styles.picker}
      >
        <Picker.Item label="Temperature" value="temperature" />
        <Picker.Item label="Condition" value="condition" />
      </Picker>

      {alertType === 'temperature' && (
        <>
          <Text style={styles.label}>Temperature Condition:</Text>
          <View style={styles.row}>
            <Picker
              selectedValue={condition}
              onValueChange={(value) => setCondition(value)}
              style={styles.inputCondition}
            >
              <Picker.Item label="Greater than" value=">" />
              <Picker.Item label="Less than" value="<" />
            </Picker>
            <TextInput
              style={styles.inputThreshold}
              value={threshold.toString()}
              keyboardType="numeric"
              onChangeText={(text) => setThreshold(text.replace(/[^0-9.]/g, ''))}
              placeholder="35"
            />
          </View>
        </>
      )}

      {alertType === 'condition' && (
        <>
          <Text style={styles.label}>Weather Condition:</Text>
          <Picker
            selectedValue={conditionValue}
            onValueChange={(value) => setConditionValue(value)}
            style={styles.picker}
          >
            <Picker.Item label="Rain" value="Rain" />
            <Picker.Item label="Haze" value="Haze" />
            <Picker.Item label="Clear" value="Clear" />
            <Picker.Item label="Smoke" value="Smoke" />
            <Picker.Item label="Snow" value="Snow" />
            <Picker.Item label="Cloudy" value="Cloudy" />
          </Picker>
        </>
      )}

      <Button title="Submit" onPress={handleSubmit} color="#4CAF50" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    padding: 20, 
    backgroundColor: '#f5f5f5', 
    flex: 1,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333',
  },
  input: { 
    borderWidth: 1, 
    padding: 10, 
    marginVertical: 10, 
    borderColor: '#ccc', 
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  row: { 
    flexDirection: 'row', 
    alignItems: 'center',
    marginBottom: 20,
  },
  picker: {
    height: 50,
    width: '100%',
    marginBottom: 20,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
  },
  inputCondition: { 
    height: 50,
    width: 120,
    borderWidth: 1, 
    marginRight: 10, 
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  inputThreshold: { 
    borderWidth: 1, 
    padding: 10, 
    width: 80, 
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#fff',
  },
});

export default AlertConfigForm;
