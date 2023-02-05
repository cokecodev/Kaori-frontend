import { useParams } from "react-router-dom"

import { Error, WidthWrapper,Button } from "../general"
import BlockPartition from '../BlockPartition'
import CommentInputArea from'./CommentInputArea'
import CommentItem from'./CommentItem'
import CommentEmptyMessage from'./CommentEmptyMessage'

import useGetComments from '../../hooks/commentHooks/useGetComments'

import { useSelector, useDispatch } from 'react-redux'
import { selectUser } from '../../features/userReducer'
import { useEffect, useState } from "react"
import styled from "styled-components"

import { updateComment } from '../../WebAPI'
import { COLOR, MEDIA_QUERY } from '../../constants/style'

const EditComment = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background:rgba(0,0,0,0.5);
`
const Card = styled.div`
  background: white;
  max-width: 800px;
  height: 50vh;
  min-height: 350px;
  margin-top: 25vh;
  padding: 15px 0;
  border-radius: 15px;
`
const Title = styled.div`
  font-size: 1.2rem;
  font-weight: 300;
  color: ${COLOR.text_dark2};
`
const TextArea = styled.textarea`
  width: 80%;
  height: 38vh;
  min-height: 250px;
  margin: 10px 0;
  border: 1px solid rgba(0,0,0,0.1);
  padding: 10px;
`
const ButtonWrapper = styled.div`
  & Button {
    width: 82.5%;
    padding: 8px 0;
    font-size: 16px;
    background: ${COLOR.color3};
    border: 1px solid ${COLOR.color3};
    color: white;
  }
`


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
    // TODO setFetchError('')
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
    if(currentComment.length === 0 || currentComment === originComment) {
      setCurrentComment('')
      setOriginComment('')
      return setIsUpdateHidden(!isUpdateHidden)
    } 
    
    
    let commentId = currentCommentId
    const payload = {
      content: currentComment,
    }

    updateCommentFetch(perfumeId, commentId, payload)
    setIsUpdateHidden(!isUpdateHidden)
  }



  return (
    <>
      <BlockPartition subtitle = {null}>REVIEWS</BlockPartition>

      <CommentInputArea 
        handleCommentSubmit = { handleCommentSubmit } 
        fetchError = { fetchError }
        newCommentContent = { newCommentContent }
        handleValueChange = { handleValueChange }
      />

      { comments.length === 0 && <CommentEmptyMessage/> }
      { comments.length !== 0 && (comments.map(comment => <CommentItem key = {comment.id} comment = {comment} currentUser = { currentUser } handleCommentDelete = { handleCommentDelete } handleUpdateButtonClick = { handleUpdateButtonClick } /> ))  }

      <EditComment className = { isUpdateHidden ? 'hide' : 'show' } >
        <WidthWrapper>
          <Card>
            <Title>修改內容</Title>
            <form className ='edit-comment'>
              { originComment.length !== 0 && (
                  <TextArea 
                    name ='update__comment'
                    defaultValue = { originComment }
                    onChange = { handleCommentUpdateChange }
                  />
                )
              }

              <ButtonWrapper>
                <Button className ='submit-btn' onClick = { handleCommentUpdateSubmit } >提交</Button>
              </ButtonWrapper>
            </form>
          </Card>
        </WidthWrapper>
      </EditComment>

      {/* TODO: 顯示錯誤區塊待決定 */}
      <Error>
        { fetchError && 'Error:'}{fetchError}
      </Error>
    </>
  );
}
