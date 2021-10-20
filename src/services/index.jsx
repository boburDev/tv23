import axios from "axios";
const api = 'http://localhost:4000'
const Axios = axios.create({baseURL: api});
export{Axios, api}