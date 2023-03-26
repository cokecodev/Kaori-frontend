import { createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import { toastConfig } from '../constants/toastConfigs'

import { setIsLoading, setFetchError } from './fetchStatusReducer'
import { 
  searchPerfume as searchPerfumeAPI, 
  getAllPerfume as getAllPerfumeAPI, 
  searchBrand as searchBrandAPI,
  searchCreator as searchCreatorAPI,
  getAllBrands as getAllBrandsAPI,
  getAllCreators as getAllCreatorsAPI
} from '../WebAPI'


export const searchSlice = createSlice({
  name: 'search',
  initialState:{
    perfumeList: [],
    creatorList: [],
    brandList: [],
  },
  
  reducers: {
    setPerfumeList:(state, action) => {
      state.perfumeList = action.payload.perfumeList;
    },
    setBrandList:(state, action) => {
      state.brandList = action.payload.brandList;
    },
    setCreatorList:(state, action) => {
      state.creatorList = action.payload.creatorList;
    },

  }
});

export const { setPerfumeList, setBrandList, setCreatorList } = searchSlice.actions;
export const selectPerfumeList = (state) => state.search.perfumeList;
export const selectCreatorList = (state) => state.search.creatorList;
export const selectBrandList = (state) => state.search.brandList;
export default searchSlice.reducer;

const fetchData = (payload, navigate, apiFunc, dataKey, dataSetter) => (dispatch) => {
  dispatch(setIsLoading(true))
  dispatch(setFetchError(null))

  apiFunc(payload).then(res => {
    if(res.data.ok !== 1) toast.warn(res.data.message, toastConfig)

    const data = { 
      [dataKey]: res.data.data,
    }

    if(res.data.ok === 1) dispatch(dataSetter(data))
    navigate()
    dispatch(setIsLoading(false))
  }).catch(err => {
    console.log('ERR', err.message.toString())
    dispatch(setFetchError(err.message))
  })
}

export const searchPerfume = (navigate, payload) => fetchData(payload, () => navigate('/list/perfume'), searchPerfumeAPI, 'perfumeList', setPerfumeList)
export const searchBrand = (navigate, payload) => fetchData(payload, () => navigate('/list/brand'), searchBrandAPI, 'brandList', setBrandList)
export const searchCreator = (navigate, payload) => fetchData(payload, () => navigate('/list/creator'), searchCreatorAPI, 'creatorList', setCreatorList)
export const getAllPerfume = () => fetchData(null, ()=>{}, getAllPerfumeAPI, 'perfumeList', setPerfumeList)
export const getAllBrand = () => fetchData(null, ()=>{}, getAllBrandsAPI, 'brandList', setBrandList)
export const getAllCreator = () => fetchData(null, ()=>{}, getAllCreatorsAPI, 'creatorList', setCreatorList)
