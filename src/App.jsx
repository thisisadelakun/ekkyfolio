import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import Archive from './components/Portfolio';
import Layout from './layout/Layout';
// import ContactPage from './components/contact/ContactPage';

function App() {

  const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
      window.scrollTo({
        top: 3,
        behavior: 'smooth',
      });
    }, [pathname]);

    return null;
  };

  return (
    <>
      <BrowserRouter>
        <Layout >
          <ScrollToTop />
          <Routes>
            <Route index element={<Home />} />
            <Route path='about-me' element={<About />} />
            <Route path='portfolio' element={<Archive />} />
            {/* <Route path='contact-me' element={<ContactPage />} /> */}
          </Routes>
        </Layout >
      </BrowserRouter>
    </>
  )
}

export default App
