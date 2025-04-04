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
    moves: pokemon.moves.map(m => m.move.name).join(", ")
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const volver = () => {
    navigate(-1)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedPokemon = {
        id: pokemon.id || Date.now(),
        name: formData.name,
        abilities: formData.abilities.split(",").map(a => ({ ability: { name: a.trim() } })),
        types: formData.types.split(",").map(t => ({ type: { name: t.trim() } })),
        moves: formData.moves.split(",").map(m => ({ move: { name: m.trim() } }))
      };
    
      try {
        await fetch(`http://localhost:3000/pokemones`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(updatedPokemon)
        });
    
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
      <img src={pokemon.sprites.front_default} alt={pokemon.name} className="mb-3" style={{ maxHeight: "150px" }} />

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

        <button type="submit" className="btn btn-success">Guardar cambios</button>
      </form>

      <button className="btn btn-primary" onClick={ volver }>Volver</button>
    </div>
  );
};

export default PokemonModif;