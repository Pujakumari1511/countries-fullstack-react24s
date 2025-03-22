import { useParams } from 'react-router-dom';
import { fetchCountryByCode, selectCountriesError, selectCountriesLoading, selectSelectedCountry } from '../store/slices/countriesSlice';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { useEffect } from 'react';
import { Alert, Box, Button, Card, CardMedia, CircularProgress, Stack } from '@mui/material';
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
        <>
            <Box sx={{ 
                padding: 3,
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto'
                }}>
                 
                {loading ? (
                    <CircularProgress />
                ) : error ? (
                    <Alert severity="error">{error}</Alert>
                ) : country ? (
            <>
                <Card sx={{width: 500, height: 540, boxShadow: '0px 4px 20px #272727' }}>
                    <CardMedia
                        sx={{ height: 300 }}
                        image={country.flags.png}
                        title={country.name.common}    
                    />
                    <Stack sx={{padding: 1}}>
                        <h1>{country.name.common}</h1>
                        {country.capital && country.capital.length > 0 ? (
                            <WeatherInfo capitalCity={country.capital[0]} />
                        ) : (
                            <p>No weather information available</p>
                        )}
                    </Stack>
                    
                </Card>   

                <Box sx={{textAlign: 'left', mb: 3, paddingLeft: 10}}>
                    <Card sx={{padding: 1, boxShadow: '0px 4px 20px #272727'}}>
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
                    </Card>
                
                </Box>
                    {/* <CountryCard country={country} /> */}   
                </>   
            ) : (
                <Alert severity="warning">Country not found</Alert>
            )}
        </Box> 
            <Stack sx={{ pt: 5, width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Button onClick={backToAllCountriesCards} variant='contained'>Back</Button>
            </Stack>
        </>
         
        
    )
}


