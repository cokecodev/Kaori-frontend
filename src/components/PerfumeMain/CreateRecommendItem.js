import styled from "styled-components"
import { COLOR, MEDIA_QUERY } from '../../constants/style' 

const RecommendItem = styled.span`
  font-size: 1.15rem;
  font-weight: bold;
  color: rgba(0, 0, 0, 0.2);
  color: ${COLOR.color4};

  border: 1.5px solid ${COLOR.color4};
  border-radius: 1.15rem;
  padding: 3px 6px;

  & + & {
    margin-left: 1rem;
  }

  ${MEDIA_QUERY.middle_breakpoint} {
    font-size: 0.8rem;
    padding: 3px 6px;

    & + & {
      margin-left: 0.5rem;
    }
  }
`

export default function CreateRecommendItem({item, handleIsActive, booleanVoteData, booleanTotalVote}){
  let isActive = (handleIsActive((item.id), booleanVoteData, booleanTotalVote))
   return(
    <>
      {
        isActive ? <RecommendItem id = { item.id }>{ item.name }</RecommendItem> : null
      }
    </>
  )
}
