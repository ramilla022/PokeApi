import { NavLink } from "react-router-dom";
import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { isAuthenticated, removeToken } from "../Pokemones/helpers/auth";

export const Navbar = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkAuth = () => {
      const userData = localStorage.getItem("user");
      const valid = isAuthenticated();
  
      if (userData && valid) {
        setUser(JSON.parse(userData));
      } else {
        localStorage.clear(); 
        removeToken();
        setUser(null);
        window.location.href = "/login"; 
        window.location.reload(); 
      }
    };
  
    checkAuth();
    const interval = setInterval(checkAuth, 5000);
    return () => clearInterval(interval);
  }, []);


  const handleLogout = () => {
    localStorage.removeItem("user");
    removeToken();
    window.location.href = "/login"
    window.location.reload()
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <img
          src="/pokemon.png"
          alt="Pokémon"
          style={{ width: "40px", height: "40px", marginRight: "10px" }}
        />

        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Pokemones
        </Typography>

        <Button color="inherit" component={NavLink} to="/home">
          Pokemones
        </Button>

        <Button color="inherit" component={NavLink} to="/pokemonesModificados">
          Pokemones modificados
        </Button>

        {!user && (
          <>
            <Button color="inherit" component={NavLink} to="/login">
              Iniciar sesión
            </Button>
            <Button color="inherit" component={NavLink} to="/register">
              Registrarse
            </Button>
          </>
        )}

        {user && (
          <>
            <Typography variant="body1" sx={{ mx: 2 }}>
              Sesión iniciada como <strong>{user.name}</strong>
            </Typography>
            <Button
              onClick={handleLogout}
              color="inherit"
              sx={{ backgroundColor: "#dc3545" }}
            >
              Cerrar sesión
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};