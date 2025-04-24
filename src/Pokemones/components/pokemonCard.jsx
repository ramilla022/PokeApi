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
            <strong>Altura:</strong> {details.height} m &nbsp;|&nbsp;
            <strong>Peso:</strong> {details.weight} kg
          </p>

          <p className="mb-2">
            <strong>Tipo:</strong> <br />
            <span className="badge bg-success text-capitalize">
              {details.types.map((type) => type.type.name).join(", ")}
            </span>
          </p>
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