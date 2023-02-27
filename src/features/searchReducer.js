import { createSlice } from '@reduxjs/toolkit';
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

// TODO: 錯誤處理? 錯誤訊息要顯示在哪?
export const searchPerfume = (navigate, payload) => (dispatch) => {
  searchPerfumeAPI(payload).then(res => {
    if(res.data.ok !==1) return alert(res.data.message)
    const data = { 
      perfumeList: res.data.data,
    }
    dispatch(setPerfumeList(data))
    navigate('/list/perfume')
  })
}

export const searchBrand = (payload) => (dispatch) => {
  searchBrandAPI(payload).then(res => {
    if(res.data.ok !==1) return alert(res.data.message)
    const data = { 
      brandList: res.data.data,
    }
    dispatch(setBrandList(data))
  })
}

export const searchCreator = (payload) => (dispatch) => {
  searchCreatorAPI(payload).then(res => {
    if(res.data.ok !==1) return alert(res.data.message)
    const data = { 
      creatorList: res.data.data,
    }
    dispatch(setCreatorList(data))
  })
}

export const getAllPerfume = () => (dispatch) => {
  getAllPerfumeAPI().then(res => {
    if(res.data.ok !==1) return alert(res.data.message)
    const data = { 
      perfumeList: res.data.data,
    }
    dispatch(setPerfumeList(data))
  })
}

export const getAllBrand = () => (dispatch) => {
  getAllBrandsAPI().then(res => {
    if(res.data.ok !==1) return alert(res.data.message)
    const data = { 
      brandList: res.data.data,
    }
    dispatch(setBrandList(data))
  })
}

export const getAllCreator = () => (dispatch) => {
  getAllCreatorsAPI().then(res => {
    if(res.data.ok !==1) return alert(res.data.message)
    const data = { 
      creatorList: res.data.data,
    }
    dispatch(setCreatorList(data))
  })
}