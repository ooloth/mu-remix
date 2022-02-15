import { Client } from '@notionhq/client'

const notion = new Client({
  auth: process.env.NOTION_ACCESS_TOKEN,
  notionVersion: '2021-08-16',
})

export default notion
