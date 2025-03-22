import  { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
    fetchAllCountries,
    selectAllCountries,
} from "../store/slices/countriesSlice";
import { CountryCard } from "./CountryCard";
import { Search as SearchIcon } from "@mui/icons-material";
import { Button, CircularProgress, IconButton, Pagination, Stack, TextField } from "@mui/material";
import { Country } from "../types/country";

const CountriesList = () => {
    const countryList = useAppSelector(selectAllCountries);
    const loading = useAppSelector((state) => state.countries.loading);
    const error = useAppSelector((state) => state.countries.error);
    const [searchInput, setSearchInput] = useState<string>("");
    const [page, setPage] = useState(1);  
    const [countries, setCountries] = useState<Country[]>(countryList)
    const dispatch = useAppDispatch();
    const ITEMS_PER_PAGE = 12;

    //searching for countries
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let inputValue = e.target.value.toLowerCase();
        setSearchInput(inputValue);
        if(inputValue.trim().length === 0){
            setCountries(countryList)
            return
        }
        const filteredCountries = countryList.filter((country) => 
        country.name.common.toLowerCase().includes(inputValue));
        setCountries(filteredCountries);
    }

    //pagination
    const numberOfPages = Math.ceil(countries.length/ITEMS_PER_PAGE);
    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const paginatedCountries = countries.slice(startIndex, endIndex)


    useEffect(() => {
        setCountries(countryList)
    }, [countryList]);

    useEffect(()=> {
        dispatch(fetchAllCountries());
    }, [dispatch]);

   

    return (
        <>
        
            <form style={{ display: "flex", alignItems: "center" }} onSubmit={(e) => e.preventDefault()}>
                <TextField
                    id="search-bar"
                    className="text"
                    variant="outlined"
                    placeholder="Search country name"
                    value={searchInput}
                    onChange={handleChange}
                    size="small"
                    sx={{
                        width: 550,
                        margin: "10px auto"
                    }}
                    InputProps={{
                        endAdornment: (
                            <IconButton type="submit" aria-label="search">
                                <SearchIcon style={{ fill: "blue" }} />
                            </IconButton>
                        )
                    }}
                />
            </form>

            {loading ? (
            <div style={{ textAlign: 'center', padding: '2rem' }}>
                <CircularProgress />
                <p>Loading countries...</p>
            </div>
                ) : error ? (
                    <div style={{ textAlign: 'center', padding: '2rem', color: 'red' }}>
                        <p>Error: {error}</p>
                        <Button 
                            variant="contained" 
                            onClick={() => dispatch(fetchAllCountries())}
                            >
                            Try Again
                        </Button>
                    </div>
                ) : (
                    <>
                        <div style={{ 
                            display: 'grid', 
                            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
                            gap: '30px',
                            paddingTop: '50px' // Added padding top
                        }}>
                    
                            {paginatedCountries.map((country) => (
                                <CountryCard key={country.name.common} country={country} />    
                            ))}
                            
                            {countries.length === 0 && (<span>No Country found</span>)} 

                        </div>
                        <Stack spacing={2} paddingTop={5} alignItems={'center'}>
                            <Pagination count={numberOfPages} onChange={(_, value) => setPage(value)} variant="outlined" shape="rounded" />
                        </Stack>
                        
                    </>
                )}
                  
        </> 
    )   
}
export default CountriesList;