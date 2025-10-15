import axios from "axios"

const BASE_URL = (import.meta.env?.MODE === "development" || process.env.NODE_ENV === "development")
    ? "http://localhost:5000/api" 
    : "/api"

console.log('Environment:', import.meta.env?.MODE || process.env.NODE_ENV)
console.log('BASE_URL:', BASE_URL)

const api = axios.create({
    baseURL: BASE_URL,
})

export default api