import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

import PokemonCardName from "./Pokemones/pages/pokemonCardName";
import RegisterPage from "./Pokemones/pages/registerPage";
import PokemonPage from "./Pokemones/pages/pokemonPage";
import LoginPage from "./Pokemones/pages/loginPage";
import { Navbar } from "./UI/Navbar";
import PokemonModif from "./Pokemones/components/pokemonModif";
import PokemonesModificados from "./Pokemones/pages/pokemonesModificados";
import PrivateRoute from "./Pokemones/Routes/privateRoute";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("user");
    setIsLoggedIn(!!user);
  }, []);

  return (
    <Router>
      {isLoggedIn && <Navbar />}
      <Routes>

      <Route
        path="/login"
        element={
        isLoggedIn ? <Navigate to="/home" replace /> : <LoginPage />
        }       
        />
        <Route
        path="/register"
        element={
        isLoggedIn ? <Navigate to="/home" replace /> : <RegisterPage />
        }       
        />

        <Route path="/home" element={
          <PrivateRoute>
            <PokemonPage />
          </PrivateRoute>
        } />
        <Route path="/pokemon/:name" element={
          <PrivateRoute>
            <PokemonCardName />
          </PrivateRoute>
        } />
        <Route path="/pokemonesModificados" element={
          <PrivateRoute>
            <PokemonesModificados />
          </PrivateRoute>
        } />
        <Route path="/pokemonModif" element={
          <PrivateRoute>
            <PokemonModif />
          </PrivateRoute>
        } />

        <Route path="*" element={<Navigate to={isLoggedIn ? "/home" : "/login"} />} />
      </Routes>
    </Router>
  );
}

export default App;