import Cookies from 'js-cookie'
export function getToken(token) {
  return Cookies.get(token)
}

export function setToken(tokenname,token) {
  return Cookies.set(tokenname, token)
}

export function removeToken(token) {
  return Cookies.remove(token)
}
