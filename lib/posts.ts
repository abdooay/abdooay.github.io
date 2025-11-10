import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const postsDirectory = path.join(process.cwd(), 'posts')

export interface Post {
  slug: string
  title: string
  date: string
  content: string
  draft?: boolean
}

export function getAllPosts(): Post[] {
  // Get all markdown files recursively
  const files = getMarkdownFiles(postsDirectory)

  const posts = files
    .map((filePath) => {
      const slug = filePath
        .replace(postsDirectory + '/', '')
        .replace(/\.md$/, '')
        .replace(/\\/g, '/') // Normalize path separators

      const fileContents = fs.readFileSync(filePath, 'utf8')
      const { data, content } = matter(fileContents, {
        delimiters: ['+++', '+++'] // Hugo uses +++ for TOML frontmatter
      })

      return {
        slug,
        title: data.title || slug,
        date: data.date ? new Date(data.date).toISOString() : new Date().toISOString(),
        content,
        draft: data.draft || false,
      }
    })
    .filter((post) => !post.draft) // Filter out drafts
    .sort((a, b) => (new Date(b.date).getTime() - new Date(a.date).getTime()))

  return posts
}

export function getPostBySlug(slug: string): Post | null {
  const allPosts = getAllPosts()
  return allPosts.find((post) => post.slug === slug) || null
}

export function getAllPostSlugs(): string[] {
  const posts = getAllPosts()
  return posts.map((post) => post.slug)
}

function getMarkdownFiles(dir: string): string[] {
  if (!fs.existsSync(dir)) {
    return []
  }

  const files: string[] = []
  const items = fs.readdirSync(dir)

  items.forEach((item) => {
    const fullPath = path.join(dir, item)
    const stat = fs.statSync(fullPath)

    if (stat.isDirectory()) {
      files.push(...getMarkdownFiles(fullPath))
    } else if (item.endsWith('.md')) {
      files.push(fullPath)
    }
  })

  return files
}
