import { useMemo, useState, useReducer } from 'react'
import './App.css'
import { feedReducer, MAX_POST_LENGTH } from './feed'

const INITIAL_POSTS = [
  {
    id: 1,
    author: 'Laraib Ahmad Siddiqui',
    role: 'Demo profile',
    body: 'Example project update: data contract, model card, Docker build, and CI checks.',
    reactions: 18,
  },
  {
    id: 2,
    author: 'Project Notes',
    role: 'Portfolio Tracker',
    body: 'Example portfolio note: add screenshots, metrics, and short demo commands to the top computer vision repos.',
    reactions: 11,
  },
]

function App() {
  const [draft, setDraft] = useState('')
  const [posts, dispatch] = useReducer(feedReducer, INITIAL_POSTS)
  const [message, setMessage] = useState('')

  const stats = useMemo(() => {
    return {
      posts: posts.length,
      reactions: posts.reduce((total, post) => total + post.reactions, 0),
    }
  }, [posts])

  function publishPost(event) {
    event.preventDefault()
    const body = draft.trim()
    if (!body) {
      setMessage('Write a post before publishing.')
      return
    }

    if (body.length > MAX_POST_LENGTH) {
      setMessage(`Posts must be ${MAX_POST_LENGTH} characters or fewer.`)
      return
    }
    dispatch({ type: 'publish', body, id: crypto.randomUUID() })
    setMessage('Post added to this local demo feed.')
    setDraft('')
  }

  return (
    <div className='appShell'>
      <aside className='profilePanel'>
        <div className='profilePanel__cover'></div>
        <div className='profilePanel__avatar'>LAS</div>
        <h1>Laraib Ahmad Siddiqui</h1>
        <p>Building AI, MLOps, cloud, and frontend projects in public.</p>
        <dl>
          <div>
            <dt>Posts</dt>
            <dd>{stats.posts}</dd>
          </div>
          <div>
            <dt>Reactions</dt>
            <dd>{stats.reactions}</dd>
          </div>
        </dl>
      </aside>

      <main className='feed' aria-label='Professional activity feed'>
        <form className='composer' onSubmit={publishPost}>
          <label htmlFor='post-draft'>Create post</label>
          <textarea
            id='post-draft'
            onChange={(event) => setDraft(event.target.value)}
            placeholder='Share a project update'
            rows='4'
            value={draft}
            aria-describedby='post-guidance'
          />
          <p id='post-guidance'>{draft.trim().length}/{MAX_POST_LENGTH} characters · Stored in this tab only</p>
          <button type='submit'>Publish</button>
          <p role='status'>{message}</p>
        </form>

        {posts.map((post) => (
          <article className='post' key={post.id}>
            <header>
              <div className='post__avatar'>{post.author.slice(0, 2).toUpperCase()}</div>
              <div>
                <h2>{post.author}</h2>
                <p>{post.role}</p>
              </div>
            </header>
            <p className='post__body'>{post.body}</p>
            <footer>
              <span>{post.reactions} reactions</span>
              <button
                type='button'
                aria-pressed={Boolean(post.supported)}
                aria-label={`Support post by ${post.author}`}
                onClick={() => dispatch({ type: 'toggle-support', id: post.id })}
              >
                {post.supported ? 'Supported' : 'Support'}
              </button>
            </footer>
          </article>
        ))}
      </main>
    </div>
  )
}

export default App
