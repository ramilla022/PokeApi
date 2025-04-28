import { useEffect, useState } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { BotonVolver } from "../components/Botones";

const API_URL = import.meta.env.VITE_API_URL_JSON
const API_URL2 = import.meta.env.VITE_API_URL_POKE

const PokemonCardName = () => {
  const { name, id, source } = useParams(); 
  const navigate = useNavigate()
  const [pokemon, setPokemon] = useState(null)
  const [error, setError] = useState(null)

  const volver = () => {
    if (source === 'json') {
      navigate('/pokemonesModificados'); 
    } else {
      navigate('/home'); 
    }
  };

  const fetchPokemonFromAPI = async () => {
    try {
      const response = await fetch(`${API_URL2}/pokemon/${name}`);
      const data = await response.json();
      setPokemon(data);
    } catch (err) {
      setError("Error al cargar el Pokémon desde la PokeAPI");
    }
  }

  const fetchPokemonFromServer = async () => {
    try {
      const response = await fetch(`${API_URL}/pokemones/${id}`);
      const data = await response.json();
      setPokemon(data);
    } catch (err) {
      setError("Error al cargar el Pokémon desde el servidor");
    }
  }

  useEffect(() => {
    if (source === 'api') {
      fetchPokemonFromAPI();
    } else if (source === 'json') {
      fetchPokemonFromServer();
    }
  }, [name, id, source])

  if (error) return <div className="alert alert-danger">{error}</div>
  if (!pokemon) return <div className="text-center mt-5">Cargando...</div>

  return (
    <div className="container mt-4">
      <div className="card mx-auto text-center shadow-lg" style={{ maxWidth: "500px" }}>
        <div className="card-header bg-primary text-white">
          <h2 className="card-title">{pokemon.name ? pokemon.name.toUpperCase() : pokemon.name}</h2>
        </div>
        <div className="card-body">
          <img
            src={pokemon.sprites ? pokemon.sprites.front_default : pokemon.image} 
            alt={pokemon.name}
            className="img-fluid mb-3"
            style={{ maxHeight: "200px", objectFit: "contain" }}
          />
          
          <p><strong>Pokédex #:</strong> {pokemon.id}</p>
          <p><strong>Tipos:</strong> {pokemon.types?.map(t => t.type ? t.type.name : t).join(", ")}</p>
          <p><strong>Habilidades:</strong> {pokemon.abilities?.map(a => a.ability ? a.ability.name : a).join(", ")}</p>
          <p><strong>Altura:</strong> {pokemon.height / 10} m</p>
          <p><strong>Peso:</strong> {pokemon.weight / 10} kg</p>
          <p><strong>Experiencia base:</strong> {pokemon.base_experience}</p>
          <p><strong>Número en orden Pokédex:</strong> {pokemon.order}</p>
          <p><strong>¿Forma estándar?:</strong> {pokemon.is_default ? "Sí" : "No"}</p>

          <div className="mt-3">
            <strong>Estadísticas:</strong>
            <ul className="list-unstyled mb-0">
              {pokemon.stats?.map(stat => (
                <li key={stat.stat ? stat.stat.name : stat.name}>
                  {stat.stat ? stat.stat.name.toUpperCase() : stat.name.toUpperCase()}: {stat.base_stat}
                </li>
              ))}
            </ul>
          </div>

          <p className="mt-3"><strong>Primeros ataques:</strong> {pokemon.moves?.slice(0, 10).map(m => m.move ? m.move.name : m).join(", ")}</p>
        </div>

        <div className="card-footer d-flex justify-content-between">
          <BotonVolver onClick={volver} />
          {source !== 'json' && (
            <Link to={`/pokemonModif/${id}`} state={{ pokemon }} className="btn btn-success">
              Modificar Pokémon
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}

export default PokemonCardName;