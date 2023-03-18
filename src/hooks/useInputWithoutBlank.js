import { useState } from"react"

export default function useInputWithoutBlank() {
  const [value, setValue] = useState('')

  const handleRemoveSpace = (input) => {
    let noSpaceString = input.split(' ').join('')
    return noSpaceString
  }

  const handleChange = (e) => {
    setValue(handleRemoveSpace(e.target.value))
  }

  return {
    value,
    setValue,
    handleChange
  }
}
