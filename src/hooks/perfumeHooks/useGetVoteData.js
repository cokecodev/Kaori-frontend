import { useEffect, useState } from "react"
import { getVote, getVoteBoolean } from '../../WebAPI'

export default function useGetVoteData(perfumeId) {
  const [fetchError, setFetchError] = useState([])
  const [voteData, setVoteData] = useState([])
  const [booleanVoteData, setBooleanVoteData] = useState([])


  const getVoteFetch = () => {
    getVote(perfumeId)
      .then(res => {
        let voteResult = res.data.data[0]
        console.log('vote Hook RES', voteResult)
        setVoteData(voteResult)
      })
      .catch(err => {
        setFetchError(err.message)
      })
  }

  const getBooleanVoteFetch = () => {
    getVoteBoolean(perfumeId)
      .then(res => {
        const result = (res.data.data[0])
        setBooleanVoteData(result)
      })
      .catch(err => {
        setFetchError(err.message)
      })
  }

  useEffect(() => {
    getVoteFetch()
    getBooleanVoteFetch()
  },[])

  return {
    voteData,
    setVoteData,
    fetchError,
    setFetchError,
    getVoteFetch,
    booleanVoteData,
    setBooleanVoteData,
    getBooleanVoteFetch,
  }
}
