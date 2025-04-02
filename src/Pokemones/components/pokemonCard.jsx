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
            <div className="card h-100 shadow-lg rounded-3" style={{ border: '1px solid #e0e0e0'}}> 

                    <div className="card-body text-center">
                    {details ? (
              <>
                <h3 className="card-title text-uppercase">{details.name}</h3>
                <img src={details.sprites.front_default} alt="" className="card-img-top mb-3 rounded-circle shadow-sm "  style={{ maxHeight: '150px', objectFit: 'contain' }}/>

                <p className="card-text">
                  <strong>Habilidades:</strong> {details.abilities.map((ability) => ability.ability.name).join(', ')}
                </p>

                <p>
                <small>Altura: {details.height / 10} m</small><br />
                <small>Peso: {details.weight / 10} kg</small> 
              </p>

                <p className="card-text">
                  <strong>Tipo:</strong> {details.types.map((type) => type.type.name).join(', ')}
                </p>

                <p className="card-text">
                <strong>Pokédex #:</strong> {details.id}
              </p>

                <p>
                  <small>Altura: {details.height}</small>
                </p>

                
              </>
            ) : (
              <p>Cargando detalles...</p>
            )}

            <Link to={`/pokemon/${details ? details.name : pokemon.name}` } className="btn btn-primary">
                  Mas informacion
            </Link>
          </div>
          
        </div>

           
        
            </div>
         
           
      );
  };

  export default PokemonCard