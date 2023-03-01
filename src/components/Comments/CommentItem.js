import styled from 'styled-components'

import { BigCardWrapper } from '../general'
import { MEDIA_QUERY } from '../../constants/style'
import CreateEditButtons from './CreateEditButtons'

export const CommentWrapper = styled(BigCardWrapper)`
  display: flex;
  justify-content: space-between;
  position: relative;
`
export const Avatar = styled.div`
  background: rgba(0, 0, 0, 0.1);
  height: 100px;
  width: 100px;
  border-radius: 50%;
  overflow: hidden;

  & img {
    width: 100%;
  }

  ${MEDIA_QUERY.mobile} {
    height: 70px;
    width: 70px;
  }
`
export const DataArea = styled.div`
  flex: 1;
  text-align: left;
  margin-left: 30px;
  font-family: 微軟正黑體;
`
export const AuthorDataWrapper = styled.div`
  padding-bottom: 0.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`
export const LeftPartWrapper = styled.div`
  display: flex;
  align-items: center;

  ${MEDIA_QUERY.mobile} {
    display: block;
  }
`
export const Author = styled.div`
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
        <img className = 'photo__url'/>
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
