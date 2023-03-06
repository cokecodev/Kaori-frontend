import styled from 'styled-components'
import { Link } from 'react-router-dom'

import { WidthWrapper, PerfumePageWrapper } from '../../components/general'
import { LoginButton } from '../../components/Login/styleForComponent'

export default function Page404() {
  return (
    <PerfumePageWrapper>
      <WidthWrapper>
        <div>404!</div>
        <Link to = '/'><LoginButton>回首頁</LoginButton></Link>
      </WidthWrapper>
    </PerfumePageWrapper>
  )
}
