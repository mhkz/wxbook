import Storage from 'web-storage-cache'

const localStorege = new Storage()

export function setLocalStorage (key, value) {
  return localStorege.set(key, value)
}

export function getLocalStorage (key) {
  return localStorege.get(key)
}

export function removeLocalStorage (key) {
  return localStorege.delete(key)
}

export function clearLocalStorage (key) {
  return localStorege.clear(key)
}

export function setBookObject (fileName, key, value) {
  let book = getLocalStorage(`${fileName}=info`)
  if (!book) {
    book = {}
  }
  book[key] = value
  setLocalStorage(`${fileName}-info`, book)
}

export function getBookObject (fileName, key) {
  let book = getLocalStorage(`${fileName}=info`)
  if (book) {
    return book[key]
  } else {
    return null
  }
}

export function getFontFamily (fileName) {
  return getBookObject(fileName, 'fontFamily')
}

export function saveFontFamily (fileName, font) {
  return setBookObject(fileName, 'fontFamily', font)
}
