import styled from "styled-components"
import { COLOR } from '../../constants/style'

const BannerWrapper =styled.div`
  background: gray;
  height: 450px;
`

export default function Banner() {

  return (
    <>
      <BannerWrapper>
        'YOYOYO BANNER'
      </BannerWrapper>
    </>
  )
}
