import styled from "styled-components"

import { createComment,getComments, deleteComment } from '../../WebAPI'
import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import { WidthWrapper } from "../general"

const CommentWrapper = styled(WidthWrapper)`
  border: 1px solid rgba(0,0,0,0.1);
  padding: 20px;
  border-radius: 15px;

  display: flex;
  justify-content: space-between;
  
  & form {
    width:100%
  }
`

const Avatar = styled.div`
  background: gray;
  height: 100px;
  width: 100px;
  border-radius: 50%;
`

const DataArea = styled.div`
  flex: 1;
  text-align: left;
  margin-left: 30px;
  
  & .authorData {
    padding-bottom: 0.5rem;
  }

  & .dataArea_username {
    font-size: 1.25rem;
    font-family: 微軟正黑體;
    margin-right: 1rem;
  }

  & .dataArea_date {
    font-size: 0.8rem;
    color: gray;
  }

  &.dataArea_content {
    font-size: 1.15rem;  
  }
`

const TextAreaWrapper = styled.div`
  margin: 0 auto;
  
  & textarea {
    width: 100%;
    height: 200px;
    resize: none;
    outline-style: none;
    padding: 6px 0; 
    border: 1px solid white;
  }
`

const Error = styled.div`
  color: red;
  font-size: 15px;
  margin: 6px;
`

const Article = ({comment, handleCommentDelete}) => {

  return(
    <CommentWrapper>
      <Avatar>
        <div/>
      </Avatar>
      
      <DataArea>
        <div className='authorData'>
          <span className = 'dataArea_username'>{comment.User.username}</span>
          <span className = 'dataArea_date'>{new Date(comment.createdAt).toLocaleDateString()}</span>

          <div>
            <Link>編輯</Link>
            <Link onClick={()=>handleCommentDelete(comment.id)}>刪除</Link>
          </div>
          
        </div>
        <div className='dataArea_content'>
          {comment.content}
        </div>
      </DataArea>
    </CommentWrapper>
    
  )
}

const EmptyMessage = () => {
  return(
    <CommentWrapper>
      <div className='dataArea_content'>
        {`目前還沒有人留言喔~快來分享你的看法`}
      </div>
    </CommentWrapper>
  )
}

export default function Test666() {
  const [comments, setComments] = useState([])
  const [fetchError, setFetchError] = useState(null)
  const [describe, setDescribe] = useState(null)
  const perfumeId = Number(useParams().id)
  
  function getCommentFetch(){
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
  },[perfumeId])

  const handleCommentSubmit = (e) => {
    e.preventDefault()
    setFetchError('')
    const payload = {
      content: describe,
    }

    if(!describe){
      return alert('請完整填寫')
    } 
 
    // 送資料
    createComment(perfumeId, payload).then((res) => {
      // 錯誤處理
      if(res.data.ok === 0) {
        setFetchError(res.data.message)
        return 
      }

      // 新增成功的話
      setDescribe('')
      getCommentFetch()
    })
    .catch(err => {
      console.log('ERR',err.toString())
      setFetchError(err.message)
    })
  }

  const handleCommentDelete = (commentId) => {
    deleteComment(perfumeId, commentId).then(res => {

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
      <CommentWrapper>
        <form className='create' onSubmit={handleCommentSubmit} >
        <TextAreaWrapper>
          <textarea 
            className='createComment' 
            placeholder='快來跟我們分享你的想法' 
            value = { describe } 
            onChange = { e => setDescribe(e.target.value)} />
        </TextAreaWrapper>

        <Error>
          { fetchError && '錯誤 :'} {fetchError}
        </Error>

          <button className='submit-btn'>提交</button>
        </form >

      </CommentWrapper>
      
      { comments.length === 0 && <EmptyMessage/> }
      { comments.length !== 0 && (comments.map(comment => <Article   key = {comment.id} comment = {comment} handleCommentDelete={handleCommentDelete} /> ))  }
      <Error>
        { fetchError && 'Fetch Fail:'}{fetchError}
      </Error>
    </>
  );
}

