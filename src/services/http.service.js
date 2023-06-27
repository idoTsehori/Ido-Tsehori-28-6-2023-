import Axios from 'axios'
// import { router } from '@/router'

const BASE_URL = process.env.NODE_ENV === 'production' ? '/api/' : '//localhost:3030/api/'

const axios = Axios.create({
  withCredentials: true,
})

export const httpService = {
  get(url, data) {
    return ajax(url, 'GET', data)
  },
  post(url, data) {
    return ajax(url, 'POST', data)
  },
  put(url, data) {
    return ajax(url, 'PUT', data)
  },
  delete(url, data) {
    return ajax(url, 'DELETE', data)
  },
}

async function ajax(url, method = 'GET', data = null) {
  try {
    const res = await axios({
      url,
      method,
      data,
      //   params: method === 'GET' ? data : null,
    })
    return res.data
  } catch (err) {
    console.log(`Had Issues ${method}ing to the backend, endpoint: ${url}, with data:`, data)
    console.dir(err)
    if (err.response && err.response.status === 401) {
      sessionStorage.clear()
      window.location.assign('/')
      // Depends on routing startegy - hash or history
      // window.location.assign('/#/login')
      // window.location.assign('/login')
      // router.push('/login')
    }
    throw err
  }
}
