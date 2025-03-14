import  { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
    fetchAllCountries,
    selectAllCountries,
} from "../store/slices/countriesSlice";
import { CountryCard } from "./CountryCard";

const CountriesList = () => {
    const dispatch = useAppDispatch();
    //const navigate = useNavigate();
    const countries = useAppSelector(selectAllCountries);

    useEffect(()=> {
        dispatch(fetchAllCountries());
    }, [dispatch]);

   

    return (
        <>
           

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '40px' }}>
            {countries.map((country) => (
                <CountryCard key={country.name.common} country={country} />
            ))}
            </div>
        </>

       
    )
    
}
export default CountriesList;