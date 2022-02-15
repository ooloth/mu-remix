import { Link, LoaderFunction, useLoaderData } from 'remix'
import invariant from 'tiny-invariant'
import getBlockChildren from '~/lib/notion/getBlockChildren'
import getPost from '~/lib/notion/getPost'
import Block from '~/lib/notion/ui/Block'

export const loader: LoaderFunction = async ({ params }) => {
  invariant(params.slug, 'expected params.slug')

  const page = await getPost(params.slug)
  const blocks = await getBlockChildren(page.id)

  const title = page.properties['Title'].title[0].plain_text

  return { page, title, blocks }
}

export default function Slug() {
  const { page, title, blocks } = useLoaderData()

  return (
    <>
      <Link to="/">Home</Link>
      <Link to="/blog">Blog</Link>

      <h1>{title}</h1>

      {blocks.map(block => block && Block(block))}

      <details>
        <summary>Page properties...</summary>
        <pre>{JSON.stringify(page.properties, null, 2)}</pre>
      </details>

      <details>
        <summary>Page blocks...</summary>
        <pre>{JSON.stringify(blocks, null, 2)}</pre>
      </details>

      <details>
        <summary>Full page...</summary>
        <pre>{JSON.stringify(page, null, 2)}</pre>
      </details>
    </>
  )
}
