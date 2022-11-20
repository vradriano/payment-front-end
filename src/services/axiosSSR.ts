import axios from 'axios'

export const apiSSR = axios.create({
  baseURL: 'http://host.docker.internal:5000'
  }
)
