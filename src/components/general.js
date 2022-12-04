import styled from "styled-components"
import { COLOR } from "../constants/style"


export const WidthWrapper = styled.div`
  box-sizing: border-box;
  margin: 15px auto;
  max-width: 800px;
  min-width: 300px;
`

export const BigCardWrapper = styled(WidthWrapper)`
  border: 1px solid rgba(0,0,0,0.1);
  padding: 20px;
  border-radius: 15px;
`

export const Button = styled.button`
  background: white;
  padding: 3px 10px;
  border-radius: 5px;
  color: ${COLOR.color4};
  border: 1px solid ${COLOR.color4};
  transition: all 0.1s;

  &:hover {
    background: ${COLOR.color4};
    border: 1px solid ${COLOR.color4};
    color: white;
  }
` 

export const Error = styled.div`
  color: red;
  font-size: 15px;
  margin: 6px;
`