import styled from 'styled-components'
import { COLOR, MEDIA_QUERY } from '../../constants/style'
import HomePageCardsSection from '../../components/HomePageCardsSection'

const GroupWrapper = styled.div`
  margin-bottom: 30px;
`
const BannerWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`
const BannerImg = styled.div`
  background: ${props => props.imgName ? `url(/Banner/${props.imgName}.jpg) center/cover no-repeat` : 'gray' };
  max-width: 800px;
  min-height: 200px;
  width: 100%;
  height: 25vw;
  margin: 0 15px;
  display:flex;
  justify-content:center;
  align-items: center;
  opacity: 0.6;
  border-radius: 10px;
  
  @media screen and (min-width:1200px){
    max-height: 250px;
  }

  ${MEDIA_QUERY.mobile} {
    height: 40vw;
    line-height: 30vw;
  }

  ${MEDIA_QUERY.middle_breakpoint} {
    margin: 0 10px;
  }
`
const Context = styled.div`
  font-size: 1.6rem;
  font-weight: 550;
  color: white;
`
const DescribeWrapper = styled.div`
  margin: 15px auto 0px;
  padding: 10px;
  max-width: 750px;
`
const Title = styled.div`
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 10px;
  color: ${COLOR.color2};
`
const DescribeContext = styled.div`
  font-size: 1.2rem;
  color: gray;

  ${MEDIA_QUERY.mobile} {
    font-size: 1rem;
    padding: 10px 15px;
  }
`

export default function PromoteBlock({ imgName, title, context, perfumes }) {

  return (
    <GroupWrapper>
      <BannerWrapper>
        <BannerImg imgName = { imgName } >
          <Context> { title } </Context>
        </BannerImg>
      </BannerWrapper>

      <DescribeWrapper>
        <Title>小編的mur</Title>
        <DescribeContext>
          { context }
        </DescribeContext>
      </DescribeWrapper>

      <HomePageCardsSection 
        perfumes = { perfumes }
      />

    </GroupWrapper>
  )
}
