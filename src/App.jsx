import './App.css'
import Header from "./components/common/Header/Header";
import Footer from "./components/common/Footer/Footer";
import AdDashboard from './components/common/AdDashboard/AdDashboard';
import MyAds from './pages/MyAds';
import MyApplications from './pages/MyApplications';
import { Routes, Route } from 'react-router-dom';

function App() {

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<AdDashboard />} />
        <Route path="/my-ads" element={<MyAds />} />
        <Route path="/my-applications" element={<MyApplications />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
