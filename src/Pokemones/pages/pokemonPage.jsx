import React, { useEffect, useState } from 'react'
import PokemonCard from '../components/pokemonCard';
import { pokemonApi } from '../../Api/pokemonApi'


export const pokemonPage = () => {

  const [pokemons, setPokemons] = useState([]);
  const [paginaActual, setPaginaActual] = useState(1);
  const [pokemonsPorPagina] = useState(9);

  const fetchPokemons = async () => {
    try {
      const response = await pokemonApi.get('/pokemon?limit=500'); 
      setPokemons(response.data.results); 
    } catch (err) {
      console.log(err)
    }
  };

  useEffect(() => {
    fetchPokemons();
  }, []);


  
  const indexOfLastPokemon = paginaActual * pokemonsPorPagina;
  const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPorPagina;
  const pokemonesActuales = pokemons.slice(indexOfFirstPokemon, indexOfLastPokemon);

  const paginate = (pageNumber) => setPaginaActual(pageNumber);
  const totalPages = Math.ceil(pokemons.length / pokemonsPorPagina);

  const limite = 5; 
  const paginaInicial = Math.max(1, paginaActual - Math.floor(limite / 2));
  const paginaFinal = Math.min(totalPages, paginaActual + Math.floor(limite / 2));




  return (
    <div className="container my-4">
      <h1 className="text-center text-white fw-bold display-3 text-uppercase mb-5 lh-base">
        Página de Pokémones
      </h1>
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {pokemonesActuales.length > 0 ? (
          pokemonesActuales.map((pokemon) => (

            <div key={pokemon.name} className="col">
              <PokemonCard url={ pokemon.url }/>
            </div>
            
          ))
        ) : (
          <p>No se encontraron Pokémon.</p>
        )}
      </div>

      <div className="d-flex justify-content-center mt-4">
        <ul className="pagination">
          <li className="page-item">
            <button
              onClick={() => paginate(1)} 
              className="page-link"
              disabled={paginaActual === 1}>
              Primera
            </button>
          </li>

      
          {[...Array(paginaFinal - paginaInicial + 1)].map((_, index) => {
            const pageNumber = paginaInicial + index;
            return (
              <li key={pageNumber} className="page-item">
                <button
                  onClick={() => paginate(pageNumber)}
                  className={`page-link ${paginaActual === pageNumber ? 'active' : ''}`}
                >
                  {pageNumber}
                </button>
              </li>
            );
          })}

          <li className="page-item">
            <button
              onClick={() => paginate(totalPages)} 
              className="page-link"
              disabled={paginaActual === totalPages}
            >
              Última
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default pokemonPage
