import styled from "styled-components"
import { COLOR, MEDIA_QUERY } from '../../constants/style' 
import { WidthWrapper, Button} from "../general"
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"

import { longArr, genderArr, silageArr, recommendArr } from '../../constants/perfumeSetting'
import { handleItemNameTranslate, IngredientRadioArr } from '../../constants/perfumeSetting'
import { getVoteByUserId, VoteForPerfume } from '../../WebAPI'
const BACKGROUND_COLOR = 'white'//'#e4e4e1'


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
`
// 注意!這邊是用className 做管理，因為直接傳props進去會只會 render 第一次的值
const RecommendSpan = styled.span`
  display:inline-box;
  margin-top: 20px;
  font-size: 1.3rem;
  font-weight: bold;
  border: 2px solid rgba(0,0,0,0.2);
  border-radius: 1.15rem;
  color: rgba(0,0,0,0.2);
  padding: 3px 6px;
`
const SmallCardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`
const SmallCard = styled.div`
  border: 1px solid rgba(0, 0, 0, 0.05);
  width: 300px;
  border-radius: 8px;
  padding: 8px 0;
`
const RadiosContainer = styled.div``

// ingredient 組的選項
const RadioGroup = styled.div`
  margin: 1rem;
`
const RadioSpan = styled.span`
  color: rgba(0,0,0,0.2);
  font-weight: 550;
  padding: 4px 8px;
  border: 2px solid rgba(0,0,0,0.2);
  border-radius: 1.15rem;

  ${props => (props.$isChecked) === true && (`
    background: ${COLOR.color4};
    border: 2px solid ${COLOR.color4};
    color: white;
    `)
  }
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
const VoteItem = styled.div`
  margin: 1rem;
`
const VoteIngredientName = styled.div`
  font-size: 1.3rem;
  color: ${COLOR.color5};
  font-weight: bold;
  margin-bottom: 8px;
`
const BottomButton = styled(Button)`
  width: 95%;
  padding: 8px 0;
  margin: 10px 0;
  background: ${BACKGROUND_COLOR};
