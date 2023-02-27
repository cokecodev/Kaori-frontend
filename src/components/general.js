import styled from "styled-components"
import { COLOR } from "../constants/style"


export const WidthWrapper = styled.div`
  box-sizing: border-box;
  margin: 15px auto;
  max-width: 768px;
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
    color: white;
  }
` 

export const Error = styled.div`
  color: red;
  font-size: 15px;
  margin: 6px;
`

let TITLE_COLOR = 'rgba(0,0,0,0.4)'
export const PageDescribeTitle = styled.div`
  color: ${TITLE_COLOR};
  font-size: 1.5rem;
  font-weight: 600;
  padding-right: 5px;
 
  &:before {
    content:'';
    background: ${TITLE_COLOR};
    width: 10px;
    height: 1.5rem;
    display: inline-box;
  }
`

export const PageSubTitle = styled.p`
  color: gray;
  font-size: 1rem;
  margin-top: 1rem;
`

// 56px Header / 50px Footer / 100px Footer margin
export const GeneralPageWrapper = styled.div`
  min-height:calc(100vh - 56px - 50px - 100px);
`

// 56px Header / 50px Footer / 100px Footer margin / 15px ?margin
export const PerfumePageWrapper = styled.div`
  min-height:calc(100vh - 56px - 50px - 100px - 15px);
`

// 56px Header / 50px Footer / 100px Footer margin / 100px FloatCardWrapper margin
export const LoginPageWrapper = styled.div`
  height: calc(100vh - 56px - 50px - 200px);
`
