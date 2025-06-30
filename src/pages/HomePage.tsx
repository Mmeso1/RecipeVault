import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ChefHat,
  BookOpen,
  Folder,
  ShoppingCart,
  Sparkles,
  Video,
  Image as ImageIcon,
  Link as LinkIcon,
  Scan,
} from "lucide-react";
import badge from "../assets/black_circle_360x360 copy.png";

const HomePage = () => {
  const quickActions = [
    {
      name: "Paste Recipe Link",
      icon: LinkIcon,
      description: "Import from any cooking website",
      color: "from-blue-500 to-cyan-500",
    },
    {
      name: "Upload Video",
      icon: Video,
      description: "AI transcription from cooking videos",
      color: "from-purple-500 to-pink-500",
    },
    {
      name: "Scan Recipe",
      icon: ImageIcon,
      description: "From handwritten notes or books",
      color: "from-green-500 to-emerald-500",
    },
    {
      name: "Scan Receipt",
      icon: Scan,
      description: "Track grocery spending",
      color: "from-orange-500 to-red-500",
    },
  ];

  const stats = [
    { label: "Total Recipes", value: "127", icon: BookOpen },
    { label: "Folders", value: "8", icon: Folder },
    { label: "This Month", value: "$284", icon: ShoppingCart },
  ];

  const recentRecipes = [
    {
      id: 1,
      title: "Creamy Mushroom Risotto",
      image:
        "https://images.pexels.com/photos/1437267/pexels-photo-1437267.jpeg?auto=compress&cs=tinysrgb&w=400",
      time: "35 min",
      difficulty: "Medium",
      tags: ["Italian", "Vegetarian"],
    },
    {
      id: 2,
      title: "Thai Green Curry",
      image:
        "https://images.pexels.com/photos/2347311/pexels-photo-2347311.jpeg?auto=compress&cs=tinysrgb&w=400",
      time: "25 min",
      difficulty: "Easy",
      tags: ["Thai", "Spicy"],
    },
    {
      id: 3,
      title: "Chocolate Lava Cake",
      image:
        "https://images.pexels.com/photos/2067396/pexels-photo-2067396.jpeg?auto=compress&cs=tinysrgb&w=400",
      time: "20 min",
      difficulty: "Hard",
      tags: ["Dessert", "Chocolate"],
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <Link to="https://bolt.new/" className="flex justify-end">
          <img src={badge} alt="badge" className="w-20 h-20" />
        </Link>
        <div className="flex items-center justify-center mb-4">
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            className="w-16 h-16 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl flex items-center justify-center mr-4"
          >
            <ChefHat className="w-8 h-8 text-white" />
          </motion.div>
          <Sparkles className="w-6 h-6 text-accent-500 animate-pulse" />
        </div>
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4">
          Your Culinary
          <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
            {" "}
            Journey
          </span>
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Organize, discover, and master recipes with AI-powered tools. From
          scattered bookmarks to a beautifully organized collection.
        </p>
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
      >
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              whileHover={{ scale: 1.02 }}
              className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-white/20 shadow-sm hover:shadow-md transition-all duration-200"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    {stat.label}
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stat.value}
                  </p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-r from-primary-500/10 to-secondary-500/10 rounded-lg flex items-center justify-center">
                  <Icon className="w-6 h-6 text-primary-600" />
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-12"
      >
        <h2 className="text-2xl font-serif font-semibold text-gray-900 mb-6">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <Link key={action.name} to="/add">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:shadow-lg transition-all duration-200 group"
                >
                  <div
                    className={`w-12 h-12 bg-gradient-to-r ${action.color} rounded-lg flex items-center justify-center mb-4 group-hover:shadow-lg transition-shadow`}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    {action.name}
                  </h3>
                  <p className="text-sm text-gray-600">{action.description}</p>
                </motion.div>
              </Link>
            );
          })}
        </div>
      </motion.div>

      {/* Recent Recipes */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-serif font-semibold text-gray-900">
            Recent Recipes
          </h2>
          <Link
            to="/recipes"
            className="text-primary-600 hover:text-primary-700 font-medium text-sm"
          >
            View all →
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recentRecipes.map((recipe, index) => (
            <motion.div
              key={recipe.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="bg-white/60 backdrop-blur-sm rounded-xl overflow-hidden border border-white/20 hover:shadow-lg transition-all duration-200 group"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4">
                  <span className="bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium text-gray-700">
                    {recipe.time}
                  </span>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-2">
                  {recipe.title}
                </h3>
                <div className="flex items-center justify-between">
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      recipe.difficulty === "Easy"
                        ? "bg-green-100 text-green-700"
                        : recipe.difficulty === "Medium"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {recipe.difficulty}
                  </span>
                  <div className="flex gap-1">
                    {recipe.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default HomePage;
