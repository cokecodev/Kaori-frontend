import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { toastConfig } from '../../constants/toastConfigs'

import { createComment, getComments, deleteComment } from '../../WebAPI'
import useInput from '../../hooks/useInput'
import checkIsInputAllBlank from '../../utils'

export default function useGetComments(perfumeId) {
  const [comments, setComments] = useState([])
  const [fetchError, setFetchError] = useState(null)
  const { 
    value: newCommentContent, 
    setValue: setNewCommentContent, 
    handleChange: handleValueChange
  } = useInput()

  const getCommentFetch = () => {
    setFetchError('')
    getComments(perfumeId)
      .then(res => {
        setComments(res.data.data)
      })
      .catch(err => {
        console.log('ERR:',err.message.toString())
        setFetchError(err.message)
      })
  }

  useEffect(() => {
    getCommentFetch()
  },[])


  const handleCommentSubmit = (e) => {
    e.preventDefault()
    setFetchError('')

    if(!newCommentContent) {
      return toast.warn('請完整填寫', toastConfig)
    }

    if(checkIsInputAllBlank(newCommentContent)!== false) {
      return toast.warn('不能只輸入空白!', toastConfig)
    }

    const payload = {
      content: newCommentContent,
    }
 
    // 送資料
    createComment(perfumeId, payload)
      .then((res) => {
        if(res.data.ok === 0) {
          setFetchError(res.data.message)
          return toast.warn(res.data.message, toastConfig)
        }

        setNewCommentContent('')
        getCommentFetch()
        toast.success('留言成功', toastConfig)
      })
      .catch(err => {
        console.log('ERR:',err.message.toString())
        setFetchError(err.message)
      })
  }


  const handleCommentDelete = (commentId) => {
    deleteComment(perfumeId, commentId)
      .then(res => {
        // TODO: loading 處理

        if(res.data.ok === 0) {
          return toast.warn(res.data.message, toastConfig)
        }

        toast.success('刪除成功', toastConfig)
        getCommentFetch()

      }).catch(err => {
        console.log('ERR:', err.message.toString())
        setFetchError(err.message)
      })
    
  }

  return {
    comments,
    setComments,
    fetchError,
    setFetchError,
    getCommentFetch,
    handleCommentDelete,
    handleCommentSubmit,
    newCommentContent, 
    setNewCommentContent,
    handleValueChange
  }
}
