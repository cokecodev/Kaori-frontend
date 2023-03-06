import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { toastConfig } from '../../constants/toastConfigs'
import { useDispatch } from 'react-redux'
import { setIsLoading, setFetchError } from '../../features/fetchStatusReducer'

import { createComment, getComments, deleteComment } from '../../WebAPI'
import useInput from '../../hooks/useInput'
import checkIsInputAllBlank from '../../utils'

export default function useGetComments(perfumeId) {
  const dispatch = useDispatch()
  const [comments, setComments] = useState([])
  const { 
    value: newCommentContent, 
    setValue: setNewCommentContent, 
    handleChange: handleValueChange
  } = useInput()

  const getCommentFetch = () => {
    dispatch(setIsLoading(true))
    dispatch(setFetchError(null))

    getComments(perfumeId)
      .then(res => {
        setComments(res.data.data)
        dispatch(setIsLoading(false))
      })
      .catch(err => {
        console.log('ERR:',err.message.toString())
        dispatch(setFetchError(err.message))
      })
  }

  useEffect(() => {
    getCommentFetch()
  },[])


  const handleCommentSubmit = (e) => {
    e.preventDefault()
    if(!newCommentContent) return toast.warn('請完整填寫', toastConfig)
    if(checkIsInputAllBlank(newCommentContent)!== false) return toast.warn('不能只輸入空白!', toastConfig)

    dispatch(setFetchError(null))
    dispatch(setIsLoading(true))

    const payload = {
      content: newCommentContent,
    }
 
    // 送資料
    createComment(perfumeId, payload)
      .then((res) => {
        if(res.data.ok === 0) {
          dispatch(setIsLoading(false))
          return toast.warn(res.data.message, toastConfig)
        }

        setNewCommentContent('')
        getCommentFetch()
        dispatch(setIsLoading(false))
        toast.success('留言成功', toastConfig)
      })
      .catch(err => {
        console.log('ERR:',err.message.toString())
        dispatch(setFetchError(err.message))
      })
  }


  const handleCommentDelete = (commentId) => {
    dispatch(setIsLoading(true))
    dispatch(setFetchError(null))

    deleteComment(perfumeId, commentId)
      .then(res => {
        if(res.data.ok === 0) {
          dispatch(setIsLoading(false))
          return toast.warn(res.data.message, toastConfig)
        }

        toast.success('刪除成功', toastConfig)
        getCommentFetch()
        dispatch(setIsLoading(false))
      }).catch(err => {
        console.log('ERR:', err.message.toString())
        dispatch(setFetchError(err.message))
      })
    
  }

  return {
    comments,
    setComments,
    getCommentFetch,
    handleCommentDelete,
    handleCommentSubmit,
    newCommentContent, 
    setNewCommentContent,
    handleValueChange
  }
}
