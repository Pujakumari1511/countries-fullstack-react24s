import { Country } from "../../types/country"
import axios from "axios"


export const countriesApi = {
    getAllCountries: async (): Promise<Country[]> => {
        const response = await axios.get<Country[]>('https://restcountries.com/v3.1/all')
        return response.data
    }
}

