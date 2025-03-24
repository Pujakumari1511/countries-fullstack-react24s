import  { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
    fetchAllCountries,
    selectAllCountries,
} from "../store/slices/countriesSlice";
import { CountryCard } from "./CountryCard";
import { Search as SearchIcon } from "@mui/icons-material";
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Checkbox, CircularProgress, FormControlLabel, IconButton, Pagination, Stack, TextField, Typography } from "@mui/material";
import { Country } from "../types/country";
import TuneIcon from '@mui/icons-material/Tune';

interface FilterState {
    countryOrCapital: string;
    regions: Set<string>;
    subregions: Set<string>;
    currencies: string;
    area: number;
    population: number;
}

const initialFilterState: FilterState = {
    countryOrCapital: "",
    regions: new Set<string>(),
    subregions: new Set<string>(),
    currencies: "",
    area: 0,
    population: 0
}

const CountriesList = () => {
    const countryList = useAppSelector(selectAllCountries);
    const loading = useAppSelector((state) => state.countries.loading);
    const error = useAppSelector((state) => state.countries.error);
    const [filterState, setFilterState] = useState<FilterState>(initialFilterState);
    const [page, setPage] = useState(1);  
    const [countries, setCountries] = useState<Country[]>(countryList)
    const dispatch = useAppDispatch();
    const ITEMS_PER_PAGE = 12;

    //searching for countries
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, checked } = e.target;
        const key = name as keyof FilterState;
        const newFilterState = {...filterState}
        if(['regions', 'subregions'].includes(name)) {
            if(checked) {
                (newFilterState[key] as Set<String>).add(value)
            } else {
                (newFilterState[key] as Set<String>).delete(value)
            }
        }
        if(['area', 'population'].includes(name)) {
            (newFilterState[key as 'area' | 'population'] as number) = parseInt(value);
        }
        if(['countryOrCapital','currencies'].includes(name)) {
            (newFilterState[key as 'countryOrCapital' | 'currencies'] as string) = value.toLowerCase();
        }
        setFilterState(newFilterState);
    }

    const regions = [...new Set(countryList.map(country => country.region))]
    const subRegions = [...new Set(countryList.filter(country => filterState.regions.has(country.region)).filter(country => country.subregion).map(country => country.subregion!))]

    //pagination
    const numberOfPages = Math.ceil(countries.length/ITEMS_PER_PAGE);
    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const paginatedCountries = countries.slice(startIndex, endIndex)

    useEffect(() => {
        let filteredCountries = countryList.filter((country) => 
            country.name.common.toLowerCase().includes(filterState.countryOrCapital) // filtering country by name
            || (country.capital && country.capital.some(city => city.toLowerCase().includes(filterState.countryOrCapital)))); // filtering countries by capital
        if(filterState.regions.size > 0) {
            filteredCountries = filteredCountries.filter(country => filterState.regions.has(country.region)) // filter by region
        }

        if(filterState.subregions.size > 0) {
            filteredCountries = filteredCountries.filter(country => country.subregion && filterState.subregions.has(country.subregion)) // filter by subregion
        }
        
        setCountries(filteredCountries);
    }, [filterState])

    useEffect(() => {
        setCountries(countryList)
    }, [countryList]);

    useEffect(()=> {
        dispatch(fetchAllCountries());
    }, [dispatch]);

    const filters = (
        <Box>
            <Box>
                <Typography>Region</Typography>
                {regions.map(reg => (
                    <FormControlLabel
                    key={reg}
                    control={
                        <Checkbox checked={filterState.regions.has(reg)} onChange={handleChange} name="regions" value={reg} />
                    }
                    label={reg}
                    />
                ))}
            </Box>
            {subRegions.length > 0 && <Box>
                <Typography>Subregion</Typography>
                {subRegions.map(subReg => (
                    <FormControlLabel
                    key={subReg}
                    control={
                        <Checkbox checked={filterState.subregions.has(subReg)} onChange={handleChange} name="subregions" value={subReg} />
                    }
                    label={subReg}
                    />
                ))}
            </Box>}
        </Box>
    )

    return (
        <>
            <Box display="flex" justifyContent="center" width="100%">
                <TextField
                    id="search-bar"
                    name="countryOrCapital"
                    className="text"
                    variant="outlined"
                    placeholder="Search by country name or its capital"
                    value={filterState.countryOrCapital}
                    onChange={handleChange}
                    size="small"
                    sx={{
                        width: 550,
                        margin: "10px auto",
                    }}
                    InputProps={{
                        endAdornment: (
                            <IconButton type="submit" aria-label="search">
                                <SearchIcon style={{ fill: "blue" }} />
                            </IconButton>
                        )
                    }}
                />  
            </Box>
            
            <Accordion>
                <AccordionSummary
                expandIcon={<TuneIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
                >
                {<Typography component="span">Filter</Typography>}
                </AccordionSummary>
                <AccordionDetails>
                 {filters}
                </AccordionDetails>
            </Accordion>
            
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