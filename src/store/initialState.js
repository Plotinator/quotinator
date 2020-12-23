// data structure

// quotes
// authors
// topics
// works
// users
// characters

export const initialQuote = {
  userId: '',
  text: '',
  favorite: false,
  authorId: '',
  workId: '',
  characterId: '',
  topicIds: [],
  notes: '',
  dateAdded: 0,
  lastEdited: 0,
  metadata: {

  }
}

export const initialTopic = {
  userId: '',
  color: '#49a4f3',
  name: '',
  position: 0,
}

export const initialAuthor = {
  userId: '',
  name: '',
}

export const initialWork = {
  userId: '',
  name: '',
  authorId: '',
  workType: '',
}

// an event is a work of workType 'event' with workIds
export const initialEvent = {
  userId: '',
  name: '',
  workType: 'event',
  workIds: [],
}

export const workTypes = ['book', 'speech', 'event', 'scripture', 'movie', 'poem', 'other']
export const WORKTYPES = { book: 'book', speech: 'speech', event: 'event', scripture: 'scripture', movie: 'movie', poem: 'poem', other: 'other' }

export const initialCharacter = {
  userId: '',
  name: '',
}
