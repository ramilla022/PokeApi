import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL_JSON;

const PokemonesModificados = () => {
  const [pokemones, setPokemones] = useState([]);
  
  useEffect(() => {
    const fetchPokemones = async () => {
      try {
        const res = await fetch(`${API_URL}/pokemones`);
        const data = await res.json();

        const user = JSON.parse(localStorage.getItem("user"));
        const userEmail = user?.email;

        const pokemonesFiltrados = data.filter(poke => poke.user_email === userEmail);
        setPokemones(pokemonesFiltrados);
      } catch (err) {
        console.error("Error al cargar pokemones:", err);
      }
    };

    fetchPokemones();
  }, []);

  return (
    <div className="container mt-5">
      <h1 className="mb-4 text-center text-white fw-bold text-shadow">Pokémones Modificados</h1>
      <div className="row g-4">
        {pokemones.map((poke) => (
          <div key={poke.id} className="col-md-6 col-lg-4">
            <div className="card shadow rounded-4 border-0 h-100">
              <div className="card-body text-center">
                <h4 className="card-title text-capitalize">{poke.name}</h4>
                <img
                  src={poke.image}
                  className="my-2"
                  style={{ width: "140px", height: "140px" }}
                />
                <div className="mb-2">
                  <span className="fw-bold">Tipos:</span><br />
                  {poke.types.map((t, i) => (
                    <span key={i} className="badge bg-secondary me-1">{t.type.name}</span>
                  ))}
                </div>

                <div className="mb-2">
                  <span className="fw-bold">Habilidades:</span><br />
                  {poke.abilities.map((a, i) => (
                    <span key={i} className="badge bg-info text-dark me-1">{a.ability.name}</span>
                  ))}
                </div>

                <p className="card-text mt-2"><strong>Movimientos:</strong> {poke.moves.map(m => m.move.name).slice(0, 4).join(", ")}</p>
                <p className="mb-1"><strong>Altura:</strong> {poke.height} m</p>
                <p className="mb-1"><strong>Peso:</strong> {poke.weight} kg</p>
                <p className="mb-1"><strong>Exp:</strong> {poke.base_experience}</p>

                <div className="mt-4 text-start">
                  <p className="fw-bold mb-1">Estadísticas:</p>
                  <ul className="list-group list-group-flush small">
                    {poke.stats.map((s, i) => (
                      <li className="list-group-item bg-transparent px-0 py-1" key={i}>
                        <span className="text-capitalize">{s.stat.name}:</span> {s.base_stat}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <Link
                to={`/pokemonesModificados/${poke.id}`}
                className="btn btn-primary mt-4 w-100 rounded-pill">
                Más información
              </Link>

              <div className="card-footer text-center bg-light border-top-0">
                <small className="text-muted">ID: {poke.id} • {poke.is_default ? "Original" : "Modificado"}</small>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PokemonesModificados;