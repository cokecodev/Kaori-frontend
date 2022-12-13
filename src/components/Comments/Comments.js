import { useParams } from "react-router-dom"

import { Error } from "../general"
import BlockPartition from '../BlockPartition'
import CommentInputArea from'./CommentInputArea'
import CommentItem from'./CommentItem'
import CommentEmptyMessage from'./CommentEmptyMessage'

import useGetComments from '../../hooks/commentHooks/useGetComments'

export default function Comments() {
  const perfumeId = Number(useParams().id)
  const {
    comments,
    fetchError,
    handleCommentDelete,
    handleCommentSubmit,
    newCommentContent, 
    handleValueChange
  } = useGetComments(perfumeId)
  
  return (
    <>
      <BlockPartition subtitle = {null}>REVIEWS</BlockPartition>

      <CommentInputArea 
        handleCommentSubmit = {handleCommentSubmit} 
        fetchError = {fetchError}
        newCommentContent = {newCommentContent}
        handleValueChange = {handleValueChange}
      />
      
      { comments.length === 0 && <CommentEmptyMessage/> }
      { comments.length !== 0 && (comments.map(comment => <CommentItem   key = {comment.id} comment = {comment} handleCommentDelete={handleCommentDelete} /> ))  }
      
      {/* TODO: 顯示錯誤區塊待決定 */}
      <Error>
        { fetchError && 'Error:'}{fetchError}
      </Error>
    </>
  );
}
