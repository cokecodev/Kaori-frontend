import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectIsLoading, selectFetchError, setIsLoading, setFetchError } from '../../features/fetchStatusReducer'
import { toast } from 'react-toastify'
import { toastConfig } from '../../constants/toastConfigs'

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

  const getPerFumeByCreatorFetch = () => {
    dispatch(setIsLoading(true))
    dispatch(setFetchError(null))

    getPerfumeByCreatorId(creatorId)
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

  const getCreatorByIdFetch = () => {
    dispatch(setIsLoading(true))
    dispatch(setFetchError(null))

    getCreatorById(creatorId)
      .then(res => {
        const creatorData = res.data.data
        if(!creatorData) navigate('/404')
        if(res.data.ok !== 1) toast.warn(res.data.message, toastConfig)
        setCreator(res.data.data)
        dispatch(setIsLoading(false))
      })
      .catch(err => {
        console.log('ERR:',err.message.toString())
        dispatch(setFetchError(err.message))
      })
  }

  useEffect(() => {
    getPerFumeByCreatorFetch()
    getCreatorByIdFetch()
  },[])

  return (
    <>
      { isLoading === true && <Loading /> }
      <GeneralPageWrapper>
        <Banner
          imgName = { 'G' }
          title = { '來探索同頻的調香師吧 !' }
          searchType = { 'creator' }
        />
        { creator.length !== 0 && <CreatorInfoCard creator = { creator } /> }

        { perfumes.length !== 0 && <HomePageCardsSection perfumes = { perfumes } /> }
        { perfumes.length === 0 && <NoPerfumeMessage message = { '目前還沒有相關的資料呦' } /> }
      </GeneralPageWrapper>
    </>
  )
}
