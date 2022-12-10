import styled from "styled-components"
import { BigCardWrapper } from '../../components/general' 

import { COLOR } from '../../constants/style' 
import { Link } from "react-router-dom"

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
`
const PerfumeInfo = styled.div`
  flex: 1;
  text-align: left;
  font-size: 20px;
`
const InfoWrapper = styled.div`
  margin-top: 3rem;
  margin-left: 3rem;
  height: 90%;

  position: relative
`

const BasicInfoContainer = styled.div`
  color: black;
`
const BrandName = styled.div`
  font-size: 1.5rem;
`
const PerfumeName = styled.div`
  font-size: 2rem;
  margin: 1rem 0;
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
`

const CreatorName = styled.div`
  font-size: 1rem;
  margin: 1.2rem 0 0.5rem 0;
`
const IngredientContainer = styled.div``

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

`
const RecommendItem = styled.span`
  font-size: 1.15rem;
  font-weight: bold;
  color: rgba(0, 0, 0, 0.2);
  color: ${COLOR.color4};

  border: 1.5px solid ${COLOR.color4};
  border-radius: 1.15rem;
  padding: 3px 6px;

  &:active{
    color:${COLOR.color1};
    border: 1.5px solid ${COLOR.color1};
    border-radius: 1.15rem;
    padding: 3px 6px;
  }

  & + & {
    margin-left: 1rem;
  }
`
const IngredientItem = styled.div`
  font-size: 1rem;
  color: rgba(0,0,0,0.5);
`

const Line = styled.div`
  border-bottom: 1.5px solid rgba(0,0,0,0.1);
  width: 100%;
  margin: 0.5rem 0 1rem 0;
`



function CreateRecommendItem({item, handleIsActive, boi, booleanTotalVote}){
  let isActive = (handleIsActive((item.id), boi, booleanTotalVote))
   return(
    <>
    {
    isActive ? <RecommendItem id = { item.id }>{ item.name }</RecommendItem> : null
    }
    </>
  )
}


// TODO: 去後端新開API 把 voteData 的 boolean 單獨抽出來
export default function PerfumeBasicInfo({brand, perfume, creator, ingredient, voteData}) {

  const recommendArr = [
    {id:'spring', name:"春"}, 
    {id:'summer', name:"夏"},
    {id:'fall', name:"秋"},
    {id:'winter', name:"冬"},
    {id:'day', name:"日"},
    {id:'night', name:"夜"}
  ]

  // TODO: 新增 API 後記得把這邊改回來，相關參數也要記得改
    const boi = {
    day: 6,
    fall: 0,
    night: 6,
    spring: 6,
    summer: 2,
    winter: 3
  }


  const handleBooleanTotalVote = (obj) => {
    let totalVote = 0
    let tempArr = Object.values(obj)
    for( let i = 0; i < tempArr.length; i++ ) {
      totalVote += Number(tempArr[i])
    }
    return totalVote
  }

  const booleanTotalVote = handleBooleanTotalVote(boi)

  const handleBooleanNumber = (string, arr) => {
    let targetNumber = 0
    for(let i = 0; i < arr.length; i++) {
      if( arr[i][0] === string ){
        targetNumber = Number(arr[i][1])
        break
      }
    }
    return targetNumber
  }


  const isActivePercentage = 25 //這是一個百分比的設定值，但是要填整數 !
  const handleIsActive = (idString, voteDataObj, totalNumber) => {
    let isActive = false
    const VoteDataTransformForCount = Object.entries(voteDataObj) // voteDataObj 資料型式{spring:5, summer:6,...}
    const currentNumber = handleBooleanNumber(idString, VoteDataTransformForCount) // 想要讓外面 map 的資料放進來，可以查到 vote 的數字
    if(( currentNumber / totalNumber ) > ( isActivePercentage * 0.01 ) ) { isActive = true}
    return isActive
  }


  return (
    <>
      <PerfumeCardWrapper>
      <PerfumePhoto>
        <div className='photoWrapper'>
          photo URL
        </div>
      </PerfumePhoto>
      
      <PerfumeInfo>  {/*這片要做錯誤處理，有perfume 的話才render */}
          <InfoWrapper>
            <BasicInfoContainer className= 'basic-information remember-to-delete'>
              <BrandName className="brand-name"><Link>{ brand.brandName || "Le Labo" }</Link></BrandName>
              <PerfumeName className="perfume-name">{ perfume.perfumeName || "THe Nord29" }</PerfumeName>
              <PerfumeGroup className="perfume-group">{ perfume.group || '木質辣'}</PerfumeGroup>
              <CreatorName className='creator-name'><Link>調香師 : { creator.creatorName || 'Alberto Morillas'}</Link></CreatorName>
            </BasicInfoContainer>

            <IngredientContainer>
              { ingredient.length !==0 && ingredient.map(res => <IngredientItem> {res} </IngredientItem>) }
              
              { // 開發用
                ingredient.length ===0 && (
                <>
                  <IngredientItem>龍岩香 </IngredientItem>
                  <IngredientItem>鈺創木</IngredientItem>
                  <IngredientItem>布林</IngredientItem>
                </>
              )}
              
            </IngredientContainer>


            {/* TODO:　這邊裡面的版要重切 */}
            <RecommendArea>
              <div className='title'> 大家推薦的使用時機:</div>
              <Line/>

              { recommendArr.map(item => { return (
                  <CreateRecommendItem
                    item = { item }
                    handleIsActive = { handleIsActive }
                    booleanTotalVote = { booleanTotalVote }
                    boi = { boi } 
                  />
                )
                })              
              }

            </RecommendArea>
          </InfoWrapper>
      </PerfumeInfo>
      </PerfumeCardWrapper>
    </>
  );

}
