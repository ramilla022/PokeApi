import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL_JSON

const PokemonesModificadosDetalle = () => {
  const { id } = useParams();
  const [details, setDetails] = useState(null);

  const getDetails = async () => {
    try {
      const res = await fetch(`${API_URL}/pokemones/${id}`);
      const data = await res.json();
      setDetails(data);
    } catch (error) {
      console.error("Error al obtener el Pokémon:", error);
    }
  };

  useEffect(() => {
    getDetails();
  }, [id]);

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <div className="col-md-6 col-lg-4">
        <div className="card shadow-lg rounded-4 border-0 bg-white">
          <div className="card-body text-center p-5">
            {details ? (
              <>
                <h2 className="card-title text-uppercase fw-bold mb-4 text-primary">{details.name}</h2>

                <div className="mb-4">
                  <img
                    src={details.image}
                    className="rounded-circle shadow"
                    style={{
                      width: '160px',
                      height: '160px',
                      objectFit: 'contain',
                      backgroundColor: '#f0f0f0',
                      padding: '10px',
                    }}
                  />
                </div>

                <div className="text-start">
                  <p><strong>ID #:</strong> {details.id}</p>
                  <p><strong>Altura:</strong> {details.height} m</p>
                  <p><strong>Peso:</strong> {details.weight} kg</p>
                  <p><strong>Experiencia Base:</strong> {details.base_experience}</p>

                  <p><strong>Habilidades:</strong><br />
                    {details.abilities.map((a, i) => (
                      <span key={i} className="badge bg-info text-dark me-1">
                        {a.ability.name}
                      </span>
                    ))}
                  </p>

                  <p><strong>Tipos:</strong><br />
                    {details.types.map((t, i) => (
                      <span key={i} className="badge bg-secondary me-1">
                        {t.type.name}
                      </span>
                    ))}
                  </p>

                  <div className="mt-4">
                    <strong>Estadísticas:</strong>
                    <ul className="list-group list-group-flush small">
                      {details.stats.map((stat) => (
                        <li key={stat.stat.name} className="list-group-item bg-transparent px-0 py-1">
                          <span className="text-capitalize">{stat.stat.name}:</span> {stat.base_stat}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </>
            ) : (
              <p className="text-muted">Cargando detalles...</p>
            )}

            <Link
              to="/pokemonesModificados"
              className="btn btn-outline-primary mt-4 rounded-pill px-4"
            >
              Volver a la lista
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonesModificadosDetalle;