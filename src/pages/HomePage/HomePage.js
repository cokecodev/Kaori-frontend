import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { toastConfig } from '../../constants/toastConfigs'
import { useSelector, useDispatch } from 'react-redux'
import { selectIsLoading, selectFetchError, setIsLoading, setFetchError } from '../../features/fetchStatusReducer'

import { getLatestFivePerfume } from '../../WebAPI'
import { COLOR } from '../../constants/style'
import { PageDescribeTitle, GeneralPageWrapper } from '../../components/general'
import Banner from '../../components/Banner'
import HomePageCardsSection from '../../components/HomePageCardsSection'
import Loading from '../../components/Loading'
import ErrorMessage from '../../components/ErrorMessage'

export default function HomePage() {
  const dispatch = useDispatch()
  const [perfumes, setPerfumes] = useState([])
  const isLoading = useSelector(selectIsLoading)
  const fetchError = useSelector(selectFetchError)

  const getLatestFiveFetch = () => {
    dispatch(setIsLoading(true))
    dispatch(setFetchError(null))

    getLatestFivePerfume()
      .then(res => {
        if(res.data.ok !== 1) toast.warn(res.data.message, toastConfig)
        setPerfumes(res.data.data)
        dispatch(setIsLoading(false))
      })
      .catch(err => {
        console.log('ERR:', err.message.toString())
        dispatch(setFetchError(err.message))
      })

  }

  useEffect(() => {
    getLatestFiveFetch()
  },[])

  return (
    <>
      { fetchError !== null && <ErrorMessage /> }
      { isLoading === true && <Loading /> }
      <GeneralPageWrapper>
        <Banner 
          title = 'Welcome to Kaori !'
          titleColor = { `${COLOR.text_light}` }
          imgName = 'J'
          searchType = 'perfume'
        />

        <PageDescribeTitle> 最新加入的五款香水 </PageDescribeTitle>
        
        { // perfume cards
          perfumes.length !== 0 && <HomePageCardsSection perfumes = { perfumes } />
        }
      </GeneralPageWrapper>
    </>
  )
}
