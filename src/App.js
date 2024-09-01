import './App.css';
import SignIn from './components/Signin';
import axios from 'axios';
import Layout from './components/Layout';
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Loading from "./components/Loading"
import Candidates from './components/Candidate/Candidates';
import Jobs from './components/Job/Jobs';
import CandidateInfo from './components/Candidate/CandidateInfo';
import { useContext, useEffect, useState } from 'react';
import { useAuth, UserContext, UserContextProvider } from './contexts/UserContext';
import Matchings from './components/Matching/Matchings';

axios.defaults.withCredentials = true
axios.defaults.baseURL = 'https://cv-ranking.onrender.com';
// axios.defaults.baseURL = "http://localhost:8000";


export default function App() {
  const { currentUser, fetchUser, setCurrentUser, fetchAdmins } = useAuth();
  console.log(currentUser)
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if ((location.pathname === "/") && (currentUser !== null) && (currentUser !== "loading")) {
      navigate('/candidates');
    }
    if (localStorage.getItem("user_token") === null) {
      navigate('/');
      setCurrentUser(null);
      // fetchUser()
    }
  }, [location.pathname, currentUser, navigate]);

  if (currentUser === "loading") {
    return <Loading color="#89CFF0"/>
  }
  else if (currentUser === null) {
    return <SignIn />
  }

  return (
    // <SignIn/>
    <Layout>
      <Routes>
        <Route path="/candidates" element={<Candidates />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/candidate/:id" element={<CandidateInfo />} />
        <Route path="/matchings" element={<Matchings />} />
      </Routes>
    </Layout>
  );
}
