import { useState } from 'react'
import { toast } from 'react-toastify'
import { toastConfig, errorToastConfig } from '../../constants/toastConfigs'

import { updateComment } from '../../WebAPI'
import checkIsInputAllBlank from '../../utils'

export default function useUpdateComments(perfumeId, comments, getCommentFetch) {
  const [isUpdateHidden, setIsUpdateHidden] = useState(true)
  const [currentComment, setCurrentComment] = useState('')
  const [currentCommentId, setCurrentCommentId] = useState(0)
  const [originComment, setOriginComment] = useState('')

  const handleCommentUpdateChange = (e) => {
    setCurrentComment(e.target.value)
  }

  const handleUpdateButtonClick = (commentId) => {
    if (!commentId) return toast.error('出了點錯! 缺少 commendId', errorToastConfig)

    let currentCommentData = comments.filter(comment => comment.id === commentId )
    setOriginComment(currentCommentData[0].content)
    setCurrentCommentId(currentCommentData[0].id)
    setIsUpdateHidden(!isUpdateHidden)
  }
  
  const updateCommentFetch = (perfumeId, commentId, payload) => {
    // TODO:setFetchError('')
    updateComment(perfumeId, commentId, payload)
      .then((res) => {
        if(res.data.ok === 0) {
          //setFetchError(res.data.message)
          return toast.warn(res.data.message, toastConfig)
        }

        setCurrentComment('')
        setOriginComment('')
        getCommentFetch()
        toast.success('修改成功', toastConfig)
      })
      .catch(err => {
        console.log('ERR',err.message.toString())
        //setFetchError(err.message)
      })
  }

  const handleCommentUpdateSubmit = (e) => {
    e.preventDefault()
    // 內容沒有更動的話
    if(currentComment.length === 0 || currentComment === originComment) {
      setCurrentComment('')
      setOriginComment('')
      return setIsUpdateHidden(!isUpdateHidden)
    }

    if(checkIsInputAllBlank(currentComment)!== false) {
      return toast.warn('不能只輸入空白!', toastConfig)
    }
    
    // 內容有更動的話
    let commentId = currentCommentId
    const payload = {
      content: currentComment,
    }
    
    updateCommentFetch(perfumeId, commentId, payload)
    setIsUpdateHidden(!isUpdateHidden)
  }

  return {
    isUpdateHidden,
    setIsUpdateHidden,
    currentComment,
    setCurrentComment,
    currentCommentId,
    setCurrentCommentId,
    originComment,
    setOriginComment,
    handleCommentUpdateChange,
    handleUpdateButtonClick,
    updateCommentFetch,
    handleCommentUpdateSubmit
  }
}
