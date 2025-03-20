import { useParams } from 'react-router-dom';
import { fetchAllCountries, fetchCountryByCode, selectAllCountries, selectCountriesError, selectCountriesLoading, selectSelectedCountry } from '../store/slices/countriesSlice';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { useEffect } from 'react';
import { CountryCard } from './CountryCard';
import { Alert, Box, Button, Card, CircularProgress, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { WeatherInfo } from './Weather/WeatherInfo';


export const CountryDetails = () => {
    const { countryCode } = useParams();
    const dispatch = useAppDispatch()
    const country = useAppSelector(selectSelectedCountry);
    const loading = useAppSelector(selectCountriesLoading);
    const error = useAppSelector(selectCountriesError)

    const navigate = useNavigate();

    if(!countryCode){
        navigate('/countries')
    }

    useEffect(() => {
        dispatch(fetchCountryByCode(countryCode!))
    }, [countryCode, dispatch]); 

    const backToAllCountriesCards = () => {
        navigate('/countries')
    }
    return (
        <Box  sx={{ 
            padding: 3,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            
            margin: '0 auto'
            }}>
            <h1>{country?.name.common}</h1>
            {loading ? (
                <CircularProgress />
            ) : error ? (
                <Alert severity="error">{error}</Alert>
            ) : country ? (
                <>
                    <CountryCard country={country} />
                    <WeatherInfo capitalCity={country.capital[0]} />
                </>
                
                
            ) : (
                <Alert severity="warning">Country not found</Alert>
            )}
            <Stack sx={{pt: 8 }}>
                <Button onClick={backToAllCountriesCards} variant='contained'>Back</Button>
            </Stack>
            
        </Box>  
    )
}


