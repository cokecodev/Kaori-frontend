import { useParams } from "react-router-dom"
import useGetOnePerfume from '../../hooks/perfumeHooks/useGetPerfumeData'
import PerfumeBasicInfo from './PerfumeBasicInfo'
import PerfumeShowVoteData from'./PerfumeShowVoteData'
import { useEffect, useMemo } from "react"

export default function PerfumeMain() {
  const perfumeId = Number(useParams().id)
  const {
    perfume,
    fetchError,
    creator,
    brand, 
    ingredient,
    voteData,
    getPerfumeFetch,
    getVoteFetch,
    booleanVoteData,
    getBooleanVoteFetch,
  } = useGetOnePerfume(perfumeId)

  console.log('page perfumeMain',voteData)

  return (
    <>
      <PerfumeBasicInfo
        brand = { brand }
        perfume = { perfume }
        creator = { creator }
        ingredient = { ingredient }
        booleanVoteData = { booleanVoteData }
      />

      <PerfumeShowVoteData
        voteData = { voteData }
        ingredient = { ingredient }
      />

    </>
  );
 
}
