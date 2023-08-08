import axios from './request'

export default {
  getAllMarkTextInfoList(params) {
    return axios.post('/web/babyCarer/getAllMarkTextInfoList', params)
  },
  getBabyCarerDetailInfo(params) {
    return axios.post('/web/babyCarer/getBabyCarerDetailInfo', params)
  },
  getRecommendBabyCarerList(params) {
    return axios.post('/web/babyCarer/getRecommendBabyCarerList', params)
  },
  getTypeBabyCarerPageList(params) {
    return axios.post('/web/babyCarer/getTypeBabyCarerPageList', params)
  },
  getSearchBabyCarerPageList(params) {
    return axios.post('/web/babyCarer/getSearchBabyCarerPageList', params)
  },
}