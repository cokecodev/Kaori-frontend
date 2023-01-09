import { useParams } from "react-router-dom"
import useGetOnePerfume from '../../hooks/perfumeHooks/useGetPerfumeData'
import PerfumeBasicInfo from './PerfumeBasicInfo'
import PerfumeShowVoteData from'./PerfumeShowVoteData'
import Vote from'../Vote'
import BlockPartition from '../BlockPartition'

import { useEffect, useState } from "react"
import { useSelector, useDispatch } from 'react-redux'
import { getMe, selectUser } from '../../features/userReducer'

export default function PerfumeMain() {
  const dispatch = useDispatch()
  const currentUser = useSelector(selectUser)
  const perfumeId = Number(useParams().id)
  const [isVoteHidden, setIsVoteHidden] = useState(true)
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
  
  useEffect(() => {
    if (currentUser) return
    dispatch(getMe())
    console.log('yo ')
  },[currentUser, dispatch])
  
  // TODO: render 問題
  //console.log('page perfumeMain',voteData)
  //console.log('currentUser', currentUser)

  const handleToggleHidden = () => {
    setIsVoteHidden(!isVoteHidden)
  }

  const handelOpenVoteAreaClick = () => {
    if(!currentUser) return alert('請先登入!')
    handleToggleHidden()
  }


  return (
    <>
    { currentUser !=='' && <Vote
        currentUser = { currentUser }
        ingredient = { ingredient }
        perfumeId = { perfumeId }
        isVoteHidden = { isVoteHidden }
        setIsVoteHidden = { setIsVoteHidden }
        handleToggleHidden = { handleToggleHidden }
      />
    }
      <PerfumeBasicInfo
        brand = { brand }
        perfume = { perfume }
        creator = { creator }
        ingredient = { ingredient }
        booleanVoteData = { booleanVoteData }
      />

      <BlockPartition 
        subtitle = {'投票去'} 
        handleClick = { handelOpenVoteAreaClick } 
      >
        VOTES
      </BlockPartition>

      <PerfumeShowVoteData
        voteData = { voteData }
        ingredient = { ingredient }
      />

    </>
  )
}
