import { useEffect, useState } from "react"
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
        console.log('ERR',err.toString())
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
      return alert('請完整填寫')
    }

    if(checkIsInputAllBlank(newCommentContent)!== false) {
      return alert('不能只輸入空白!')
    }

    const payload = {
      content: newCommentContent,
    }
 
    // 送資料
    createComment(perfumeId, payload)
      .then((res) => {
        // 錯誤處理
        if(res.data.ok === 0) {
          setFetchError(res.data.message)
          return 
        }

        // 新增成功的話
        setNewCommentContent('')
        getCommentFetch()
      })
      .catch(err => {
        console.log('ERR',err.toString())
        setFetchError(err.message)
      })
  }


  const handleCommentDelete = (commentId) => {
    deleteComment(perfumeId, commentId)
      .then(res => {
        // TODO: loading 處理

        // 失敗處理
        // TODO: 錯誤資訊要顯示在哪?
        if(res.data.ok === 0) {
          alert(res.data.message)
          return
        }

        // 刪除成功
        alert('刪除成功')
        getCommentFetch()

      }).catch(err => {
        // TODO: 錯誤資訊要顯示在哪?
        console.log('ERR',err.toString())
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
