import { useParams } from 'react-router-dom';
import { fetchAllCountries, selectAllCountries, selectCountriesError, selectCountriesLoading } from '../store/slices/countriesSlice';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { useEffect } from 'react';
import { CountryCard } from './CountryCard';
import { Alert, Box, CircularProgress } from '@mui/material';

export const CountryDetails = () => {
    const { name } = useParams();
    const dispatch = useAppDispatch()
    const countries = useAppSelector(selectAllCountries);
    const loading = useAppSelector(selectCountriesLoading);
    const error = useAppSelector(selectCountriesError)

    const decodedName = decodeURIComponent(name || "").toLowerCase();
    
    const country = countries.find(
      (country) => country.name.common.toLowerCase() === decodedName
    );

    useEffect(() => {
        if (!country){
            dispatch(fetchAllCountries());
        }
    }, [country, dispatch]);

    return (
        <Box  sx={{ 
            padding: 3,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            
            margin: '0 auto'
            }}>
            <h1>{decodeURIComponent(name || "")}</h1>
            {loading ? (
                <CircularProgress />
            ) : error ? (
                <Alert severity="error">{error}</Alert>
            ) : country ? (
                <CountryCard country={country} />
            ) : (
                <Alert severity="warning">Country not found</Alert>
            )}
        </Box>  
    )
}