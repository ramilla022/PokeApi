import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PokemonCardName from "./Pokemones/pages/pokemonCardName";
import RegisterPage from "./Pokemones/pages/registerPage";
import PokemonPage from "./Pokemones/pages/pokemonPage";
import LoginPage from "./Pokemones/pages/loginPage";
import { Navbar } from "./UI/Navbar";
import 'bootstrap/dist/css/bootstrap.min.css';
import PokemonModif from "./Pokemones/components/pokemonModif";
import PokemonesModificados from "./Pokemones/pages/pokemonesModificados";


function App() {
  return (
    <>
    
      <Navbar />
      <Routes>
        <Route path="/home" element={<PokemonPage />} />
        <Route path="/pokemon/:name" element={<PokemonCardName />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/pokemonesModificados" element={<PokemonesModificados />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/pokemonModif" element={<PokemonModif />} />
        <Route path="/*" element={<PokemonPage />} />
      </Routes>

  
    </>
  );
}

export default App;