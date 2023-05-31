import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { toastConfig } from '../../constants/toastConfigs'
import { useSelector, useDispatch } from 'react-redux'
import { selectIsLoading, selectFetchError, setIsLoading, setFetchError } from '../../features/fetchStatusReducer'

import { getAllPerfume } from '../../WebAPI'
import { GeneralPageWrapper } from '../../components/general'
import Banner from '../../components/Banner'
import Loading from '../../components/Loading'
import ErrorMessage from '../../components/ErrorMessage'
import PromoteBlock from '../../components/PromoteBlock/PropmoteBlock'

export default function HomePage() {
  const dispatch = useDispatch()
  const [perfumes, setPerfumes] = useState([])
  const isLoading = useSelector(selectIsLoading)
  const fetchError = useSelector(selectFetchError)

  const getPerfumeFetch = () => {
    dispatch(setIsLoading(true))
    dispatch(setFetchError(null))

    getAllPerfume()
      .then(res => {
        if(res.data.ok !== 1) toast.warn(res.data.message, toastConfig)
        setPerfumes(res.data.data)
        dispatch(setIsLoading(false))
      })
      .catch(err => {
        console.log('ERR:', err.message.toString())
        dispatch(setFetchError(err.message))
      })

  }

  useEffect(() => {
    getPerfumeFetch()
  },[])

  return (
    <>
      { fetchError !== null && <ErrorMessage /> }
      { isLoading === true && <Loading /> }
      <GeneralPageWrapper>
        <Banner 
          title = 'Welcome to Kaori !'
          titleColor = 'white'
          imgName = 'A'
          searchType = 'perfume'
        />

        <PromoteBlock
          ClassName ='latest3'
          imgName ='1'
          title ='給喜歡新鮮感的你'
          context ='為您展示本平台最新上架的香水們，隆底家辣！快來加入我們討論的行列，不管是文青木質調、費洛蒙菸草調還是清新青草調，都在等你來探索！'
          perfumes = { perfumes?.slice(-3) }
        />
        
        <PromoteBlock
          className ='石內卜推薦'
          imgName ='2'
          title ='給喜歡探險的你'
          context ='才華洋溢的石內卜教授，日前盛大推出的新品們！在魔藥學領域有極高的造詣，擅長使用各種特殊的材料，創造出麻瓜界前所未見的奇妙味道。'
          perfumes = { perfumes?.filter((perfume) => perfume.creatorId === 4).slice(0,3) }
        />
        
        <PromoteBlock
          className ='木質調推薦'
          imgName ='3'
          title ='熱門的木質調'
          context = '特別獻給喜歡木質調的木男木女們，木質調神通廣大，有揉合果香、花香、西普或東方調等等衍伸範疇，等你來發掘 !'
          perfumes = { perfumes?.filter((perfume) => perfume.group === '木質調').slice(-3) }
        />
        
        <PromoteBlock
          className ='上架最久的三款'
          imgName ='4'
          title ='給隨意晃晃的你'
          context ='本區囊括了本平台最經典的幾款香氣，諸位香氛控們走過不要路過阿！相信絕對能讓你找到更多關於香氛的靈感RRR'
          perfumes = { perfumes?.slice(0,3) }
        />

      </GeneralPageWrapper>
    </>
  )
}
