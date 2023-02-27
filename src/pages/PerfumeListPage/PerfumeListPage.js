import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllPerfume, selectPerfumeList } from '../../features/searchReducer'

import Banner from '../../components/Banner'
import HomePageCardsSection from '../../components/HomePageCardsSection'
import { PageDescribeTitle, GeneralPageWrapper } from '../../components/general'


export default function PerfumeListPage() {
  const perfumeList = useSelector(selectPerfumeList)
  const dispatch = useDispatch()
  
  useEffect(() => {
    return () => {
      dispatch(getAllPerfume())
    }
  }, []);


  return (
    <GeneralPageWrapper>
      <Banner
        imgName = { 'C' }
        titleColor = { 'white' }
        title = { '找尋屬於你的味道' }
        searchType = { 'perfume' }
      />

      <PageDescribeTitle> 香水列表 </PageDescribeTitle>

      { perfumeList.length !== 0 && <HomePageCardsSection perfumes = { perfumeList } /> }
    
    </GeneralPageWrapper>
  )
}
