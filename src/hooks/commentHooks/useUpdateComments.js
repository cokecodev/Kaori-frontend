import { useState } from "react"
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
    if (!commentId) return alert('出了點錯! 缺少 commendId')

    let currentCommentData = comments.filter(comment => comment.id === commentId )
    setOriginComment(currentCommentData[0].content)
    setCurrentCommentId(currentCommentData[0].id)
    setIsUpdateHidden(!isUpdateHidden)
  }
  
  const updateCommentFetch = (perfumeId, commentId, payload) => {
    // TODO:setFetchError('')
    updateComment(perfumeId, commentId, payload)
      .then((res) => {
        // 錯誤處理
        if(res.data.ok === 0) {
          //setFetchError(res.data.message)
          alert(res.data.message)
          return 
        }

        // 新增成功的話
        setCurrentComment('')
        setOriginComment('')
        getCommentFetch()
        alert('更新成功')
      })
      .catch(err => {
        console.log('ERR',err.toString())
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
      return alert('不能只輸入空白!')
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
