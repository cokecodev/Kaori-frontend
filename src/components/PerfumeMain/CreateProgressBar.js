import styled from "styled-components"
import { COLOR } from '../../constants/style' 

import { handleItemNameTranslate } from '../../constants/perfumeSetting'

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
const Left = styled.div`
  min-width: 60px;
`
const Right = styled.div`
  text-align: left;
  width: 220px;
  margin-left: 1rem;
`


export default function CreateProgressBar ({arr, data, total}) {
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
          console.log('render progressBar 666')
          currentNumber = 0
          handelCurrentVoteNumber(res, data)
          const translate = handleItemNameTranslate(res)

          return (
              <DataItem key = { res } describe = { translate.describe|| null } className='data-item'>
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
                <span>{ currentNumber }</span>
              </Right>
            </DataItem>
          )
        })
      }
    </>
  )

}
