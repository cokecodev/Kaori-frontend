import Banner from '../../components/Banner'
import BrandInfoCard from '../../components/BrandInfoCard'
import HomePageCardsSection from '../../components/HomePageCardsSection'

import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { getPerfumeByBrandId, getBrandById } from '../../WebAPI'


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
    <>
      <Banner
        imgName = { 'G' }
        title = { '與心儀的品牌相遇吧 !' }
        searchType = { 'brand' }
      />
      <BrandInfoCard brand = { brand } />
      <HomePageCardsSection perfumes = { perfumes } />
    </>
  )
}
