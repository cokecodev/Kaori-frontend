import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export default function checkIsInputAllBlank(input) {
  const trim = (str) => { 
    return str.replace(/\s*/g,"")
  }
  
  if(trim(input).length === 0) return true

  return false
}

export function ScrollToTop() {
  const pathname = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}
