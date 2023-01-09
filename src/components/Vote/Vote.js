import styled from "styled-components"
import { COLOR } from '../../constants/style' 
import { WidthWrapper, Button } from "../general"
import { useParams } from "react-router-dom"

import { longArr, genderArr, silageArr, recommendArr } from '../../constants/perfumeSetting'
import { IngredientRadioArr } from '../../constants/perfumeSetting'

import CreateVoteItem  from './CreateVoteItem'
import CreateRecommendVoteItem  from './CreateRecommendVoteItem'
import CreateIngredientVoteItem  from './CreateIngredientVoteItem'
import useVote  from '../../hooks/voteHooks/useVote'
const BACKGROUND_COLOR = 'white'


const VoteWrapper = styled(WidthWrapper)`
  position: relative;
`
const VoteCard  = styled.div`
  z-index: 1;
  position: absolute;
  background: ${BACKGROUND_COLOR};
  border: 1px solid rgb(0, 0, 0, 0.2);
  border-radius: 10px;
  box-shadow: 0.5px 0 10px rgb(0, 0, 0, 0.1);
  padding: 1rem;
`
const CloseButton = styled(Button)`
  position: absolute;
  right: 1rem;
  top: 1rem;
`
const CardTitle = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: gray;
  margin-bottom: 1rem;
`
// ----- votes -----
const SquareArea = styled.div`
  border: 1px solid ${BACKGROUND_COLOR};
  border-radius: 8px;
  padding: 4px;

  & input {
    display: none;
  }
`
const CheckboxContainer = styled.div`
  display: flex;
  justify-content: center;
  
  & label + label {
    margin: 0 0 10px 14px;
  }

  .checked {
    border: 2px solid ${COLOR.color4};
    color: ${COLOR.color4};
  }
`  // 注意!這邊 className 跟 CreateRecommendVoteItem 有關

const SmallCardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`
const TitleWrapper = styled.div`
  width: 85%;
  margin: 0 auto;
`
// 感覺 Title 用這個比較好看( background: #b5a98887;)
const Title = styled.div`
  font-size: 1.3rem;
  font-weight: bold;
  color: white;
  border: 1px solid rgba(0, 0, 0, 0.1);
  background: ${COLOR.color3};
  border-radius: 8px;
  padding: 2px;
`
const BottomButton = styled(Button)`
  width: 95%;
  padding: 8px 0;
  margin: 10px 0;
  background: ${BACKGROUND_COLOR};
`


export default function VoteArea({ ingredient, currentUser, isVoteHidden, setIsVoteHidden, handleToggleHidden }) {
  const perfumeId = Number(useParams().id)
  const {
    voteFetchError,
    ingredientVote,
    handleFinishButtonClick,
    handleRadioClick,
    handleCheckboxClick,
    handleConnectBooleanState,
    handleConnectRadioState,
    handleConnectIngredientState
  } = useVote(perfumeId, currentUser, handleToggleHidden)


  if(!currentUser) return

  return (
    <>
      <VoteWrapper className = { isVoteHidden ? 'hide' : 'show' } >
        <VoteCard>
          <section className ='top'>
            <CardTitle>快來告訴大家你的看法</CardTitle>
            <CloseButton onClick = { handleFinishButtonClick } >x</CloseButton>
          </section>

          <section className ='votes'>
            <SquareArea className ='recommend-vote'>
              <TitleWrapper>
                <Title>推薦的使用時機</Title>
              </TitleWrapper>
              <CheckboxContainer>
                <CreateRecommendVoteItem
                  recommendArr = { recommendArr }
                  handleConnectBooleanState = { handleConnectBooleanState }
                  handleCheckboxClick = { handleCheckboxClick }
                />
              </CheckboxContainer>
            </SquareArea>

            <SquareArea className ='ingredient-vote'>
              <TitleWrapper>
                <Title>味道的突顯程度</Title>
              </TitleWrapper>
              <SmallCardContainer>
                { ingredient.length !== 0 && (
                    <CreateIngredientVoteItem
                      ingredient = { ingredient }
                      IngredientRadioArr = { IngredientRadioArr }
                      handleConnectIngredientState = { handleConnectIngredientState }
                      ingredientVote = { ingredientVote }
                      handleRadioClick = { handleRadioClick }
                    />
                  ) 
                }
              </SmallCardContainer>
            </SquareArea>

            <SquareArea className ='gender-vote'>
              <TitleWrapper>
                <Title>性別</Title>
              </TitleWrapper>
              <CreateVoteItem
                arr = { genderArr }
                name = { 'gender' }
                handleRadioClick = { handleRadioClick }
                handleConnectRadioState = { handleConnectRadioState }
              />
            </SquareArea>

            <SquareArea className ='longevity-vote'>
              <TitleWrapper>
                <Title>持香時間</Title>
              </TitleWrapper>
              <CreateVoteItem
                arr = { longArr }
                name = { 'longevity' }
                handleRadioClick = { handleRadioClick }
                handleConnectRadioState = { handleConnectRadioState }
              />
            </SquareArea>

            <SquareArea className ='silage-vote'>
              <TitleWrapper>
                <Title>揮發度</Title>
              </TitleWrapper>
              <CreateVoteItem
                arr = { silageArr }
                name = { 'silage' }
                handleRadioClick = { handleRadioClick }
                handleConnectRadioState = { handleConnectRadioState }
              />
            </SquareArea>

          </section>
          <BottomButton onClick = { handleFinishButtonClick } >投票並關閉</BottomButton>
        </VoteCard>
      </VoteWrapper>
    </>
  )
}
