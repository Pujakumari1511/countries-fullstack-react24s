import axios from "axios"
import { Weather } from "../../types/weather"


const WEATHER_API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

const weatherBaseUrl = "https://api.openweathermap.org/data/2.5";

export const weatherAPi = {
    getWeatherByCity: async (capitalCity: string): Promise<Weather> => {
        const response = await axios.get<Weather>(`${weatherBaseUrl}/weather?q=${capitalCity}&units=metric&appid=${WEATHER_API_KEY}`)
        return response.data;
    }
}