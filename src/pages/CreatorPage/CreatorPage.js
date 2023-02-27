import Banner from '../../components/Banner'
import CreatorInfoCard from '../../components/CreatorInfoCard'
import HomePageCardsSection from '../../components/HomePageCardsSection'

import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { getPerfumeByCreatorId, getCreatorById } from '../../WebAPI'

export default function CreatorPage() {
  const creatorId = Number(useParams().id)
  const [perfumes, setPerfumes] = useState([])
  const [creator, setCreator] = useState([])
  const [fetchError, setFetchError] = useState(null)

  const getPerFumeByCreatorFetch = () => {
    setFetchError('')
    getPerfumeByCreatorId(creatorId)
      .then(res => {
        setPerfumes(res.data.data)
      })
      .catch(err => {
        console.log('ERR',err.toString())
        setFetchError(err.message)
      })
  }

  const getCreatorByIdFetch = () => {
    setFetchError('')
    getCreatorById(creatorId)
      .then(res => {
        setCreator(res.data.data)
      })
      .catch(err => {
        console.log('ERR',err.toString())
        setFetchError(err.message)
      })
  }

  useEffect(() => {
    getPerFumeByCreatorFetch()
    getCreatorByIdFetch()
  },[])

  return (
    <>
      <Banner
        imgName = { 'G' }
        title = { '來探索同頻的調香師吧 !' }
        searchType = { 'creator' }
      />
      <CreatorInfoCard creator = { creator } />
      <HomePageCardsSection perfumes = { perfumes } />
    </>
  )
}
