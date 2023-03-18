import { useNavigate, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { login, selectUser } from '../../features/userReducer'
import { toast } from 'react-toastify'
import { toastConfig } from '../../constants/toastConfigs'

import { FloatCardWrapper, PageTitle, InputWrapper, LinkWrapper, LoginButton } from './styleForComponent'
import useInputWithoutBlank from '../../hooks/useInputWithoutBlank'


export default function Login() {
  const {value: username, handleChange: handleUsernameChange} = useInputWithoutBlank()
  const {value: password, handleChange: handlePasswordChange} = useInputWithoutBlank()
  const currentUser = useSelector(selectUser)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  

  const handleLoginSubmit = (e) => {
    e.preventDefault()
    if(currentUser) {
      navigate('/')
      return toast.warn('若想切換使用者請先登出~', toastConfig)
    }

    if(!username || !password ) return toast.warn('欄位請填好填滿~', toastConfig)
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
