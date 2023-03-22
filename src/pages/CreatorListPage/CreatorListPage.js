import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getAllCreator, selectCreatorList } from '../../features/searchReducer'
import { selectIsLoading, selectFetchError } from '../../features/fetchStatusReducer'

import ErrorMessage from '../../components/ErrorMessage'
import Loading from '../../components/Loading'
import Banner from '../../components/Banner'
import PageDescribeTitle from '../../components/PageDescribeTitle'
import CreatorInfoCard from '../../components/CreatorInfoCard'
import { GeneralPageWrapper } from '../../components/general'


export default function BrandPage() {
  const dispatch = useDispatch()
  const creatorList = useSelector(selectCreatorList)
  const isLoading = useSelector(selectIsLoading)
  const fetchError = useSelector(selectFetchError)
  
  useEffect(() => {
    dispatch(getAllCreator())
  }, [])


  return (
    <>
      { fetchError !== null && <ErrorMessage /> }
      { isLoading === true && <Loading /> }
      <GeneralPageWrapper>
        <Banner
          imgName = 'C'
          titleColor = 'white'
          title = '來探索同頻的調香師吧 !'
          searchType = 'creator'
        />

        <PageDescribeTitle
          title = '調香師列表'
        />
        
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
    </>
  )
}
