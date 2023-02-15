export default function checkIsInputAllBlank(input) {
  const trim = (str) => { 
    return str.replace(/\s*/g,"")
  }
  
  if(trim(input).length === 0) return true

  return false
}
