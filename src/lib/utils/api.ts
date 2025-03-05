type RequestHeaders = { [key: string]: string }

type RequestBody = { [key: string]: any }

type Options = {
  credentials?: 'include' | 'omit' | 'same-origin'
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
  cache?: 'default' | 'no-store' | 'reload' | 'no-cache' | 'force-cache' | 'only-if-cached'
  headers?: RequestHeaders
  body?: RequestBody
  bodyType?: 'json' | 'form-data'
  fields?: string[]
  addLocalHost?: boolean
  next?: {
    tags?: string[]
  }
}

type FetchRequestConfig = {
  url: string
  method?: string
  body?: any
  headers?: HeadersInit
  options?: RequestInit
  error?: {
    code: string
    message: string
  }
}

type FetchRequest = FetchRequestConfig | ((response: any) => FetchRequestConfig)

const localhost = 'http://localhost:4000'

const api = {
  async fetchChain(
    requests: FetchRequest[],
    addLocalHost?: boolean
  ): Promise<{ [url: string]: any }> {
    let lastResponse: any = null
    const responses: { [url: string]: any } = {}
    const errors = []

    for (let request of requests) {
      if (typeof request === 'function') {
        request = request(lastResponse)
      }

      if (addLocalHost) {
        request.url = `${localhost}${request.url}`
      }

      try {
        const response = await fetch(request.url, {
          method: request.method || 'GET',
          body: request.body ? JSON.stringify(request.body) : null,
          headers: request.headers || { 'Content-Type': 'application/json' },
          ...request.options
        })

        if (!response.ok) {
          errors.push(request.error || new Error(`Failed to fetch data from ${request.url}`))
          break
        }

        lastResponse = await response.json()
        responses[request.url.replace(localhost, '')] = lastResponse
      } catch (error) {
        errors.push(request.error || error)

        break
      }
    }

    return { lastResponse, responses, errors }
  },
  async fetch<T = any>(url: string, options?: Options): Promise<T> {
    const {
      method = 'GET',
      credentials = 'omit',
      fields = [],
      cache = 'no-cache',
      headers = { 'Content-Type': 'application/json' },
      body = null,
      bodyType = 'json',
      next = {}
    } = options || {}

    const fetchOptions: any = {
      method,
      cache,
      headers,
      credentials,
      next
    }

    if (body) {
      if (bodyType === 'form-data') {
        fetchOptions.body = body
        delete fetchOptions.headers['Content-Type']
      } else {
        fetchOptions.body = JSON.stringify(body)
      }
    }

    if (options?.addLocalHost) {
      url = `${localhost}${url}`
    }

    if (fields.length) {
      url = `${url}?fields=${fields.join(',')}`
    }

    try {
      const response = await fetch(url, fetchOptions)

      const data: T = await response.json()

      const info = {
        url,
        fetchOptions: fetchOptions
      }

      return {
        cache: cache !== 'no-cache' && cache !== 'no-store',
        status: response.status,
        info,
        items: [],
        ...data
      }
    } catch (error) {
      console.error('Failed to fetch data:', error)
      return {
        ok: false,
        cache: false,
        status: 500,
        info: {
          url,
          fetchOptions
        },
        error: {
          code: 'FETCH_ERROR',
          message: 'fetchError'
        }
      } as T
    }
  },
  fields(fields: string, tableFields: any): any {
    const fieldArray: string[] = fields.split(',')
    const result: any = {}

    fieldArray.forEach((field) => {
      if (tableFields[field]) {
        result[field] = tableFields[field]
      }
    })

    return result
  }
}

export default api
