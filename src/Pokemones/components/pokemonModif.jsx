import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

const PokemonModif = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const pokemon = location.state?.pokemon;

  if (!pokemon) return <p>No hay datos del Pokémon</p>;

  const [formData, setFormData] = useState({
    name: pokemon.name,
    abilities: pokemon.abilities.map(a => a.ability.name).join(", "),
    types: pokemon.types.map(t => t.type.name).join(", "),
    moves: pokemon.moves.map(m => m.move.name).join(", "),
    height: pokemon.height,
    weight: pokemon.weight,
    base_experience: pokemon.base_experience,
    order: pokemon.order,
    is_default: pokemon.is_default,
    stats: pokemon.stats.map(stat => ({ name: stat.stat.name, value: stat.base_stat }))
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith("stat_")) {
      const statName = name.split("_")[1];
      setFormData(prev => ({
        ...prev,
        stats: prev.stats.map(stat =>
          stat.name === statName ? { ...stat, value: Number(value) } : stat
        )
      }));
    } else if (name === "is_default") {
      setFormData({ ...formData, [name]: value === "true" });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const volver = () => {
    navigate(-1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedPokemon = {
      name: formData.name,
      abilities: formData.abilities.split(",").map(a => ({ ability: { name: a.trim() } })),
      types: formData.types.split(",").map(t => ({ type: { name: t.trim() } })),
      moves: formData.moves.split(",").map(m => ({ move: { name: m.trim() } })),
      height: Number(formData.height),
      weight: Number(formData.weight),
      base_experience: Number(formData.base_experience),
      order: Number(formData.order),
      is_default: formData.is_default,
      stats: formData.stats.map(s => ({
        base_stat: s.value,
        stat: { name: s.name }
      })),
    };

    try {
      await fetch('http://localhost:3000/pokemones', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedPokemon),
      });
      console.log("Objeto que se va a guardar:", updatedPokemon);


      alert("¡Pokémon actualizado con éxito!");
      navigate(`/pokemon/${pokemon.name}`);
    } catch (error) {
      console.error("Error al guardar en JSON Server:", error);
      alert("Hubo un error al guardar los cambios.");
    }
  };

  return (
    <div className="container mt-4">
      <h2>Modificar Pokémon: {pokemon.name}</h2>
      <img src={pokemon.sprites.front_default} alt={pokemon.name} className="mb-3" style={{ maxHeight: "250px" }} />

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Nombre</label>
          <input type="text" className="form-control" name="name" value={formData.name} onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label className="form-label">Habilidades</label>
          <input type="text" className="form-control" name="abilities" value={formData.abilities} onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label className="form-label">Tipos</label>
          <input type="text" className="form-control" name="types" value={formData.types} onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label className="form-label">Ataques</label>
          <input type="text" className="form-control" name="moves" value={formData.moves} onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label className="form-label">Altura (en decímetros)</label>
          <input type="number" className="form-control" name="height" value={formData.height} onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label className="form-label">Peso (en hectogramos)</label>
          <input type="number" className="form-control" name="weight" value={formData.weight} onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label className="form-label">Experiencia base</label>
          <input type="number" className="form-control" name="base_experience" value={formData.base_experience} onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label className="form-label">Orden en Pokédex</label>
          <input type="number" className="form-control" name="order" value={formData.order} onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label className="form-label">¿Forma estándar?</label>
          <select className="form-select" name="is_default" value={formData.is_default.toString()} onChange={handleChange}>
            <option value="true">Sí</option>
            <option value="false">No</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Estadísticas</label>
          {formData.stats.map((stat, idx) => (
            <div key={idx} className="input-group mb-1">
              <span className="input-group-text" style={{ minWidth: "120px" }}>{stat.name.toUpperCase()}</span>
              <input
                type="number"
                className="form-control"
                name={`stat_${stat.name}`}
                value={stat.value}
                onChange={handleChange}
              />
            </div>
          ))}
        </div>

        <button type="submit" className="btn btn-success me-2">Guardar cambios</button>
      </form>
      <button className="btn btn-secondary" onClick={volver}>Volver</button>
    </div>
  );
};

export default PokemonModif;