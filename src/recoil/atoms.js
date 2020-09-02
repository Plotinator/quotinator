import { atom } from 'recoil'


export const selectedTopicIds = atom({
  key: 'selectedTopicIds',
  default: []
})

export const selectedCategory = atom({
  key: 'mainCategory',
  default: 'favorites'
})

export const selectedSort = atom({
  key: 'selectedSort',
  default: ''
})
