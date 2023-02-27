import { PerfumePageWrapper } from '../../components/general'
import Comments from '../../components/Comments'
import PerfumeMain from '../../components/PerfumeMain'

export default function PerfumePage() {
  return (
    <PerfumePageWrapper>
      <PerfumeMain />
      <Comments />
    </PerfumePageWrapper>
  )
}
