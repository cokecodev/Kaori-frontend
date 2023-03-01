import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectUser } from '../../features/userReducer'

import { Error } from '../general'
import BlockPartition from '../BlockPartition'
import CommentInputArea from'./CommentInputArea'
import CommentItem from'./CommentItem'
import CommentEmptyMessage from'./CommentEmptyMessage'
import EditComment from'../EditComment'
import useGetComments from '../../hooks/commentHooks/useGetComments'
import useUpdateComments from '../../hooks/commentHooks/useUpdateComments'


export default function Comments() {
  const currentUser = useSelector(selectUser)
  const perfumeId = Number(useParams().id)
  const {
    comments,
    fetchError,
    getCommentFetch,
    handleCommentDelete,
    handleCommentSubmit,
    newCommentContent, 
    handleValueChange
  } = useGetComments(perfumeId)

  const {
    isUpdateHidden,
    originComment,
    handleCommentUpdateChange,
    handleUpdateButtonClick,
    handleCommentUpdateSubmit
  } = useUpdateComments(perfumeId, comments, getCommentFetch)


  return (
    <>
      <BlockPartition subtitle = {null} >REVIEWS</BlockPartition>

      <CommentInputArea 
        handleCommentSubmit = { handleCommentSubmit } 
        fetchError = { fetchError }
        newCommentContent = { newCommentContent }
        handleValueChange = { handleValueChange }
      />

      { comments.length === 0 && <CommentEmptyMessage currentUser = { currentUser }/> }
      { comments.length !== 0 && (comments.map(comment => <CommentItem key = {comment.id} comment = {comment} currentUser = { currentUser } handleCommentDelete = { handleCommentDelete } handleUpdateButtonClick = { handleUpdateButtonClick } /> ))  }

      { <EditComment
          isUpdateHidden = { isUpdateHidden }
          originComment = { originComment }
          handleCommentUpdateChange = { handleCommentUpdateChange }
          handleCommentUpdateSubmit = { handleCommentUpdateSubmit }
        />
      }

      {/* TODO: 顯示錯誤區塊待決定 */}
      <Error>
        { fetchError && 'Error:'}{fetchError}
      </Error>
    </>
  )
}
