import { useEffect, useState } from "react";

const PokemonesModificados = () => {
  const [pokemones, setPokemones] = useState([]);

  useEffect(() => {
    const fetchPokemones = async () => {
      try {
        const res = await fetch("http://localhost:3000/pokemones");
        const data = await res.json();
        setPokemones(data);
      } catch (err) {
        console.error("Error al cargar pokemones:", err);
      }
    };

    fetchPokemones();
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Pokémones Modificados</h2>
      <div className="row">
        {pokemones.map((poke) => (
          <div key={poke.id} className="col-md-4 mb-4">
            <div className="card shadow-sm h-100">
              <div className="card-body">
                <h5 className="card-title">{poke.name}</h5>
                <p className="card-text"><strong>Tipos:</strong> {poke.types.map(t => t.type.name).join(", ")}</p>
                <p className="card-text"><strong>Habilidades:</strong> {poke.abilities.map(a => a.ability.name).join(", ")}</p>
                <p className="card-text"><strong>Movimientos:</strong> {poke.moves.map(m => m.move.name).slice(0, 5).join(", ")}</p>
                <p className="card-text"><strong>Altura:</strong> {poke.height} m</p>
                <p className="card-text"><strong>Peso:</strong> {poke.weight} kg</p>
                <p className="card-text"><strong>Experiencia:</strong> {poke.base_experience}</p>
                <div>
                  <strong>Estadisticas:</strong>
                  <ul className="mb-0">
                    {poke.stats.map((s, idx) => (
                      <li key={idx}>{s.stat.name}: {s.base_stat}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="card-footer">
                <small className="text-muted">ID: {poke.id} | {poke.is_default ? "Por defecto" : "Custom"}</small>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PokemonesModificados;