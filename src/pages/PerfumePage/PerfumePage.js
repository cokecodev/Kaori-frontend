import { useSelector } from 'react-redux'
import { selectIsLoading, selectFetchError } from '../../features/fetchStatusReducer'

import { PerfumePageWrapper } from '../../components/general'
import Comments from '../../components/Comments'
import PerfumeMain from '../../components/PerfumeMain'
import Loading from '../../components/Loading'


export default function PerfumePage() {
  const isLoading = useSelector(selectIsLoading)
  const fetchError = useSelector(selectFetchError)

  return (
    <>
      { isLoading === true && <Loading /> }
      <PerfumePageWrapper>
        <PerfumeMain />
        <Comments />
      </PerfumePageWrapper>
    </>
  )
}
