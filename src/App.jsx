import React, { useEffect, useState, lazy, Suspense, startTransition } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';

import Loading from './hooks/loading/Loading';
import Layout from './layout/Layout';

const Home = lazy(() => import('./components/Home'));
const About = lazy(() => import('./components/About'));
const Archive = lazy(() => import('./components/Portfolio'));
const ContactPage = lazy(() => import('./components/contact/ContactPage'));
const AdminUI = lazy(() => import('./admin/adminUI/AdminUI'));
const Blog = lazy(() => import('./components/blog/Blog'));

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
            <Layout>
              <ScrollToTop />
              <Suspense fallback={<Loading />}>
                <Routes>
                  <Route
                    index
                    element={(
                      <React.Suspense fallback={<Loading />}>
                        <Home />
                      </React.Suspense>
                    )}
                  />
                  <Route
                    path="about-me"
                    element={(
                      <React.Suspense fallback={<Loading />}>
                        <About />
                      </React.Suspense>
                    )}
                  />
                  <Route
                    path="portfolio"
                    element={(
                      <React.Suspense fallback={<Loading />}>
                        <Archive />
                      </React.Suspense>
                    )}
                  />
                  <Route
                    path="contact-me"
                    element={(
                      <React.Suspense fallback={<Loading />}>
                        <ContactPage />
                      </React.Suspense>
                    )}
                  />
                  <Route
                    path="my-blog"
                    element={(
                      <React.Suspense fallback={<Loading />}>
                        <Blog />
                      </React.Suspense>
                    )}
                  />
                  <Route
                    path="xyzadmin123"
                    element={(
                      <React.Suspense fallback={<Loading />}>
                        <AdminUI />
                      </React.Suspense>
                    )}
                  />
                </Routes>
              </Suspense>
            </Layout>
          )}
        </BrowserRouter>
      </QueryClientProvider>
    </>
  );
}

export default App;
