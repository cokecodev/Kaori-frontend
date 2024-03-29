import './App.css'
import { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { getMe } from '../../features/userReducer'
import { getAllPerfume, getAllBrand, getAllCreator } from '../../features/searchReducer'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { ScrollToTop } from '../../utils'
import Header from '../Header'
import Footer from '../Footer'
import HomePage from '../../pages/HomePage'
import PerfumePage from '../../pages/PerfumePage'
import LoginPage from '../../pages/LoginPage'
import RegisterPage from '../../pages/RegisterPage'
import BrandPage from '../../pages/BrandPage'
import BrandListPage from '../../pages/BrandListPage'
import CreatorPage from '../../pages/CreatorPage'
import CreatorListPage from '../../pages/CreatorListPage'
import PerfumeListPage from '../../pages/PerfumeListPage'
import Page404 from '../../pages/Page404'


export default function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getMe())
    dispatch(getAllPerfume())
    dispatch(getAllBrand())
    dispatch(getAllCreator())
    console.log('APP getME!')
  },[dispatch])

  return (
    <div className = 'App' >
      <ToastContainer
        position = 'top-center'
        newestOnTop = { false }
        closeOnClick
        rtl = { false }
        pauseOnFocusLoss
        draggable
      />
      
      <Router>
        <Header />
        <ScrollToTop />
          <Routes>
            <Route exact path = '/' element = {<HomePage />} />
            <Route exact path = '/perfume/:id' element = {<PerfumePage />} />
            <Route exact path = '/brand/:id' element = {<BrandPage />} />
            <Route exact path = '/creator/:id' element = {<CreatorPage />} />
            <Route path = '/login' element = {<LoginPage />} />
            <Route path = '/register' element = {<RegisterPage />} />
            <Route exact path = '/list/brand' element = {<BrandListPage />} />
            <Route exact path = '/list/creator' element = {<CreatorListPage />} />
            <Route exact path = '/list/perfume' element = {<PerfumeListPage />} />

            <Route path = '*' element = { <Page404/> } />
          </Routes>
        <Footer />
      </Router>
    </div>
  )
}
