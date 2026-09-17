import { describe, expect, it } from 'vitest'
import { fireEvent, render, screen, within } from '@testing-library/react'
import App from './App'
import { feedReducer, MAX_POST_LENGTH } from './feed'

describe('local feed', () => {
  it('rejects whitespace and over-limit posts with visible feedback', () => {
    render(<App />)
    const input = screen.getByRole('textbox', { name: 'Create post' })
    const publish = screen.getByRole('button', { name: 'Publish' })
    fireEvent.change(input, { target: { value: '   ' } })
    fireEvent.click(publish)
    expect(screen.getAllByRole('article')).toHaveLength(2)
    expect(screen.getByRole('status')).toHaveTextContent('Write a post')
    fireEvent.change(input, { target: { value: 'x'.repeat(MAX_POST_LENGTH + 1) } })
    fireEvent.click(publish)
    expect(screen.getAllByRole('article')).toHaveLength(2)
    expect(screen.getByRole('status')).toHaveTextContent('500 characters or fewer')
  })

  it('publishes trimmed text, clears the composer, and renders markup as text', () => {
    render(<App />)
    const input = screen.getByRole('textbox', { name: 'Create post' })
    const body = '<img src=x onerror="alert(1)">'
    fireEvent.change(input, { target: { value: `  ${body}  ` } })
    fireEvent.click(screen.getByRole('button', { name: 'Publish' }))
    const firstPost = screen.getAllByRole('article')[0]
    expect(within(firstPost).getByText(body)).toBeInTheDocument()
    expect(firstPost.querySelector('img')).toBeNull()
    expect(input).toHaveValue('')
    expect(screen.getAllByRole('article')).toHaveLength(3)
  })

  it('toggles one local reaction without unlimited count inflation', () => {
    render(<App />)
    const post = within(screen.getAllByRole('article')[0])
    const support = post.getByRole('button')
    fireEvent.click(support)
    expect(post.getByText('19 reactions')).toBeInTheDocument()
    expect(support).toHaveAttribute('aria-pressed', 'true')
    fireEvent.click(support)
    expect(post.getByText('18 reactions')).toBeInTheDocument()
    expect(support).toHaveAttribute('aria-pressed', 'false')
  })

  it('rejects duplicate IDs and preserves existing state', () => {
    const empty = Object.freeze([])
    const once = feedReducer(empty, { type: 'publish', body: 'First', id: 'stable-id' })
    expect(empty).toEqual([])
    expect(feedReducer(once, { type: 'publish', body: 'Second', id: 'stable-id' })).toBe(once)
    const twice = feedReducer(once, { type: 'publish', body: 'Second', id: 'another-id' })
    expect(twice.map((post) => post.body)).toEqual(['Second', 'First'])
    expect(once).toHaveLength(1)
  })
})
