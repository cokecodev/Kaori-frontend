import styled from "styled-components"
import { WidthWrapper } from '../general'
import CreatePerfumeCards from './CreatePerfumeCards'


export const CardListWrapper = styled(WidthWrapper)`
  max-width: 1000px;
  margin: 30px auto 10px auto;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`
export const EmptyCard = styled.div`
  width: 250px;
  margin: 5px;
`


export default function HomePageCardsSection({perfumes}) {

  return (
    <CardListWrapper>
      <CreatePerfumeCards perfumes = { perfumes } />
      <EmptyCard/>
      <EmptyCard/>
    </CardListWrapper>
  )
}
