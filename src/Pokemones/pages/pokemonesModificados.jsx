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
    <div className="container mt-5">
  <h1 className="mb-4 text-center text-white fw-bold text-shadow">Pokémones Modificados</h1>
  <div className="row g-4">
    {pokemones.map((poke) => (
      <div key={poke.id} className="col-md-6 col-lg-4">
        <div className="card shadow rounded-4 border-0 h-100">
          <div className="card-body text-center">
            <h4 className="card-title text-capitalize">{poke.name}</h4>
            <img
              src="https://i0.wp.com/pinchees.com/wp-content/uploads/2024/10/1000403101.png?fit=2000%2C2000&ssl=1"
              alt="Pokébola"
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