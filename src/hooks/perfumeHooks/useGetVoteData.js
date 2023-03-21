import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setIsLoading, setFetchError, selectNewVoteFinished } from '../../features/fetchStatusReducer'
import { getVote, getVoteBoolean } from '../../WebAPI'

export default function useGetVoteData(perfumeId) {
  const dispatch = useDispatch()
  const [voteData, setVoteData] = useState([])
  const [booleanVoteData, setBooleanVoteData] = useState([])
  const newVoteFinished = useSelector(selectNewVoteFinished)

  const getVoteFetch = () => {
    dispatch(setIsLoading(true))
    dispatch(setFetchError(null))

    getVote(perfumeId)
      .then(res => {
        let voteResult = res.data.data[0]
        setVoteData(voteResult)
        dispatch(setIsLoading(false))
      })
      .catch(err => {
        console.log('ERR:', err.message.toString())
        dispatch(setFetchError(err.message))
      })
  }

  const getBooleanVoteFetch = () => {
    dispatch(setIsLoading(true))
    dispatch(setFetchError(null))

    getVoteBoolean(perfumeId)
      .then(res => {
        const result = (res.data.data[0])
        setBooleanVoteData(result)
        dispatch(setIsLoading(false))
      })
      .catch(err => {
        console.log('ERR:', err.message.toString())
        dispatch(setFetchError(err.message))
      })
  }

  useEffect(() => {
    getVoteFetch()
    getBooleanVoteFetch()
  },[newVoteFinished])

  return {
    voteData,
    setVoteData,
    getVoteFetch,
    booleanVoteData,
    setBooleanVoteData,
    getBooleanVoteFetch,
  }
}
