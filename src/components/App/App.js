import './App.css'

import { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getMe, selectUser } from '../../features/userReducer'
import { getAllPerfume, selectPerfume } from '../../features/searchReducer'

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


export default function App() {
  const currentUser = useSelector(selectUser)
  const dispatch = useDispatch()
  useEffect(() => {
    //console.log('APP RUN!')
    dispatch(getMe())
    dispatch(getAllPerfume())
    console.log('APP getME!')
  },[dispatch])

  return (
    <div className = 'App' >
      <Router>
        <Header />
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
          </Routes>
        <Footer />
      </Router>
    </div>
  )
}
