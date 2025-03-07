import { Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material";
import { Country } from "../types/country";
import { useNavigate } from "react-router-dom";


interface CountryCardProp {
    country: Country;
}

export const CountryCard = ({ country }: CountryCardProp) => {

    const navigate = useNavigate();

    const onclick = () => {
        navigate(`/country-details/${country.name.common}`);
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
                <Typography variant="body2" sx={{ color: 'text.secondary',}}><b>Population: </b>  
                {country.population}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary', }}><b>Capital: </b>
                {country.capital}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}><b>Languages: </b>     
                {country.languages && Object.values(country.languages).join(', ')}
                </Typography> 
            </CardContent>
            <CardActions>
                <Button size="small" onClick={onclick}>Country Details</Button>
            </CardActions>

        </Card>
    )
}

