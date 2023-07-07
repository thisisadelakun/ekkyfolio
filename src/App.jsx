import React, { useEffect, useState, lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';

const Home = lazy(() => import('./components/Home'));
const About = lazy(() => import('./components/About'));
const Archive = lazy(() => import('./components/Portfolio'));
const ContactPage = lazy(() => import('./components/contact/ContactPage'));
const AdminUI = lazy(() => import('./admin/adminUI/AdminUI'));
const Blog = lazy(() => import('./components/blog/Blog'));

import Loading from './hooks/loading/Loading';

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
              <Suspense fallback={<Loading />}></Suspense>
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
