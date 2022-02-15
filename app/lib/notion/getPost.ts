import { postsDbId } from './constants'
import getDatabase from './getDatabase'

export default async function getTopicBySlug(slug: string): Promise<any> {
  console.log('slug', slug)
  const posts = await getDatabase({
    databaseId: postsDbId,
    filter: {
      property: 'Slug',
      rich_text: {
        equals: slug,
      },
    },
  })

  return posts[0]
}
