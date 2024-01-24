type RequestOptions = {
  method: string,
  headers: {
    'Content-Type': string
  },
  body?: string
}

const handleResponse = async (response: Response) => {
  const contentType = response.headers.get('Content-Type');
  let result:any
  if (contentType && contentType.includes('application/json')){
    result = await response.json();
  } else {
    result = await response.text()
  }
  if (!response.ok) {
    throw new Error(result.error || result)
  }
  return result
}

export const httpGet = async <T>(path: string, data?: any): Promise<T> => {
  const url = new URL(path, window.location.href)
  url.search = new URLSearchParams(data).toString()
  const response = await fetch(url)
  return handleResponse(response)
}

export const httpPost = async <T>(path: string, data: any): Promise<T> => {
  const options: RequestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }
  const response = await fetch(path, options)
  return handleResponse(response)
}

export const httpPut = async <T>(path: string, data: any): Promise<T> => {
  const options: RequestOptions = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }
  const response = await fetch(path, options)
  return handleResponse(response)
}

export const httpDelete = async <T>(path: string): Promise<T> => {
  const options: RequestOptions = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
  }
  const response = await fetch(path, options)
  return handleResponse(response)
}
