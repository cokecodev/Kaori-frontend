import styled from "styled-components"
import useInput from '../../hooks/useInput'


const BannerWrapper = styled.div`
  background: ${props => props.imgName ? `url(/Banner/${props.imgName}.jpg) center/cover no-repeat` : 'gray' };
  height: 580px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 50px;
`
const BannerTitle = styled.div`
  font-size: 2rem;
  margin-bottom: 1.5rem;
  color:${props => props.titleColor ? `${props.titleColor}` : 'black' };
`
const SearchBar = styled.input`
  border-radius: 8px;
  outline: none;
  border: none;
  padding: 8px 10px;
  min-width: 250px;

  ::placeholder { 
    color: #aeb6b8;
    font-size: 8px;
  }
`


const handlePerfumeSearchSubmit = (e) => {
  e.preventDefault()
  return alert('A submit !')
}

const handleBrandSearchSubmit = (e) => {
  e.preventDefault()
  return alert('B submit !')
}

const handleCreatorSearchSubmit = (e) => {
  e.preventDefault()
  return alert('C submit !')
}


export default function Banner({ searchType, title, titleColor, imgName }) {
  const { value: searchValue, setValue: setSearchValue, handleChange: handleSearchBarChange } = useInput()

  return (
    <>
      <BannerWrapper imgName = { imgName } >
        <div className = 'banner__item-container'>
          <BannerTitle titleColor = { titleColor } >
            { title }
          </BannerTitle>
          
          { searchType ==='perfume' && (
            <form onSubmit = { handlePerfumeSearchSubmit } >
              <SearchBar
                className = 'search__input'
                placeholder = '搜尋香水'
                onChange = { handleSearchBarChange }
              />
            </form>
          )}

          { searchType ==='brand' && (
            <form onSubmit = { handleBrandSearchSubmit } >
              <SearchBar
                className = 'search__input'
                placeholder = '搜尋品牌'
                onChange = { handleSearchBarChange }
              />
            </form>
          )}

          { searchType ==='creator' &&(
            <form onSubmit = { handleCreatorSearchSubmit } >
              <SearchBar
                className = 'search__input'
                placeholder = '搜尋調香師'
                onChange = { handleSearchBarChange }
              />
            </form>
          )}
          
        </div>
      </BannerWrapper>
    </>
  )
}
