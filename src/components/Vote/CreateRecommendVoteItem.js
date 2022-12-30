import styled from "styled-components"
import { Fragment } from 'react'

// 注意!這邊的 "active樣式" 是用 className 做管理，因為直接傳 props 進去會只會 render 第一次的值
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

export default function CreateRecommendVote({recommendArr, handleConnectBooleanState, handleCheckboxClick}) {
  return(
    recommendArr.map(res => {
      let isChecked = handleConnectBooleanState(res.id)
      return (
        <Fragment key = { res.id }>
          <label>
            <input 
              type = 'checkbox'
              name = { res.id }
              onChange = { handleCheckboxClick }
              checked = { isChecked }
            />
            <RecommendSpan className = { isChecked ? 'checked': 'notChecked'} > { res.name } </RecommendSpan>
          </label>
        </Fragment>
      )
    })
  )
}
