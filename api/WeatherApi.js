const BASE_URL = 'http://192.168.29.37:8080/api/weather'; // Change to your API.

// Fetch weather for all cities
export const fetchAllWeather = async () => {
  try {
    const response = await fetch(`${BASE_URL}/all`);
    if (!response.ok) {
      throw new Error('Error fetching weather data for all cities');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error in fetchAllWeather:', error);
    throw error;
  }
};

// Fetch weather for a specific city
export const fetchCityWeather = async (city) => {
  try {
    const response = await fetch(`${BASE_URL}/${city}`);
    if (!response.ok) {
      throw new Error(`Error fetching weather data for ${city}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error in fetchCityWeather:', error);
    throw error;
  }
};

export const submitAlertConfig = async (configData) => {
  try {
    const response = await fetch(`${BASE_URL}/alert-config`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(configData),
    });

    if (response.ok) {
      return { success: true, message: 'Alert configuration submitted successfully!' };
    } else {
      return { success: false, message: 'Failed to submit alert configuration.' };
    }
  } catch (error) {
    console.error(error);
    return { success: false, message: 'An error occurred.' };
  }
};

export const fetchDailySummaries = async () => {
  try {
    const response = await fetch(`${BASE_URL}/daily-summaries`);
    if (!response.ok) {
      throw new Error('Error fetching daily summaries');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching daily summaries:', error);
    return [];
  }
};


// Fetch triggered alerts from the backend
export const fetchTriggeredAlerts = async () => {
  try {
    const response = await fetch(`${BASE_URL}/triggered-alerts`);
    if (!response.ok) {
      throw new Error('Error fetching Alerts');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching triggered alerts:', error);
    return [];
  }
};