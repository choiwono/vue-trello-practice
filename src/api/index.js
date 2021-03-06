import axios from 'axios'
import router from '../router'

const DOMAIN = 'http://localhost:3000'
const UNAUTHROIZED = 401
const onUnauthroized = () => {
    router.push('/login')
}

const request = (method, url, data) => {
    return axios({
        method,
        url: DOMAIN + url,
        data
    }).then(result => result.data)
      .catch(result => {
          const {status} = result.response
          if(status === UNAUTHROIZED) return onUnauthroized()
          throw Error(result)
      })
} 

export const setAuthInHeader = token => {
    axios.defaults.headers.common['Authorization'] = token ? `Bearer ${token}` : null;
}

export const board = {
    fetch(id) {
        return id ? request('get', `/boards/${id}`) : request('get','/boards')
    },
    update(id, payload){
        return request('put',`/boards/${id}`,payload)
    },
    create(title) {
        return request('post', '/boards', { title })
    },
    destory(id) {
        return request('delete', `/boards/${id}`)
    }
}

export const auth = {
    login(email,password) {
        return request('post', '/login', {email, password})
    }
}

export const card = {
    create(title, listId, pos) {
        return request('post', '/cards', { title, listId, pos })
    },
    fetch(id) {
        return request('get', `/cards/${id}`)
    },
    update(id,payload) {
        return request('put', `/cards/${id}`, payload)
    },
    delete(id) {
        return request('delete', `/cards/${id}`)
    }
}