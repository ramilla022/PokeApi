import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const PokemonCard = ({ url }) => {

  const [detalle, setDetalle] = useState(null);

  useEffect(() => {
    fetch( url )
      .then(res => res.json())
      .then(data => setDetalle(data));
  }, [ url ]);

  return (
    <div className="col mb-4">
  <div className="card h-100 shadow rounded-4 border-0 bg-light">
    <div className="card-body text-center p-4">
      {detalle ? (
        <>
          <h3 className="card-title text-uppercase fw-bold mb-3">{detalle.name}</h3>

          <div className="mb-3">
            <img
              src={detalle.sprites.front_default}
              alt={detalle.name}
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
            <strong>Pokédex #:</strong> {detalle.id}
          </p>

          <p className="mb-2">
            <strong>Altura:</strong> {detalle.height} m &nbsp;|&nbsp;
            <strong>Peso:</strong> {detalle.weight} kg
          </p>

          <p className="mb-2">
            <strong>Tipo:</strong> <br />
            <span className="badge bg-success text-capitalize">
              {detalle.types.map((type) => type.type.name).join(", ")}
            </span>
          </p>
        </>
      ) : (
        <p>Cargando detalles...</p>
      )}

        {detalle && (
          <Link
            to={`/pokemon/${detalle.name}`}
            className="btn btn-primary mt-4 w-100 rounded-pill"
          >
            Más información
          </Link>
        )}
    </div>
  </div>
</div>
  );
};

export default PokemonCard;