import styled from 'styled-components'
import { Link } from 'react-router-dom'

import { COLOR } from '../../constants/style'
import { BigCardWrapper, Button } from '../general'

const MessageContent = styled.div`
  text-align: left;
`
const ColorButton = styled(Button)`
  background: ${COLOR.color4};
  border: 1px solid ${COLOR.color4};
  color: white;
  margin: 0 10px;

  &:hover {
    background: ${COLOR.color5};
    border: 1px solid ${COLOR.color5};
  }
`

export default function CommentEmptyMessage({currentUser}) {
  return(
    <BigCardWrapper>
      <MessageContent>
        { `目前還沒有人留言喔~快來分享你的看法` }
        { !currentUser && (
          <Link to = '/login' ><ColorButton>登入</ColorButton></Link>
        )}
      </MessageContent>
    </BigCardWrapper>
  )
}