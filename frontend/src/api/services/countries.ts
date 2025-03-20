import { Country } from "../../types/country"
import axios from "axios"


const countryBaseUrl = "https://restcountries.com/v3.1"
export const countriesApi = {
    getAllCountries: async (): Promise<Country[]> => {
        const response = await axios.get<Country[]>(`${countryBaseUrl}/all`)
        return response.data
    },

    getCountryByCode: async (countryCode: string): Promise<Country> => {
        const response = await axios.get<Country[]>(`${countryBaseUrl}/alpha/${countryCode}`)
        return response.data[0]
    }
}



