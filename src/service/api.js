import axios from "axios";
// BASE DA URL  : https://api.themoviedb.org/3/
// https://api.themoviedb.org/3/movie/550?api_key=8ff4f5e673f6817f1aa7e904f06a3ffb

const api = axios.create({ baseURL: "https://api.themoviedb.org/3/" });

export default api;
