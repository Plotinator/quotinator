export const all = (q) => true
export const favorites = (q) => q.favorite
export const uncategorized = (q) => !q.topicIds?.length || !q.authorId || !q.workId