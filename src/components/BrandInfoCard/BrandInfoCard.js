import styled from "styled-components"
import { MEDIA_QUERY } from '../../constants/style'
import { DataArea, Author } from '../Comments/CommentItem'
import { BigCardWrapper } from "../general"

export const BrandCardWrapper = styled(BigCardWrapper)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0.5px 0 10px rgb(0, 0, 0, 0.08);
`
const BrandAvatar = styled.div`
  background: white;
  max-height: 150px;
  width: 150px;
  border-radius: 8px;
  display: flex;
  align-items: center;

  & .photo__url {
    width: 100%;
  }

  ${MEDIA_QUERY.mobile} {
    max-height: 100px;
    width: 100px;
  }
`
export const DataWrapper = styled.div`
  align-items: center;
`
export const CardTitle = styled(Author)`
  font-weight: 600;
`
export const CardIntro = styled.div`
  padding-top: 0.5rem;
`

export default function BrandInfoCard ({brand}) {

  return(
    <BrandCardWrapper>
      <BrandAvatar>
        { brand.length !==0 && (
          <img 
            className = 'photo__url'
            src = { require(`../Photo/Brand/${brand.brandName}.jpg`) }
          /> 
        )}
      </BrandAvatar>
      
      <DataArea>
        <DataWrapper>
          <CardTitle className = 'data__brand-name' >{ brand.brandName } </CardTitle>
          <CardIntro className = 'data__brand-intro'>{ brand.brandIntro } </CardIntro>
        </DataWrapper>
      </DataArea>
    </BrandCardWrapper>
  )
}
