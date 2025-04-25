import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import PokemonCardName from "./Pokemones/pages/PokemonCardName";
import RegisterPage from "./Pokemones/pages/RegisterPage";
import PokemonPage from "./Pokemones/pages/PokemonPage";
import LoginPage from "./Pokemones/pages/LoginPage";
import { Navbar } from "./UI/Navbar";
import PokemonModif from "./Pokemones/components/PokemonModif";
import PrivateRoute from "./Pokemones/Routes/PrivateRoute";
import { useAuth } from "./Auth/authContext";

function App() {
  const { isLoggedIn } = useAuth();

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

        <Route
          path="/home"
          element={
            <PrivateRoute>
              <PokemonPage />
            </PrivateRoute>
          }
        />

        <Route
          path="/pokemon/:name/:id/:source"
          element={
            <PrivateRoute>
              <PokemonCardName />
            </PrivateRoute>
          }
        />

        <Route
          path="/pokemonesModificados"
          element={
            <PrivateRoute>
              <PokemonPage modificados={true} />
            </PrivateRoute>
          }
        />

        <Route
          path="/pokemonModif/:id"
          element={
            <PrivateRoute>
              <PokemonModif />
            </PrivateRoute>
          }
        />
        <Route
          path="*"
          element={<Navigate to={isLoggedIn ? "/home" : "/login"} />}
        />
      </Routes>
    </Router>
  );
}

export default App;