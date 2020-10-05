import { initialAuthor, initialTopic, initialQuote, initialWork, initialWorkType } from './initialState'
import { set, revalidateCollection } from '@nandorojo/swr-firestore'
import { newId } from './ids'


// -----------------  Quote  ------------------ //
export function createQuote (vals) {
  return Object.assign({}, initialQuote, vals)
}

// -----------------  Author  ------------------ //
export function createAuthor (vals) {
  return Object.assign({}, initialAuthor, vals)
}

export function setAuthor (vals) {
  const id = newId()
  set(`authors/${id}`, createAuthor(vals))
  revalidateCollection('authors')
  return id
}

// -----------------  Topic  ------------------ //
export function createTopic (vals) {
  return Object.assign({}, initialTopic, vals)
}

export function setTopic (vals) {
  const id = newId()
  set(`topics/${id}`, createTopic(vals))
  revalidateCollection('topics')
  return id
}

// -----------------  Works  ------------------ //
export function createWork (vals) {
  return Object.assign({}, initialWork, vals)
}

export function setWork (vals) {
  const id = newId()
  set(`works/${id}`, createWork(vals))
  revalidateCollection('works')
  return id
}

// -----------------  Work Types  ------------------ //
export function createWorkType (vals) {
  return Object.assign({}, initialWorkType, vals)
}

export function setWorkType (vals) {
  const id = newId()
  set(`workTypes/${id}`, createWorkType(vals))
  revalidateCollection('workTypes')
  return id
}
