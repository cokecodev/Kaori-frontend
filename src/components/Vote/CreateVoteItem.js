import styled from "styled-components"
import { COLOR } from '../../constants/style' 
import { handleItemNameTranslate} from '../../constants/perfumeSetting'

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
const VoteItem = styled.div`
  margin: 1rem;
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

export default function CreateVoteItem({arr, name, handleRadioClick, handleConnectRadioState }) {
  if (arr instanceof Array !== true) return console.log('Not arr ! from function CreateVoteItem')

  return(
    <>
      { arr.map(res => {
          const translate = handleItemNameTranslate(res)
          let isChecked = handleConnectRadioState(name, res)
          return(
            <VoteItem className ='vote-item' key = { res } >
              <label>
                <input
                  type ='radio'
                  value = { res }
                  name = { name }
                  onChange = { handleRadioClick }
                  checked = { isChecked }
                />
                { translate.describe ? <WithDescribe $isChecked = { isChecked } name = { translate.name } describe = { translate.describe } /> : <WithoutDescribe $isChecked = { isChecked } name = { translate.name } /> }
              </label>
            </VoteItem>
          )
        })
      }
    </>
  )
}
