import styled from 'styled-components'
import { useNavigate, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { selectUser, register } from '../../features/userReducer'
import { toast } from 'react-toastify'
import { toastConfig } from '../../constants/toastConfigs'

import { FloatCardWrapper, PageTitle, InputWrapper, LinkWrapper, LoginButton } from '../Login/styleForComponent'
import useInputWithoutBlank from '../../hooks/useInputWithoutBlank'

const SignUpButton = styled(LoginButton)``


export default function Register() {
  const { value: RegisterUsername, handleChange: handleRegisterUsernameChange} = useInputWithoutBlank()
  const { value: RegisterNickname, handleChange: handleRegisterNicknameChange} = useInputWithoutBlank()
  const { value: RegisterPassword, handleChange: handleRegisterPasswordChange} = useInputWithoutBlank()
  const currentUser = useSelector(selectUser)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleRegisterSubmit = (e) => {
    e.preventDefault()
    if(currentUser) {
      navigate('/')
      return toast.warn('若想切換使用者請先登出~', toastConfig)
    }
    if(!RegisterUsername || !RegisterPassword || !RegisterNickname ) return toast.warn('欄位請填好填滿~', toastConfig)
    const payload = {
      username: RegisterUsername,
      password: RegisterPassword,
      nickname: RegisterNickname
    }

    dispatch(register(navigate, payload))
  }

  return (
    <>
      <FloatCardWrapper>
        <PageTitle>REGISTER</PageTitle>
        <form onSubmit = { handleRegisterSubmit } >

          <InputWrapper className = 'username'>
            <input
              type = 'text'
              value = { RegisterUsername }
              onChange = { handleRegisterUsernameChange }
              placeholder = '帳號'
            />
          </InputWrapper>

          <InputWrapper className = 'nickname'>
            <input 
              type = 'text'
              value = { RegisterNickname }
              onChange = { handleRegisterNicknameChange }
              placeholder = '暱稱，想讓大家怎麼稱呼你 ?'
            />
          </InputWrapper>

          <InputWrapper className = 'password'>
            <input
              type = 'password'
              value = { RegisterPassword }
              onChange = { handleRegisterPasswordChange }
              placeholder = '密碼'
            />
          </InputWrapper>
            
          <LinkWrapper><Link to = '/login'>已經有帳號? 前往登入</Link></LinkWrapper>
          <SignUpButton>註冊</SignUpButton>

        </form>
      </FloatCardWrapper>
    </>
  )
}
