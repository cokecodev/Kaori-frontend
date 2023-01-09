import styled from "styled-components"
import { COLOR } from '../../constants/style' 

const SmallCard = styled.div`
  border: 1px solid rgba(0, 0, 0, 0.05);
  width: 300px;
  border-radius: 8px;
  padding: 8px 0;
`
const RadiosContainer = styled.div``
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

const VoteIngredientName = styled.div`
  font-size: 1.3rem;
  color: ${COLOR.color5};
  font-weight: bold;
  margin-bottom: 8px;
`


export default function CreateIngredientsVoteItem({ingredient, IngredientRadioArr, handleConnectIngredientState, ingredientVote, handleRadioClick }) {
  return( 
    ingredient.map(res => {
      return (
        <SmallCard key = { res }>

          <VoteIngredientName> { res } </VoteIngredientName>
          <RadiosContainer>
            { 
              IngredientRadioArr.map(item => {
              let isChecked = handleConnectIngredientState(ingredientVote, res, item.value )
                return (
                  <RadioGroup className ='radio-group' key = { item.value } >
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
  )
}
