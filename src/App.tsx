import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import RecipesPage from './pages/RecipesPage';
import FoldersPage from './pages/FoldersPage';
import GroceryPage from './pages/GroceryPage';
import AddRecipePage from './pages/AddRecipePage';
import RecipeDetailPage from './pages/RecipeDetailPage';
import StoreLocatorPage from './pages/StoreLocatorPage';
import { RecipeProvider } from './context/RecipeContext';

function App() {
  return (
    <RecipeProvider>
      <Router>
        <div className="min-h-screen bg-snow-500">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <Navbar />
            <main className="pt-20">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/recipes" element={<RecipesPage />} />
                <Route path="/recipes/:id" element={<RecipeDetailPage />} />
                <Route path="/folders" element={<FoldersPage />} />
                <Route path="/grocery" element={<GroceryPage />} />
                <Route path="/add" element={<AddRecipePage />} />
                <Route path="/stores" element={<StoreLocatorPage />} />
              </Routes>
            </main>
          </motion.div>
        </div>
      </Router>
    </RecipeProvider>
  );
}

export default App;