`



const WithDescribe = ({$isChecked, name, describe}) => {

  return(
    <RadioSpan $isChecked = {$isChecked} > {name}({describe}) </RadioSpan>
  )
}

const WithoutDescribe = ({$isChecked, name}) => {

  return(
    <RadioSpan $isChecked = {$isChecked} > {name} </RadioSpan>
  )
}

const CreateVoteItem = ({arr, name, handleRadioClick, handleConnectRadioState }) => {
  if (arr instanceof Array !== true) return console.log('Not arr ! from function CreateVoteItem')

  return(
    <>
      { arr.map(res => {
          const translate = handleItemNameTranslate(res)
          let isChecked = handleConnectRadioState(name, res)
          return(
            <VoteItem className='vote-item'>
              <label>
                <input
                  type ='radio'
                  value = { res }
                  name = { name }
                  onChange = { handleRadioClick }
                  checked = { isChecked }
                />
                { translate.describe ? <WithDescribe $isChecked = { isChecked } name = { translate.name } describe = { translate.describe } /> : <WithoutDescribe $isChecked = { isChecked } name = { translate.name } />}
              </label>
            </VoteItem>
          )
        })
      }
    </>
  )
}


export default function VoteArea({ ingredient, currentUser, isVoteHidden, setIsVoteHidden, handleToggleHidden }) {
  const perfumeId = Number(useParams().id)
  const [voteFetchError, setVoteFetchError] = useState([])

  const [ingredientVote, setIngredientVote] = useState([])
  const [longevityVote, setLongevityVote] = useState([])
  const [genderVote, setGenderVote] = useState([])
  const [silageVote, setSilageVote] = useState([])
  const [springVote, setSpringVote] = useState(false)
  const [summerVote, setSummerVote] = useState(false)
  const [fallVote, setFallVote] = useState(false)
  const [winterVote, setWinterVote] = useState(false)
  const [dayVote, setDayVote] = useState(false)
  const [nightVote, setNightVote] = useState(false)
  const [isNewVote, setIsNewVote] = useState(false)

  
  useEffect(() => {
    if(!currentUser) return

    setVoteFetchError(null)

    getVoteByUserId(perfumeId)
      .then(res => {
        const voteData = res.data.data
        console.log('userVoteData', voteData)
        setGenderVote(voteData.gender)
        setSilageVote(voteData.silage)
        setLongevityVote(voteData.longevity)
        setIngredientVote(voteData.ingredient)
        setSpringVote(voteData.spring)
        setSummerVote(voteData.summer)
        setFallVote(voteData.fall)
        setWinterVote(voteData.winter)
        setDayVote(voteData.day)
        setNightVote(voteData.night)
        
      })
      .catch(err => {
        console.log('get old vote ERR !', err.message)
        setVoteFetchError(err.message)
      })
  },[currentUser, perfumeId])

  if(!currentUser) return

    
    
  const handleRadioClick = (e) => {
    const target = e.target
    //console.log('handleRadioClick',target)
    setIsNewVote(true)

    switch(target.name) {
      case 'gender': {
        setGenderVote(target.value)    
        break
      }
      case 'longevity': {
        setLongevityVote(target.value)
        break
      }
      case 'silage': {
        setSilageVote(target.value)
        break
      }
      default: {
        // 材料用
        let obj = {
          name: target.name,
          vote: Number(target.value)
        }
        // ingredientVote 是字串!
        const temArr = JSON.parse(ingredientVote)
        const filter = temArr.filter(res => res.name !== target.name)
        const newArr = [...filter, obj]
        const payload = JSON.stringify(newArr)
        setIngredientVote(payload)
        break
      }
    }
  }

  const handleCheckboxClick = (e) => {
    const target = e.target
    const isChecked = e.target.checked
    setIsNewVote(true)

    switch(target.name) {
      case 'spring': {
        setSpringVote(isChecked)
        break
      }
      case 'summer': {
        setSummerVote(isChecked)
        break
      }
      case 'fall':{
        setFallVote(isChecked)
        break
      }
      case 'winter': {
        setWinterVote(isChecked)
        break
      }
      case 'day': {
        setDayVote(isChecked)
        break
      }
      case 'night': {
        setNightVote(isChecked)
        break
      }

      default: {
        setIsNewVote(false)
        break
      }
    }
  }

  const handleFinishButtonClick = (e) => {
    // 如果資料沒變 ->直接把視窗關掉
    if (isNewVote === false) { return handleToggleHidden() }
    const inputVoteObj = handleVoteObj()

    // 如果資料有變 -> 送資料再把視窗關掉
    // 送資料
    VoteForPerfume(perfumeId, inputVoteObj)
      .then(res => {
        // 投票失敗的話
        if(res.data.ok === 0) {
          // TODO: 錯誤處理
          alert(res.data.message)
          return 
        }

        // 投票成功
        setIsNewVote(false)
      })
      .catch(err => {
        console.log('ERR',err.toString())
        setVoteFetchError(err.message)
      })
    
    handleToggleHidden()
  }

  const handleVoteObj = () => {
    let voteObj = {
      spring: springVote,
      summer: summerVote,
      fall: fallVote,
      winter: winterVote,
      day: dayVote,
      night: nightVote,
      gender: genderVote,
      longevity: longevityVote,
      silage: silageVote,
      ingredient: ingredientVote,
    }

    return voteObj
  }

  const handleName = (name) => {
    switch(name) {
      case 'spring': {
        return springVote
      }
      case 'summer': {
        return summerVote
      }
      case 'fall': {
        return fallVote
      }
      case 'winter': {
        return winterVote
      }
      case 'day': {
        return dayVote
      }
      case 'night': {
        return nightVote
      }

      default: {
        break
      }
    }
  }

  const handleConnectRadioState = (name, value) => {
    let currentName 
    switch (name) {
      case 'gender': {
        currentName = genderVote
        break
      }
      case 'longevity': {
        currentName = longevityVote
        break
      }
      case 'silage': {
        currentName = silageVote
        break
      }
      default: { 
        break
      }
    }

    if (currentName === value) return true
    return false
  }
 
  const handleConnectIngredientState = (voteData, radioName, radioValue) => {
    try {
      if(voteData.length === 0) return
      const temArr = JSON.parse(voteData)
      const filter = temArr.filter(res => res.name === radioName)
      const voteValue = Number(filter[0].vote)

      if (voteValue === radioValue) return true
      return false

    } catch(err) {
      console.log('handleConnectIngredientState 錯誤',err)
    }

  }



  return (
    <>
{/*
  <>
    <div>isHidden? {isVoteHidden ? 'yse' : 'no'}</div>
    <div className = { isVoteHidden ? 'hide': 'show'}>newVote? {isNewVote ? 'yse' : 'no'}</div>
    <div>材料 ({ingredientVote})</div>
    <div>spring ({springVote? 'y' : 'N'})</div>
    <div>fall ({fallVote? 'y' : 'N'})</div>
    <div>summer ({summerVote? 'y' : 'N'})</div>
    <div>Day ({dayVote ? 'y' : 'N'})</div>
    <div>gender ({genderVote})</div>
    <div>silage({silageVote})</div>
    <div>long({longevityVote})</div>
  </>
  */}

      <VoteWrapper className = { isVoteHidden ? 'hide' : 'show' } >
        <VoteCard>
          <session className ='top'>
            <CardTitle>快來告訴大家你的看法</CardTitle>
            <CloseButton onClick = { handleFinishButtonClick } >x</CloseButton>
          </session>

          <session className ='votes'>
            <SquareArea className ='recommend-vote'>
              <TitleWrapper>
                <Title>推薦的使用時機</Title>
              </TitleWrapper>
              <CheckboxContainer>
                {
                  recommendArr.map(res => {
                    let isChecked = handleName(res.id)
                    return (
                      <>
                      <label>
                        <input 
                          type = 'checkbox'
                          name = { res.id }
                          onChange = { handleCheckboxClick }
                          checked = { isChecked }
                        />
                        <RecommendSpan className = { isChecked ? 'checked': 'notChecked'} > { res.name } </RecommendSpan>
                      </label>
                      </>
                    )
                  })
                }
              </CheckboxContainer>
            </SquareArea>

            <SquareArea className ='ingredient-vote'>
              <TitleWrapper>
                <Title>味道的突顯程度</Title>
              </TitleWrapper>
              <SmallCardContainer>
                { ingredient.length !== 0 && ingredient.map(res => {
                    return (
                      <SmallCard key = { res }>
                        
                        <VoteIngredientName> { res } </VoteIngredientName>
                        <RadiosContainer>
                          { 
                            IngredientRadioArr.map(item => {
                             let isChecked = handleConnectIngredientState(ingredientVote, res, item.value )
                              return (
                                <RadioGroup className='radio-group'>
                                  <label>
                                    <input 
                                      type = 'radio' 
                                      value = { item.value } 
                                      name = { res }
                                      onChange = { handleRadioClick }
                                      checked = { isChecked }
                                    />
                                    <RadioSpan $isChecked = { isChecked } >{ item.name }</RadioSpan>
                                  </label>
                                </RadioGroup>
                              )
                            })
                          }
                        </RadiosContainer>
                      </SmallCard>
                    )
                  })
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

          </session>
          <BottomButton onClick = { handleFinishButtonClick } >投票並關閉</BottomButton>
        </VoteCard>
      </VoteWrapper>
    </>
  );
}
