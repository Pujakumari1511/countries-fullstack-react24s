import  { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
    fetchAllCountries,
    selectAllCountries,
} from "../store/slices/countriesSlice";
import { CountryCard } from "./CountryCard";
import { Search as SearchIcon } from "@mui/icons-material";
import { IconButton, TextField } from "@mui/material";
import { Country } from "../types/country";

const CountriesList = () => {
    const countryList = useAppSelector(selectAllCountries);
    const [searchInput, setSearchInput] = useState<string>(""); 
    //const [searchQuery, setSearchQuery] = useState<{ name: { common: string } }[]>([]); 
    const [countries, setCountries] = useState<Country[]>(countryList)
    const dispatch = useAppDispatch();
    //const navigate = useNavigate();


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let inputValue = e.target.value.toLowerCase();
        setSearchInput(inputValue);
        if(inputValue.trim().length === 0){
            console.log(`inputValue: ${inputValue}`)
            setCountries(countryList)

        }
        const filteredCountries = countries.filter((country) => 
        country.name.common.toLowerCase().includes(inputValue))
        
        setCountries(filteredCountries);
    }
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
                />
                <IconButton type="submit" aria-label="search">
                    <SearchIcon  style={{ fill: "blue" }} />
                </IconButton>
            </form>
            
            

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '40px' }}>
            {countries.map((country) => (
                <CountryCard key={country.name.common} country={country} />
            ))}
            {countries.length === 0 && (<span>No Country found</span>)}
            </div>
        </>

       
    )
    
}
export default CountriesList;