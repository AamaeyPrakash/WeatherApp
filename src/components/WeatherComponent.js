import { Text, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import { getWeather } from '../services/WeatherService';

const WeatherComponent = () => {
    const [city, setCity] = useState("Delhi");
    const [weather, setWeather] = useState(null);

    const fetchWeather = async () => {
        try {
            const weatherData = await getWeather({ city });
            setWeather(weatherData);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchWeather();
    }, []);

    return (
        <View>
            <Text>Temperature: {weather ? weather.temperature : 'Loading...'}</Text>
        </View>
    );
};

export default WeatherComponent;