// function 處理材料 note 相關
const checkIsContain = (arr, string) => {
  let result = false
  arr.some(res => {
    if (res.includes(string)) { 
      result = true }
  })
  return result 
}

const handleStringSplit = (string, symbolString) => {
  let result = string.split(symbolString)
  return result[0]
}

const handleIngredientNote = (arr, targetString) => {
  if (checkIsContain(arr, targetString)){
    return arr.map( res => handleStringSplit(res, targetString))
  }
  return arr
}

// function totalValue
const handleTotalValue = (arr) => {
  if (arr instanceof Array !== true) return //console.log('Not arr ! from function handleTotalValue')
  let total = 0
  arr.map(res => {
    total += Number(res.totalVote) // 這邊跟傳回來的資料 key name 相關
  })
  return total
}

export {
  checkIsContain,
  handleStringSplit,
  handleIngredientNote,
  handleTotalValue
}