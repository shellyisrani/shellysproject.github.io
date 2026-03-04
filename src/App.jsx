import { Toaster } from "@/components/ui/toaster"
import { pagesConfig } from './pages.config'
import { BrowserRouter as Router, Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import PageNotFound from './lib/PageNotFound';

const { Pages, Layout, mainPage } = pagesConfig;
const mainPageKey = mainPage ?? Object.keys(Pages)[0];
const MainPage = mainPageKey ? Pages[mainPageKey] : <></>;

const LayoutWrapper = ({ children, currentPageName }) => Layout ?
  <Layout currentPageName={currentPageName}>{children}</Layout>
  : <>{children}</>;

// Component to handle GitHub Pages 404.html redirect
function RedirectHandler() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if we're coming from the 404.html redirect
    // The 404.html redirects to /?/path, so we need to extract the path
    const queryString = location.search;
    if (queryString.startsWith('?/')) {
      const path = queryString.slice(2).replace(/~and~/g, '&').split('#')[0];
      if (path) {
        navigate(path, { replace: true });
      }
    }
  }, [location, navigate]);

  return null;
}

function App() {
  return (
    <Router>
      <RedirectHandler />
      <Routes>
        <Route path="/" element={
          <LayoutWrapper currentPageName={mainPageKey}>
            <MainPage />
          </LayoutWrapper>
        } />
        {Object.entries(Pages).map(([path, Page]) => (
          <Route
            key={path}
            path={`/${path}`}
            element={
              <LayoutWrapper currentPageName={path}>
                <Page />
              </LayoutWrapper>
            }
          />
        ))}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Toaster />
    </Router>
  )
}

export default App
