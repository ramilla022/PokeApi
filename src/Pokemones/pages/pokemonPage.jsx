import { useEffect, useState } from 'react';
import PokemonCard from '../components/PokemonCard';
import { pokemonApi } from '../../Api/pokemonApi';

const API_URL = import.meta.env.VITE_API_URL_JSON;

const PokemonPage = ({ modificados = false }) => {
  const [pokemons, setPokemons] = useState([]);
  const [paginaActual, setPaginaActual] = useState(1);
  const [pokemonsPorPagina] = useState(9);

  useEffect(() => {
    const fetchData = async () => {
      setPokemons([]);

      if (modificados) {
        try {
          const res = await fetch(`${API_URL}/pokemones`);
          const data = await res.json();
          const user = JSON.parse(localStorage.getItem("user"));
          const userEmail = user?.email;
          const pokemonesFiltrados = data.filter(poke => poke.user_email === userEmail);
          setPokemons(pokemonesFiltrados);
        } catch (err) {
          console.error("Error al cargar pokemones modificados:", err);
        }
      } else {
        try {
          const response = await pokemonApi.get('/pokemon?limit=500');
          const results = response.data.results;
          setPokemons(results); 
        } catch (err) {
          console.error("Error al cargar pokemones:", err);
        }
      }
    };

    fetchData();
  }, [modificados]);

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
        {modificados ? "Pokémones Modificados" : "Página de Pokémones"}
      </h1>

      <div className="row row-cols-1 row-cols-md-3 g-4">
        {pokemonesActuales.length > 0 ? (
          pokemonesActuales.map((poke) => (
            <div key={poke.name} className="col">
              <PokemonCard detalle={poke} modificado={modificados} />
            </div>
          ))
        ) : (
          <p className="text-white text-center">No se encontraron Pokémon.</p>
        )}
      </div>

      <div className="d-flex justify-content-center mt-4">
        <ul className="pagination">
          <li className="page-item">
            <button
              onClick={() => paginate(1)}
              className="page-link"
              disabled={paginaActual === 1}
            >
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
}

export default PokemonPage;
