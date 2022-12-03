import styled from "styled-components"

import { WidthWrapper,Button } from '../../components/general' 
import { COLOR } from '../../constants/style' 
import { Link } from "react-router-dom"
const BACKGROUND_COLOR = 'white'

const BlockLineContainer = styled(WidthWrapper)`
  position: relative;
`
const BlockLine = styled.div`
  width: 100%;
  margin: 25px 0;
  border-bottom: 5px solid ${COLOR.color3};
  position: absolute;
  z-index: -5;
`
const TextWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-left: 60px;
  justify-content: space-between;
`
const BlockName = styled.div`
  font-size: 2.5rem;
  background: ${BACKGROUND_COLOR};
  padding: 0 10px;
`
const SubTitle = styled(Button)`
  background: ${BACKGROUND_COLOR};
  border: 1px solid ${COLOR.color3};
  border-radius: 8px;
  margin-right: 1rem;
  padding: 6px 12px;
  cursor: pointer;
  transition: all 0.1s;
`

export default function BlockPartition(props) {

  return (
    <BlockLineContainer>
      <BlockLine></BlockLine>
        <TextWrapper>
          <BlockName>{props.children}</BlockName>
          { props.subtitle && <Link><SubTitle> {props.subtitle} </SubTitle></Link> }
        </TextWrapper>
    </BlockLineContainer>
  );
}
