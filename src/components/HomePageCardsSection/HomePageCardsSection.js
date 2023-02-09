import styled from "styled-components"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { getLatestFivePerfume } from '../../WebAPI'

import { WidthWrapper } from "../general"
const TRANSLATION ='all .5s'


const CardsWrapper = styled(WidthWrapper)`
  max-width: 1000px;
  margin: 30px auto 10px auto;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`
const SmallCard = styled.div`
  box-sizing: border-box;
  border: 1px solid gray;
  border-radius: 5px;
  
  width: 250px;
  margin: 5px;
  overflow: hidden;

  & .container {
    position: relative;
    translation: ${TRANSLATION};
  }

  & .container:hover p {
    display: none;
  }

  & .container p {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);

    font-size: 1.25rem;
    color: rgba(255, 255, 255, 0.75);
    font-weight: bold;
  }

  & .cover:after {
    position: absolute;
    content:'';
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background: rgba(0,0,0,0.4);
    transition: ${TRANSLATION};
  }

  & .cover:hover:after {
    background:rgba(0,0,0,0.1);
  }
`
const EmptyCard = styled.div`
  width: 250px;
  margin: 5px;
`

const Photo = styled.img`
  width: 100%;
  background: gray;
`

const CreatePerfumeCards = ({perfumes}) => {
  return(
  perfumes.map(res => { 
    let path = `/perfume/${res.id}`

    return (
      <SmallCard key = { res.id }>
        <Link to = { path } >
          <div className ='container'>
            <div className ='cover'/>
            <p>{res.perfumeName}</p>
            <Photo 
              src = { require(`../Photo/${res.perfumeName}.jpg`) } 
            />
          </div>
        </Link>
      </SmallCard>
    )
    
  })
  )
}


export default function HomePageCardsSection() {
  const [perfumes, setPerfumes] = useState([])
  const [fetchError, setFetchError] = useState(null)

  const getLatestFiveFetch = () => {
    setFetchError('')
    getLatestFivePerfume()
      .then(res => {
        setPerfumes(res.data.data)
      })
      .catch(err => {
        console.log('ERR',err.toString())
        setFetchError(err.message)
      })
  }

  useEffect(() => {
    getLatestFiveFetch()
  },[])

  console.log('perfume', perfumes)

  return (
    <CardsWrapper>
      <CreatePerfumeCards perfumes = { perfumes } />
      <EmptyCard/>
    </CardsWrapper>
  )
}
