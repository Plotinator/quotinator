// data structure

export const newFileState = {
  byId: {},
  allIds: []
}

export const initialQuote = {
  id: "",
  text: "",
  favorite: false,
  authorId: "",
  seriesId: "",
  bookId: "",
  characterId: "",
  eventId: "",
  topicIds: [],
  pageNumber: null,
  chapter: null,
  verse: null,
  notes: "",
}

export const initialTopic = {
  id: "",
  color: "",
  name: ""
}

export const initialAuthor = {
  name: "",
  seriesIds: [],
  bookIds: [],
}

export const initialSeries = {
  name: "",
  authorId: "a1",
  bookIds: [],
}

export const initialBook = {
  name: "",
  authorId: "a1",
  characterIds: [],
}

export const initialCharacter = {
  name: "",
  bookId: "b1",
}

export const initialEvent = {
  name: "",
  time: new Date(),
  place: "",
  authorIds: [],
  speechIds: []
}

export const initialSpeech = {
  id: "",
  name: "",
  time: null,
  place: "",
  authorId: ""
}

export const initialFile = {
  fileName: '',
  loaded: false,
  dirty: false
}

export const initialUI = {
  openCard: null,
  darkMode: false,
  selectedTopics: [],
  selectedCategory: 0,
}