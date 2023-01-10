import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect } from 'react';

import Header from "../Header"
import HomePage from "../../pages/HomePage"
import PerfumePage from "../../pages/PerfumePage"
import LoginPage from "../../pages/LoginPage"
import RegisterPage from "../../pages/RegisterPage"

import { useSelector, useDispatch } from 'react-redux'
import { getMe, selectUser } from '../../features/userReducer'


export default function App() {
  const currentUser = useSelector(selectUser)
  const dispatch = useDispatch()
  useEffect(() => {
    //console.log('APP RUN!')
    dispatch(getMe())
    console.log('APP getME!')
  },[dispatch])

  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route exact path="/" element = {<HomePage />} />
          <Route exact path="/perfume/:id" element = {<PerfumePage />} />
          <Route path="/login" element = {<LoginPage />} />
          <Route path="/register" element = {<RegisterPage />} />
        </Routes>
      </Router>
    </div>
  )
}
