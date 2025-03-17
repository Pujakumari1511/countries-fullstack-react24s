import axios from "axios"
import { WeatherData } from "../../types/weather"



export const weatherAPi = {
    getWeatherByCity: async (): Promise<WeatherData> => {
        const response = await axios.get("https://api.openweathermap.org/Delhi/3.0/onecall?lat={lat}&lon={lon}&exclude={part}&appid={e72d1c790cace10e00b939682ed7336a")
        return response.data;
    }
}