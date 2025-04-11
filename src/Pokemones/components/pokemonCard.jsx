import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const PokemonCard = ({ pokemon, pokemonDetails }) => {
  const [details, setDetails] = useState(null);

  useEffect(() => {
    const getDetails = async () => {
      const data = await pokemonDetails(pokemon.url);
      setDetails(data);
    };
    getDetails();
  }, [pokemon.url]);

  return (
    <div className="col mb-4">
  <div className="card h-100 shadow rounded-4 border-0 bg-light">
    <div className="card-body text-center p-4">
      {details ? (
        <>
          <h3 className="card-title text-uppercase fw-bold mb-3">{details.name}</h3>

          <div className="mb-3">
            <img
              src={details.sprites.front_default}
              alt={details.name}
              className="rounded-circle shadow-sm"
              style={{
                width: '180px',
                height: '180px',
                objectFit: 'contain',
                backgroundColor: '#f8f9fa',
                padding: '10px',
              }}
            />
          </div>

          <p className="mb-2">
            <strong>Pokédex #:</strong> {details.id}
          </p>

          <p className="mb-2">
            <strong>Habilidades:</strong> <br />
            <span className="text-muted small">
              {details.abilities.map((ability) => ability.ability.name).join(", ")}
            </span>
          </p>

          <p className="mb-2">
            <strong>Altura:</strong> {details.height} m &nbsp;|&nbsp;
            <strong>Peso:</strong> {details.weight} kg
          </p>

          <p className="mb-2">
            <strong>Tipo:</strong> <br />
            <span className="badge bg-success text-capitalize">
              {details.types.map((type) => type.type.name).join(", ")}
            </span>
          </p>

          <div className="mt-4 text-start">
            <strong>Estadísticas:</strong>
            <ul className="list-group list-group-flush small">
              {details.stats.map((stat) => (
                <li key={stat.stat.name} className="list-group-item bg-transparent px-0 py-1">
                  <span className="text-capitalize">{stat.stat.name}:</span> {stat.base_stat}
                </li>
              ))}
            </ul>
          </div>
        </>
      ) : (
        <p>Cargando detalles...</p>
      )}

      <Link
        to={`/pokemon/${details ? details.name : pokemon.name}`}
        className="btn btn-primary mt-4 w-100 rounded-pill"
      >
        Más información
      </Link>
    </div>
  </div>
</div>
  );
};

export default PokemonCard;