import styled from "styled-components"
import { Link } from "react-router-dom"
const TRANSLATION = 'all .5s'


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

const Photo = styled.img`
  width: 100%;
  background: gray;
`

export default function CreatePerfumeCards({perfumes}) {
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
