import styled from "styled-components"
import { COLOR } from '../../constants/style' 
import BlockPartition from '../BlockPartition'
import { useEffect, useState } from "react"

const VoteCardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 0 auto;
  max-width: 800px;
  min-width: 300px;
  font-size: 16px;
`

const VoteCard = styled.div`
  margin: 15px auto;
  border: 1px solid rgba(0,0,0,0.1);
  padding: 20px ;
  border-radius: 15px;
  max-width: 400px;
  min-width: 270px;
  box-shadow: 0.5px 0 10px rgba(0,0,0,0.1);
  width: 350px;

  .card-title {
    color: ${COLOR.text_dark2};
    font-size: 1.2rem;
    font-weight: 300;
    text-align: left;
  }
`

const Line = styled.div`
  border-bottom: 1.5px solid rgba(0,0,0,0.1);
  width: 100%;
  margin: 0.5rem 0 1.5rem 0;
`

const DataItem = styled.div`
  margin: 10px auto;
  align-items: center;
  justify-content:center;
  position: relative;
  display: flex;
  
  & span { 
    margin-left: 1rem ;
  }

  ${props => (props.describe)!== null && (`
    &:hover:before {
      content:'${props.describe}';
      background: ${COLOR.color3};
      color: white;
      position: absolute;
      
      border: 1px solid ${COLOR.color3};
      border-radius: 10px;
      padding: 0 6px;
    }`
  )}
`

const DataName = styled.div`
  display: inline-block;
`

const HoverSample = styled.div`
  position: relative;

  &:hover:before {
    content:'${props=>props.describe}';
    color: gray;
    position: absolute;
    right: 110%;
    margin-left: 10px;
    border: 1px solid gray;
    border-radius: 10px;
  }
`

const Left = styled.div`
  min-width: 60px;
`

const Right = styled.div`
  text-align: left;
  width: 220px;
  margin-left: 1rem;
