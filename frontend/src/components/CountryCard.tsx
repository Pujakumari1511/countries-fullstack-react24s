import { Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material";
import { Country} from "../types/country";
import { useNavigate } from "react-router-dom";
import FavoriteButton from "./FavoriteButton";
import { Language, LocationCity, People, Public } from "@mui/icons-material";


interface CountryCardProp {
    country: Country;
}

export const CountryCard = ({ country }: CountryCardProp) => {
    
    const navigate = useNavigate();

    const onclick = () => {
        navigate(`/countries/${country.cca3}`);
        //navigate("/country-details/" + encodeURI(country.name.common));
    }

    return (
        <Card sx={{ width: 300, height: '100%', display: 'flex', flexDirection: 'column' }}>
            <CardMedia
                 sx={{ height: 150 }}
                 image={country.flags.png}
                 title={country.name.common}
            />
            <CardContent sx={{flexGrow: 1}}>
                <Typography gutterBottom variant="h5" component="div">
                {country.name.common}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary', display: 'flex', alignItems: 'center' }}>
                    <People sx={{ mr: 0.5 }} />  
                    {country.population}
                </Typography>

                <Typography variant="body2" sx={{ color: "text.secondary", display: "flex", alignItems: "center" }}>
                    <LocationCity sx={{ mr: 0.5 }} />
                    {country.capital}
                </Typography>

                <Typography variant="body2" sx={{ color: "text.secondary", display: "flex", alignItems: "center" }}>
                    <Language sx={{ mr: 0.5 }} />
                    {country.languages && Object.values(country.languages)[0]}
                </Typography> 

                <Typography variant="body2" sx={{ color: "text.secondary", display: "flex", alignItems: "center" }}>
                    <Public sx={{ mr: 0.5 }} />
                    {country.region}
                    </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" onClick={onclick}>See more</Button>
                <FavoriteButton country={country} />
            </CardActions>
            
            
        </Card>
    );
};

