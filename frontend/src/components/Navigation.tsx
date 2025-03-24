import { AppBar, Box, Button, CssBaseline, Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import { ReactNode, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { DarkMode, Favorite, LightMode, Lock, SvgIconComponent } from "@mui/icons-material";
import { useTheme } from '../theme/useTheme';


const drawerWidth = 250;

interface NavItem {
    title: string;
    onClick: () => void;
    icon?: ReactNode;
}

export const Navigation = () => {
    const navigate = useNavigate();
    const [mobileOpen, setIsMobileOpen] = useState<boolean>(false);
    const {user, signOut} = useAuth();
    const { isDarkMode, toggleTheme } = useTheme(); 

    const handleDrawerToggle = () => {
        setIsMobileOpen((prevState) => !prevState);
    }

    const navItems: NavItem[] = [
        {
            title: 'Home',
            onClick: () => navigate('/') 
        },
        {
            title: 'Test',
            onClick: () => navigate('/test')
        },
        {
            title: 'Countries',
            onClick: () => navigate('/countries')
        },
        {
            title: 'Protected Data',
            onClick: () => navigate('/protected'),
            icon: <Lock /> 
        }  
    ]

    if(user) {
        navItems.push({
            title: 'Favorites',
            onClick: () => navigate('/favorites'),
            icon: <Favorite />,
        },
        {
            title: 'Logout',
            onClick: signOut
        })
    } else {
        navItems.push({
            title: 'Login',
            onClick: () => navigate('/login')
        })
    }

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{textAlign: 'center' }}>
            <Typography variant="h6" sx={{ my: 2 }}>
                Menu
            </Typography>
            <Divider />
            <List>
                {navItems.map((item) => (
                    <ListItem key={item.title} disablePadding>
                        <ListItemButton sx={{textAlign: 'center'}} >
                            <ListItemText primary={item.title} secondary={item.title === 'Logout' ? user?.email : ''} onClick={item.onClick}/>
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    return (
        <Box sx={{ 
            display: 'flex', 
            mb: 6
            }}>
            <AppBar component="nav">
                <Box sx={{ display: 'flex'}}>
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="start"
                            onClick={handleDrawerToggle}
                            sx={{ mr: 2, display: { sm: 'none' } }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography
                            variant="h6"
                            component="div"
                            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                        >
                        {/*  Menu */}
                        </Typography>
                        <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                            {navItems.map((item) => (
                            <Button 
                                key={item.title} 
                                onClick={item.onClick}  
                                sx={{ color: '#fff' }}
                                startIcon={item.icon}
                            >
                                {item.title}
                                {item.title === 'Logout' && <span style={{textTransform: 'lowercase'}}>{`(${user?.email})`}</span>}
                            </Button>
                            ))}
                        </Box>
                    </Toolbar>
                    <IconButton color="inherit" onClick={toggleTheme} sx={{ ml: "auto" }}>
                        {isDarkMode ? <LightMode /> : <DarkMode />}
                    </IconButton>
                </Box>
            </AppBar>
            <nav>
                <Drawer 
                   variant="temporary"
                   open={mobileOpen}
                   onClose={handleDrawerToggle}
                   ModalProps={{
                     keepMounted: true, 
                   }}
                   sx={{
                     display: { xs: 'block', sm: 'none' },
                     '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                   }} 
                >
                    {drawer}
                </Drawer>
            </nav>
        </Box>
    )

}