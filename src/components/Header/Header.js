import styled from 'styled-components'
import { COLOR } from '../../constants/style'
import { Button } from "../general"
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout, selectUser } from '../../features/userReducer'

const HeaderContainer = styled.div`
  background: ${COLOR.color2};
  align-items: center;
  padding: 8px 0;
`
const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 60px;
`
const LeftPart = styled.div`
  display: flex;
  align-items: baseline;
  color: #3b4446;
  
  & .siteLogo{
    font-size: 30px;
    color: #3b4446;
  }

  & .subNav {
    margin-left: 1.5rem;
    font-size: 0.85rem;
  }

  & .subNav span + span{
    margin-left: 10px;
  }

`

const RightPart = styled.div`
  align-items: center;

  & input {
    border-radius: 4px;
    outline: none;
    border: none;
    padding: 4px 0;

    ::placeholder { 
      color: #aeb6b8;
      font-size: 8px;
      padding-left: 8px;
    }
  }

`

const SpanLink = styled.a`
  color: gray;

  &:hover {
    color:red;
  }
`

export default function Header() {
  const currentUser = useSelector(selectUser)
  const dispatch = useDispatch()

  const handleLogoutClick = () => {
    dispatch(logout())
    // TODO: 成功訊息要顯示在哪?
    alert('登出成功')
  }

  return (
    <HeaderContainer>
      <Wrapper>
        <LeftPart>
          <span className='siteLogo'><Link to='/'>Kaori</Link></span>
          <div className='subNav'>
            <SpanLink>找香水</SpanLink>
            <SpanLink>找品牌</SpanLink>
          </div>
        </LeftPart>
      
        <RightPart>
          { /* TODO:這裡要做API搜尋的功能*/}
          <input name='search' placeholder='搜尋品牌或香水'/>

          { currentUser && <Button onClick = { handleLogoutClick } >登出</Button> }
          { !currentUser && <Link to='login'><Button>登入</Button></Link> }

        </RightPart>

      </Wrapper>
    </HeaderContainer>
  );
}
