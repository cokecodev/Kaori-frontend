import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectIsLoading, selectFetchError, setIsLoading, setFetchError } from '../../features/fetchStatusReducer'
import { toast } from 'react-toastify'
import { toastConfig } from '../../constants/toastConfigs'

import ErrorMessage from '../../components/ErrorMessage'
import Loading from '../../components/Loading'
import Banner from '../../components/Banner'
import CreatorInfoCard from '../../components/CreatorInfoCard'
import HomePageCardsSection from '../../components/HomePageCardsSection'
import NoPerfumeMessage from '../../components/NoPerfumeMessage'
import { GeneralPageWrapper } from '../../components/general'
import { getPerfumeByCreatorId, getCreatorById } from '../../WebAPI'

export default function CreatorPage() {
  const creatorId = Number(useParams().id)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const isLoading = useSelector(selectIsLoading)
  const fetchError = useSelector(selectFetchError)
  const [perfumes, setPerfumes] = useState([])
  const [creator, setCreator] = useState([])

  const fetchWithCreatorId = (apiCall, dataSetter, navigate) => {
    dispatch(setIsLoading(true))
    dispatch(setFetchError(null))

    apiCall(creatorId)
      .then(res => {
        const result = res.data.data
        if(!result) navigate()
        if(res.data.ok !== 1) toast.warn(res.data.message, toastConfig)
        
        dataSetter(result)
        dispatch(setIsLoading(false))
      })
      .catch(err => {
        console.log('ERR:', err.message.toString())
        dispatch(setFetchError(err.message))
      })
  }

  const getPerFumeByCreatorFetch = () => fetchWithCreatorId(getPerfumeByCreatorId, setPerfumes, ()=>{})
  const getCreatorByIdFetch = () => fetchWithCreatorId(getCreatorById, setCreator, () => { navigate('/404') })

  useEffect(() => {
    getPerFumeByCreatorFetch()
    getCreatorByIdFetch()
  },[])

  return (
    <>
      { fetchError !== null && <ErrorMessage /> }
      { isLoading === true && <Loading /> }
      <GeneralPageWrapper>
        <Banner
          imgName = 'G'
          titleColor = 'white'
          title = '來探索同頻的調香師吧 !'
          searchType = 'creator'
        />
        { creator.length !== 0 && <CreatorInfoCard creator = { creator } /> }

        { perfumes.length !== 0 && <HomePageCardsSection perfumes = { perfumes } /> }
        { perfumes.length === 0 && <NoPerfumeMessage message = { '目前還沒有相關的資料呦' } /> }
      </GeneralPageWrapper>
    </>
  )
}
