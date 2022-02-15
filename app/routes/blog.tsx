import { Link, LoaderFunction, useLoaderData } from 'remix'
import getBlockChildren from '~/lib/notion/getBlockChildren'
import getPosts from '~/lib/notion/getPosts'

export const loader: LoaderFunction = async () => {
  const posts = await getPosts()

  // TODP: derive excerpt from first block
  // const postsWithExcerpts = await Promise.all(
  //   posts.map(async post => {
  //     const excerpt = await getBlockChildren(post.id)[0].substring(0, 100)
  //   }),
  // )

  return posts
}

export default function Blog() {
  const posts = useLoaderData()

  return (
    <>
      <Link to="/">Home</Link>

      <h1>Blog</h1>

      <ul>
        {posts.map(post => {
          const { title, type, slug, date } = parsePostProperties(post)

          return (
            <li key={post.id}>
              <time>{date}</time>
              <h2>
                {type}&nbsp;
                <Link to={slug}>{title}</Link>
              </h2>
              <pre>{JSON.stringify(post, null, 2)}</pre>
            </li>
          )
        })}
      </ul>

      <details>
        <summary>Page properties...</summary>
        <pre>{JSON.stringify(posts, null, 2)}</pre>
      </details>
    </>
  )
}

function parsePostProperties(post) {
  const title = post.properties['Title'].title[0].plain_text
  const type = post.properties['Type'].select.name
  const slug = `/${post.properties['Slug'].rich_text[0].plain_text}`
  const date = post.properties['First published'].date.start

  return { title, type, slug, date }
}
