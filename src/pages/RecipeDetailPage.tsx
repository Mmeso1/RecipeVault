import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Edit3, 
  Heart, 
  Clock, 
  Users, 
  ChefHat,
  Play,
  Save,
  X,
  Plus,
  Minus
} from 'lucide-react';
import { useRecipes } from '../context/RecipeContext';

const RecipeDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { recipes, updateRecipe, toggleFavorite } = useRecipes();
  const [isEditing, setIsEditing] = useState(false);
  const [editedRecipe, setEditedRecipe] = useState<any>(null);

  const recipe = recipes.find(r => r.id === id);

  if (!recipe) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-slate-900 mb-4">Recipe not found</h1>
          <button
            onClick={() => navigate('/recipes')}
            className="px-4 py-2 bg-seafoam-500 text-white rounded-lg hover:bg-seafoam-600 transition-colors"
          >
            Back to Recipes
          </button>
        </div>
      </div>
    );
  }

  const handleEdit = () => {
    setEditedRecipe({ ...recipe });
    setIsEditing(true);
  };

  const handleSave = () => {
    if (editedRecipe) {
      updateRecipe(recipe.id, editedRecipe);
      setIsEditing(false);
      setEditedRecipe(null);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedRecipe(null);
  };

  const addIngredient = () => {
    setEditedRecipe({
      ...editedRecipe,
      ingredients: [...editedRecipe.ingredients, '']
    });
  };

  const removeIngredient = (index: number) => {
    setEditedRecipe({
      ...editedRecipe,
      ingredients: editedRecipe.ingredients.filter((_: any, i: number) => i !== index)
    });
  };

  const updateIngredient = (index: number, value: string) => {
    const newIngredients = [...editedRecipe.ingredients];
    newIngredients[index] = value;
    setEditedRecipe({
      ...editedRecipe,
      ingredients: newIngredients
    });
  };

  const addInstruction = () => {
    setEditedRecipe({
      ...editedRecipe,
      instructions: [...editedRecipe.instructions, '']
    });
  };

  const removeInstruction = (index: number) => {
    setEditedRecipe({
      ...editedRecipe,
      instructions: editedRecipe.instructions.filter((_: any, i: number) => i !== index)
    });
  };

  const updateInstruction = (index: number, value: string) => {
    const newInstructions = [...editedRecipe.instructions];
    newInstructions[index] = value;
    setEditedRecipe({
      ...editedRecipe,
      instructions: newInstructions
    });
  };

  const currentRecipe = isEditing ? editedRecipe : recipe;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-8"
      >
        <button
          onClick={() => navigate('/recipes')}
          className="flex items-center space-x-2 text-slate-600 hover:text-seafoam-700 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Recipes</span>
        </button>
        
        <div className="flex items-center space-x-4">
          {isEditing ? (
            <>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSave}
                className="flex items-center space-x-2 px-4 py-2 bg-seafoam-500 text-white rounded-lg hover:bg-seafoam-600 transition-colors"
              >
                <Save className="w-4 h-4" />
                <span>Save</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleCancel}
                className="flex items-center space-x-2 px-4 py-2 bg-slate-300 text-slate-700 rounded-lg hover:bg-slate-400 transition-colors"
              >
                <X className="w-4 h-4" />
                <span>Cancel</span>
              </motion.button>
            </>
          ) : (
            <>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => toggleFavorite(recipe.id)}
                className={`p-2 rounded-lg transition-colors ${
                  recipe.isFavorite 
                    ? 'bg-strawberry-100 text-strawberry-600' 
                    : 'bg-slate-100 text-slate-600 hover:bg-strawberry-100 hover:text-strawberry-600'
                }`}
              >
                <Heart className={`w-5 h-5 ${recipe.isFavorite ? 'fill-current' : ''}`} />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleEdit}
                className="flex items-center space-x-2 px-4 py-2 bg-pistachio-500 text-white rounded-lg hover:bg-pistachio-600 transition-colors"
              >
                <Edit3 className="w-4 h-4" />
                <span>Edit Recipe</span>
              </motion.button>
            </>
          )}
        </div>
      </motion.div>

      {/* Recipe Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Title and Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-seafoam-200/30"
          >
            {isEditing ? (
              <div className="space-y-4">
                <input
                  type="text"
                  value={editedRecipe.title}
                  onChange={(e) => setEditedRecipe({ ...editedRecipe, title: e.target.value })}
                  className="w-full text-2xl font-serif font-bold text-slate-900 bg-transparent border-b border-seafoam-300 focus:outline-none focus:border-seafoam-500"
                />
                <textarea
                  value={editedRecipe.description}
                  onChange={(e) => setEditedRecipe({ ...editedRecipe, description: e.target.value })}
                  className="w-full text-slate-600 bg-transparent border border-seafoam-300 rounded-lg p-3 focus:outline-none focus:border-seafoam-500"
                  rows={3}
                />
              </div>
            ) : (
              <>
                <h1 className="text-3xl font-serif font-bold text-slate-900 mb-4">
                  {currentRecipe.title}
                </h1>
                <p className="text-slate-600 text-lg leading-relaxed">
                  {currentRecipe.description}
                </p>
              </>
            )}
            
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-4">
              {currentRecipe.tags.map((tag: string) => (
                <span
                  key={tag}
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    tag === 'Video' 
                      ? 'bg-strawberry-100 text-strawberry-700'
                      : 'bg-pistachio-100 text-pistachio-700'
                  }`}
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Video Player */}
          {recipe.type === 'video' && recipe.videoUrl && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-seafoam-200/30"
            >
              <div className="flex items-center space-x-2 mb-4">
                <Play className="w-5 h-5 text-strawberry-600" />
                <h2 className="text-xl font-semibold text-slate-900">Video Recipe</h2>
              </div>
              <div className="aspect-video bg-slate-100 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <Play className="w-12 h-12 text-slate-400 mx-auto mb-2" />
                  <p className="text-slate-600">Video player would be embedded here</p>
                  <p className="text-sm text-slate-500 mt-1">{recipe.videoUrl}</p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Ingredients */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-seafoam-200/30"
          >
            <h2 className="text-xl font-semibold text-slate-900 mb-4">Ingredients</h2>
            {isEditing ? (
              <div className="space-y-3">
                {editedRecipe.ingredients.map((ingredient: string, index: number) => (
                  <div key={index} className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={ingredient}
                      onChange={(e) => updateIngredient(index, e.target.value)}
                      className="flex-1 px-3 py-2 border border-seafoam-300 rounded-lg focus:outline-none focus:border-seafoam-500"
                      placeholder="Enter ingredient..."
                    />
                    <button
                      onClick={() => removeIngredient(index)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                <button
                  onClick={addIngredient}
                  className="flex items-center space-x-2 px-3 py-2 text-seafoam-600 hover:bg-seafoam-50 rounded-lg transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Ingredient</span>
                </button>
              </div>
            ) : (
              <ul className="space-y-2">
                {currentRecipe.ingredients.map((ingredient: string, index: number) => (
                  <li key={index} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-seafoam-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-slate-700">{ingredient}</span>
                  </li>
                ))}
              </ul>
            )}
          </motion.div>

          {/* Instructions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-seafoam-200/30"
          >
            <h2 className="text-xl font-semibold text-slate-900 mb-4">Instructions</h2>
            {isEditing ? (
              <div className="space-y-3">
                {editedRecipe.instructions.map((instruction: string, index: number) => (
                  <div key={index} className="flex items-start space-x-2">
                    <div className="w-6 h-6 bg-seafoam-500 text-white rounded-full flex items-center justify-center text-sm font-medium mt-1 flex-shrink-0">
                      {index + 1}
                    </div>
                    <textarea
                      value={instruction}
                      onChange={(e) => updateInstruction(index, e.target.value)}
                      className="flex-1 px-3 py-2 border border-seafoam-300 rounded-lg focus:outline-none focus:border-seafoam-500"
                      rows={2}
                      placeholder="Enter instruction..."
                    />
                    <button
                      onClick={() => removeInstruction(index)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors mt-1"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                <button
                  onClick={addInstruction}
                  className="flex items-center space-x-2 px-3 py-2 text-seafoam-600 hover:bg-seafoam-50 rounded-lg transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Step</span>
                </button>
              </div>
            ) : (
              <ol className="space-y-4">
                {currentRecipe.instructions.map((instruction: string, index: number) => (
                  <li key={index} className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-seafoam-500 text-white rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0">
                      {index + 1}
                    </div>
                    <p className="text-slate-700 leading-relaxed pt-1">{instruction}</p>
                  </li>
                ))}
              </ol>
            )}
          </motion.div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Recipe Image */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white/80 backdrop-blur-sm rounded-xl overflow-hidden border border-seafoam-200/30"
          >
            <div className="aspect-square">
              <img 
                src={currentRecipe.image} 
                alt={currentRecipe.title}
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          {/* Recipe Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-seafoam-200/30"
          >
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Recipe Info</h3>
            <div className="space-y-4">
              {isEditing ? (
                <>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-seafoam-600" />
                      <span className="text-slate-700">Prep Time</span>
                    </div>
                    <input
                      type="text"
                      value={editedRecipe.prepTime}
                      onChange={(e) => setEditedRecipe({ ...editedRecipe, prepTime: e.target.value })}
                      className="px-2 py-1 border border-seafoam-300 rounded focus:outline-none focus:border-seafoam-500 text-sm"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <ChefHat className="w-4 h-4 text-seafoam-600" />
                      <span className="text-slate-700">Cook Time</span>
                    </div>
                    <input
                      type="text"
                      value={editedRecipe.cookTime}
                      onChange={(e) => setEditedRecipe({ ...editedRecipe, cookTime: e.target.value })}
                      className="px-2 py-1 border border-seafoam-300 rounded focus:outline-none focus:border-seafoam-500 text-sm"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Users className="w-4 h-4 text-seafoam-600" />
                      <span className="text-slate-700">Servings</span>
                    </div>
                    <input
                      type="text"
                      value={editedRecipe.servings}
                      onChange={(e) => setEditedRecipe({ ...editedRecipe, servings: e.target.value })}
                      className="px-2 py-1 border border-seafoam-300 rounded focus:outline-none focus:border-seafoam-500 text-sm"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-700">Difficulty</span>
                    <select
                      value={editedRecipe.difficulty}
                      onChange={(e) => setEditedRecipe({ ...editedRecipe, difficulty: e.target.value })}
                      className="px-2 py-1 border border-seafoam-300 rounded focus:outline-none focus:border-seafoam-500 text-sm"
                    >
                      <option value="Easy">Easy</option>
                      <option value="Medium">Medium</option>
                      <option value="Hard">Hard</option>
                    </select>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-seafoam-600" />
                      <span className="text-slate-700">Prep Time</span>
                    </div>
                    <span className="font-medium text-slate-900">{currentRecipe.prepTime}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <ChefHat className="w-4 h-4 text-seafoam-600" />
                      <span className="text-slate-700">Cook Time</span>
                    </div>
                    <span className="font-medium text-slate-900">{currentRecipe.cookTime}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Users className="w-4 h-4 text-seafoam-600" />
                      <span className="text-slate-700">Servings</span>
                    </div>
                    <span className="font-medium text-slate-900">{currentRecipe.servings}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-700">Difficulty</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      currentRecipe.difficulty === 'Easy' ? 'bg-pistachio-100 text-pistachio-700' :
                      currentRecipe.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-strawberry-100 text-strawberry-700'
                    }`}>
                      {currentRecipe.difficulty}
                    </span>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetailPage;