import styled from 'styled-components'

export const BeforeWrapper = styled.div`
  color: ${props => props.color};
  font-weight: 600;
  margin: 0 16px 50px 0;

  &:before {
    display: inline-block;
    content:'';
    background: ${props => props.color};
    width: 10px;
    height: ${props => props.size};
    vertical-align: middle;
  }

  & span {
    display: inline-block;
    font-size: ${props => props.size};
    margin-left: 10px;
    vertical-align: middle;
  }
`

export default function PageDescribeTitle({ title , titleColor, titleSize }) {
  const color = titleColor ? titleColor : 'rgba(0,0,0,0.4)'
  const size = titleSize ? titleSize : '1.5rem'

  return(
    <BeforeWrapper 
      color = { color }
      size = { size }
    >
      <span> { title } </span>
    </BeforeWrapper>
  )
}
