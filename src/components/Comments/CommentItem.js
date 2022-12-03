import styled from "styled-components"
import { BigCardWrapper, Button } from "../general"
import { Link } from "react-router-dom"
import { COLOR } from "../../constants/style"

const CommentWrapper = styled(BigCardWrapper)`
  display: flex;
  justify-content: space-between;
`
const Avatar = styled.div`
  background: rgba(0, 0, 0, 0.1);
  height: 100px;
  width: 100px;
  border-radius: 50%;
`
const DataArea = styled.div`
  flex: 1;
  text-align: left;
  margin-left: 30px;
  font-family: 微軟正黑體;

  & a + a {
    margin-left: 8px;
  }
`
const AuthorDataWrapper = styled.div`
  padding-bottom: 0.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`
const Author = styled.span`
  font-size: 1.3rem;
  margin-right: 1rem;
`
const Timestamp = styled.span`
  font-size: 0.8rem;
  color: gray;
`
const Edit = styled(Button)`
  color: gray;
  border: 1px solid rgba(0,0,0,0.1);

  &:hover {
    color: white;
    background:${COLOR.gray_light};
    border: 1px solid ${COLOR.gray_light};
    transition: all 0.3s;
  }
`

export default function CommentItem ({comment, handleCommentDelete}) {

  return(
    <CommentWrapper>
      <Avatar>
        <div/>
      </Avatar>
      
      <DataArea>
        <AuthorDataWrapper>
          <div className = 'author__data'>
            <Author>{comment.User.username}</Author>
            <Timestamp>{new Date(comment.createdAt).toLocaleDateString()}</Timestamp>
          </div>
          <div className = 'author__edit'>
            <Link><Edit>編輯</Edit></Link>
            <Link><Edit onClick={() => handleCommentDelete(comment.id)}>刪除</Edit></Link>
          </div>
        </AuthorDataWrapper>

        <div className='comment__content'>
          {comment.content}
        </div>

      </DataArea>
    </CommentWrapper> 
  )
}
