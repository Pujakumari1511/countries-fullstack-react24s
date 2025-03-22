import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CountryState, Country } from "../../types/country";
import { countriesApi } from "../../api/services/countries";
import { RootState } from "../store";


const initialState: CountryState = {
    countries: [],
    loading: false,
    error: null,
    selectedCountry: null,
}

export const fetchAllCountries = createAsyncThunk('countries/fetchAllCountries', async () => {
    const response = await countriesApi.getAllCountries();
    return response;
})

export const fetchCountryByCode = createAsyncThunk(
    'countries/fetchCountryByCode',
    async (countryCode: string, { rejectWithValue }) => {
      try {
        const response = await countriesApi.getCountryByCode(countryCode);
        return response;
      } catch (error: any) {
        return rejectWithValue(error.message);
      }
    }
  );


export const countriesSlice = createSlice({
    name: 'countries',
    initialState,
    reducers: {
        clearSelectedCountry: (state) => {
            state.selectedCountry = null;
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchAllCountries.pending, (state) => {
            state.loading = true;
        })
        .addCase(fetchAllCountries.fulfilled, (state, action) => {
            state.loading = false;
            state.countries = action.payload;
        })

        .addCase(fetchAllCountries.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string || 'Failed to load countries'
        })

        .addCase(fetchCountryByCode.pending, (state) => {
            state.loading = true;
        })

        .addCase(fetchCountryByCode.fulfilled, (state, action) => {
            state.loading = false;
            state.selectedCountry = action.payload;
        })

        .addCase(fetchCountryByCode.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string || 'Failed to load countries'
        })
    }
})

export const selectAllCountries = (state: RootState): Country[] => state.countries.countries;
export const selectCountriesLoading = (state: RootState): boolean => state.countries.loading;
export const selectCountriesError = (state: RootState): string | null => state.countries.error;
export const selectSelectedCountry = (state: RootState): Country | null => state.countries.selectedCountry

export const { clearSelectedCountry } = countriesSlice.actions;
export default countriesSlice.reducer;



