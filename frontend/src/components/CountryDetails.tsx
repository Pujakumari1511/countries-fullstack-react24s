import { useParams } from 'react-router-dom';
import { fetchCountryByCode, selectCountriesError, selectCountriesLoading, selectSelectedCountry } from '../store/slices/countriesSlice';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { useEffect } from 'react';
import { Alert, Box, Button, Card, CardMedia, CircularProgress, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { WeatherInfo } from './Weather/WeatherInfo';
import { Palette } from '@mui/icons-material';


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
        <>
            <Box sx={{ 
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: '100%',
                gap: 3
            }}>
                {loading 
                ? (<CircularProgress />) 
                : error 
                    ? (<Alert severity="error">{error}</Alert>) 
                    : country 
                        ? (<>
                                <CardMedia
                                    sx={{ 
                                        height: 350, 
                                        width: '100%',
                                        maxWidth: 600,
                                        marginBottom: 3
                                    }}
                                    image={country.flags.png}
                                    title={country.name.common}    
                                />
                                
                                <Box sx={{
                                    display: 'flex',
                                    flexDirection: { xs: 'column', md: 'column' },
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    gap: 3,
                                    width: 600
                                }}>
                                    <Box sx={{
                                        border: 1,  
                                        width: { xs: '60%', sm: '100%' },
                                        padding: 2,
                                        boxShadow: '0px 4px 20px #272727',
                                        borderRadius: 1,
                                        background: (theme) => `linear-gradient(90deg, ${theme.palette.primary.main} 10%, ${theme.palette.primary.light} 90%)`
                                    }}>
                                        <h1>{country.name.common}</h1>
                                        {country.capital && country.capital.length > 0 ? (
                                            <WeatherInfo capitalCity={country.capital[0]} />
                                        ) : (
                                            <p>No weather information available</p>
                                        )}
                                    </Box>

                                    {/* Country Details */}
                                    <Box sx={{
                                        border: 1,  
                                        width: { xs: '0%', sm: '100%' },
                                        padding: 2,
                                        boxShadow: '0px 4px 20px #272727',
                                        borderRadius: 1,
                                        background: (theme) => `linear-gradient(90deg, ${theme.palette.primary.main} 10%, ${theme.palette.primary.light} 90%)`
                                    }}>
                                        <p><strong>Name: </strong>{country.name.official}</p>
                                        <p><strong>Country code:</strong> {country.cca3}</p>
                                        <p><strong>Capital:</strong> {country.capital?.join(', ') || 'N/A'}</p>
                                        <p><strong>Region:</strong> {country.region}</p>
                                        <p><strong>Sub Region:</strong> {country.subregion}</p>
                                        <p><strong>Population:</strong> {country.population?.toLocaleString() || 'N/A'}</p>
                                        {country.languages && (
                                            <p><strong>Languages:</strong> {Object.values(country.languages).join(', ')}</p>
                                        )}
                                        {country.currencies && (
                                        <p><strong>Currencies:</strong> {Object.values(country.currencies)
                                        .map((currency: any) => `${currency.name} (${currency.symbol})`)
                                        .join(', ')}
                                        </p>
                                        )}
                                    </Box>
                                </Box>
                            
                            </>) 
                        : (<Alert severity="warning">Country not found</Alert>)}
            </Box> 
            <Stack sx={{ pt: 5, width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Button onClick={backToAllCountriesCards} variant='contained'>Back</Button>
            </Stack>
        </>  
    )
}


