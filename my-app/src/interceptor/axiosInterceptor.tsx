import axios from 'axios'
const Axios = axios.create({
  baseURL:'https://crudtestbackend-production.up.railway.app/api/v1'
})
Axios.interceptors.request.use(
  request => {
    //@ts-ignore
    const token = JSON.parse(localStorage.getItem('token'))
    if (token) {
      request.headers.Authorization = `Bearer ${token}`
    }
    return request
  },
  error => {
    return Promise.reject(error)
  }
)

export default Axios