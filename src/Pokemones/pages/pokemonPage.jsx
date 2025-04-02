import React, { useEffect, useState } from 'react'
import PokemonCard from '../components/pokemonCard';
import { pokemonApi } from '../../Api/pokemonApi'
import axios from 'axios';

export const pokemonPage = () => {

  const [pokemons, setPokemons] = useState([]);

  const fetchPokemons = async () => {
    try {
      const response = await pokemonApi.get('/pokemon?limit=50'); 
      setPokemons(response.data.results); 
    } catch (err) {
      console.log(err)
    }
  };

  useEffect(() => {
    fetchPokemons();
  }, []);


  const fetchPokemonDetails = async (url) => {
    const response = await axios.get(url);
    return response.data;
  };


  return (
    <div className="container my-4">
      <h1 className="text-center">Página de Pokémon</h1>

      <div className="row row-cols-1 row-cols-md-3 g-4">
        {pokemons.length > 0 ? (
          pokemons.map((pokemon) => (
            <div key={pokemon.name} className="col">
              <PokemonCard pokemon={pokemon} pokemonDetails={fetchPokemonDetails} />
            </div>
          ))
        ) : (
          <p>No se encontraron Pokémon.</p>
        )}
      </div>
    </div>
  );
}

export default pokemonPage
