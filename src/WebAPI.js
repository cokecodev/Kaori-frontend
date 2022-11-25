import axios from 'axios'
const BASE_URL = 'http://localhost:5001'

const instance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true
});

//comment
export const getComments = (perfumeId) => instance.get(`/perfume/${perfumeId}/init`);
export const createComment = (perfumeId, payload) => instance.post(`/perfume/${perfumeId}/comment`, payload)
export const updateComment = (perfumeId, commentId, payload) => instance.patch(`/perfume/${perfumeId}/comment/${commentId}`, payload)
export const deleteComment = (perfumeId, commentId) => instance.delete(`/perfume/${perfumeId}/comment/${commentId}`)
