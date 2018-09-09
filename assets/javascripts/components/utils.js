export function closestByClass(el, myClass, tagName) {
  if (!el.nodeName || typeof myClass !== 'string') return null
  while (el.classList && !el.classList.contains(myClass) && el.parentNode) {
    el = el.parentNode || null
    if (el === document.documentElement || el === null) {
      return null
    }
  }
  return el.classList.contains(myClass) ? el : null
}
export function setCookie(name, value, days) {
  let expires = ''
  if (days) {
    const date = new Date()
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000)
    expires = `; expires=${date.toGMTString()}`
  }
  document.cookie = `${name}=${value}${expires}; path=/`
}
export function getCookie(name) {
  const nameEQ = `${name}=`
  const ca = document.cookie.split(';')
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i]
    while (c.charAt(0) == ' ') c = c.substring(1, c.length)
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length)
  }
  return null
}
export function eraseCookie(name) {
  createCookie(name, '', -1)
}
export function toCamelCase(str) {
  const arr = str.split(/[_-]/)
  let newStr = ''
  for (let i = 1; i < arr.length; i++) {
    newStr += arr[i].charAt(0).toUpperCase() + arr[i].slice(1)
  }
  return arr[0] + newStr
}
export function camelizeKeys(obj) {
  const newObj = Object.keys(obj).reduce((memo, key) => {
    memo[toCamelCase(key)] = obj[key]
    return memo
  }, {})
  return newObj
}

export function image(path) {
  return process.env.NODE_ENV === 'production' ? process.env.MANIFEST[path]: `/assets/images/${path}`
}