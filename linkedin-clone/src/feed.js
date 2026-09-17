export const MAX_POST_LENGTH = 500

export function createPost(body, id) {
  const trimmed = body.trim()
  if (!trimmed || trimmed.length > MAX_POST_LENGTH) return null
  return {
    id,
    author: 'Laraib Ahmad Siddiqui',
    role: 'Software and ML Infrastructure Engineer',
    body: trimmed,
    reactions: 0,
    supported: false,
  }
}

export function feedReducer(posts, action) {
  if (action.type === 'publish') {
    const post = createPost(action.body, action.id)
    if (!post || posts.some((existing) => existing.id === action.id)) return posts
    return [post, ...posts]
  }
  if (action.type === 'toggle-support') {
    return posts.map((post) => post.id === action.id ? {
      ...post,
      supported: !post.supported,
      reactions: post.reactions + (post.supported ? -1 : 1),
    } : post)
  }
  return posts
}
