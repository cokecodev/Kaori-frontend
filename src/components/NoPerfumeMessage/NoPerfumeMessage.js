import styled from 'styled-components'

const MessageWrapper = styled.div`
  font-size: 1.5rem;
  margin: 50px auto;
  font-weight: 600;
  color: rgba(0,0,0,0.4);
`

export default function Banner({ message }) {

  return (
    <MessageWrapper>
      { message }
    </MessageWrapper>
  )
}
