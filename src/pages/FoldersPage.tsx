import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Folder, 
  Plus, 
  Search, 
  MoreVertical, 
  Edit2, 
  Trash2, 
  BookOpen,
  Calendar,
  FolderOpen
} from 'lucide-react';
import { useRecipes } from '../context/RecipeContext';

const FoldersPage = () => {
  const { folders, recipes, addFolder, updateFolder, deleteFolder } = useRecipes();
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null);
  const [newFolder, setNewFolder] = useState({
    name: '',
    description: '',
    color: 'from-seafoam-400 to-seafoam-600'
  });

  const colorOptions = [
    'from-seafoam-400 to-seafoam-600',
    'from-strawberry-400 to-strawberry-600',
    'from-pistachio-400 to-pistachio-600',
    'from-blue-400 to-blue-600',
    'from-purple-400 to-purple-600',
    'from-orange-400 to-orange-600'
  ];

  const filteredFolders = folders.filter(folder =>
    folder.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    folder.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateFolder = () => {
    if (newFolder.name.trim()) {
      addFolder(newFolder);
      setNewFolder({ name: '', description: '', color: 'from-seafoam-400 to-seafoam-600' });
      setShowCreateModal(false);
    }
  };

  const getFolderRecipes = (folderId: string) => {
    return recipes.filter(recipe => recipe.folderId === folderId);
  };

  const openFolder = (folderId: string) => {
    setSelectedFolder(folderId);
  };

  const closeFolder = () => {
    setSelectedFolder(null);
  };

  if (selectedFolder) {
    const folder = folders.find(f => f.id === selectedFolder);
    const folderRecipes = getFolderRecipes(selectedFolder);

    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Folder Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <div className="flex items-center space-x-4">
            <button
              onClick={closeFolder}
              className="p-2 text-slate-600 hover:text-seafoam-700 rounded-lg hover:bg-seafoam-50 transition-colors"
            >
              <Folder className="w-6 h-6" />
            </button>
            <div>
              <h1 className="text-3xl font-serif font-bold text-slate-900">{folder?.name}</h1>
              <p className="text-slate-600">{folder?.description}</p>
            </div>
          </div>
          <div className="text-sm text-slate-500">
            {folderRecipes.length} recipes
          </div>
        </motion.div>

        {/* Folder Recipes */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {folderRecipes.map((recipe, index) => (
            <motion.div
              key={recipe.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/80 backdrop-blur-sm rounded-xl overflow-hidden border border-seafoam-200/30 hover:shadow-lg transition-all duration-200"
            >
              <div className="h-48 overflow-hidden">
                <img 
                  src={recipe.image} 
                  alt={recipe.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-slate-900 mb-2">{recipe.title}</h3>
                <p className="text-sm text-slate-600 mb-3 line-clamp-2">{recipe.description}</p>
                <div className="flex items-center justify-between">
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    recipe.difficulty === 'Easy' ? 'bg-pistachio-100 text-pistachio-700' :
                    recipe.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-strawberry-100 text-strawberry-700'
                  }`}>
                    {recipe.difficulty}
                  </span>
                  <span className="text-sm text-slate-500">{recipe.prepTime}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {folderRecipes.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <BookOpen className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-slate-900 mb-2">No recipes in this folder</h3>
            <p className="text-slate-600">Add some recipes to get started</p>
          </motion.div>
        )}
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8"
      >
        <div>
          <h1 className="text-3xl font-serif font-bold text-slate-900 mb-2">Recipe Folders</h1>
          <p className="text-slate-600">Organize your recipes into themed collections</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowCreateModal(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-seafoam-500 to-pistachio-500 text-white rounded-lg hover:shadow-lg transition-all duration-200 mt-4 sm:mt-0"
        >
          <Plus className="w-4 h-4" />
          <span>New Folder</span>
        </motion.button>
      </motion.div>

      {/* Search */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-8"
      >
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search folders..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white/80 backdrop-blur-sm border border-seafoam-200/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-seafoam-500 focus:border-transparent"
          />
        </div>
      </motion.div>

      {/* Folders Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {filteredFolders.map((folder, index) => (
          <motion.div
            key={folder.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-seafoam-200/30 hover:shadow-lg transition-all duration-200 group cursor-pointer"
            onClick={() => openFolder(folder.id)}
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className={`w-12 h-12 bg-gradient-to-r ${folder.color} rounded-lg flex items-center justify-center group-hover:shadow-lg transition-shadow`}>
                <FolderOpen className="w-6 h-6 text-white" />
              </div>
              <div className="relative">
                <button 
                  onClick={(e) => e.stopPropagation()}
                  className="p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
                >
                  <MoreVertical className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="mb-4">
              <h3 className="font-semibold text-slate-900 mb-2">{folder.name}</h3>
              <p className="text-sm text-slate-600 mb-3">{folder.description}</p>
              
              {/* Recipe Preview */}
              <div className="flex items-center space-x-2 mb-3">
                <div className="flex -space-x-2">
                  {getFolderRecipes(folder.id).slice(0, 3).map((recipe, i) => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-white overflow-hidden">
                      <img src={recipe.image} alt="" className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
                {getFolderRecipes(folder.id).length > 3 && (
                  <span className="text-sm text-slate-500">+{getFolderRecipes(folder.id).length - 3} more</span>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between text-sm text-slate-500">
              <div className="flex items-center space-x-1">
                <BookOpen className="w-4 h-4" />
                <span>{getFolderRecipes(folder.id).length} recipes</span>
              </div>
              <div className="flex items-center space-x-1">
                <Calendar className="w-4 h-4" />
                <span>{new Date(folder.updatedAt).toLocaleDateString()}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Empty State */}
      {filteredFolders.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <Folder className="w-16 h-16 text-slate-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-slate-900 mb-2">No folders found</h3>
          <p className="text-slate-600 mb-4">Create your first folder to organize your recipes</p>
          <button
            onClick={() => setShowCreateModal(true)}
            className="px-4 py-2 bg-seafoam-500 text-white rounded-lg hover:bg-seafoam-600 transition-colors"
          >
            Create Folder
          </button>
        </motion.div>
      )}

      {/* Create Folder Modal */}
      {showCreateModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setShowCreateModal(false)}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-xl p-6 max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Create New Folder</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Folder Name</label>
                <input
                  type="text"
                  value={newFolder.name}
                  onChange={(e) => setNewFolder({ ...newFolder, name: e.target.value })}
                  className="w-full px-3 py-2 border border-seafoam-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-seafoam-500"
                  placeholder="e.g., Asian Favorites"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Description</label>
                <textarea
                  value={newFolder.description}
                  onChange={(e) => setNewFolder({ ...newFolder, description: e.target.value })}
                  className="w-full px-3 py-2 border border-seafoam-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-seafoam-500"
                  rows={3}
                  placeholder="Brief description of this folder..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Color</label>
                <div className="flex space-x-2">
                  {colorOptions.map((color) => (
                    <button
                      key={color}
                      onClick={() => setNewFolder({ ...newFolder, color })}
                      className={`w-8 h-8 bg-gradient-to-r ${color} rounded-full border-2 transition-colors ${
                        newFolder.color === color ? 'border-slate-400' : 'border-white hover:border-slate-300'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => setShowCreateModal(false)}
                className="flex-1 px-4 py-2 text-slate-700 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateFolder}
                className="flex-1 px-4 py-2 bg-seafoam-500 text-white rounded-lg hover:bg-seafoam-600 transition-colors"
              >
                Create Folder
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default FoldersPage;