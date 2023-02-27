import styled from "styled-components"
import { useEffect } from "react"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { getAllBrand, selectBrandList } from "../../features/searchReducer"

import Banner from '../../components/Banner'
import BrandInfoCard from '../../components/BrandInfoCard'
import { PageDescribeTitle } from '../../components/general'


const TitleWithMargin = styled(PageDescribeTitle)`
  margin-bottom: 50px;
`

export default function BrandListPage() {
  const brandList = useSelector(selectBrandList)
  const dispatch = useDispatch()
  
  useEffect(() => {
    dispatch(getAllBrand())
  }, [])


  return (
    <>
      <Banner
        imgName = { 'C' }
        titleColor = { 'white' }
        title = { '與心儀的品牌相遇吧 !' }
        searchType = { 'brand' }
      />

      <TitleWithMargin> 品牌列表 </TitleWithMargin>

      { // brand cards
        brandList.length !== 0 && brandList.map( res => { 
          let path = `/brand/${res.id}`

          return (
            <Link to = { path } key = { res.id } >
              <BrandInfoCard 
                brand = { res }
              />
            </Link>
          ) 
        })
      }

    </>
  )
}
