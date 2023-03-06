import styled from 'styled-components'
import { COLOR } from '../../constants/style'
import { BigCardWrapper, Button } from '../general'

const Form = styled.form`
  width: 100%;
` 
const Textarea = styled.textarea`
  width: 100%;
  height: 200px;
  padding: 6px 0; 
  border: 1px solid white;
`
const BigButton = styled(Button)`
  width: 95%;
  padding: 8px 0;
  font-size: 15px;
  color: white;
  background: ${COLOR.color3};
  border: 1px solid ${COLOR.color3};
`

export default function CommentInputArea({handleCommentSubmit, newCommentContent, handleValueChange}){
  return(
    <BigCardWrapper className='CommentInputArea'>
      <Form onSubmit = { handleCommentSubmit } >
        <Textarea 
          placeholder ='快來跟我們分享你的想法' 
          value = { newCommentContent } 
          onChange = { handleValueChange } 
        />

        <BigButton className='submit-btn'>送出留言</BigButton>
      </Form >
    </BigCardWrapper>
  )
}
