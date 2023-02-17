import axios, { AxiosRequestConfig } from 'axios'

export const getOptions = (method = 'GET') => {
  return {
    method: method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: localStorage.getItem('Authorization'),
    },
    mode: 'cors' as RequestMode,
  } as AxiosRequestConfig<any>
}

export const fetcher = async (url: string) =>
  await axios.get(url, getOptions()).then(async (res) => await res.data)

export const handleMutation = async (url: string, data: any) => {
  return await axios
    .post(url, data, getOptions('POST'))
    .then(async (res) => await res.data)
    .catch((err) => err.message)
}