import styled from "styled-components"
import { COLOR } from "../../constants/style"

// 56px Header / 50 Footer / 200 margin
export const LoginPageWrapper = styled.div`
  height: calc(100vh - 56px - 50px - 200px);
`
export const FloatCardWrapper = styled.div`
  width: 300px;
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
`
export const PageTitle = styled.div`
  font-size: 40px;
  font-weight: 400;
  color: ${COLOR.text_dark};
  
  display: flex;
  justify-content: center;
  margin: 10px 0;
  padding-bottom: 20px;
`

export const InputWrapper = styled.div`
  margin: 0 auto;

  & input {
    width: 80%;
    padding: 8px; 
    margin-top: 28px;
    border-radius: 6px;
    border: 1px solid gray;
  }

  & input::placeholder {
    color: gray;
    padding: 4px;
  }
`
export const LinkWrapper = styled.div`
  margin-top: 30px;
  
  & a {
    font-weight: 550;
  }
`
export const LoginButton = styled.button`
  margin: 30px 0;
  width: 85%;
  padding: 10px 0;
  background: white;
  color:${COLOR.color2};
  border: 1px solid  ${COLOR.color2};
  border-radius: 10px;
  transition: all 0.3s;

  &:hover {
    background: ${COLOR.color3};
    color: white;
  }
`
