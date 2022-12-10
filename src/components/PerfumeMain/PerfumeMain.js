import { useParams } from "react-router-dom"
import useGetOnePerfume from '../../hooks/perfumeHooks/useGetPerfumeData'
import PerfumeBasicInfo from './PerfumeBasicInfo'
import PerfumeShowVoteData from'./PerfumeShowVoteData'

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
    getVoteFetch
  } = useGetOnePerfume(perfumeId)

  console.log('page perfume123',voteData)

  return (
    <>
      <PerfumeBasicInfo
        brand = { brand }
        perfume = { perfume }
        creator = { creator }
        ingredient = { ingredient }
        voteData = { voteData }
      />

      <PerfumeShowVoteData
        voteData = { voteData }
        ingredient = { ingredient }
      />

    </>
  );
 
}

