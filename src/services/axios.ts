import axios from 'axios'

export const api = axios.create({
  baseURL: `http://www.localhost:3001`
})