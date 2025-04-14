import { pokemonApi } from "../../Api/pokemonApi";

export const getPokemonByName = async (name) => {
    try{
        const pokemon = await pokemonApi.get(`/pokemon/${name}`)
        return pokemon
    }catch(error){
        console.error('Error al obtener el Pokémon:', error);
    }
   
}

export const getPokemonByNameDB = async (name) => {
    try{
        const data = await pokemonApi.get(`http://localhost:3000/pokemones`)
        const pokemon = data.data.find(p => p.name.toLowerCase() === name.toLowerCase());
        return pokemon || null;
      } catch (error) {
        console.error('Error al obtener los pokemones:', error);
        return null;
      }
    };
   
