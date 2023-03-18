import styled from "styled-components"
import { COLOR, MEDIA_QUERY } from '../../constants/style'
import { BrandCardWrapper, DataWrapper, CardTitle, CardIntro } from '../BrandInfoCard/BrandInfoCard'
import { DataArea } from '../Comments/CommentItem'

const CreatorAvatar = styled.div`
  background: rgb(0, 0, 0, 0.1);
  height: 150px;
  width: 150px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  overflow: hidden;

  & img {
    width: 100%;
  }

  ${MEDIA_QUERY.mobile} {
    height: 100px;
    width: 100px;
  }
`

const CardSubTitle = styled.div`
  color: ${COLOR.gray_light};
  margin-top: 4px;
`

export default function BrandInfoCard ({creator}) {

  return(
    <BrandCardWrapper>
      <CreatorAvatar>
        { creator.length !==0 && (
          <img 
            className = 'photo__url'
            src = { require(`../Photo/Creator/${creator.creatorName}.jpg`) }
          /> 
        )}
      </CreatorAvatar>
      
      <DataArea>
        <DataWrapper>
          <CardTitle className = 'data__creator-name'>{ creator.creatorName }</CardTitle>
          <CardSubTitle className = 'data__creator-nationality'> { creator.nationality }</CardSubTitle>
          <CardIntro className = 'data__creator-intro'>{ creator.creatorIntro } </CardIntro>
        </DataWrapper>
      </DataArea>
    </BrandCardWrapper>
  )
}
