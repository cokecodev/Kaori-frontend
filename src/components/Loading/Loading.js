import styled from 'styled-components'


const LoadingWrapper = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 3;
  background: rgba(0, 0, 0, 0.8);
  display:flex;

  & p {
    font-size: 2rem;
    margin: auto;
    color:white;
  }
`

export default function Loading() {

 
  return(
    <LoadingWrapper>
      <p>Loading...</p>
    </LoadingWrapper>
  )
}
