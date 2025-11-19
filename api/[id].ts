// api/posts/[id]].ts
import { createClient, type MicroCMSQueries } from 'microcms-js-sdk'

if (!process.env.VITE_MICROCMS_SERVICE_DOMAIN || !process.env.VITE_MICROCMS_API_KEY) {
  throw new Error('Missing required environment variables')
}
const client = createClient({
  serviceDomain: process.env.VITE_MICROCMS_SERVICE_DOMAIN,
  apiKey: process.env.VITE_MICROCMS_API_KEY
})

export async function GET(request: Request) {
  const { pathname } = new URL(request.url)
  const id = pathname.split('/').pop()
  const contentId = id && id.length > 0 ? id : undefined

  if (!contentId) {
    return new Response(JSON.stringify({
      error: 'ID is required'
    }), {
      status: 400,
      headers: { 'content-type': 'application/json; charset=utf-8' }
    })
  }
  try {
    const data = await client.get({
      endpoint: 'posts',
      contentId,
      queries: {} as MicroCMSQueries
    })
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        'content-type': 'application/json; charset=utf-8',
        'cache-control': 's-maxage=60, stale-while-revalidate=300'
      }
    })
  } catch (error: unknown) {
    const status = error instanceof Error && error.message.includes('404') ? 404 : 500
    return new Response(JSON.stringify({
      error: 'Request failed'
    }), {
      status,
      headers: {
        'content-type': 'application/json; charset=utf-8',
        'cache-control': 'no-store'
      }
    })
  }
}