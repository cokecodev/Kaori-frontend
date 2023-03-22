import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllPerfume, selectPerfumeList } from '../../features/searchReducer'
import { selectIsLoading, selectFetchError } from '../../features/fetchStatusReducer'

import ErrorMessage from '../../components/ErrorMessage'
import Loading from '../../components/Loading'
import Banner from '../../components/Banner'
import HomePageCardsSection from '../../components/HomePageCardsSection'
import { PageDescribeTitle, GeneralPageWrapper } from '../../components/general'


export default function PerfumeListPage() {
  const dispatch = useDispatch()
  const perfumeList = useSelector(selectPerfumeList)
  const isLoading = useSelector(selectIsLoading)
  const fetchError = useSelector(selectFetchError)
  
  useEffect(() => {
    return () => {
      dispatch(getAllPerfume())
    }
  }, [])

  return (
    <>
      { fetchError !== null && <ErrorMessage /> }
      { isLoading === true && <Loading /> }
      <GeneralPageWrapper>
        <Banner
          imgName = 'C'
          titleColor = 'white'
          title = '找尋屬於你的味道'
          searchType = 'perfume'
        />

        <PageDescribeTitle> 香水列表 </PageDescribeTitle>

        { perfumeList.length !== 0 && <HomePageCardsSection perfumes = { perfumeList } /> }
      
      </GeneralPageWrapper>
    </>
  )
}
