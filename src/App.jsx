import './App.css'
import Header from "./components/common/Header/Header"
import Filter from "./components/common/ActionHub/ActionHub"
import Card from "./components/common/Card/Card"
import Footer from "./components/common/Footer/Footer"
import Form from './components/common/Form/Form'
import AdDashboard from './components/common/AdDashboard/AdDashboard'
import { BrowserRouter } from 'react-router-dom'

function App() {

  return (
    <>
      <Header />
      <AdDashboard />
      <Footer />
    </>
  )
}

export default App
