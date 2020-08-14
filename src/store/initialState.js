// data structure

// quotes
// authors
// topics
// works
// workTypes
// users
// characters

export const initialQuote = {
  id: "",
  text: "",
  favorite: false,
  authorId: "",
  workId: "",
  characterId: "",
  topicIds: [],
  pageNumber: null, // ?
  chapter: null,  // ?
  verse: null,  // ?
  notes: "",
  dateAdded: 0,
  lastEdited: 0,
}

export const initialTopic = {
  id: "",
  color: "",
  name: ""
}

export const initialAuthor = {
  name: "",
}

export const initialWork = {
  name: "",
  authorId: "",
}

export const initialWorkType = {
  name: "",
}

export const initialCharacter = {
  name: "",
}

export const initialUI = {
  openCard: null,
  darkMode: false,
  selectedTopics: [],
  selectedCategory: 0,
}