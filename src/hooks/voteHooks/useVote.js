import { useEffect, useState } from "react"
import { getVoteByUserId, VoteForPerfume } from '../../WebAPI'

export default function useVote(perfumeId, currentUser, handleToggleHidden) {
  const [voteFetchError, setVoteFetchError] = useState([])
  const [ingredientVote, setIngredientVote] = useState([])
  const [longevityVote, setLongevityVote] = useState([])
  const [genderVote, setGenderVote] = useState([])
  const [silageVote, setSilageVote] = useState([])
  const [springVote, setSpringVote] = useState(false)
  const [summerVote, setSummerVote] = useState(false)
  const [fallVote, setFallVote] = useState(false)
  const [winterVote, setWinterVote] = useState(false)
  const [dayVote, setDayVote] = useState(false)
  const [nightVote, setNightVote] = useState(false)
  const [isNewVote, setIsNewVote] = useState(false)
  
  useEffect(() => {
    if(!currentUser) return

    setVoteFetchError(null)
    getVoteByUserId(perfumeId)
      .then(res => {
        const voteData = res.data.data
        //console.log('userVoteData', voteData)
        setGenderVote(voteData.gender)
        setSilageVote(voteData.silage)
        setLongevityVote(voteData.longevity)
        setIngredientVote(voteData.ingredient)
        setSpringVote(voteData.spring)
        setSummerVote(voteData.summer)
        setFallVote(voteData.fall)
        setWinterVote(voteData.winter)
        setDayVote(voteData.day)
        setNightVote(voteData.night)
        
      })
      .catch(err => {
        console.log('get old vote ERR !', err.message)
        setVoteFetchError(err.message)
      })
  },[currentUser, perfumeId])


  // ----- function 們 -----
  const handleFinishButtonClick = (e) => {
    if (isNewVote === false) { return handleToggleHidden() }
    const inputVoteObj = handleVoteObj()

    VoteForPerfume(perfumeId, inputVoteObj)
      .then(res => {
        // 投票失敗的話
        if(res.data.ok === 0) {
          // TODO: 錯誤處理顯示位置
          alert(res.data.message)
          return 
        }

        // 投票成功
        setIsNewVote(false)
      })
      .catch(err => {
        console.log('ERR', err.toString())
        setVoteFetchError(err.message)
      })
    
    handleToggleHidden()
  }

  const handleRadioClick = (e) => {
    const target = e.target
    setIsNewVote(true)

    switch(target.name) {
      case 'gender': {
        setGenderVote(target.value)    
        break
      }
      case 'longevity': {
        setLongevityVote(target.value)
        break
      }
      case 'silage': {
        setSilageVote(target.value)
        break
      }
      default: {
        // ingredient 用
        let obj = {
          name: target.name,
          vote: Number(target.value)
        }
        // ingredientVote 是字串!
        const temArr = JSON.parse(ingredientVote)
        const filter = temArr.filter(res => res.name !== target.name)
        const newArr = [...filter, obj]
        const payload = JSON.stringify(newArr)
        setIngredientVote(payload)
        break
      }
    }
  }

  const handleCheckboxClick = (e) => {
    const target = e.target
    const isChecked = e.target.checked
    setIsNewVote(true)

    switch(target.name) {
      case 'spring': {
        setSpringVote(isChecked)
        break
      }
      case 'summer': {
        setSummerVote(isChecked)
        break
      }
      case 'fall':{
        setFallVote(isChecked)
        break
      }
      case 'winter': {
        setWinterVote(isChecked)
        break
      }
      case 'day': {
        setDayVote(isChecked)
        break
      }
      case 'night': {
        setNightVote(isChecked)
        break
      }

      default: {
        setIsNewVote(false)
        break
      }
    }
  }

  const handleVoteObj = () => {
    let voteObj = {
      spring: springVote,
      summer: summerVote,
      fall: fallVote,
      winter: winterVote,
      day: dayVote,
      night: nightVote,
      gender: genderVote,
      longevity: longevityVote,
      silage: silageVote,
      ingredient: ingredientVote,
    }

    return voteObj
  }

  const handleConnectBooleanState = (name) => {
    switch(name) {
      case 'spring': {
        return springVote
      }
      case 'summer': {
        return summerVote
      }
      case 'fall': {
        return fallVote
      }
      case 'winter': {
        return winterVote
      }
      case 'day': {
        return dayVote
      }
      case 'night': {
        return nightVote
      }

      default: {
        break
      }
    }
  }

  const handleConnectRadioState = (name, value) => {
    let currentName 
    switch (name) {
      case 'gender': {
        currentName = genderVote
        break
      }
      case 'longevity': {
        currentName = longevityVote
        break
      }
      case 'silage': {
        currentName = silageVote
        break
      }
      default: { 
        break
      }
    }

    if (currentName === value) return true
    return false
  }
 
  const handleConnectIngredientState = (voteData, radioName, radioValue) => {
    try {
      if(voteData.length === 0) return
      const temArr = JSON.parse(voteData)
      const filter = temArr.filter(res => res.name === radioName)
      const voteValue = Number(filter[0].vote)

      if (voteValue === radioValue) return true
      return false

    } catch(err) {
      console.log('handleConnectIngredientState 錯誤',err)
    }

  }

  
  return {
    voteFetchError,
    setVoteFetchError,
    ingredientVote,
    setIngredientVote,
    longevityVote,
    setLongevityVote,
    genderVote,
    setGenderVote,
    silageVote,
    setSilageVote,
    springVote,
    setSpringVote,
    summerVote,
    setSummerVote,
    fallVote,
    setFallVote,
    winterVote,
    setWinterVote,
    dayVote,
    setDayVote,
    nightVote,
    setNightVote,
    isNewVote,
    setIsNewVote,
    handleFinishButtonClick,
    handleRadioClick,
    handleCheckboxClick,
    handleVoteObj,
    handleConnectBooleanState,
    handleConnectRadioState,
    handleConnectIngredientState
  }
}
