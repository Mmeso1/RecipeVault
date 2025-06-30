import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Link as LinkIcon, 
  Video, 
  Image as ImageIcon, 
  FileText, 
  Upload, 
  Camera, 
  Sparkles,
  ArrowRight,
  CheckCircle,
  Clock,
  Users,
  ChefHat,
  Scan
} from 'lucide-react';
import { useRecipes } from '../context/RecipeContext';

const AddRecipePage = () => {
  const navigate = useNavigate();
  const { addRecipe, folders } = useRecipes();
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [url, setUrl] = useState('');
  const [manualRecipe, setManualRecipe] = useState({
    title: '',
    description: '',
    prepTime: '',
    cookTime: '',
    servings: '',
    difficulty: 'Easy' as 'Easy' | 'Medium' | 'Hard',
    ingredients: [''],
    instructions: [''],
    tags: '',
    folderId: ''
  });

  const importMethods = [
    {
      id: 'url',
      title: 'Recipe URL',
      description: 'Import from any cooking website or blog',
      icon: LinkIcon,
      color: 'from-seafoam-500 to-pistachio-500',
      placeholder: 'https://example.com/recipe'
    },
    {
      id: 'video',
      title: 'Video Recipe',
      description: 'AI transcription from YouTube, TikTok, or upload',
      icon: Video,
      color: 'from-strawberry-500 to-pink-500',
      placeholder: 'https://youtube.com/watch?v=...'
    },
    {
      id: 'image',
      title: 'Photo/Scan',
      description: 'Extract recipe from handwritten notes or books',
      icon: ImageIcon,
      color: 'from-pistachio-500 to-seafoam-500',
      placeholder: 'Upload image file'
    },
    {
      id: 'text',
      title: 'Manual Entry',
      description: 'Create a recipe from scratch',
      icon: FileText,
      color: 'from-strawberry-500 to-orange-500',
      placeholder: 'Start typing your recipe...'
    }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMethod) return;
    
    setIsProcessing(true);
    
    // Simulate API processing
    setTimeout(() => {
      if (selectedMethod === 'text') {
        // Create recipe from manual entry
        const newRecipe = {
          title: manualRecipe.title,
          description: manualRecipe.description,
          image: 'https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?auto=compress&cs=tinysrgb&w=400',
          ingredients: manualRecipe.ingredients.filter(i => i.trim()),
          instructions: manualRecipe.instructions.filter(i => i.trim()),
          prepTime: manualRecipe.prepTime,
          cookTime: manualRecipe.cookTime,
          servings: manualRecipe.servings,
          difficulty: manualRecipe.difficulty,
          tags: manualRecipe.tags.split(',').map(t => t.trim()).filter(t => t),
          isFavorite: false,
          type: 'recipe' as const,
          folderId: manualRecipe.folderId || undefined
        };
        addRecipe(newRecipe);
      } else if (selectedMethod === 'url') {
        // Simulate URL import
        const newRecipe = {
          title: 'Imported Recipe from URL',
          description: 'This recipe was imported from a website URL',
          image: 'https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?auto=compress&cs=tinysrgb&w=400',
          ingredients: ['Ingredient 1', 'Ingredient 2', 'Ingredient 3'],
          instructions: ['Step 1', 'Step 2', 'Step 3'],
          prepTime: '15 min',
          cookTime: '30 min',
          servings: '4',
          difficulty: 'Medium' as const,
          tags: ['Imported'],
          isFavorite: false,
          type: 'recipe' as const
        };
        addRecipe(newRecipe);
      } else if (selectedMethod === 'video') {
        // Simulate video transcription
        const newRecipe = {
          title: 'Video Recipe Transcription',
          description: 'This recipe was transcribed from a video',
          image: 'https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?auto=compress&cs=tinysrgb&w=400',
          ingredients: ['Video ingredient 1', 'Video ingredient 2'],
          instructions: ['Video step 1', 'Video step 2'],
          prepTime: '20 min',
          cookTime: '25 min',
          servings: '2',
          difficulty: 'Easy' as const,
          tags: ['Video', 'Transcribed'],
          isFavorite: false,
          type: 'video' as const,
          videoUrl: url
        };
        addRecipe(newRecipe);
      } else if (selectedMethod === 'image') {
        // Simulate OCR processing
        const newRecipe = {
          title: 'Scanned Recipe',
          description: 'This recipe was extracted from an image using OCR',
          image: 'https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?auto=compress&cs=tinysrgb&w=400',
          ingredients: ['Scanned ingredient 1', 'Scanned ingredient 2'],
          instructions: ['Scanned step 1', 'Scanned step 2'],
          prepTime: '10 min',
          cookTime: '20 min',
          servings: '3',
          difficulty: 'Easy' as const,
          tags: ['Scanned', 'OCR'],
          isFavorite: false,
          type: 'recipe' as const
        };
        addRecipe(newRecipe);
      }
      
      setIsProcessing(false);
      navigate('/recipes');
    }, 3000);
  };

  const addIngredient = () => {
    setManualRecipe({
      ...manualRecipe,
      ingredients: [...manualRecipe.ingredients, '']
    });
  };

  const updateIngredient = (index: number, value: string) => {
    const newIngredients = [...manualRecipe.ingredients];
    newIngredients[index] = value;
    setManualRecipe({
      ...manualRecipe,
      ingredients: newIngredients
    });
  };

  const removeIngredient = (index: number) => {
    setManualRecipe({
      ...manualRecipe,
      ingredients: manualRecipe.ingredients.filter((_, i) => i !== index)
    });
  };

  const addInstruction = () => {
    setManualRecipe({
      ...manualRecipe,
      instructions: [...manualRecipe.instructions, '']
    });
  };

  const updateInstruction = (index: number, value: string) => {
    const newInstructions = [...manualRecipe.instructions];
    newInstructions[index] = value;
    setManualRecipe({
      ...manualRecipe,
      instructions: newInstructions
    });
  };

  const removeInstruction = (index: number) => {
    setManualRecipe({
      ...manualRecipe,
      instructions: manualRecipe.instructions.filter((_, i) => i !== index)
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <div className="flex items-center justify-center mb-4">
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            className="w-16 h-16 bg-gradient-to-r from-seafoam-500 to-pistachio-500 rounded-2xl flex items-center justify-center mr-4"
          >
            <ChefHat className="w-8 h-8 text-white" />
          </motion.div>
          <Sparkles className="w-6 h-6 text-strawberry-500 animate-pulse" />
        </div>
        <h1 className="text-4xl font-serif font-bold text-slate-900 mb-4">
          Add New
          <span className="bg-gradient-to-r from-seafoam-600 to-pistachio-600 bg-clip-text text-transparent"> Recipe</span>
        </h1>
        <p className="text-xl text-slate-600 max-w-2xl mx-auto">
          Import from any source or create from scratch. Our AI will help organize and format your recipe perfectly.
        </p>
      </motion.div>

      {/* Import Methods */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"
      >
        {importMethods.map((method, index) => {
          const Icon = method.icon;
          return (
            <motion.div
              key={method.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              onClick={() => setSelectedMethod(method.id)}
              className={`p-6 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                selectedMethod === method.id
                  ? 'border-seafoam-500 bg-seafoam-50 shadow-lg'
                  : 'border-seafoam-200/30 bg-white/80 backdrop-blur-sm hover:border-seafoam-300 hover:shadow-md'
              }`}
            >
              <div className="flex items-start space-x-4">
                <div className={`w-12 h-12 bg-gradient-to-r ${method.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-slate-900 mb-2">{method.title}</h3>
                  <p className="text-sm text-slate-600">{method.description}</p>
                </div>
                {selectedMethod === method.id && (
                  <CheckCircle className="w-6 h-6 text-seafoam-500" />
                )}
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Input Form */}
      {selectedMethod && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-seafoam-200/30 mb-8"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {selectedMethod === 'url' && (
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Recipe URL
                </label>
                <input
                  type="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="w-full px-4 py-3 border border-seafoam-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-seafoam-500 focus:border-transparent"
                  placeholder="https://example.com/recipe"
                  required
                />
                <p className="text-sm text-slate-500 mt-2">
                  Paste any recipe URL from popular cooking websites, blogs, or social media
                </p>
              </div>
            )}

            {selectedMethod === 'video' && (
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Video URL or Upload
                </label>
                <input
                  type="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="w-full px-4 py-3 border border-seafoam-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-seafoam-500 focus:border-transparent mb-4"
                  placeholder="https://youtube.com/watch?v=..."
                />
                <div className="border-2 border-dashed border-seafoam-300 rounded-lg p-6 text-center">
                  <Video className="w-8 h-8 text-seafoam-400 mx-auto mb-2" />
                  <p className="text-slate-600 mb-2">Or upload a video file</p>
                  <button
                    type="button"
                    className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors"
                  >
                    Choose File
                  </button>
                </div>
                <p className="text-sm text-slate-500 mt-2">
                  AI will transcribe the audio and extract recipe steps automatically
                </p>
              </div>
            )}

            {selectedMethod === 'image' && (
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Upload Recipe Image
                </label>
                <div className="border-2 border-dashed border-seafoam-300 rounded-lg p-8 text-center">
                  <ImageIcon className="w-12 h-12 text-seafoam-400 mx-auto mb-4" />
                  <p className="text-slate-600 mb-4">Upload a photo of your recipe</p>
                  <div className="flex justify-center space-x-4">
                    <button
                      type="button"
                      className="flex items-center space-x-2 px-4 py-2 bg-seafoam-500 text-white rounded-lg hover:bg-seafoam-600 transition-colors"
                    >
                      <Camera className="w-4 h-4" />
                      <span>Take Photo</span>
                    </button>
                    <button
                      type="button"
                      className="flex items-center space-x-2 px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors"
                    >
                      <Upload className="w-4 h-4" />
                      <span>Upload File</span>
                    </button>
                  </div>
                </div>
                <p className="text-sm text-slate-500 mt-2">
                  Works with handwritten recipes, cookbook pages, or recipe cards using OCR technology
                </p>
              </div>
            )}

            {selectedMethod === 'text' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Recipe Title
                  </label>
                  <input
                    type="text"
                    value={manualRecipe.title}
                    onChange={(e) => setManualRecipe({ ...manualRecipe, title: e.target.value })}
                    className="w-full px-4 py-3 border border-seafoam-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-seafoam-500 focus:border-transparent"
                    placeholder="e.g., Grandma's Chocolate Chip Cookies"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Description
                  </label>
                  <textarea
                    value={manualRecipe.description}
                    onChange={(e) => setManualRecipe({ ...manualRecipe, description: e.target.value })}
                    className="w-full px-4 py-3 border border-seafoam-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-seafoam-500 focus:border-transparent"
                    rows={3}
                    placeholder="Brief description of your recipe..."
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      <Clock className="inline w-4 h-4 mr-1" />
                      Prep Time
                    </label>
                    <input
                      type="text"
                      value={manualRecipe.prepTime}
                      onChange={(e) => setManualRecipe({ ...manualRecipe, prepTime: e.target.value })}
                      className="w-full px-4 py-2 border border-seafoam-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-seafoam-500 focus:border-transparent"
                      placeholder="15 min"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      <ChefHat className="inline w-4 h-4 mr-1" />
                      Cook Time
                    </label>
                    <input
                      type="text"
                      value={manualRecipe.cookTime}
                      onChange={(e) => setManualRecipe({ ...manualRecipe, cookTime: e.target.value })}
                      className="w-full px-4 py-2 border border-seafoam-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-seafoam-500 focus:border-transparent"
                      placeholder="30 min"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      <Users className="inline w-4 h-4 mr-1" />
                      Servings
                    </label>
                    <input
                      type="text"
                      value={manualRecipe.servings}
                      onChange={(e) => setManualRecipe({ ...manualRecipe, servings: e.target.value })}
                      className="w-full px-4 py-2 border border-seafoam-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-seafoam-500 focus:border-transparent"
                      placeholder="4 people"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Difficulty
                    </label>
                    <select
                      value={manualRecipe.difficulty}
                      onChange={(e) => setManualRecipe({ ...manualRecipe, difficulty: e.target.value as any })}
                      className="w-full px-4 py-2 border border-seafoam-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-seafoam-500 focus:border-transparent"
                    >
                      <option value="Easy">Easy</option>
                      <option value="Medium">Medium</option>
                      <option value="Hard">Hard</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Folder (Optional)
                  </label>
                  <select
                    value={manualRecipe.folderId}
                    onChange={(e) => setManualRecipe({ ...manualRecipe, folderId: e.target.value })}
                    className="w-full px-4 py-2 border border-seafoam-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-seafoam-500 focus:border-transparent"
                  >
                    <option value="">No folder</option>
                    {folders.map((folder) => (
                      <option key={folder.id} value={folder.id}>{folder.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Ingredients
                  </label>
                  <div className="space-y-2">
                    {manualRecipe.ingredients.map((ingredient, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <input
                          type="text"
                          value={ingredient}
                          onChange={(e) => updateIngredient(index, e.target.value)}
                          className="flex-1 px-4 py-2 border border-seafoam-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-seafoam-500 focus:border-transparent"
                          placeholder="e.g., 2 cups all-purpose flour"
                        />
                        {manualRecipe.ingredients.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeIngredient(index)}
                            className="p-2 text-strawberry-500 hover:bg-strawberry-50 rounded-lg transition-colors"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={addIngredient}
                      className="flex items-center space-x-2 px-3 py-2 text-seafoam-600 hover:bg-seafoam-50 rounded-lg transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add Ingredient</span>
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Instructions
                  </label>
                  <div className="space-y-2">
                    {manualRecipe.instructions.map((instruction, index) => (
                      <div key={index} className="flex items-start space-x-2">
                        <div className="w-6 h-6 bg-seafoam-500 text-white rounded-full flex items-center justify-center text-sm font-medium mt-2 flex-shrink-0">
                          {index + 1}
                        </div>
                        <textarea
                          value={instruction}
                          onChange={(e) => updateInstruction(index, e.target.value)}
                          className="flex-1 px-4 py-2 border border-seafoam-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-seafoam-500 focus:border-transparent"
                          rows={2}
                          placeholder="e.g., Preheat oven to 375°F"
                        />
                        {manualRecipe.instructions.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeInstruction(index)}
                            className="p-2 text-strawberry-500 hover:bg-strawberry-50 rounded-lg transition-colors mt-1"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={addInstruction}
                      className="flex items-center space-x-2 px-3 py-2 text-seafoam-600 hover:bg-seafoam-50 rounded-lg transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add Step</span>
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Tags (comma-separated)
                  </label>
                  <input
                    type="text"
                    value={manualRecipe.tags}
                    onChange={(e) => setManualRecipe({ ...manualRecipe, tags: e.target.value })}
                    className="w-full px-4 py-2 border border-seafoam-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-seafoam-500 focus:border-transparent"
                    placeholder="e.g., Italian, Vegetarian, Quick"
                  />
                </div>
              </div>
            )}

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => setSelectedMethod(null)}
                className="px-6 py-3 text-slate-600 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
              <motion.button
                type="submit"
                disabled={isProcessing}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-seafoam-500 to-pistachio-500 text-white rounded-lg hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isProcessing ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                    />
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    <span>Process Recipe</span>
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </motion.button>
            </div>
          </form>
        </motion.div>
      )}

      {/* Processing Status */}
      {isProcessing && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-seafoam-200/30"
        >
          <div className="flex items-center space-x-4">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="w-8 h-8 border-2 border-seafoam-500 border-t-transparent rounded-full"
            />
            <div>
              <h3 className="font-semibold text-slate-900">Processing your recipe...</h3>
              <p className="text-sm text-slate-600">Our AI is working to extract and format your recipe</p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default AddRecipePage;