import styled from 'styled-components'
import HashLoader from 'react-spinners/HashLoader'
import { COLOR } from '../../constants/style'

const LoadingWrapper = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 3;
  background: rgba(0, 0, 0, 0.8);
  display:flex;
`
const override = {
  margin: 'auto',
}

export default function Loading() {

 
  return(
    <LoadingWrapper>
      <HashLoader
        color = { COLOR.color2 }
        cssOverride = { override }
        size = { 70 }
      />
    </LoadingWrapper>
  )
}
