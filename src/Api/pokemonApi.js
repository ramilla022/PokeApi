import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL_POKE

export const pokemonApi = axios.create({
    baseURL: API_URL
});