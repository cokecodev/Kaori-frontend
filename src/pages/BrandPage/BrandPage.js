import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectIsLoading, selectFetchError, setIsLoading, setFetchError } from '../../features/fetchStatusReducer'
import { toast } from 'react-toastify'
import { toastConfig } from '../../constants/toastConfigs'

import Loading from '../../components/Loading'
import Banner from '../../components/Banner'
import BrandInfoCard from '../../components/BrandInfoCard'
import HomePageCardsSection from '../../components/HomePageCardsSection'
import NoPerfumeMessage from '../../components/NoPerfumeMessage'
import { getPerfumeByBrandId, getBrandById } from '../../WebAPI'
import { GeneralPageWrapper } from '../../components/general'

export default function BrandPage() {
  const brandId = Number(useParams().id)
  const dispatch = useDispatch()
  const isLoading = useSelector(selectIsLoading)
  const fetchError = useSelector(selectFetchError)
  const [perfumes, setPerfumes] = useState([])
  const [brand, setBrand] = useState([])

  const getPerFumeByBrandFetch = () => {
    dispatch(setIsLoading(true))
    dispatch(setFetchError(null))

    getPerfumeByBrandId(brandId)
      .then(res => {
        if(res.data.ok !== 1) {
          dispatch(setIsLoading(false))
          return toast.warn(res.data.message, toastConfig)
        }
        setPerfumes(res.data.data)
        dispatch(setIsLoading(false))
      })
      .catch(err => {
        console.log('ERR', err.message.toString())
        dispatch(setFetchError(err.message))
      })
  }

  const getBrandByIdFetch = () => {
    dispatch(setIsLoading(true))
    dispatch(setFetchError(null))

    getBrandById(brandId)
      .then(res => {
        if(res.data.ok !== 1) {
          dispatch(setIsLoading(false))
          return toast.warn(res.data.message, toastConfig)
        }
        setBrand(res.data.data)
        dispatch(setIsLoading(false))
      })
      .catch(err => {
        console.log('ERR:', err.message.toString())
        dispatch(setFetchError(err.message))
      })
  }


  useEffect(() => {
    getPerFumeByBrandFetch()
    getBrandByIdFetch()
  },[])

  return (
    <>
      { isLoading === true && <Loading /> }
      <GeneralPageWrapper>
        <Banner
          imgName = { 'G' }
          title = { '與心儀的品牌相遇吧 !' }
          searchType = { 'brand' }
        />
        { brand.length !==0 && <BrandInfoCard brand = { brand } /> }
        
        { perfumes.length !== 0 && <HomePageCardsSection perfumes = { perfumes } /> }
        { perfumes.length === 0 && <NoPerfumeMessage message = { '目前還沒有相關的資料呦' } /> }
      </GeneralPageWrapper>
    </>
  )
}
