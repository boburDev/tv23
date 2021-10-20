import axios from "axios";
const isTester = false
const api = isTester ? 'http://localhost:4000' : 'http://aapi.23tv.uz'
const Axios = axios.create({
    baseURL: api
})
Axios.defaults.headers.common['Language'] = localStorage.getItem("lang")

export { Axios, api }