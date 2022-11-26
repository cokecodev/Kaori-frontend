import { createComment,getComments, deleteComment } from '../../WebAPI'
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

import { Error } from "../general"
import CommentInputArea from'./CommentInputArea'
import CommentItem from'./CommentItem'
import CommentEmptyMessage from'./CommentEmptyMessage'

export default function Comments() {
  const [comments, setComments] = useState([])
  const [fetchError, setFetchError] = useState(null)
  const [newCommentContent, setNewCommentContent] = useState(null)
  const perfumeId = Number(useParams().id)
  
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

    if(!newCommentContent){
      return alert('請完整填寫')
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

        // 失敗處理
        if(res.data.ok === 0){
          alert(res.data.message)
          return
        }

        // 刪除成功
        alert('刪除成功')
        getCommentFetch()

      }).catch(err => {
        console.log('ERR',err.toString())
      })
 
  }

  return (
    <>
      <CommentInputArea 
        handleCommentSubmit = {handleCommentSubmit} 
        fetchError = {fetchError}
        newCommentContent = {newCommentContent}
        setNewCommentContent = {setNewCommentContent}
      />
      
      { comments.length === 0 && <CommentEmptyMessage/> }
      { comments.length !== 0 && (comments.map(comment => <CommentItem   key = {comment.id} comment = {comment} handleCommentDelete={handleCommentDelete} /> ))  }
      <Error>
        { fetchError && 'Error:'}{fetchError}
      </Error>
    </>
  );
}
