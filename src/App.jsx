import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';

import Home from './components/Home';
import About from './components/About';
import Archive from './components/Portfolio';
import Layout from './layout/Layout';
import ContactPage from './components/contact/ContactPage';
import AdminUI from './admin/adminUI/AdminUI';

import Loading from './hooks/loading/Loading';
import Blog from './components/blog/Blog';

function App() {
  const queryClient = new QueryClient();
  const [isLoading, setIsLoading] = useState(true);

  const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }, [pathname]);


    return null;
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false); // Hide loading screen after 5 seconds
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          {isLoading ? ( // Display loading screen while isLoading is true
            <Loading />
          ) : (
            <Layout >
              <ScrollToTop />
              <Routes>
                <Route index element={<Home />} />
                <Route path='about-me' element={<About />} />
                <Route path='portfolio' element={<Archive />} />
                <Route path='contact-me' element={<ContactPage />} />
                <Route path='my-blog' element={<Blog />} />
                <Route path='xyzadmin123' element={<AdminUI />} />
              </Routes>
            </Layout >
          )}
        </BrowserRouter>
      </QueryClientProvider>
    </>
  )
}

export default App
