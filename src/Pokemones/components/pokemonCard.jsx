import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL_JSON

const PokemonCard = ({ detalle, modificado = false }) => {
  const [pokemon, setPokemon] = useState(detalle);
  const [detallesCargados, setDetallesCargados] = useState(false);

  useEffect(() => {
    if (detallesCargados) return;

    const cargarDetalles = async () => {
      try {
        let url;

        if (modificado) {

          url = `${API_URL}/pokemones/${detalle.id}`;  
        } else {
      
          url = detalle.url;
        }

        const response = await fetch(url);
        const data = await response.json();
        setPokemon((prev) => ({ ...prev, ...data }));
        setDetallesCargados(true);
      } catch (error) {
        console.error("Error al cargar detalles del Pokémon:", error);
      }
    };

    cargarDetalles();
  }, [detalle, detallesCargados, modificado]);

  if (!pokemon) return null;

  return (
    <div className="card shadow rounded-4 border-0 h-100">
      <div className="card-body text-center">
        <h4 className="card-title text-capitalize">{pokemon.name}</h4>
        <img
          src={pokemon.sprites?.front_default || pokemon.image}
          alt={pokemon.name}
          className="my-2"
          style={{ width: '140px', height: '140px' }}
        />
        <div className="mb-2">
          <span className="fw-bold">Tipos:</span><br />
          {pokemon.types?.map((t, i) => (
            <span key={i} className="badge bg-secondary me-1">
              {t.type?.name || t.name}
            </span>
          ))}
        </div>
        <p className="card-text mt-2">
          <strong>Movimientos:</strong>{" "}
          {pokemon.moves?.slice(0, 4).map((m, i) => m.move?.name || m.name).join(", ")}
        </p>
        <p className="mb-1"><strong>Altura:</strong> {pokemon.height} m</p>
        <p className="mb-1"><strong>Peso:</strong> {pokemon.weight} kg</p>
        <p className="mb-1"><strong>Exp:</strong> {pokemon.base_experience}</p>
      </div>
      <div className="text-center mt-4">
        <Link
          to={modificado ? `/pokemon/${pokemon.name}/${pokemon.id}/json` : `/pokemon/${pokemon.name}/${pokemon.id}/api`}
          className="btn btn-primary rounded-pill px-4"
        >
          Más información
        </Link>
      </div>
      <div className="card-footer text-center bg-light border-top-0">
        <small className="text-muted">
          ID: {pokemon.id} • {pokemon.is_default ? "Original" : "Modificado"}
        </small>
      </div>
    </div>
  );
};

export default PokemonCard;