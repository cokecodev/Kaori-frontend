import styled from "styled-components"
import { BigCardWrapper } from "../general"
import { MEDIA_QUERY } from "../../constants/style"

import CreateEditButtons from "./CreateEditButtons"

const CommentWrapper = styled(BigCardWrapper)`
  display: flex;
  justify-content: space-between;
  position: relative;
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
`
const AuthorDataWrapper = styled.div`
  padding-bottom: 0.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`
const LeftPartWrapper = styled.div`
  display: flex;
  align-items: center;

  ${MEDIA_QUERY.mobile}{
    display: block;
  }
`
const Author = styled.div`
  font-size: 1.3rem;
  margin-right: 1rem;

  ${MEDIA_QUERY.mobile} {
    font-size: 18px;
  }
`
const Timestamp = styled.div`
  font-size: 0.8rem;
  color: gray;

  ${MEDIA_QUERY.mobile} {
    font-size: 12px;
    margin-top: 5px;
  }
`

export default function CommentItem ({comment, handleCommentDelete, currentUser, handleUpdateButtonClick}) {

  return(
    <CommentWrapper>
      <Avatar>
        <div/>
      </Avatar>
      
      <DataArea>
        <AuthorDataWrapper>
          <LeftPartWrapper className = 'author__data'>
            <Author>{comment.User.nickname}</Author>
            <Timestamp>{new Date(comment.createdAt).toLocaleDateString()}</Timestamp>
          </LeftPartWrapper>
         
          <div className = 'author__edit'>            
            { currentUser && (
                <CreateEditButtons
                  comment = { comment }
                  currentUser = { currentUser }
                  handleCommentDelete = { handleCommentDelete }
                  handleUpdateButtonClick = { handleUpdateButtonClick }
                />
              )
            }
          </div>
        </AuthorDataWrapper>

        <div className ='comment__content'>
          {comment.content}
        </div>

      </DataArea>
    </CommentWrapper> 
  )
}
