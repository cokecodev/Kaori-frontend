import styled from "styled-components"
import { COLOR } from "../../constants/style"

import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { login, selectUser } from "../../features/userReducer"
import useInput from '../../hooks/useInput'

const Wrapper = styled.div`
  width: 300px;
  height: 300px;
  margin: 100px auto;
  padding: 30px;
  transition: all 0.5s;

  &:hover {
    border: 1px solid ${COLOR.color3};
    border-radius: 24px;
    box-shadow: 4px 4px #ebeade;
    background: white;
  }

  & form {
    margin: 0 auto;
    text-align: center;
  }

  & button {
    margin: 50px 0;
    width: 85%;
    padding: 10px 0;
    background: white;
    color:${COLOR.color2};
    border: 1px solid  ${COLOR.color2};
    border-radius: 10px;
  }

  & button:hover {
    background: ${COLOR.color3};
    color:white;
  }
`
const InputItem = styled.div`
  margin: 0 auto;

  & input {
    padding: 6px 0; 
    margin: 28px 0  0 8px  ;
    border-radius: 4px;
    border: 1px solid gray;
  }
`
const PageTitle = styled.div`
  font-size: 40px;
  font-weight: 400;
  color: ${COLOR.text_dark};
  
  display: flex;
  justify-content: center;
  margin: 10px 0;
  padding-bottom: 24px;
`


export default function Login() {
  const {value: username, handleChange: handleUsernameChange} = useInput()
  const {value: password, handleChange: handlePasswordChange} = useInput()
  const currentUser = useSelector(selectUser)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  
  if(currentUser) {
    alert('現在是已登入狀態，若想切換使用者請先登出')
    return navigate('/')
  }
  

  const handleLoginSubmit = (e) => {
    e.preventDefault()
    const payload = {
      username,
      password
    }
    dispatch(login(payload))
    return navigate(-1)
  }

  return (
    <Wrapper>
      <PageTitle> LOGIN</PageTitle>
      <form onSubmit={handleLoginSubmit} >
        <InputItem>
          Username:
          <input type='text' value={username} onChange={handleUsernameChange } />
        </InputItem>
        <InputItem>
          Password: 
          <input type='password' value={password} onChange={handlePasswordChange } />
        </InputItem>
          { /*
            errorMessage && <Error>{errorMessage}</Error>
          */}
          <button>登入</button>
      </form>
    </Wrapper>
  );
}
