import { Link } from 'remix'

export default function Index() {
  return (
    <>
      <h1>Home</h1>
      <Link to="/blog">Blog</Link>
    </>
  )
}
