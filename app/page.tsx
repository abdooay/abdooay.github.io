import Link from 'next/link'
import { getAllPosts } from '@/lib/posts'

export default function Home() {
  const posts = getAllPosts().slice(0, 5) // Get 5 most recent posts

  return (
    <div>
      <section className="mb-12">
        <h1 className="text-4xl font-bold mb-4">Welcome to Abdooay Blog</h1>
        <p className="text-xl text-gray-600 mb-6">
          I write about web development, TDD, Golang, and design patterns.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-6">Recent Posts</h2>
        <div className="space-y-6">
          {posts.map((post) => (
            <article key={post.slug} className="border-b border-gray-200 pb-6">
              <Link href={`/blog/${post.slug}`} className="group">
                <h3 className="text-2xl font-semibold mb-2 group-hover:text-blue-600">
                  {post.title}
                </h3>
                <time className="text-sm text-gray-500">
                  {new Date(post.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </time>
              </Link>
            </article>
          ))}
        </div>
        <div className="mt-8">
          <Link href="/blog" className="text-blue-600 hover:text-blue-800 font-medium">
            View all posts →
          </Link>
        </div>
      </section>
    </div>
  )
}
