// data structure

// quotes
// authors
// topics
// works
// workTypes
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
  pageNumber: null, // ?
  chapter: null,  // ?
  verse: null,  // ?
  notes: '',
  dateAdded: 0,
  lastEdited: 0,
}

export const initialTopic = {
  userId: '',
  color: '',
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
}

export const initialWorkType = {
  userId: '',
  name: '',
  position: 0,
}

export const initialCharacter = {
  userId: '',
  name: '',
}

export const initialUI = {
  openCard: null,
  darkMode: false,
  selectedTopics: [],
  selectedCategory: 0,
}