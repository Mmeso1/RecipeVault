import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ShoppingCart, 
  Plus, 
  Scan, 
  TrendingUp, 
  Calendar, 
  DollarSign,
  Receipt,
  Camera,
  Upload,
  Check,
  X,
  Package,
  History,
  AlertCircle
} from 'lucide-react';
import { useRecipes } from '../context/RecipeContext';

const GroceryPage = () => {
  const { groceryItems, shoppingList, addGroceryItem, updateGroceryItemPrice, addToShoppingList, updateShoppingListItem, removeFromShoppingList } = useRecipes();
  const [activeTab, setActiveTab] = useState<'shopping' | 'items' | 'receipts' | 'budget'>('shopping');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showReceiptModal, setShowReceiptModal] = useState(false);
  const [showPriceModal, setShowPriceModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [newItem, setNewItem] = useState({ name: '', quantity: '', estimatedPrice: 0 });
  const [receiptItems, setReceiptItems] = useState<any[]>([]);

  const recentReceipts = [
    {
      id: 1,
      store: 'Whole Foods Market',
      date: '2024-01-15',
      total: 67.43,
      items: 12,
      image: 'https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg?auto=compress&cs=tinysrgb&w=200'
    },
    {
      id: 2,
      store: 'Trader Joe\'s',
      date: '2024-01-12',
      total: 45.21,
      items: 8,
      image: 'https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg?auto=compress&cs=tinysrgb&w=200'
    }
  ];

  const budgetData = {
    thisMonth: 284.50,
    lastMonth: 312.75,
    budget: 350.00,
    categories: [
      { name: 'Produce', amount: 89.25, percentage: 31 },
      { name: 'Meat & Poultry', amount: 78.40, percentage: 28 },
      { name: 'Dairy', amount: 45.60, percentage: 16 },
      { name: 'Pantry', amount: 38.90, percentage: 14 },
      { name: 'Other', amount: 32.35, percentage: 11 },
    ]
  };

  const totalPrice = shoppingList.reduce((sum, item) => sum + (item.estimatedPrice || 0), 0);
  const checkedItems = shoppingList.filter(item => item.checked);

  const handleAddToShoppingList = () => {
    if (newItem.name.trim()) {
      addToShoppingList({
        name: newItem.name,
        quantity: newItem.quantity || '1',
        checked: false,
        estimatedPrice: newItem.estimatedPrice
      });
      setNewItem({ name: '', quantity: '', estimatedPrice: 0 });
      setShowAddModal(false);
    }
  };

  const handleReceiptScan = () => {
    // Simulate OCR processing
    const mockItems = [
      { name: 'Organic Tomatoes', price: 4.99, store: 'Whole Foods' },
      { name: 'Whole Milk', price: 3.49, store: 'Whole Foods' },
      { name: 'Sourdough Bread', price: 4.99, store: 'Whole Foods' }
    ];
    
    setReceiptItems(mockItems);
    
    // Process each item
    mockItems.forEach(item => {
      const existingItem = groceryItems.find(gi => gi.name.toLowerCase() === item.name.toLowerCase());
      
      if (existingItem) {
        // Check if price is different
        if (existingItem.lastPrice !== item.price) {
          updateGroceryItemPrice(existingItem.id, item.price, item.store);
        }
      } else {
        // Add new item
        addGroceryItem({
          name: item.name,
          category: 'Produce', // Would be determined by AI
          prices: [{ price: item.price, store: item.store, date: new Date() }],
          lastPrice: item.price
        });
      }
    });
    
    setShowReceiptModal(false);
  };

  const showPriceHistory = (item: any) => {
    setSelectedItem(item);
    setShowPriceModal(true);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8"
      >
        <div>
          <h1 className="text-3xl font-serif font-bold text-slate-900 mb-2">Grocery Management</h1>
          <p className="text-slate-600">Track your shopping lists and grocery spending</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowReceiptModal(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-seafoam-500 to-pistachio-500 text-white rounded-lg hover:shadow-lg transition-all duration-200 mt-4 sm:mt-0"
        >
          <Scan className="w-4 h-4" />
          <span>Scan Receipt</span>
        </motion.button>
      </motion.div>

      {/* Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-8"
      >
        <div className="flex space-x-1 bg-white/80 backdrop-blur-sm rounded-lg p-1 border border-seafoam-200/30">
          {[
            { id: 'shopping', label: 'Shopping List', icon: ShoppingCart },
            { id: 'items', label: 'Items Database', icon: Package },
            { id: 'receipts', label: 'Receipts', icon: Receipt },
            { id: 'budget', label: 'Budget', icon: TrendingUp },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                  activeTab === tab.id
                    ? 'bg-seafoam-500 text-white shadow-sm'
                    : 'text-slate-600 hover:text-seafoam-700 hover:bg-seafoam-50'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="font-medium">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </motion.div>

      {/* Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        {activeTab === 'shopping' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Shopping List */}
            <div className="lg:col-span-2">
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-seafoam-200/30">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-slate-900">Current Shopping List</h2>
                  <button 
                    onClick={() => setShowAddModal(true)}
                    className="flex items-center space-x-2 px-3 py-2 text-seafoam-700 hover:bg-seafoam-50 rounded-lg transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Item</span>
                  </button>
                </div>
                
                <div className="space-y-3">
                  {shoppingList.map((item) => (
                    <div
                      key={item.id}
                      className={`flex items-center space-x-3 p-3 rounded-lg border transition-colors ${
                        item.checked
                          ? 'bg-pistachio-50 border-pistachio-200'
                          : 'bg-white/50 border-seafoam-200 hover:bg-white/80'
                      }`}
                    >
                      <button
                        onClick={() => updateShoppingListItem(item.id, { checked: !item.checked })}
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                          item.checked
                            ? 'bg-pistachio-500 border-pistachio-500'
                            : 'border-slate-300 hover:border-seafoam-500'
                        }`}
                      >
                        {item.checked && <Check className="w-3 h-3 text-white" />}
                      </button>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className={`font-medium ${item.checked ? 'text-pistachio-700 line-through' : 'text-slate-900'}`}>
                            {item.name}
                          </span>
                          {item.estimatedPrice && (
                            <span className={`text-sm ${item.checked ? 'text-pistachio-600' : 'text-slate-600'}`}>
                              ${item.estimatedPrice.toFixed(2)}
                            </span>
                          )}
                        </div>
                        <span className={`text-sm ${item.checked ? 'text-pistachio-600' : 'text-slate-500'}`}>
                          {item.quantity}
                        </span>
                      </div>
                      <button 
                        onClick={() => removeFromShoppingList(item.id)}
                        className="p-1 text-slate-400 hover:text-strawberry-500 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Summary */}
            <div className="space-y-6">
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-seafoam-200/30">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Shopping Summary</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Total Items:</span>
                    <span className="font-medium">{shoppingList.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Completed:</span>
                    <span className="font-medium text-pistachio-600">{checkedItems.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Remaining:</span>
                    <span className="font-medium text-strawberry-600">{shoppingList.length - checkedItems.length}</span>
                  </div>
                  <div className="border-t pt-3">
                    <div className="flex justify-between">
                      <span className="font-semibold text-slate-900">Estimated Total:</span>
                      <span className="font-bold text-lg text-slate-900">${totalPrice.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-seafoam-200/30">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <button className="w-full flex items-center space-x-3 p-3 text-left bg-seafoam-50 hover:bg-seafoam-100 rounded-lg transition-colors">
                    <Camera className="w-5 h-5 text-seafoam-600" />
                    <span className="text-seafoam-700 font-medium">Scan Barcode</span>
                  </button>
                  <button className="w-full flex items-center space-x-3 p-3 text-left bg-pistachio-50 hover:bg-pistachio-100 rounded-lg transition-colors">
                    <Upload className="w-5 h-5 text-pistachio-600" />
                    <span className="text-pistachio-700 font-medium">Import from Recipe</span>
                  </button>
                  <button 
                    onClick={() => setShowReceiptModal(true)}
                    className="w-full flex items-center space-x-3 p-3 text-left bg-strawberry-50 hover:bg-strawberry-100 rounded-lg transition-colors"
                  >
                    <Scan className="w-5 h-5 text-strawberry-600" />
                    <span className="text-strawberry-700 font-medium">Scan Receipt</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'items' && (
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-seafoam-200/30">
            <h2 className="text-xl font-semibold text-slate-900 mb-6">Items Database</h2>
            <div className="space-y-4">
              {groceryItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-4 bg-white/50 rounded-lg border border-seafoam-200/30"
                >
                  <div className="flex-1">
                    <h3 className="font-semibold text-slate-900">{item.name}</h3>
                    <div className="flex items-center space-x-4 text-sm text-slate-600">
                      <span className="px-2 py-1 bg-seafoam-100 text-seafoam-700 rounded-full text-xs">
                        {item.category}
                      </span>
                      <span>Last: ${item.lastPrice.toFixed(2)}</span>
                      <span>Avg: ${item.averagePrice.toFixed(2)}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => showPriceHistory(item)}
                      className="p-2 text-slate-600 hover:text-seafoam-700 rounded-lg hover:bg-seafoam-50 transition-colors"
                    >
                      <History className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => addToShoppingList({ name: item.name, quantity: '1', checked: false, estimatedPrice: item.averagePrice })}
                      className="p-2 text-slate-600 hover:text-pistachio-700 rounded-lg hover:bg-pistachio-50 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'receipts' && (
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-seafoam-200/30">
            <h2 className="text-xl font-semibold text-slate-900 mb-6">Recent Receipts</h2>
            <div className="space-y-4">
              {recentReceipts.map((receipt) => (
                <div
                  key={receipt.id}
                  className="flex items-center space-x-4 p-4 bg-white/50 rounded-lg border border-seafoam-200/30 hover:bg-white/80 transition-colors"
                >
                  <div className="w-12 h-12 rounded-lg overflow-hidden bg-slate-100">
                    <img src={receipt.image} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-slate-900">{receipt.store}</h3>
                    <div className="flex items-center space-x-4 text-sm text-slate-600">
                      <span className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(receipt.date).toLocaleDateString()}</span>
                      </span>
                      <span>{receipt.items} items</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-lg text-slate-900">${receipt.total.toFixed(2)}</div>
                    <button className="text-seafoam-600 hover:text-seafoam-700 text-sm">
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'budget' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-seafoam-200/30">
              <h2 className="text-xl font-semibold text-slate-900 mb-6">Monthly Budget</h2>
              <div className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-slate-900">${budgetData.thisMonth.toFixed(2)}</div>
                  <div className="text-slate-600">Spent this month</div>
                  <div className="w-full bg-slate-200 rounded-full h-2 mt-2">
                    <div 
                      className="bg-gradient-to-r from-seafoam-500 to-pistachio-500 h-2 rounded-full"
                      style={{ width: `${(budgetData.thisMonth / budgetData.budget) * 100}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-sm text-slate-600 mt-1">
                    <span>$0</span>
                    <span>${budgetData.budget.toFixed(2)} budget</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-white/50 rounded-lg">
                    <div className="text-lg font-semibold text-slate-900">${budgetData.lastMonth.toFixed(2)}</div>
                    <div className="text-sm text-slate-600">Last month</div>
                  </div>
                  <div className="text-center p-4 bg-white/50 rounded-lg">
                    <div className="text-lg font-semibold text-pistachio-600">
                      ${(budgetData.budget - budgetData.thisMonth).toFixed(2)}
                    </div>
                    <div className="text-sm text-slate-600">Remaining</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-seafoam-200/30">
              <h2 className="text-xl font-semibold text-slate-900 mb-6">Spending by Category</h2>
              <div className="space-y-4">
                {budgetData.categories.map((category) => (
                  <div key={category.name} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-seafoam-500 rounded-full"></div>
                      <span className="text-slate-900">{category.name}</span>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-slate-900">${category.amount.toFixed(2)}</div>
                      <div className="text-sm text-slate-600">{category.percentage}%</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </motion.div>

      {/* Add Item Modal */}
      {showAddModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setShowAddModal(false)}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-xl p-6 max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Add Item to Shopping List</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Item Name</label>
                <input
                  type="text"
                  value={newItem.name}
                  onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                  className="w-full px-3 py-2 border border-seafoam-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-seafoam-500"
                  placeholder="e.g., Organic Tomatoes"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Quantity</label>
                <input
                  type="text"
                  value={newItem.quantity}
                  onChange={(e) => setNewItem({ ...newItem, quantity: e.target.value })}
                  className="w-full px-3 py-2 border border-seafoam-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-seafoam-500"
                  placeholder="e.g., 2 lbs"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Estimated Price</label>
                <input
                  type="number"
                  step="0.01"
                  value={newItem.estimatedPrice}
                  onChange={(e) => setNewItem({ ...newItem, estimatedPrice: parseFloat(e.target.value) || 0 })}
                  className="w-full px-3 py-2 border border-seafoam-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-seafoam-500"
                  placeholder="0.00"
                />
              </div>
            </div>
            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => setShowAddModal(false)}
                className="flex-1 px-4 py-2 text-slate-700 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAddToShoppingList}
                className="flex-1 px-4 py-2 bg-seafoam-500 text-white rounded-lg hover:bg-seafoam-600 transition-colors"
              >
                Add Item
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Receipt Scan Modal */}
      {showReceiptModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setShowReceiptModal(false)}
        >
          
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-xl p-6 max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Scan Receipt</h3>
            <div className="space-y-4">
              <div className="border-2 border-dashed border-seafoam-300 rounded-lg p-8 text-center">
                <Scan className="w-12 h-12 text-seafoam-400 mx-auto mb-4" />
                <p className="text-slate-600 mb-4">Take a photo or upload your receipt</p>
                <div className="flex space-x-4">
                  <button 
                    onClick={handleReceiptScan}
                    className="flex-1 px-4 py-2 bg-seafoam-500 text-white rounded-lg hover:bg-seafoam-600 transition-colors"
                  >
                    <Camera className="w-4 h-4 mx-auto" />
                    <span className="block text-sm mt-1">Camera</span>
                  </button>
                  <button 
                    onClick={handleReceiptScan}
                    className="flex-1 px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors"
                  >
                    <Upload className="w-4 h-4 mx-auto" />
                    <span className="block text-sm mt-1">Upload</span>
                  </button>
                </div>
              </div>
              <div className="bg-pistachio-50 border border-pistachio-200 rounded-lg p-3">
                <div className="flex items-start space-x-2">
                  <AlertCircle className="w-5 h-5 text-pistachio-600 mt-0.5 flex-shrink-0" />
                  <div className="text-sm text-pistachio-700">
                    <p className="font-medium mb-1">Smart Price Tracking</p>
                    <p>We'll automatically detect items and track price changes across different stores.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => setShowReceiptModal(false)}
                className="flex-1 px-4 py-2 text-slate-700 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Price History Modal */}
      {showPriceModal && selectedItem && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setShowPriceModal(false)}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-xl p-6 max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Price History: {selectedItem.name}</h3>
            <div className="space-y-3">
              {selectedItem.prices.map((price: any, index: number) => (
                <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                  <div>
                    <div className="font-medium text-slate-900">{price.store}</div>
                    <div className="text-sm text-slate-600">{new Date(price.date).toLocaleDateString()}</div>
                  </div>
                  <div className="text-lg font-semibold text-slate-900">${price.price.toFixed(2)}</div>
                </div>
              ))}
            </div>
            <div className="mt-6 p-3 bg-seafoam-50 rounded-lg">
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">Average Price:</span>
                <span className="font-medium text-slate-900">${selectedItem.averagePrice.toFixed(2)}</span>
              </div>
            </div>
            <button
              onClick={() => setShowPriceModal(false)}
              className="w-full mt-4 px-4 py-2 bg-seafoam-500 text-white rounded-lg hover:bg-seafoam-600 transition-colors"
            >
              Close
            </button>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default GroceryPage;