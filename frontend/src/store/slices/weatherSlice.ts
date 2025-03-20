import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { WeatherState } from "../../types/weather";
import { weatherAPi } from "../../api/services/weather";
import { RootState } from "../store";



const initialState: WeatherState = {
    weather: null,
    loading: false,
    error: null,
    selectedCity: null

}
export const fetchCapitalCityWeather = createAsyncThunk(
    'weather/fetchcapitalcityweather',
    async (capitalCity: string, { rejectWithValue }) => {
    try {
        const response = await weatherAPi.getWeatherByCity(capitalCity);
        return response;
    } catch (error: any) {
        return rejectWithValue(error.message);
    }
})

export const weatherSlice = createSlice({
    name: 'weather',
    initialState,
    reducers: {
        clearSelectedWeather: (state) => {
            state.weather = null;
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchCapitalCityWeather.pending, (state) => {
            state.loading = true;
        })
        .addCase(fetchCapitalCityWeather.fulfilled, (state, action) => {
            state.loading = false;
            state.weather = action.payload;
        })

       .addCase(fetchCapitalCityWeather.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string
        })
    }
    
})

export const selectWeather = (state: RootState) => state.weather.weather;
export const selectWeatherLoading = (state: RootState) => state.weather.loading;
export const selectWeatherError = (state: RootState) => state.weather.error;

export const { clearSelectedWeather } = weatherSlice.actions;
export default weatherSlice.reducer;