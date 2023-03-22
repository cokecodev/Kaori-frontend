import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getAllBrand, selectBrandList } from '../../features/searchReducer'
import { selectIsLoading, selectFetchError } from '../../features/fetchStatusReducer'

import ErrorMessage from '../../components/ErrorMessage'
import Loading from '../../components/Loading'
import Banner from '../../components/Banner'
import PageDescribeTitle from '../../components/PageDescribeTitle'
import BrandInfoCard from '../../components/BrandInfoCard'
import { GeneralPageWrapper } from '../../components/general'


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
      { fetchError !== null && <ErrorMessage />}
      { isLoading === true && <Loading /> }
      <GeneralPageWrapper>
        <Banner
          imgName = 'F'
          titleColor = 'white'
          title = '與心儀的品牌相遇吧 !'
          searchType = 'brand'
        />

        <PageDescribeTitle
          title = '品牌列表'
        />

        { // brand cards
          brandList.length !== 0 && brandList.map( res => { 
            let path = `/brand/${res.id}`

            return (
              <Link to = { path } key = { res.id }>
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
