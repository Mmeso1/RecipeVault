import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Recipe {
  id: string;
  title: string;
  description: string;
  image: string;
  ingredients: string[];
  instructions: string[];
  prepTime: string;
  cookTime: string;
  servings: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  tags: string[];
  isFavorite: boolean;
  folderId?: string;
  type: 'recipe' | 'video';
  videoUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Folder {
  id: string;
  name: string;
  description: string;
  color: string;
  recipeCount: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface GroceryItem {
  id: string;
  name: string;
  category: string;
  prices: Array<{
    price: number;
    store: string;
    date: Date;
  }>;
  lastPrice: number;
  averagePrice: number;
}

export interface ShoppingListItem {
  id: string;
  name: string;
  quantity: string;
  checked: boolean;
  estimatedPrice?: number;
}

interface RecipeContextType {
  recipes: Recipe[];
  folders: Folder[];
  groceryItems: GroceryItem[];
  shoppingList: ShoppingListItem[];
  addRecipe: (recipe: Omit<Recipe, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateRecipe: (id: string, updates: Partial<Recipe>) => void;
  deleteRecipe: (id: string) => void;
  toggleFavorite: (id: string) => void;
  addFolder: (folder: Omit<Folder, 'id' | 'recipeCount' | 'createdAt' | 'updatedAt'>) => void;
  updateFolder: (id: string, updates: Partial<Folder>) => void;
  deleteFolder: (id: string) => void;
  addGroceryItem: (item: Omit<GroceryItem, 'id' | 'averagePrice'>) => void;
  updateGroceryItemPrice: (itemId: string, price: number, store: string) => void;
  addToShoppingList: (item: Omit<ShoppingListItem, 'id'>) => void;
  updateShoppingListItem: (id: string, updates: Partial<ShoppingListItem>) => void;
  removeFromShoppingList: (id: string) => void;
  clearShoppingList: () => void;
}

const RecipeContext = createContext<RecipeContextType | undefined>(undefined);

export const useRecipes = () => {
  const context = useContext(RecipeContext);
  if (!context) {
    throw new Error('useRecipes must be used within a RecipeProvider');
  }
  return context;
};

export const RecipeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [recipes, setRecipes] = useState<Recipe[]>([
    {
      id: '1',
      title: 'Creamy Mushroom Risotto',
      description: 'Rich and creamy mushroom risotto with wild mushrooms and parmesan cheese.',
      image: 'https://images.pexels.com/photos/1437267/pexels-photo-1437267.jpeg?auto=compress&cs=tinysrgb&w=400',
      ingredients: [
        '1 cup Arborio rice',
        '4 cups warm vegetable broth',
        '1 lb mixed wild mushrooms, sliced',
        '1/2 cup dry white wine',
        '1/2 cup grated Parmesan cheese',
        '2 tbsp butter',
        '1 small onion, diced',
        '2 cloves garlic, minced',
        'Salt and pepper to taste'
      ],
      instructions: [
        'Heat broth in a saucepan and keep warm.',
        'In a large pan, sauté mushrooms until golden. Set aside.',
        'In the same pan, cook onion until translucent.',
        'Add rice and stir for 2 minutes until lightly toasted.',
        'Add wine and stir until absorbed.',
        'Add warm broth one ladle at a time, stirring constantly.',
        'Continue until rice is creamy and tender, about 18-20 minutes.',
        'Stir in mushrooms, butter, and Parmesan.',
        'Season with salt and pepper. Serve immediately.'
      ],
      prepTime: '15 min',
      cookTime: '35 min',
      servings: '4',
      difficulty: 'Medium',
      tags: ['Italian', 'Vegetarian', 'Comfort Food'],
      isFavorite: true,
      type: 'recipe',
      createdAt: new Date('2024-01-15'),
      updatedAt: new Date('2024-01-15')
    },
    {
      id: '2',
      title: 'Thai Green Curry',
      description: 'Aromatic Thai green curry with coconut milk and fresh vegetables.',
      image: 'https://images.pexels.com/photos/2347311/pexels-photo-2347311.jpeg?auto=compress&cs=tinysrgb&w=400',
      ingredients: [
        '2 tbsp green curry paste',
        '1 can coconut milk',
        '1 lb chicken breast, sliced',
        '1 eggplant, cubed',
        '1 bell pepper, sliced',
        '1 tbsp fish sauce',
        '1 tbsp brown sugar',
        'Thai basil leaves',
        'Jasmine rice for serving'
      ],
      instructions: [
        'Heat half the coconut milk in a wok over medium heat.',
        'Add curry paste and cook until fragrant.',
        'Add chicken and cook until no longer pink.',
        'Add remaining coconut milk, vegetables, fish sauce, and sugar.',
        'Simmer until vegetables are tender.',
        'Garnish with Thai basil and serve over rice.'
      ],
      prepTime: '15 min',
      cookTime: '25 min',
      servings: '4',
      difficulty: 'Easy',
      tags: ['Thai', 'Spicy', 'Quick'],
      isFavorite: false,
      type: 'recipe',
      createdAt: new Date('2024-01-12'),
      updatedAt: new Date('2024-01-12')
    },
    {
      id: '3',
      title: 'Gordon Ramsay\'s Beef Wellington',
      description: 'Learn to make the perfect Beef Wellington with this step-by-step video guide.',
      image: 'https://images.pexels.com/photos/769289/pexels-photo-769289.jpeg?auto=compress&cs=tinysrgb&w=400',
      ingredients: [
        '2 lb beef tenderloin',
        '1 lb puff pastry',
        '8 oz mushroom duxelles',
        '6 slices prosciutto',
        '2 egg yolks',
        'Dijon mustard',
        'Salt and pepper'
      ],
      instructions: [
        'Season and sear the beef tenderloin.',
        'Brush with Dijon mustard and let cool.',
        'Wrap in prosciutto and mushroom duxelles.',
        'Encase in puff pastry and brush with egg wash.',
        'Bake at 400°F for 25-30 minutes.',
        'Rest for 10 minutes before slicing.'
      ],
      prepTime: '30 min',
      cookTime: '45 min',
      servings: '6',
      difficulty: 'Hard',
      tags: ['British', 'Beef', 'Special Occasion', 'Video'],
      isFavorite: false,
      type: 'video',
      videoUrl: 'https://youtube.com/watch?v=example',
      createdAt: new Date('2024-01-10'),
      updatedAt: new Date('2024-01-10')
    }
  ]);

  const [folders, setFolders] = useState<Folder[]>([
    {
      id: '1',
      name: 'Weeknight Dinners',
      description: 'Quick and easy meals for busy weeknights',
      color: 'from-seafoam-400 to-seafoam-600',
      recipeCount: 24,
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-01-15')
    },
    {
      id: '2',
      name: 'Desserts & Sweets',
      description: 'Indulgent treats and sweet endings',
      color: 'from-strawberry-400 to-strawberry-600',
      recipeCount: 18,
      createdAt: new Date('2024-01-02'),
      updatedAt: new Date('2024-01-10')
    },
    {
      id: '3',
      name: 'Healthy & Light',
      description: 'Nutritious meals that don\'t compromise on taste',
      color: 'from-pistachio-400 to-pistachio-600',
      recipeCount: 31,
      createdAt: new Date('2024-01-03'),
      updatedAt: new Date('2024-01-12')
    }
  ]);

  const [groceryItems, setGroceryItems] = useState<GroceryItem[]>([
    {
      id: '1',
      name: 'Organic Tomatoes',
      category: 'Produce',
      prices: [
        { price: 4.99, store: 'Whole Foods', date: new Date('2024-01-15') },
        { price: 3.99, store: 'Trader Joe\'s', date: new Date('2024-01-10') }
      ],
      lastPrice: 4.99,
      averagePrice: 4.49
    },
    {
      id: '2',
      name: 'Whole Milk',
      category: 'Dairy',
      prices: [
        { price: 3.49, store: 'Safeway', date: new Date('2024-01-14') }
      ],
      lastPrice: 3.49,
      averagePrice: 3.49
    }
  ]);

  const [shoppingList, setShoppingList] = useState<ShoppingListItem[]>([
    { id: '1', name: 'Organic Tomatoes', quantity: '2 lbs', checked: false, estimatedPrice: 4.99 },
    { id: '2', name: 'Whole Milk', quantity: '1 gallon', checked: true, estimatedPrice: 3.49 },
    { id: '3', name: 'Sourdough Bread', quantity: '1 loaf', checked: false, estimatedPrice: 4.99 }
  ]);

  const addRecipe = (recipeData: Omit<Recipe, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newRecipe: Recipe = {
      ...recipeData,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date()
    };
    setRecipes(prev => [newRecipe, ...prev]);
  };

  const updateRecipe = (id: string, updates: Partial<Recipe>) => {
    setRecipes(prev => prev.map(recipe => 
      recipe.id === id 
        ? { ...recipe, ...updates, updatedAt: new Date() }
        : recipe
    ));
  };

  const deleteRecipe = (id: string) => {
    setRecipes(prev => prev.filter(recipe => recipe.id !== id));
  };

  const toggleFavorite = (id: string) => {
    setRecipes(prev => prev.map(recipe => 
      recipe.id === id 
        ? { ...recipe, isFavorite: !recipe.isFavorite, updatedAt: new Date() }
        : recipe
    ));
  };

  const addFolder = (folderData: Omit<Folder, 'id' | 'recipeCount' | 'createdAt' | 'updatedAt'>) => {
    const newFolder: Folder = {
      ...folderData,
      id: Date.now().toString(),
      recipeCount: 0,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    setFolders(prev => [newFolder, ...prev]);
  };

  const updateFolder = (id: string, updates: Partial<Folder>) => {
    setFolders(prev => prev.map(folder => 
      folder.id === id 
        ? { ...folder, ...updates, updatedAt: new Date() }
        : folder
    ));
  };

  const deleteFolder = (id: string) => {
    setFolders(prev => prev.filter(folder => folder.id !== id));
    // Remove folder reference from recipes
    setRecipes(prev => prev.map(recipe => 
      recipe.folderId === id 
        ? { ...recipe, folderId: undefined, updatedAt: new Date() }
        : recipe
    ));
  };

  const addGroceryItem = (itemData: Omit<GroceryItem, 'id' | 'averagePrice'>) => {
    const averagePrice = itemData.prices.reduce((sum, p) => sum + p.price, 0) / itemData.prices.length;
    const newItem: GroceryItem = {
      ...itemData,
      id: Date.now().toString(),
      averagePrice
    };
    setGroceryItems(prev => [newItem, ...prev]);
  };

  const updateGroceryItemPrice = (itemId: string, price: number, store: string) => {
    setGroceryItems(prev => prev.map(item => {
      if (item.id === itemId) {
        const newPrices = [...item.prices, { price, store, date: new Date() }];
        const averagePrice = newPrices.reduce((sum, p) => sum + p.price, 0) / newPrices.length;
        return {
          ...item,
          prices: newPrices,
          lastPrice: price,
          averagePrice
        };
      }
      return item;
    }));
  };

  const addToShoppingList = (itemData: Omit<ShoppingListItem, 'id'>) => {
    const newItem: ShoppingListItem = {
      ...itemData,
      id: Date.now().toString()
    };
    setShoppingList(prev => [newItem, ...prev]);
  };

  const updateShoppingListItem = (id: string, updates: Partial<ShoppingListItem>) => {
    setShoppingList(prev => prev.map(item => 
      item.id === id ? { ...item, ...updates } : item
    ));
  };

  const removeFromShoppingList = (id: string) => {
    setShoppingList(prev => prev.filter(item => item.id !== id));
  };

  const clearShoppingList = () => {
    setShoppingList([]);
  };

  return (
    <RecipeContext.Provider value={{
      recipes,
      folders,
      groceryItems,
      shoppingList,
      addRecipe,
      updateRecipe,
      deleteRecipe,
      toggleFavorite,
      addFolder,
      updateFolder,
      deleteFolder,
      addGroceryItem,
      updateGroceryItemPrice,
      addToShoppingList,
      updateShoppingListItem,
      removeFromShoppingList,
      clearShoppingList
    }}>
      {children}
    </RecipeContext.Provider>
  );
};