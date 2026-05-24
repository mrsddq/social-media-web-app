import { useMemo, useState } from 'react'
import './App.css'

const INITIAL_POSTS = [
  {
    id: 1,
    author: 'Laraib Qureshi',
    role: 'AI/ML and Cloud Learner',
    body: 'Documented a small MLOps pipeline today: data contract, model card, Docker build, and CI checks.',
    reactions: 18,
  },
  {
    id: 2,
    author: 'Project Notes',
    role: 'Portfolio Tracker',
    body: 'Next proof target: add screenshots, metrics, and short demo commands to the top computer vision repos.',
    reactions: 11,
  },
]

function App() {
  const [draft, setDraft] = useState('')
  const [posts, setPosts] = useState(INITIAL_POSTS)

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
      return
    }

    setPosts([
      {
        id: Date.now(),
        author: 'Laraib Qureshi',
        role: 'Portfolio Builder',
        body,
        reactions: 0,
      },
      ...posts,
    ])
    setDraft('')
  }

  return (
    <div className='appShell'>
      <aside className='profilePanel'>
        <div className='profilePanel__cover'></div>
        <div className='profilePanel__avatar'>LQ</div>
        <h1>Laraib Qureshi</h1>
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
          />
          <button type='submit'>Publish</button>
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
                onClick={() =>
                  setPosts(posts.map((item) =>
                    item.id === post.id ? { ...item, reactions: item.reactions + 1 } : item
                  ))
                }
              >
                Support
              </button>
            </footer>
          </article>
        ))}
      </main>
    </div>
  )
}

export default App
