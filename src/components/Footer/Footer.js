import styled from "styled-components"
import { COLOR } from '../../constants/style'

const FooterWrapper = styled.div`
  background: ${COLOR.color2};
  color: gray;
  width: 100%;
  padding: 1rem 0;
  font-size: 14px;
  margin-top: 100px;

  & div + div {
    margin-bottom: 5px;
  }
`

export default function Footer() {

  return (
    <>
      <FooterWrapper>
        <div>Copyright © 2022  Kaotri Rights Reserved. </div>
      </FooterWrapper>
    </>
  )
}
