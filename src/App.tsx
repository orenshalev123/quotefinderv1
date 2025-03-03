import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from "@/components/ui/toaster";
import './App.css';

// Pages
import Index from './pages/Index';
import Articles from './pages/Articles';
import NotFound from './pages/NotFound';
import ContentfulArticle from './components/contentful/ContentfulArticle';
import SanityArticle from './components/sanity/SanityArticle';
import Studio from './pages/Studio'; // Import the new Studio page

// Import article pages
// import Article1 from './pages/Article1';
// import Article2 from './pages/Article2';
// import Article3 from './pages/Article3';
// import Article4 from './pages/Article4';
// import Article5 from './pages/Article5';
// import Article6 from './pages/Article6';
// import Article7 from './pages/Article7';
// import Article8 from './pages/Article8';
// import Article9 from './pages/Article9';
// import Article10 from './pages/Article10';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/articles" element={<Articles />} />
        <Route path="/articles/:slug" element={<ContentfulArticle />} />
        <Route path="/sanity/articles/:slug" element={<SanityArticle />} />
        <Route path="/studio/*" element={<Studio />} /> {/* Add the Studio route */}
        
        {/* Individual article routes */}
        {/* <Route path="/article1" element={<Article1 />} /> */}
        {/* <Route path="/article2" element={<Article2 />} /> */}
        {/* <Route path="/article3" element={<Article3 />} /> */}
        {/* <Route path="/article4" element={<Article4 />} /> */}
        {/* <Route path="/article5" element={<Article5 />} /> */}
        {/* <Route path="/article6" element={<Article6 />} /> */}
        {/* <Route path="/article7" element={<Article7 />} /> */}
        {/* <Route path="/article8" element={<Article8 />} /> */}
        {/* <Route path="/article9" element={<Article9 />} /> */}
        {/* <Route path="/article10" element={<Article10 />} /> */}
        
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;
