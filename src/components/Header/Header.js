import styled from 'styled-components'
import { useLocation } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout, selectUser } from '../../features/userReducer'

import { COLOR, MEDIA_QUERY } from '../../constants/style'
import { Button, WidthWrapper } from '../general'


const HeaderContainer = styled.div`
  background: ${COLOR.color2};
  align-items: center;
  padding: 8px 0;
`
const Wrapper = styled(WidthWrapper)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 15px;
  margin: 0 auto;

  ${MEDIA_QUERY.middle_breakpoint} {
    padding: 0 30px;
  }
`
const LeftPart = styled.div`
  display: flex;
  align-items: baseline;
  
  & .logo a {
    font-size: 30px;
    color: #3b4446;
  }
`
const RightPart = styled.div`
  align-items: center;

  & span {
    font-size: 0.85rem;
    margin-right: 1rem;

    ${MEDIA_QUERY.middle_breakpoint} {
      margin-right: 8px;
    }

    & a {
      color: ${COLOR.color1};
      margin-right: 5px;
      padding-bottom: 6px;
      border-bottom: 1px solid ${COLOR.color2};
    
      &:hover {
        color: white;
      }
    }

    & a + a {
      margin-left: 8px;
  
      ${MEDIA_QUERY.middle_breakpoint} {
        margin-left: 4px;
      }
    }

    & a:hover {
      border-bottom: 1px solid ${COLOR.color1};
      transition: all 0.5s;
    }
  }
`

export default function Header() {
  const path = useLocation().pathname
  const currentUser = useSelector(selectUser)
  const dispatch = useDispatch()

  const handleLogoutClick = () => {
    dispatch(logout())
    alert('登出成功')
  }

  return (
    <HeaderContainer>
      <Wrapper>
        <LeftPart className = 'left-part'>
          <span className = 'logo'><Link to = '/'>Kaori</Link></span>
        </LeftPart>
      
        <RightPart className = 'right-part'>
          <span className = 'subNav'>
              { path !== '/list/creator' && <Link to = '/list/creator'>找調香師</Link> }
              { path !== '/list/perfume' && <Link to = '/list/perfume'>找香水</Link> }
              { path !== '/list/brand' &&  <Link to = '/list/brand'>找品牌</Link> }
          </span>

          { currentUser && <Button onClick = { handleLogoutClick } >登出</Button> }
          { !currentUser && <Link to = 'login'><Button>登入</Button></Link> }

        </RightPart>

      </Wrapper>
    </HeaderContainer>
  )
}
