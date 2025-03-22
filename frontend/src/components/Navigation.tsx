import { AppBar, Button, IconButton, Toolbar } from "@mui/material";
import { useAuth } from "../context/AuthContext";

import { Link as RouterLink } from "react-router-dom";
import { Favorite, Lock, DarkMode, LightMode } from "@mui/icons-material";
import { useTheme } from '../theme/useTheme';


export const Navigation = () => {
    const {user, signOut} = useAuth();
    const { isDarkMode, toggleTheme } = useTheme(); 

    return (
        <AppBar 
            position="static" 
            sx={{ 
            mb: 3, 
            background: 'linear-gradient(90deg, #2196F3 30%, #21CBF3 90%)',
            boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)'
            }}
        >
            <Toolbar>
            <Button color="inherit" component={RouterLink} to="/">
            Home
            </Button>
            <Button color="inherit" component={RouterLink} to="test">
            Test
            </Button>
            <Button color="inherit" component={RouterLink} to="countries">
            Countries
            </Button>
            {user && (
            <Button
            color="inherit"
            component={RouterLink}
            to="/favorites"
            startIcon={<Favorite />}
            >
            Favorites
            </Button>
            )}
            <Button
            color="inherit"
            component={RouterLink}
            to="/protected"
            startIcon={<Lock />}    
            >
            Protected Data
            </Button>
            {user ? (
            <Button color="inherit" onClick={signOut}>
            LogOut ({user.email})
            </Button>
            ): (
            <Button color="inherit" component={RouterLink} to="/login">
            Login
            </Button>
            )}
            <IconButton color="inherit" onClick={toggleTheme} sx={{ ml: "auto" }}>
            {isDarkMode ? <LightMode /> : <DarkMode />}
            </IconButton>
            </Toolbar>
        </AppBar>
    )
}