import { useParams } from 'react-router-dom'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { selectUser } from '../../features/userReducer'
import { toast } from 'react-toastify'
import { toastConfig } from '../../constants/toastConfigs'

import useGetOnePerfume from '../../hooks/perfumeHooks/useGetPerfumeData'
import PerfumeBasicInfo from './PerfumeBasicInfo'
import PerfumeShowVoteData from './PerfumeShowVoteData'
import Vote from '../Vote'
import BlockPartition from '../BlockPartition'


export default function PerfumeMain() {
  const currentUser = useSelector(selectUser)
  const perfumeId = Number(useParams().id)
  const [isVoteHidden, setIsVoteHidden] = useState(true)
  const {
    perfume,
    creator,
    brand,
    ingredient,
    voteData,
    booleanVoteData,
  } = useGetOnePerfume(perfumeId)

  const handleToggleHidden = () => {
    setIsVoteHidden(!isVoteHidden)
  }

  const handelOpenVoteAreaClick = () => {
    if(!currentUser) return toast.warn('請先登入!', toastConfig)
    handleToggleHidden()
  }


  return (
    <>
      { currentUser && (
        <Vote
          currentUser = { currentUser }
          ingredient = { ingredient }
          perfumeId = { perfumeId }
          isVoteHidden = { isVoteHidden }
          setIsVoteHidden = { setIsVoteHidden }
          handleToggleHidden = { handleToggleHidden }
        />
      )}

      { perfume.length !== 0 && (
        <PerfumeBasicInfo
          brand = { brand }
          perfume = { perfume }
          creator = { creator }
          ingredient = { ingredient }
          booleanVoteData = { booleanVoteData }
        />
      )}

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
