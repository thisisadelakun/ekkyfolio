import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Home from './components/Home';
import About from './components/About';
import Archive from './components/Portfolio';

function App() {

  return (
    <>
      <BrowserRouter>
        < NavBar />
        <Routes>
          <Route index element={<Home />} />
          <Route path='about' element={<About />} />
          <Route path='portfolio' element={<Archive />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App
