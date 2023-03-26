import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setIsLoading, setFetchError } from '../../features/fetchStatusReducer'

import { getPerfumeById } from '../../WebAPI'
import useGetVoteData from './useGetVoteData'

export default function useGetOnePerfume(perfumeId) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [perfume, setPerfume] = useState([])
  const [creator, setCreator] = useState([])
  const [brand, setBrand] = useState([])
  const [ingredient, setIngredient] = useState([])
  
  const {
    voteData,
    setVoteData,
    getVoteFetch,
    booleanVoteData,
    setBooleanVoteData,
    getBooleanVoteFetch
  } = useGetVoteData(perfumeId)



  const getPerfumeFetch = () => {
    dispatch(setIsLoading(true))
    dispatch(setFetchError(null))

    getPerfumeById(perfumeId)
    .then(res => {
      const perfumeData = res.data.data
      if (!perfumeData) navigate('/404')
      const handleIngredientDataForm = (perfumeData.ingredient).split(',')
      
      setPerfume(perfumeData)
      setCreator(perfumeData.Creator)
      setBrand(perfumeData.Brand)
      setIngredient(handleIngredientDataForm)
      dispatch(setIsLoading(false))
    })
    .catch(err => {
      console.log('ERR:', err.message.toString())
      dispatch(setFetchError(err.message))
    })
  }


  useEffect(() => {
    getPerfumeFetch()
  },[])

  return {
    perfume,
    setPerfume,
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