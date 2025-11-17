// libs/cms.ts
import type { MicroCMSQueries, MicroCMSDate, MicroCMSImage } from 'microcms-js-sdk'

export type Author = {
  name: string
  avatar?: string
}

export type Post = {
  id: string
  date: string
  title: string
  body: string
  visual: MicroCMSImage
  author: Author
} & MicroCMSDate

export type PostList = {
  contents: Post[]
  totalCount: number
  offset: number
  limit: number
}

export type ErrorResponse = {
  error: string
  message?: string
  details?: unknown
}

export class APIError extends Error {
  status: number
  statusText: string
  url: string
  response?: ErrorResponse

  constructor(
    message: string,
    options: {
      status: number
      statusText: string
      url: string
      response?: ErrorResponse
    }
  ) {
    super(message)
    this.name = 'APIError'
    this.status = options.status
    this.statusText = options.statusText
    this.url = options.url
    this.response = options.response
  }
}

async function fetcher<T>(path: string, queries?: MicroCMSQueries, init?: RequestInit): Promise<T> {
  const url = new URL(`/api${path}`, window.location.origin)
  if (queries) {
    for (const [key, value] of Object.entries(queries)) {
      if (value == null) continue
      url.searchParams.set(key, Array.isArray(value) ? value.join(',') : String(value))
    }
  }

  const res = await fetch(url, init)
  if (!res.ok) {
    const errorResponse = await (async (): Promise<ErrorResponse | undefined> => {
      try {
        if (res.headers.get('content-type')?.includes('application/json')) {
          return await res.json() as ErrorResponse
        }
        return undefined
      } catch {
        return undefined
      }
    })()
    if (res.status === 404) {
      const error = new APIError(errorResponse?.message || `Resource not found: ${url.pathname}`, {
        status: res.status,
        statusText: res.statusText,
        url: res.url,
        response: errorResponse
      })
      error.name = 'NotFoundError'
      throw error
    }
    throw new APIError(errorResponse?.message || `HTTP ${res.status}: ${res.statusText}`, {
      status: res.status,
      statusText: res.statusText,
      url: res.url,
      response: errorResponse
    })
  }
  return res.json() as Promise<T>
}

export const client = {
  getPosts: function(queries?: MicroCMSQueries) {
    return fetcher<PostList>('/posts', queries)
  },
  getPostById: function(id: string, queries?: MicroCMSQueries) {
    return fetcher<Post>(`/posts/${id}`, queries)
  }
}
 