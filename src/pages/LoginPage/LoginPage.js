import { useSelector } from 'react-redux'
import { selectIsLoading, selectFetchError } from '../../features/fetchStatusReducer'

import { LoginPageWrapper } from '../../components/general'
import Login from '../../components/Login'
import Loading from '../../components/Loading'

export default function LoginPage() {
  const isLoading = useSelector(selectIsLoading)
  const fetchError = useSelector(selectFetchError)

  return (
    <>
      { isLoading === true && <Loading /> }
      <LoginPageWrapper>
        <Login/>
      </LoginPageWrapper>
    </>
  )
}
