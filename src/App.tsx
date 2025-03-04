
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from "@/components/ui/toaster";
import './App.css';

// Pages
import Index from './pages/Index';
import Articles from './pages/Articles';
import NotFound from './pages/NotFound';
import ContentfulArticle from './components/contentful/ContentfulArticle';
import SanityArticle from './components/sanity/SanityArticle';
import StoryblokArticle from './components/storyblok/StoryblokArticle';
import Studio from './pages/Studio'; // Import the Studio page

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/articles" element={<Articles />} />
        <Route path="/articles/:slug" element={<ContentfulArticle />} />
        <Route path="/sanity/articles/:slug" element={<SanityArticle />} />
        <Route path="/storyblok/articles/:slug" element={<StoryblokArticle />} />
        <Route path="/studio/*" element={<Studio />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;
