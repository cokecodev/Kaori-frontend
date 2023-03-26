import { useSelector } from 'react-redux'
import { selectIsLoading, selectFetchError } from '../../features/fetchStatusReducer'

import { LoginPageWrapper } from '../../components/general'
import Register from '../../components/Register'
import Loading from '../../components/Loading'
import ErrorMessage from '../../components/ErrorMessage'


export default function LoginPage() {
  const isLoading = useSelector(selectIsLoading)
  const fetchError = useSelector(selectFetchError)

  return (
    <>
      { fetchError !== null && <ErrorMessage /> }
      { isLoading === true && <Loading /> }
      <LoginPageWrapper>
        <Register/>
      </LoginPageWrapper>
    </>
  )
}
