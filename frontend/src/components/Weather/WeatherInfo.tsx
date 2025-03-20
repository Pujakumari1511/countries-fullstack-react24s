
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchCapitalCityWeather } from "../../store/slices/weatherSlice";
import { useEffect } from "react";
import { RootState } from "../../store/store";


interface WeatherInfoProps {
  capitalCity: string;
}


export const WeatherInfo =  ({ capitalCity }: WeatherInfoProps) => {
  const dispatch = useAppDispatch();
  const weather = useAppSelector((state: RootState) => state.weather.weather);
  const loading = useAppSelector((state: RootState) => state.weather.loading);
  const error = useAppSelector((state: RootState) => state.weather.error);

  useEffect(() => {
    dispatch(fetchCapitalCityWeather(capitalCity));
  }, [capitalCity, dispatch]);

  return (
    <>
      <div>
        <p>{`Feels like: ${weather?.main.feels_like}`}</p>
        <p>{`Humidity: ${weather?.main.humidity}`}</p>
        <p>{`Temp: ${weather?.main.temp}`}</p>
        <p>{`Speed: ${weather?.wind.speed}`}</p>
        <p>{`Description: ${weather?.weather[0].description}`}</p>
        <p>{"Icon: "}<img src={`https://openweathermap.org/img/wn/${weather?.weather[0].icon}.png`} alt={weather?.weather[0].icon}/></p>
      </div>

    </>
  )
} 
 


