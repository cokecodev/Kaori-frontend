import styled from 'styled-components'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getAllCreator, selectCreatorList } from '../../features/searchReducer'

import Banner from '../../components/Banner'
import CreatorInfoCard from '../../components/CreatorInfoCard'
import { PageDescribeTitle, GeneralPageWrapper } from '../../components/general'

const TitleWithMargin = styled(PageDescribeTitle)`
  margin-bottom: 50px;
`

export default function BrandPage() {
  const creatorList = useSelector(selectCreatorList)
  const dispatch = useDispatch()
  
  useEffect(() => {
    dispatch(getAllCreator())
  }, [])


  return (
    <GeneralPageWrapper>
      <Banner
        imgName = { 'C' }
        titleColor = { 'white' }
        title = { '來探索同頻的調香師吧 !' }
        searchType = { 'creator' }
      />


      <TitleWithMargin> 調香師列表 </TitleWithMargin>
      
      { // creator cards
        creatorList.length !== 0 && creatorList.map( res => { 
          let path = `/creator/${res.id}`

          return (
            <Link to = { path } key = { res.id }>
              <CreatorInfoCard
                creator = { res } 
              />
            </Link>
          ) 
        })
      }

    </GeneralPageWrapper>
  )
}
