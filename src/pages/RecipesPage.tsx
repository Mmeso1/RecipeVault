import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Search, 
  Filter, 
  Grid, 
  List, 
  Clock, 
  ChefHat, 
  Heart,
  Bookmark,
  Play
} from 'lucide-react';
import { useRecipes } from '../context/RecipeContext';

const RecipesPage = () => {
  const { recipes, toggleFavorite } = useRecipes();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const filters = [
    { id: 'all', label: 'All Recipes', count: recipes.length },
    { id: 'favorites', label: 'Favorites', count: recipes.filter(r => r.isFavorite).length },
    { id: 'videos', label: 'Video Recipes', count: recipes.filter(r => r.type === 'video').length },
    { id: 'quick', label: 'Quick Meals', count: recipes.filter(r => r.tags.includes('Quick')).length },
    { id: 'vegetarian', label: 'Vegetarian', count: recipes.filter(r => r.tags.includes('Vegetarian')).length },
  ];

  const filteredRecipes = recipes.filter(recipe => {
    const matchesSearch = recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         recipe.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesFilter = selectedFilter === 'all' || 
                         (selectedFilter === 'favorites' && recipe.isFavorite) ||
                         (selectedFilter === 'videos' && recipe.type === 'video') ||
                         (selectedFilter === 'quick' && recipe.tags.includes('Quick')) ||
                         (selectedFilter === 'vegetarian' && recipe.tags.includes('Vegetarian'));
    
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8"
      >
        <div>
          <h1 className="text-3xl font-serif font-bold text-slate-900 mb-2">My Recipes</h1>
          <p className="text-slate-600">Discover and organize your culinary collection</p>
        </div>
        <div className="flex items-center space-x-4 mt-4 sm:mt-0">
          <div className="flex items-center bg-white/80 backdrop-blur-sm rounded-lg border border-seafoam-200/30">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'grid' ? 'bg-seafoam-500 text-white' : 'text-slate-600 hover:text-seafoam-700'
              }`}
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'list' ? 'bg-seafoam-500 text-white' : 'text-slate-600 hover:text-seafoam-700'
              }`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </motion.div>

      {/* Search and Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-8"
      >
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search recipes, ingredients, or tags..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white/80 backdrop-blur-sm border border-seafoam-200/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-seafoam-500 focus:border-transparent"
            />
          </div>
          <button className="flex items-center space-x-2 px-4 py-3 bg-white/80 backdrop-blur-sm border border-seafoam-200/30 rounded-lg hover:bg-white/90 transition-colors">
            <Filter className="w-4 h-4" />
            <span>Filters</span>
          </button>
        </div>

        {/* Filter Tabs */}
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setSelectedFilter(filter.id)}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedFilter === filter.id
                  ? 'bg-seafoam-500 text-white'
                  : 'bg-white/80 text-slate-700 hover:bg-white/90'
              }`}
            >
              {filter.label} ({filter.count})
            </button>
          ))}
        </div>
      </motion.div>

      {/* Recipes Grid/List */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRecipes.map((recipe, index) => (
              <motion.div
                key={recipe.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="bg-white/80 backdrop-blur-sm rounded-xl overflow-hidden border border-seafoam-200/30 hover:shadow-lg transition-all duration-200 group"
              >
                <Link to={`/recipes/${recipe.id}`}>
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={recipe.image} 
                      alt={recipe.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4">
                      {recipe.type === 'video' && (
                        <div className="flex items-center space-x-1 bg-black/70 text-white px-2 py-1 rounded-full text-xs">
                          <Play className="w-3 h-3" />
                          <span>Video</span>
                        </div>
                      )}
                    </div>
                    <div className="absolute top-4 right-4 flex space-x-2">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors"
                      >
                        <Bookmark className="w-4 h-4 text-slate-600" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={(e) => {
                          e.preventDefault();
                          toggleFavorite(recipe.id);
                        }}
                        className="w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors"
                      >
                        <Heart className={`w-4 h-4 ${recipe.isFavorite ? 'text-strawberry-500 fill-current' : 'text-slate-600'}`} />
                      </motion.button>
                    </div>
                  </div>
                </Link>
                <div className="p-4">
                  <Link to={`/recipes/${recipe.id}`}>
                    <h3 className="font-semibold text-slate-900 mb-2 hover:text-seafoam-700 transition-colors">{recipe.title}</h3>
                  </Link>
                  <p className="text-sm text-slate-600 mb-3 line-clamp-2">{recipe.description}</p>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2 text-sm text-slate-600">
                      <Clock className="w-4 h-4" />
                      <span>{recipe.prepTime}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <ChefHat className="w-4 h-4 text-pistachio-600" />
                      <span className="text-sm font-medium text-slate-900">{recipe.difficulty}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      recipe.difficulty === 'Easy' ? 'bg-pistachio-100 text-pistachio-700' :
                      recipe.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-strawberry-100 text-strawberry-700'
                    }`}>
                      {recipe.difficulty}
                    </span>
                    <div className="flex gap-1">
                      {recipe.tags.filter(tag => tag !== 'Video').slice(0, 2).map((tag) => (
                        <span key={tag} className="text-xs bg-seafoam-100 text-seafoam-700 px-2 py-1 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredRecipes.map((recipe, index) => (
              <motion.div
                key={recipe.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-seafoam-200/30 hover:shadow-lg transition-all duration-200 group"
              >
                <div className="flex items-center space-x-4">
                  <Link to={`/recipes/${recipe.id}`} className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                    <img 
                      src={recipe.image} 
                      alt={recipe.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </Link>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <Link to={`/recipes/${recipe.id}`}>
                        <h3 className="font-semibold text-slate-900 truncate hover:text-seafoam-700 transition-colors">{recipe.title}</h3>
                      </Link>
                      {recipe.type === 'video' && (
                        <Play className="w-4 h-4 text-strawberry-500 flex-shrink-0" />
                      )}
                    </div>
                    <p className="text-sm text-slate-600 mb-2 line-clamp-1">{recipe.description}</p>
                    <div className="flex items-center space-x-4 text-xs text-slate-500">
                      <span className="flex items-center space-x-1">
                        <Clock className="w-3 h-3" />
                        <span>{recipe.prepTime}</span>
                      </span>
                      <span className={`px-2 py-1 rounded-full ${
                        recipe.difficulty === 'Easy' ? 'bg-pistachio-100 text-pistachio-700' :
                        recipe.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-strawberry-100 text-strawberry-700'
                      }`}>
                        {recipe.difficulty}
                      </span>
                      <div className="flex items-center space-x-1">
                        <ChefHat className="w-3 h-3 text-pistachio-600" />
                        <span>{recipe.servings} servings</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="p-2 text-slate-600 hover:text-seafoam-700 rounded-lg hover:bg-seafoam-50 transition-colors">
                      <Bookmark className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => toggleFavorite(recipe.id)}
                      className="p-2 text-slate-600 hover:text-strawberry-600 rounded-lg hover:bg-strawberry-50 transition-colors"
                    >
                      <Heart className={`w-4 h-4 ${recipe.isFavorite ? 'text-strawberry-500 fill-current' : ''}`} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>

      {filteredRecipes.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <ChefHat className="w-16 h-16 text-slate-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-slate-900 mb-2">No recipes found</h3>
          <p className="text-slate-600">Try adjusting your search or filters</p>
        </motion.div>
      )}
    </div>
  );
};

export default RecipesPage;