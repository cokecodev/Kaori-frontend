import styled from 'styled-components'
import { COLOR, MEDIA_QUERY } from '../../constants/style'
import { Button, WidthWrapper } from "../general"
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout, selectUser } from '../../features/userReducer'

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
  
  & .siteLogo a {
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
        <LeftPart className = 'left-part'>
          <span className = 'siteLogo'><Link to = '/'>Kaori</Link></span>
        </LeftPart>
      
        <RightPart className = 'right-part'>
          <span className = 'subNav'>
            <Link to = '/list/creator'>找調香師</Link>
            <Link to = '/list/perfume'>找香水</Link>
            <Link to = '/list/brand'>找品牌</Link>
          </span>

          { currentUser && <Button onClick = { handleLogoutClick } >登出</Button> }
          { !currentUser && <Link to = 'login'><Button>登入</Button></Link> }

        </RightPart>

      </Wrapper>
    </HeaderContainer>
  )
}
