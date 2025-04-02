import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RegisterPage from "./Pokemones/pages/registerPage";
import PokemonPage from "./Pokemones/pages/pokemonPage";
import LoginPage from "./Pokemones/pages/loginPage";
import PokemonCardName from "./Pokemones/components/pokemonCardName";
import { Navbar } from "./UI/Navbar";
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <>
    
      <Navbar />
      <Routes>
        <Route path="/home" element={<PokemonPage />} />
        <Route path="/pokemon/:name" element={<PokemonCardName />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>

  
    </>
  );
}

export default App;