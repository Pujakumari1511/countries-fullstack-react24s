
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchCapitalCityWeather } from "../../store/slices/weatherSlice";
import { useEffect } from "react";
import { RootState } from "../../store/store";
import { Alert, Box, CircularProgress, Typography } from "@mui/material";
import { Air, Speed, Thermostat, WaterDrop, WbSunny } from "@mui/icons-material";


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
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : (
        <Box>
        <Typography variant="body2" sx={{ display: "flex", alignItems: "center" }}>
          <Thermostat sx={{ mr: 0.5 }} />{`${weather?.main.feels_like}°C`}
        </Typography>
        <Typography variant="body2" sx={{ display: "flex", alignItems: "center" }}>
          <WaterDrop sx={{ mr: 0.5 }} />{`${weather?.main.humidity}%`}
        </Typography>
        <Typography variant="body2" sx={{ display: "flex", alignItems: "center" }}>
          <WbSunny sx={{ mr: 0.5 }} />{`${weather?.main.temp}°C`}
        </Typography>
        <Typography variant="body2" sx={{ display: "flex", alignItems: "center" }}>
          <Speed sx={{ mr: 0.5 }} />{`${weather?.wind.speed} m/s`}
        </Typography>
        <Typography variant="body2" sx={{ display: "flex", alignItems: "center" }}>
          <Air sx={{ mr: 0.5 }} />{weather?.weather[0].description}
        </Typography>
      </Box>
      )}

    </>
  )
} 
 


