import React, { useEffect, useState } from 'react'
import { getPokemonByName } from '../helpers/getPokemonByName'
import { useNavigate, useParams, Link } from 'react-router-dom'

const pokemonCardName = () => {
  const { name } = useParams()
  const navigate = useNavigate()
  const [pokemon, setPokemon] = useState(null)
  const [error, setError] = useState(null)

  const volver = () => {
    navigate('/home')
  }

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const data = await getPokemonByName(name)
        setPokemon(data.data)
      } catch (err) {
        setError(err.message || "Error al cargar el Pokémon")
      }
    }
    fetchPokemon()
  }, [name])

  if (error) return <div className="alert alert-danger">{error}</div>
  if (!pokemon) return <div className="text-center mt-5">Cargando...</div>

  return (
    <div className="container mt-4">
      <div className="card mx-auto text-center shadow-lg" style={{ maxWidth: "500px" }}>
        <div className="card-header bg-primary text-white">
          <h2 className="card-title">{pokemon.name.toUpperCase()}</h2>
        </div>
        <div className="card-body">
          <img
            src={pokemon.sprites?.front_default}
            alt={pokemon.name}
            className="img-fluid mb-3"
            style={{ maxHeight: "200px", objectFit: "contain" }}
          />

          <p><strong>Pokédex #:</strong> {pokemon.id}</p>
          <p><strong>Tipos:</strong> {pokemon.types.map(t => t.type.name).join(", ")}</p>
          <p><strong>Habilidades:</strong> {pokemon.abilities.map(a => a.ability.name).join(", ")}</p>
          <p><strong>Altura:</strong> {pokemon.height / 10} m</p>
          <p><strong>Peso:</strong> {pokemon.weight / 10} kg</p>
          <p><strong>Experiencia base:</strong> {pokemon.base_experience}</p>
          <p><strong>Número en orden Pokédex:</strong> {pokemon.order}</p>
          <p><strong>¿Forma estándar?:</strong> {pokemon.is_default ? "Sí" : "No"}</p>
          <p><strong>Total de movimientos conocidos:</strong> {pokemon.moves.length}</p>

          <div className="mt-3">
            <strong>Estadísticas:</strong>
            <ul className="list-unstyled mb-0">
              {pokemon.stats.map(stat => (
                <li key={stat.stat.name}>
                  {stat.stat.name.toUpperCase()}: {stat.base_stat}
                </li>
              ))}
            </ul>
          </div>


          {/* MUESTRO LOS PRIMEROS 10 ATAQUES PORQUE ALGUNOS TIENEN UN MONTON*/}

          <p className="mt-3"><strong>Primeros ataques:</strong> {pokemon.moves.slice(0, 10).map(m => m.move.name).join(", ")}</p>
        </div>

        <div className="card-footer d-flex justify-content-between">
          <button className="btn btn-primary" onClick={volver}>Volver</button>
          <Link to={'/pokemonModif'} state={{ pokemon }} className="btn btn-warning">
            Modificar Pokémon
          </Link>
        </div>
      </div>
    </div>
  )
}

export default pokemonCardName