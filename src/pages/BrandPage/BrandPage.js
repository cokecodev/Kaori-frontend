import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

import { getPerfumeByBrandId, getBrandById } from '../../WebAPI'
import { GeneralPageWrapper } from '../../components/general'
import Banner from '../../components/Banner'
import BrandInfoCard from '../../components/BrandInfoCard'
import HomePageCardsSection from '../../components/HomePageCardsSection'
import NoPerfumeMessage from '../../components/NoPerfumeMessage'


export default function BrandPage() {
  const brandId = Number(useParams().id)
  const [perfumes, setPerfumes] = useState([])
  const [brand, setBrand] = useState([])
  const [fetchError, setFetchError] = useState(null)

  const getPerFumeByBrandFetch = () => {
    setFetchError('')
    getPerfumeByBrandId(brandId)
      .then(res => {
        setPerfumes(res.data.data)
      })
      .catch(err => {
        console.log('ERR',err.toString())
        setFetchError(err.message)
      })
  }

  const getBrandByIdFetch = () => {
    setFetchError('')
    getBrandById(brandId)
      .then(res => {
        setBrand(res.data.data)
      })
      .catch(err => {
        console.log('ERR',err.toString())
        setFetchError(err.message)
      })
  }


  useEffect(() => {
    getPerFumeByBrandFetch()
    getBrandByIdFetch()
  },[])

  return (
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
  )
}
