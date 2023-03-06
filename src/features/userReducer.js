import { createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import { toastConfig, errorToastConfig } from '../constants/toastConfigs'

import { setIsLoading, setFetchError } from './fetchStatusReducer'
import { loginApi, logoutApi, getMeApi, registerApi } from '../WebAPI'

export const userSlice = createSlice({
  name: 'user',
  initialState:{
    currentUser: '',
  },
  
  reducers: {
    setMe:(state, action) => {
      state.currentUser = action.payload.currentUser;
    },

    setLogout: (state) => {
      state.currentUser = '';
    }
  }
});

export const { setLogout, setMe } = userSlice.actions;
export const selectUser = (state) => state.user.currentUser;
export default userSlice.reducer;

export const login = (navigate, payload) => (dispatch) => {
  dispatch(setIsLoading(true))
  dispatch(setFetchError(null))

  loginApi(payload).then(res => {
    if(res.data.ok !== 1) {
      dispatch(setIsLoading(false))
      return toast.warn(res.data.message, toastConfig)
    }

    const data = { 
      currentUser: res.data.data,
    }
    
    dispatch(setMe(data))
    toast.success('登入成功', toastConfig)
    navigate(-1)
    dispatch(setIsLoading(false))
  }).catch(err => {
    console.log('ERR', err.message.toString())
    dispatch(setFetchError(err.message))
  })
}

export const logout = () => (dispatch) => {
  dispatch(setIsLoading(true))
  dispatch(setFetchError(null))

  logoutApi().then(res => {
    if(res.data.ok !== 1) {
      dispatch(setIsLoading(false))
      return toast.error('登出出了點錯呢! 請與我們聯絡!', errorToastConfig)
    }

    dispatch(setLogout())
    toast.success('登出成功', toastConfig)
    dispatch(setIsLoading(false))
  }).catch(err => {
    console.log('ERR', err.message.toString())
    dispatch(setFetchError(err.message))
  })
}

export const getMe = () => (dispatch) => {
  dispatch(setIsLoading(true))
  dispatch(setFetchError(null))

  getMeApi().then(res => {
    if(res.data.ok !== 1) {
      dispatch(setIsLoading(false))
      return dispatch(setMe(''))
    }

    const data = { 
      currentUser: res.data.data,
    }

    dispatch(setMe(data))
    dispatch(setIsLoading(false))
  }).catch(err => {
    console.log('ERR', err.message.toString())
    dispatch(setFetchError(err.message))
  })
}

export const register = (navigate, payload) => (dispatch) => {
  dispatch(setIsLoading(true))
  dispatch(setFetchError(null))

  registerApi(payload).then(res => {
    if(res.data.ok !== 1) {
      dispatch(setIsLoading(false))
      return toast.warn(res.data.message, toastConfig)
    }
    const data = { 
      currentUser: res.data.data,
    }
    
    dispatch(setMe(data))
    navigate('/')
    toast.success('註冊成功', toastConfig)
    dispatch(setIsLoading(false))
  }).catch(err => {
    console.log('ERR', err.message.toString())
    dispatch(setFetchError(err.message))
  })

}
