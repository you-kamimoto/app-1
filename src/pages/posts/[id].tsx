// src/pages/posts/[id].tsx
import { useParams } from 'react-router-dom'
export default function PostDetail() {
  const { id } = useParams<{ id: string }>()
  return (
    <h1>{id}</h1>
  )
}