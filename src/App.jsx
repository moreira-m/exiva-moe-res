import './App.css'
import Header from "./components/common/Header/Header"
import Filter from "./components/common/Filter/Filter"
import Card from "./components/common/Card/Card"
import Footer from "./components/common/Footer/Footer"

function App() {

  return (
    <>
    <Header />
    <Filter />
    <div className='flex flex-row gap-12 m-auto justify-center'>
      <Card />
      <Card />
      <Card />
    </div>
    <Footer />
    </>
  )
}

export default App
