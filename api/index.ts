// api/posts/index.ts
import { createClient, type MicroCMSQueries } from 'microcms-js-sdk'

if (!process.env.VITE_MICROCMS_SERVICE_DOMAIN || !process.env.VITE_MICROCMS_API_KEY) {
  throw new Error('Missing required environment variables')
}
const client = createClient({
  serviceDomain: process.env.VITE_MICROCMS_SERVICE_DOMAIN,
  apiKey: process.env.VITE_MICROCMS_API_KEY
})

function parseIntSafe(value: unknown): number | undefined {
  if (value == null || value === '') return undefined
  const parsed = parseInt(String(value), 10)
  return isFinite(parsed) && parsed >= 0 ? parsed : undefined
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const data = await client.get({
      endpoint: 'posts',
      queries: {
        orders: searchParams.get('orders') ?? undefined,
        limit: parseIntSafe(searchParams.get('limit')),
        offset: parseIntSafe(searchParams.get('offset')),
      } as MicroCMSQueries
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