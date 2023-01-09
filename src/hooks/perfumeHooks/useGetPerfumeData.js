import { useEffect, useState } from "react"
import { getPerfumeById } from '../../WebAPI'
import useGetVoteData from './useGetVoteData'

export default function useGetOnePerfume(perfumeId) {
  const [perfume, setPerfume] = useState([])
  //const [fetchError, setFetchError] = useState([])
  const [creator, setCreator] = useState([])
  const [brand, setBrand] = useState([])
  const [ingredient, setIngredient] = useState([])
  
  const {
    voteData,
    setVoteData,
    fetchError,
    setFetchError,
    getVoteFetch,
    booleanVoteData,
    setBooleanVoteData,
    getBooleanVoteFetch
  } = useGetVoteData(perfumeId)



  const getPerfumeFetch = () => {
    getPerfumeById(perfumeId)
    .then(res => {
      const perfumeData = res.data.data
      //const handleIngredientDataForm = JSON.parse(perfumeData.ingredient) // 原本["apple","apple1","apple3"] 的資料拿法
      const handleIngredientDataForm = (perfumeData.ingredient).split(',')
      
      setPerfume(perfumeData)
      setCreator(perfumeData.Creator)
      setBrand(perfumeData.Brand)
      setIngredient(handleIngredientDataForm)
    })
    .catch(err => {
      setFetchError(err.message)
    })
  }


  useEffect(() => {
    getPerfumeFetch()
  },[])

  return {
    perfume,
    setPerfume,
    fetchError,
    setFetchError,
    creator,
    setCreator,
    brand, 
    setBrand, 
    ingredient,
    setIngredient,
    voteData,
    setVoteData,
    getPerfumeFetch,
    getVoteFetch,
    booleanVoteData,
    setBooleanVoteData,
    getBooleanVoteFetch
  }

}