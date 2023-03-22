import styled from 'styled-components'
import { useSelector } from 'react-redux'
import { selectFetchError } from '../../features/fetchStatusReducer'
import { MEDIA_QUERY } from '../../constants/style'

const LoadingWrapper = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 3;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
`
const ContentWrapper = styled.span`
  margin: auto;
  color: white;

  & div {
    margin: 10px 30px;
  }
`
const MainContent = styled.p`
  font-size: 2rem;

  ${MEDIA_QUERY.middle_breakpoint} {
    font-size: 1.5rem;
  }
`
const ErrorInfo = styled.div`
  font-size: 1rem;
  color: red;

  & span {
    color: gray;
  }
`


export default function ErrorMessage() {
  const error = useSelector(selectFetchError)
 
  return(
    <LoadingWrapper>
      <ContentWrapper>
        <MainContent>歐摸！網站出了點差錯呢 QQ</MainContent>
        <div>請稍後再試或與技術人員聯絡</div>
        <ErrorInfo>
          錯誤訊息:
          <span> {error} </span>
        </ErrorInfo>
      </ContentWrapper>
    </LoadingWrapper>
  )
}
