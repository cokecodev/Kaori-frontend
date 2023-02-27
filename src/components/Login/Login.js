import { useNavigate, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { login, selectUser } from '../../features/userReducer'

import { FloatCardWrapper, PageTitle, InputWrapper, LinkWrapper, LoginButton } from './styleForComponent'
import useInputWithoutBlank from '../../hooks/useInputWithoutBlank'

export default function Login() {
  const {value: username, handleChange: handleUsernameChange} = useInputWithoutBlank()
  const {value: password, handleChange: handlePasswordChange} = useInputWithoutBlank()
  const currentUser = useSelector(selectUser)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  
  if(currentUser) {
    alert('現在是已登入狀態，若想切換使用者請先登出')
    return navigate('/')
  }
  

  const handleLoginSubmit = (e) => {
    e.preventDefault()
    if(!username || !password ) return alert('請完整填寫!')
    const payload = {
      username,
      password
    }

    dispatch(login(navigate, payload))
  }

  return (
    <FloatCardWrapper>
      <PageTitle>LOGIN</PageTitle>
      <form onSubmit = { handleLoginSubmit } >
        <InputWrapper className = 'username'>
          <input
            type = 'text'
            value = { username }
            onChange = { handleUsernameChange }
            placeholder = '帳號'
            />
        </InputWrapper>
        <InputWrapper className = 'password'>
          <input
            type = 'password'
            value = { password }
            onChange = { handlePasswordChange }
            placeholder = '密碼'
          />
        </InputWrapper>

        <LinkWrapper><Link to = '/register' >還沒有帳號? 前往註冊</Link></LinkWrapper>
        <LoginButton>登入</LoginButton>
      
      </form>
    </FloatCardWrapper>
  )
}
