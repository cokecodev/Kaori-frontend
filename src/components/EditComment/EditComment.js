import styled from "styled-components"
import { WidthWrapper,Button } from "../general"
import { COLOR, MEDIA_QUERY } from '../../constants/style'

const FlowCardWrapper = styled.div`
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

  ${MEDIA_QUERY.middle_breakpoint} {
    font-size: 16px;
  }
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


export default function EditComment({isUpdateHidden, originComment, handleCommentUpdateChange, handleCommentUpdateSubmit }) {
  
  return (
    <FlowCardWrapper className = { isUpdateHidden ? 'hide' : 'show' } >
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
    </FlowCardWrapper>
  )
}
