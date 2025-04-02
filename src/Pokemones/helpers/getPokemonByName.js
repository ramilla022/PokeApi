import { pokemonApi } from "../../Api/pokemonApi";

export const getPokemonByName = async (name) => {
    try{
        const pokemon = await pokemonApi.get(`/pokemon/${name}`)
        return pokemon
    }catch(error){
        console.error('Error al obtener el Pokémon:', error);
    }
   

    
}