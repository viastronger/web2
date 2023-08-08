import axios from "axios";

const { VUE_APP_BASE_URL, NODE_ENV } = process.env
const baseApi = '/organization-admin'

const request = axios.create({
  baseURL: NODE_ENV !== "production" ? `${VUE_APP_BASE_URL}${baseApi}` : baseApi,
  timeout: '5000'
})

request.interceptors.request.use((config) => {
  config.headers.Reqchannel = 100010
  return config
})


request.interceptors.response.use(
  (res) => {
    if (res.data.status === 200) {
      return res.data
    } else {

    }
  },
  (error) => {
    return error
  }
)

export default request