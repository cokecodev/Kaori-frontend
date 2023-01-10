import styled from "styled-components"
import { BigCardWrapper } from '../../components/general'
import { MEDIA_QUERY } from '../../constants/style'
import { Link } from "react-router-dom"
import { useMemo } from "react"
import { recommendArr } from '../../constants/perfumeSetting'
import CreateRecommendItem from "./CreateRecommendItem"

const PerfumeCardWrapper = styled(BigCardWrapper)`
  display: flex;
  justify-content: space-between;
  font-family: '微軟正黑體';
`
const PerfumePhoto = styled.div`
  width: 375px;
  height: 500px;
  background: rgba(0,0,0,0.1);
  border: 1px solid rgba(0,0,0,0.1);

  ${MEDIA_QUERY.mobile} {
    width: 250px;
    height: 330px;
  }

  ${MEDIA_QUERY.middle_breakpoint} {
    width: 150px;
    height: 198px;
  }
`
const PerfumeInfo = styled.div`
  flex: 1;
  text-align: left;
  font-size: 20px;
`
const InfoWrapper = styled.div`
  margin: 3rem 0 0 3rem;
  height: 90%;
  position: relative;

  ${MEDIA_QUERY.mobile} {
    margin: 0 0 0 1.5rem;
    height: 100%;
  }
`
const BasicInfoContainer = styled.div`
  color: black;
`
const BrandName = styled.div`
  font-size: 1.5rem;

  ${MEDIA_QUERY.middle_breakpoint} {
    font-size: 1rem;
  }
`
const PerfumeName = styled.div`
  font-size: 2rem;
  margin: 1rem 0;

  ${MEDIA_QUERY.middle_breakpoint} {
    font-size: 1.2rem;
    margin: 0.5rem 0;
  }
`
const PerfumeGroup = styled.div`
  display: inline-flex;
  border: 1px solid rgba(0,0,0,0.1);
  font-size: 1.1rem;
  padding: 5px 10px;
  background: rgba(0,0,0,0.2);
  color: white;

  &:hover {
    cursor: pointer;
  }

  ${MEDIA_QUERY.middle_breakpoint} {
    font-size: 0.7rem;
    padding: 2.5px 5px;
  }
`
const CreatorName = styled.div`
  font-size: 1rem;
  margin: 1.2rem 0 0.5rem 0;

  ${MEDIA_QUERY.middle_breakpoint} {
    font-size: 0.5rem;
    margin: 0.5rem 0;
  }
`
const IngredientContainer = styled.div`
  ${MEDIA_QUERY.mobile} {
    display: flex;
    flex-wrap: wrap;
  }
`
const IngredientItem = styled.div`
  font-size: 1rem;
  color: rgba(0,0,0,0.5);
  margin: 2.5px 0;
  
  ${MEDIA_QUERY.mobile} {
    margin: 0;
    & + & { padding-left: 6px; }
  }

  ${MEDIA_QUERY.middle_breakpoint} {
    font-size: 0.5rem;
  }
`
const RecommendArea = styled.div`
  position: absolute;
  bottom: 0px;
  left: 0px;
  width: 75%;
  border: 1px solid rgba(0,0,0,0.1);
  font-size: 1rem;
  border-radius: 10px;
  padding: 10px;

  & .title {
    margin-bottom: 0px;
  }

  ${MEDIA_QUERY.middle_breakpoint} {
    display: flex;
    align-items: center;
    border: 0px;
    font-size: 0.5rem;
    width: 100%;
    padding: 10px 0px;

    & .title {
      display: none;
    }
  }
`
const Line = styled.div`
  border-bottom: 1.5px solid rgba(0,0,0,0.1);
  width: 100%;
  margin: 0.5rem 0 1rem 0;

  ${MEDIA_QUERY.middle_breakpoint} {
    display: none;
  }
`



const handleBooleanNumber = (string, arr) => {
  let keyArr = Object.keys(arr)
  let valueArr = Object.values(arr)
  let keyIndex = keyArr.indexOf(string)
  return valueArr[keyIndex]
}

const handleBooleanTotalVote = (obj) => {
  let totalVote = 0
  let tempArr = Object.values(obj)
  tempArr.map (res => totalVote += Number(res))
  return totalVote
}

const isActivePercentage = 25 //這是一個百分比的設定值，但是要填整數 !
const handleIsActive = (idString, voteDataObj, totalNumber) => {
  let isActive = false
  const currentNumber = handleBooleanNumber(idString, voteDataObj) // 想要讓外面 map 的資料放進來，可以查到 vote 的數字
  if(( currentNumber / totalNumber ) > ( isActivePercentage * 0.01 ) ) { 
    isActive = true
  }
  return isActive
}


export default function PerfumeBasicInfo({brand, perfume, creator, ingredient, booleanVoteData}) {
  const booleanTotalVote = useMemo(() => handleBooleanTotalVote(booleanVoteData), [booleanVoteData])

  return (
    <>
      <PerfumeCardWrapper>
      <PerfumePhoto>
        <div className='photoWrapper'>
          photo URL
        </div>
      </PerfumePhoto>
      
      <PerfumeInfo>  {/*這片要做錯誤處理，有perfume 的話才render */}
          <InfoWrapper className='info-wrapper'>
            <BasicInfoContainer className= 'basic-information remember-to-delete'>
              <BrandName className="brand-name"><Link>{ brand.brandName || "Le Labo" }</Link></BrandName>
              <PerfumeName className="perfume-name">{ perfume.perfumeName || "THe Nord29" }</PerfumeName>
              <PerfumeGroup className="perfume-group">{ perfume.group || '木質辣'}</PerfumeGroup>
              <CreatorName className='creator-name'><Link>調香師 : { creator.creatorName || 'Alberto Morillas'}</Link></CreatorName>
            </BasicInfoContainer>

            <IngredientContainer>
              { ingredient.length !==0 && ingredient.map(res => <IngredientItem key={res}> {res} </IngredientItem>) }
            </IngredientContainer>

            {/* TODO:　這邊裡面的版要重切 */}
            <RecommendArea>
              <div className='title'> 大家推薦的使用時機:</div>
              <Line/>

              { recommendArr.map(item => { return (
                  <CreateRecommendItem
                    key = { item.id }
                    item = { item }
                    handleIsActive = { handleIsActive }
                    booleanTotalVote = { booleanTotalVote }
                    booleanVoteData = { booleanVoteData } 
                  />
                )
                })              
              }

            </RecommendArea>
          </InfoWrapper>
      </PerfumeInfo>
      </PerfumeCardWrapper>
    </>
  )
}
