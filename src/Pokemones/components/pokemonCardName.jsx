import React, { useEffect, useMemo, useState } from 'react'
import { getPokemonByName } from '../helpers/getPokemonByName'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { Link } from "react-router-dom";

const pokemonCardName = () => {

  const { name } = useParams()

  const navigate = useNavigate()

    const [pokemon,setPokemon] = useState(null)
    const [error, setError] = useState(null); 

    const volver = () => {
      navigate('/home')
    }

 useEffect(() => {
    const fetchPokemon = async () => {
    try {
        const data = await getPokemonByName( name );
        setPokemon(data.data);
      } catch (err) {
        setError(err)
      }
    }
      fetchPokemon();
    
 }, [name])



 if (error) return <div className="alert alert-danger">{error}</div>;

 return (
  <div className="container mt-4">
    <div className="card mx-auto text-center shadow-lg" style={{ maxWidth: "400px" }}>
      <div className="card-header bg-primary text-white">
        <h2 className="card-title">{pokemon?.name.toUpperCase()}</h2>
      </div>
      <div className="card-body">
        <img
          src={pokemon?.sprites?.front_default}
          alt={pokemon?.name}
          className="img-fluid mb-3"
          style={{ maxHeight: "200px", objectFit: "contain" }}
        />
        <p className="card-text">
          <strong>Tipo:</strong> {pokemon?.types.map(t => t.type.name).join(", ")}
        </p>
        <p className="card-text">
          <strong>Ataques:</strong> {pokemon?.moves.slice(0, 3).map(m => m.move.name).join(", ")}
        </p>
        <p className="card-text">
          <strong>Estadísticas:</strong> {pokemon?.stats.map(stat => ( <span key={stat.stat.name}>
          <br />
          {stat.stat.name}: {stat.base_stat}
    </span>
  ))}
</p>
      </div>
      <div className="card-footer">
        <button className="btn btn-primary" onClick={ volver }>Volver</button>
        <Link  to={ '/pokemonModif' }  state={{ pokemon }}  className="btn btn-primary">
        Modificar pokemon
      </Link>
      </div>
      
      
    </div>
  </div>
);

}

export default pokemonCardName
