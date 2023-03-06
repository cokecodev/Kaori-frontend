import { createSlice } from '@reduxjs/toolkit';
import { loginApi, logoutApi, getMeApi, registerApi } from '../WebAPI'
import { toast } from 'react-toastify'
import { toastConfig, errorToastConfig } from '../constants/toastConfigs'

export const userSlice = createSlice({
  name: 'user',
  initialState:{
    currentUser: '',
  },
  
  reducers: {
    setMe:(state, action) => {
      console.log('getMe action!')
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
  loginApi(payload).then(res => {
    if(res.data.ok !==1) return toast.warn(res.data.message, toastConfig)
    const data = { 
      currentUser: res.data.data,
    }
    
    dispatch(setMe(data))
    toast.success('登入成功', toastConfig)
    return navigate(-1)
  }).catch(err => {
    console.log('ERR', err.message.toString())
    toast.error(err.message, errorToastConfig)
  })
}

export const logout = () => (dispatch) => {
  logoutApi().then(res => {
    if(res.data.ok !==1) return toast.error('登出出了點錯呢!', errorToastConfig)
    
    dispatch(setLogout())
    toast.success('登出成功', toastConfig)
  }).catch(err => {
    console.log('ERR', err.message.toString())
    toast.error(err.message, errorToastConfig)
  })
}

export const getMe = () => (dispatch) => {
  getMeApi().then(res => {
    if(res.data.ok !==1) return dispatch(setMe(''))
    
    const data = { 
      currentUser: res.data.data,
    }

    dispatch(setMe(data))
  }).catch(err => {
    console.log('ERR', err.message.toString())
    toast.error(err.message, errorToastConfig)
  })
}

export const register = (navigate, payload) => (dispatch) => {
  registerApi(payload).then(res => {
    if(res.data.ok !==1) return toast.warn(res.data.message, toastConfig)
    const data = { 
      currentUser: res.data.data,
    }
    
    dispatch(setMe(data))
    navigate('/')
    toast.success('註冊成功', toastConfig)
  }).catch(err => {
    console.log('ERR', err.message.toString())
    toast.error(err.message, errorToastConfig)
  })

}
