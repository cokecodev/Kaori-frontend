import styled from "styled-components"
import { COLOR, MEDIA_QUERY } from '../../constants/style' 
import { WidthWrapper} from "../general"
import { useMemo } from "react"

import BlockPartition from '../BlockPartition'
import CreateProgressBar from './CreateProgressBar'

import { longArr, genderArr, silageArr } from '../../constants/perfumeSetting'
import { handleIngredientNote, handleTotalValue } from './functions'

const VoteCardContainer = styled(WidthWrapper)`
  display: flex;
  flex-wrap: wrap;
  margin: 0 auto;
  font-size: 16px;
`

const VoteCard = styled.div`
  margin: 10px auto;
  border: 1px solid rgba(0,0,0,0.1);
  padding: 20px;
  border-radius: 15px;
  max-width: 380px;
  min-width: 300px;
  box-shadow: 0.5px 0 10px rgba(0,0,0,0.1);
  width: 43%;

  .card-title {
    color: ${COLOR.text_dark2};
    font-size: 1.2rem;
    font-weight: 300;
    text-align: left;
  }

  ${MEDIA_QUERY.mobile} { 
    max-width: 768px;
    width: 90%;
    margin: 5px auto;

    .card-title {
      text-align: center;
    }
  }
`

const Line = styled.div`
  border-bottom: 1.5px solid rgba(0,0,0,0.1);
  width: 100%;
  margin: 0.5rem 0 1.5rem 0;
`

export default function PerfumeShowVoteData({voteData, ingredient}) {
  console.log('PerfumeShowVoteData',voteData)

  // 票數資料
  const longevityVoteArr = useMemo(() => voteData.longevity, [voteData]) // 資料型態 [{totalVote: 1, name: 'long'},{},{}]
  const genderVoteArr = useMemo(() => voteData.gender, [voteData])
  const ingredientVoteArr = useMemo(() => voteData.ingredient, [voteData])
  const silageVoteArr = useMemo(() => voteData.silage, [voteData])

  // 定義有甚麼選項的 Arr ，不用運算的都在 perfumeSetting
  const ingredientArr = useMemo(() => handleIngredientNote(ingredient, '('), [ingredient]) // 為了去掉後面的英文註釋

  // 從票數資料裡面算出各項目的總票數
  const longTotal = useMemo(() => handleTotalValue(longevityVoteArr), [longevityVoteArr])
  const genderTotal = useMemo(() => handleTotalValue(genderVoteArr), [genderVoteArr])
  const ingredientTotal = useMemo(() => handleTotalValue(ingredientVoteArr), [ingredientVoteArr])
  const silageTotal = useMemo(() => handleTotalValue(silageVoteArr), [silageVoteArr])

  return (
    <>
      <BlockPartition subtitle = {'投票去'}>VOTES</BlockPartition>

      <VoteCardContainer>
        <VoteCard className = {'ingredient-card'}>
          <div className ='card-title'>
            味道最明顯的成分
          </div>
          <Line/>
          <div ClassName ='item-container'>
            { voteData.length!==0 && (
              <CreateProgressBar
                arr = { ingredientArr }
                data = { ingredientVoteArr }
                total = { ingredientTotal }
              /> 
            )}
          </div>
        </VoteCard>

        <VoteCard className ={'gender-card'}>
          <div className ='card-title'>
            性別
          </div>
          <Line/>
          <div ClassName ='item-container'>
            { voteData.length!==0 && (
              <CreateProgressBar
                arr = { genderArr } 
                data = { genderVoteArr } 
                total = { genderTotal }
              /> 
            )}
          </div>
        </VoteCard>

        <VoteCard className ={'longevity-card'}>
          <div className ='card-title'>
            持香時間
          </div>
          <Line/>
          <div ClassName ='item-container'>
            { voteData.length!==0 && (
              <CreateProgressBar
                arr = { longArr } 
                data = { longevityVoteArr } 
                total = { longTotal }
              /> 
            )}
          </div>
        </VoteCard>

        <VoteCard className ={'silage-card'}>
          <div className ='card-title'>
            擴散度
          </div>
          <Line/>
          <div ClassName ='item-container'>
            { voteData.length!==0 && (
              <CreateProgressBar
                arr = { silageArr } 
                data = { silageVoteArr } 
                total = { silageTotal }
              /> 
            )}
          </div>
        </VoteCard>

      </VoteCardContainer>
    </>
  );
}
