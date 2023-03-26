import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { searchPerfume, searchBrand, searchCreator } from '../../features/searchReducer'
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


export default function Banner({ searchType, title, titleColor, imgName }) {
  const { value: searchValue, setValue: setSearchValue, handleChange: handleSearchBarChange } = useInput()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSearch = (searchFunc) => (e) => {
    e.preventDefault()
    const payload = {
      search: searchValue,
    }
    dispatch(searchFunc(navigate, payload))
  }

  const handlePerfumeSearchSubmit = handleSearch(searchPerfume)
  const handleBrandSearchSubmit = handleSearch(searchBrand)
  const handleCreatorSearchSubmit = handleSearch(searchCreator)

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
