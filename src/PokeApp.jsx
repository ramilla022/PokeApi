import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RegisterPage from "./Pokemones/pages/registerPage";
import PokemonPage from "./Pokemones/pages/pokemonPage";
import PokemonDetalle from "./Pokemones/pages/pokemonDetalle";
import LoginPage from "./Pokemones/pages/loginPage";
import { Navbar } from "./UI/Navbar";
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <>
    
      <Navbar />
      <Routes>
        <Route path="/home" element={<PokemonPage />} />
        <Route path="/pokemon/:name" element={<PokemonDetalle />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>

  
    </>
  );
}

export default App;