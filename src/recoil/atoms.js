import { atom } from 'recoil'

export const selectedTopicIds = atom({
  key: 'selectedTopicIds',
  default: []
})

export const selectedCategory = atom({
  key: 'mainCategory',
  default: 'favorites'
})

export const selectedSecondaryTab = atom({
  key: 'secondaryTab',
  default: 'all'
})

export const openedQuoteModal = atom({
  key: 'theOpenedQuote',
  default: null,
})
