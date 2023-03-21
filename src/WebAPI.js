import axios from 'axios'
const BASE_URL = 'https://kaori-backend.herokuapp.com'
// const BASE_URL ='http://localhost:5001'

const instance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true
});

// perfume
export const getPerfumeById = (perfumeId) => instance.get(`/perfume/${perfumeId}`)
export const getLatestFivePerfume = () => instance.get(`/latest_five_perfume`)
export const getPerfumeByBrandId = (brandId) => instance.get(`/brand/${brandId}/perfume_list`)
export const getPerfumeByCreatorId = (creatorId) => instance.get(`/creator/${creatorId}/perfume_list`)
export const getAllPerfume = () => instance.get(`/perfume_list`)


// vote
export const getVote = (perfumeId) => instance.get(`/perfume/${perfumeId}/get_vote`)
export const getVoteBoolean = (perfumeId) => instance.get(`/perfume/${perfumeId}/get_vote_boolean`)
export const getVoteByUserId = (perfumeId) => instance.get(`/perfume/${perfumeId}/get_vote_by_user`)
export const VoteForPerfume = (perfumeId, payload) => instance.post(`/perfume/${perfumeId}/vote`, payload)

// comment
export const getComments = (perfumeId) => instance.get(`/perfume/${perfumeId}/comment`)
export const createComment = (perfumeId, payload) => instance.post(`/perfume/${perfumeId}/comment`, payload)
export const updateComment = (perfumeId, commentId, payload) => instance.patch(`/perfume/${perfumeId}/comment/${commentId}`, payload)
export const deleteComment = (perfumeId, commentId) => instance.delete(`/perfume/${perfumeId}/comment/${commentId}`)

// user
export const loginApi = (payload) => instance.post('/login', payload)
export const getMeApi = () => instance.get('/me')
export const logoutApi = () => instance.get('/logout')
export const registerApi = (payload) => instance.post('/register', payload)

// brand
export const getBrandById = (brandId) => instance.get(`/brand/${brandId}`)
export const getAllBrands = () => instance.get(`/brand_list`)

// creator
export const getCreatorById = (creatorId) => instance.get(`/creator/${creatorId}`)
export const getAllCreators = () => instance.get('/creator_list')

// search
export const searchBrand = (payload) => instance.post('/search/brand', payload)
export const searchPerfume = (payload) => instance.post('/search/perfume', payload)
export const searchCreator = (payload) => instance.post('/search/creator', payload)