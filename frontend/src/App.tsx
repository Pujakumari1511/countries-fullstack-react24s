import { Box } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { TestData } from "./components/TestData";
import { AuthProvider } from "./context/AuthContext";
import { Login } from "./components/Auth/Login";
import { ProtectedRoute } from "./components/Auth/ProtectedRoute";
import { Navigation } from "./components/Navigation"; 
import { ProtectedTestData } from "./components/ProtectedTestData";
import { AuthRedirect } from "./components/Auth/AuthRedirected";
import CountriesList from "./components/CountriesList";
import { CountryDetails } from "./components/CountryDetails";
import Favourites from "./components/Favourites";


function App() { 
    return (
      <AuthProvider>
        <BrowserRouter>
          <Box>
            <Navigation />
            <Box sx={{ p: 3 }}>
              <Routes>
                <Route path="login" 
                element={
                  <>
                    <AuthRedirect />
                    <Login />
                  </>
                  } 
                  />
                <Route path="/" element={<CountriesList />} /> 
                <Route path="test" element={<TestData />} />
                <Route path="countries" element={<CountriesList />} />
                <Route path="countries/:countryCode" element={<CountryDetails />} />
                <Route
                  path="/protected"
                  element={
                    <ProtectedRoute>
                      <ProtectedTestData />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/favorites"
                  element={
                    <ProtectedRoute>
                      <Favourites />
                  </ProtectedRoute>
                  }
                />
                {/* Other routes... */}
              </Routes>
            </Box>
          </Box>
        </BrowserRouter>
      </AuthProvider>
    );
  }

export default App;
