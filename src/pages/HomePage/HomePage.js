import Banner from "../../components/Banner"
import HomePageCardsSection from "../../components/HomePageCardsSection"

import { useEffect, useState } from "react"
import { getLatestFivePerfume } from '../../WebAPI'
import { COLOR } from '../../constants/style'
import { PageDescribeTitle } from '../../components/general'


export default function HomePage() {
  const [perfumes, setPerfumes] = useState([])
  const [fetchError, setFetchError] = useState(null)

  const getLatestFiveFetch = () => {
    setFetchError('')
    getLatestFivePerfume()
      .then(res => {
        setPerfumes(res.data.data)
      })
      .catch(err => {
        console.log('ERR',err.toString())
        setFetchError(err.message)
      })
  }

  useEffect(() => {
    getLatestFiveFetch()
  },[])

  return (
    <>
      <Banner 
        title = 'Welcome to Kaori !'
        titleColor = { `${COLOR.text_light}` }
        imgName = 'J'
        searchType = 'perfume'
      />

      <PageDescribeTitle> 最新加入的五款香水 </PageDescribeTitle>      
      
      { // perfume cards
        perfumes && perfumes.length !==0 &&<HomePageCardsSection perfumes = { perfumes } />
      }
    </>
  )
}
