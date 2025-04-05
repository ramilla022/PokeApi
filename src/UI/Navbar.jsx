import { NavLink } from 'react-router-dom';
import { AppBar, Button, Link, Toolbar, Typography } from '@mui/material';


export const Navbar = () => {

    return (
        <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Pokemones
        </Typography>

       
        <Button color="inherit" component={NavLink} to="/home">
          Pokemones
        </Button>

        <Button color="inherit" component={NavLink} to="/pokemonesModificados">
          Pokemones modificados
        </Button>


        <Button color="inherit" component={NavLink} to="/login">
          Iniciar sesión
        </Button>

        <Button color="inherit" component={NavLink} to="/register">
          Registrarse
        </Button>
      </Toolbar>
    </AppBar>
    )
}