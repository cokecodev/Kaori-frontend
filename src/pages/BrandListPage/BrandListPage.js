import styled from 'styled-components'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getAllBrand, selectBrandList } from '../../features/searchReducer'
import { selectIsLoading, selectFetchError } from '../../features/fetchStatusReducer'

import Loading from '../../components/Loading'
import Banner from '../../components/Banner'
import BrandInfoCard from '../../components/BrandInfoCard'
import { PageDescribeTitle, GeneralPageWrapper } from '../../components/general'

const TitleWithMargin = styled(PageDescribeTitle)`
  margin-bottom: 50px;
`

export default function BrandListPage() {
  const dispatch = useDispatch()
  const brandList = useSelector(selectBrandList)
  const isLoading = useSelector(selectIsLoading)
  const fetchError = useSelector(selectFetchError)
  
  useEffect(() => {
    dispatch(getAllBrand())
  }, [])


  return (
    <>
      { isLoading === true && <Loading /> }
      <GeneralPageWrapper>
        <Banner
          imgName = { 'C' }
          titleColor = { 'white' }
          title = { '與心儀的品牌相遇吧 !' }
          searchType = { 'brand' }
        />

        <TitleWithMargin> 品牌列表 </TitleWithMargin>

        { // brand cards
          brandList.length !== 0 && brandList.map( res => { 
            let path = `/brand/${res.id}`

            return (
              <Link to = { path } key = { res.id } >
                <BrandInfoCard 
                  brand = { res }
                />
              </Link>
            ) 
          })
        }

      </GeneralPageWrapper>
    </>
  )
}
