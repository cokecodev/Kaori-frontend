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

export const searchPerfume = (navigate, payload) => (dispatch) => {
  dispatch(setIsLoading(true))
  dispatch(setFetchError(null))

  searchPerfumeAPI(payload).then(res => {
    if(res.data.ok !== 1) {
      dispatch(setIsLoading(false))
      return toast.warn(res.data.message, toastConfig)
    }

    const data = { 
      perfumeList: res.data.data,
    }
    dispatch(setPerfumeList(data))
    navigate('/list/perfume')
    dispatch(setIsLoading(false))
  }).catch(err => {
    console.log('ERR', err.message.toString())
    dispatch(setFetchError(err.message))
  })
}

export const searchBrand = (payload) => (dispatch) => {
  dispatch(setIsLoading(true))
  dispatch(setFetchError(null))

  searchBrandAPI(payload).then(res => {
    if(res.data.ok !== 1) {
      dispatch(setIsLoading(false))
      return toast.warn(res.data.message, toastConfig)
    }

    const data = { 
      brandList: res.data.data,
    }

    dispatch(setBrandList(data))
    dispatch(setIsLoading(false))
  }).catch(err => {
    console.log('ERR', err.message.toString())
    dispatch(setFetchError(err.message))
  })
}

export const searchCreator = (payload) => (dispatch) => {
  dispatch(setIsLoading(true))
  dispatch(setFetchError(null))

  searchCreatorAPI(payload).then(res => {
    if(res.data.ok !== 1) {
      dispatch(setIsLoading(false))
      return toast.warn(res.data.message, toastConfig)
    }

    const data = { 
      creatorList: res.data.data,
    }

    dispatch(setCreatorList(data))
    dispatch(setIsLoading(false))
  }).catch(err => {
    console.log('ERR', err.message.toString())
    dispatch(setFetchError(err.message))
  })
}

export const getAllPerfume = () => (dispatch) => {
  dispatch(setIsLoading(true))
  dispatch(setFetchError(null))

  getAllPerfumeAPI().then(res => {
    if(res.data.ok !== 1) {
      dispatch(setIsLoading(false))
      return toast.warn(res.data.message, toastConfig)
    }

    const data = { 
      perfumeList: res.data.data,
    }
    dispatch(setPerfumeList(data))
    dispatch(setIsLoading(false))
  }).catch(err => {
    console.log('ERR', err.message.toString())
    dispatch(setFetchError(err.message))
  })
}

export const getAllBrand = () => (dispatch) => {
  dispatch(setIsLoading(true))
  dispatch(setFetchError(null))

  getAllBrandsAPI().then(res => {
    if(res.data.ok !== 1)  {
      dispatch(setIsLoading(false))
      return toast.warn(res.data.message, toastConfig)
    }

    const data = { 
      brandList: res.data.data,
    }
    dispatch(setBrandList(data))
    dispatch(setIsLoading(false))
  }).catch(err => {
    console.log('ERR', err.message.toString())
    dispatch(setFetchError(err.message))
  })
}

export const getAllCreator = () => (dispatch) => {
  dispatch(setIsLoading(true))
  dispatch(setFetchError(null))

  getAllCreatorsAPI().then(res => {
    if(res.data.ok !== 1)  {
      dispatch(setIsLoading(false))
      return toast.warn(res.data.message, toastConfig)
    }

    const data = { 
      creatorList: res.data.data,
    }
    dispatch(setCreatorList(data))
    dispatch(setIsLoading(false))
  }).catch(err => {
    console.log('ERR', err.message.toString())
    dispatch(setFetchError(err.message))
  })
}