`

const createItem = (titleName, value, total) => {
  return(
  <DataItem describe={'666'}>
    <Left>
      <DataName>
        {titleName}
      </DataName>
    </Left>
    <Right>
      <progress max={total} value={value}/>
      <span>{value}</span>
    </Right>
  </DataItem>
)}

const handleItemNameTranslate = (string) => {
  let name
  let describe
  switch (string) {
    case 'super long': {
      name = '超久'
      describe ='12hr+'
      break;
    }
    case 'long': {
      name = '偏久'
      describe ='7~12hr'
      break;
    }
    case 'normal': {
      name = '中度'
      describe ='3~6hr'
      break;
    }
    case 'short': {
      name = '偏短'
      describe ='1~2hr'
      break;
    }
    case 'super short': {
      name = '超短'
      describe ='0~1hr'
      break;
    }
    case 'super male': {
      name = '男性'
      break;
    }
    case 'male': {
      name = '偏男性'
      break;
    }
    case 'unisex': {
      name = '中性'
      break;
    }
    case 'female': {
      name = '偏女性'
      break;
    }
    case 'super female': {
      name = '女性'
      break;
    }
    case 'intimate': {
      name = '柔和'
      describe ='需要很靠近'
      break;
    }
    case 'moderate': {
      name = '普通'
      describe ='一隻手臂的距離內'
      break;
    }
    case 'strong': {
      name = '濃郁'
      describe ='兩公尺內'
      break;
    }
    case 'enormous': {
      name = '強烈'
      describe ='充滿整個房間'
      break;
    }

    case '香檸檬': {
      name = ''
      describe ='(Bergamot)'
      break;
    }

    default: {
      break;
    }
  }
 
  //if (!describe) return{ name }
  return { name, describe }
}

// DONE: 建立一個map 出各組條狀圖的function!
const CreateProgressBar = ({arr, data, total}) => {
  // 這邊的 data 是從 API 拿到的，資料形式 [{},{},{}]
  if (arr instanceof Array !== true) return console.log('Not arr ! from function CreateProgressBar')

  let currentNumber
  const handelCurrentVoteNumber = (string, arr) => {
    if (arr instanceof Array !== true) return console.log('Not arr ! from function handelCurrentVoteNumber')
    for(let i = 0; i < arr.length; i++ ) {
      if(arr[i].name === string) {
        currentNumber = arr[i].totalVote // 這邊跟傳回來的資料 key name 相關
      }
    }
    return currentNumber
  }

  
  return(
    <>
      { arr.map(res => {
          currentNumber = 0
          handelCurrentVoteNumber(res, data)
          const translate = handleItemNameTranslate(res)

          return (
              <DataItem describe = { translate.describe|| null } className='data-item'>
              <Left>
                <DataName>
                  { translate.name|| res }
                </DataName>
              </Left>
              <Right>
                <progress 
                  max = { total } 
                  value = { currentNumber } 
                />
                <span>{currentNumber}</span>
              </Right>
            </DataItem>
          )
        })
      }
    </>
  )
}

// function 算總數
const handleTotalValue = (arr) => {
  if (arr instanceof Array !== true) return console.log('Not arr ! from function handleTotalValue')
  let total = 0
  arr.map(res => {
    total += Number(res.totalVote) // 這邊跟傳回來的資料 key name 相關
  })
  return total
}


// function 處理材料 note 相關
const checkIsContain = (arr, string) => {
  let result = false
  arr.some(res => {
    if (res.includes(string)) { 
      result = true }
  })
  return result 
}

const handleStringSplit = (string, symbolString) => {
  let result = string.split(symbolString)
  return result[0]
}

const handleIngredientNote = (arr, targetString) => {
  if (checkIsContain(arr, targetString)){
    return arr.map( res => handleStringSplit(res, targetString))
  }
  return arr
}





export default function PerfumeShowVoteData({voteData, ingredient}) {
  console.log('PerfumeShowVoteData',voteData)

  // 票數資料
  const longevityVoteArr = voteData.longevity // 資料型態 [{totalVote: 1, name: 'long'},{},{}]
  const genderVoteArr = voteData.gender
  const ingredientVoteArr = voteData.ingredient
  const silageVoteArr = voteData.silage
  
  // 定義有甚麼選項的Arr 
  const longArr = ['super short', 'short', 'normal', 'long', 'super long']
  const genderArr = ['super male', 'male', 'unisex', 'female', 'super female']
  const silageArr = ['intimate', 'moderate', 'strong', 'enormous']
  const ingredientArr = handleIngredientNote(ingredient, '(') // 為了去掉後面的英文註釋

  // 從票數資料裡面算出各項目的總票數
  const longTotal = handleTotalValue(longevityVoteArr)
  const genderTotal = handleTotalValue(genderVoteArr)
  const ingredientTotal = handleTotalValue(ingredientVoteArr)
  const silageTotal = handleTotalValue(silageVoteArr)

  return (
    <>
      <BlockPartition subtitle = {'投票去'}>VOTES</BlockPartition>

      <VoteCardContainer>
        <VoteCard className ={'ingredient-card'}>
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

        { /* 以下切版測試用 */}
        <VoteCard>
          <div className='card-title'>
            最明顯的味道
          </div>
          <Line/>
          <div ClassName='ingredients'>
            {createItem('龍涎香', 1020, 250)}
            {createItem('松木', 52, 250)}
            {createItem('柑橘', 78, 250)}
          </div>
        </VoteCard>
        <VoteCard>
          <div className='card-title'>
            最明顯的味道
          </div>
          <Line/>
          <div ClassName='ingredients'>
            {createItem('龍涎香', 1020, 250)}
            {createItem('松木', 52, 250)}
            {createItem('柑橘', 78, 250)}
          </div>
        </VoteCard>

      </VoteCardContainer>
    </>
  );
}

