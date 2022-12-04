import { createSlice } from '@reduxjs/toolkit';
import { loginApi, logoutApi, getMeApi } from '../WebAPI'

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

// TODO: 錯誤處理?
export const login = (payload) => (dispatch) => {
  loginApi(payload).then(res => {
    // TODO: 錯誤訊息要顯示在哪?
    if(res.data.ok !==1) return alert(res.data.message)
    const data = { 
      currentUser: res.data.data,
    }
    dispatch(setMe(data))
  })

}

export const logout = () => (dispatch) => {
  logoutApi().then(res => {
    // TODO: 錯誤訊息要顯示在哪?
    if(res.data.ok !==1) return alert('登出出了點錯呢!')
    dispatch(setLogout())
  })
}

export const getMe = () => (dispatch) => {
  getMeApi().then(res => {
    if(res.data.ok !==1) return dispatch(setMe(''))
    const data = { 
      currentUser: res.data.data,
    }

    dispatch(setMe(data))
  })
}
