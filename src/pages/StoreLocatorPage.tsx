import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  MapPin, 
  Navigation, 
  Phone, 
  Clock, 
  Star,
  Search,
  Filter,
  Map,
  List
} from 'lucide-react';

interface Store {
  id: string;
  name: string;
  address: string;
  phone: string;
  hours: string;
  rating: number;
  distance: number;
  type: string;
  image: string;
}

const StoreLocatorPage = () => {
  const [viewMode, setViewMode] = useState<'map' | 'list'>('list');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [locationPermission, setLocationPermission] = useState<'granted' | 'denied' | 'pending'>('pending');

  // Mock store data - in real app, this would come from Google Maps API
  const [stores] = useState<Store[]>([
    {
      id: '1',
      name: 'Whole Foods Market',
      address: '123 Main St, Downtown',
      phone: '(555) 123-4567',
      hours: '8:00 AM - 10:00 PM',
      rating: 4.5,
      distance: 0.8,
      type: 'Grocery Store',
      image: 'https://images.pexels.com/photos/264636/pexels-photo-264636.jpeg?auto=compress&cs=tinysrgb&w=200'
    },
    {
      id: '2',
      name: 'Trader Joe\'s',
      address: '456 Oak Ave, Midtown',
      phone: '(555) 234-5678',
      hours: '9:00 AM - 9:00 PM',
      rating: 4.3,
      distance: 1.2,
      type: 'Grocery Store',
      image: 'https://images.pexels.com/photos/264636/pexels-photo-264636.jpeg?auto=compress&cs=tinysrgb&w=200'
    },
    {
      id: '3',
      name: 'Central Market',
      address: '789 Pine St, Uptown',
      phone: '(555) 345-6789',
      hours: '7:00 AM - 11:00 PM',
      rating: 4.7,
      distance: 2.1,
      type: 'Farmers Market',
      image: 'https://images.pexels.com/photos/1435904/pexels-photo-1435904.jpeg?auto=compress&cs=tinysrgb&w=200'
    },
    {
      id: '4',
      name: 'Fresh & Easy',
      address: '321 Elm St, Westside',
      phone: '(555) 456-7890',
      hours: '6:00 AM - 12:00 AM',
      rating: 4.1,
      distance: 2.8,
      type: 'Grocery Store',
      image: 'https://images.pexels.com/photos/264636/pexels-photo-264636.jpeg?auto=compress&cs=tinysrgb&w=200'
    },
    {
      id: '5',
      name: 'Organic Valley Co-op',
      address: '654 Maple Dr, Eastside',
      phone: '(555) 567-8901',
      hours: '8:00 AM - 8:00 PM',
      rating: 4.6,
      distance: 3.2,
      type: 'Organic Store',
      image: 'https://images.pexels.com/photos/1435904/pexels-photo-1435904.jpeg?auto=compress&cs=tinysrgb&w=200'
    },
    {
      id: '6',
      name: 'International Food Market',
      address: '987 Cedar Ln, Southside',
      phone: '(555) 678-9012',
      hours: '9:00 AM - 10:00 PM',
      rating: 4.4,
      distance: 4.1,
      type: 'Specialty Store',
      image: 'https://images.pexels.com/photos/1435904/pexels-photo-1435904.jpeg?auto=compress&cs=tinysrgb&w=200'
    }
  ]);

  const storeTypes = [
    { id: 'all', label: 'All Stores', count: stores.length },
    { id: 'grocery', label: 'Grocery Stores', count: stores.filter(s => s.type === 'Grocery Store').length },
    { id: 'farmers', label: 'Farmers Markets', count: stores.filter(s => s.type === 'Farmers Market').length },
    { id: 'organic', label: 'Organic Stores', count: stores.filter(s => s.type === 'Organic Store').length },
    { id: 'specialty', label: 'Specialty Stores', count: stores.filter(s => s.type === 'Specialty Store').length }
  ];

  useEffect(() => {
    requestLocation();
  }, []);

  const requestLocation = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
          setLocationPermission('granted');
        },
        (error) => {
          console.error('Error getting location:', error);
          setLocationPermission('denied');
        }
      );
    } else {
      setLocationPermission('denied');
    }
  };

  const filteredStores = stores.filter(store => {
    const matchesSearch = store.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         store.address.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = selectedType === 'all' || 
                       (selectedType === 'grocery' && store.type === 'Grocery Store') ||
                       (selectedType === 'farmers' && store.type === 'Farmers Market') ||
                       (selectedType === 'organic' && store.type === 'Organic Store') ||
                       (selectedType === 'specialty' && store.type === 'Specialty Store');
    
    return matchesSearch && matchesType;
  }).sort((a, b) => a.distance - b.distance);

  const getDirections = (store: Store) => {
    const query = encodeURIComponent(store.address);
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${query}`, '_blank');
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
          <h1 className="text-3xl font-serif font-bold text-slate-900 mb-2">Store Locator</h1>
          <p className="text-slate-600">Find grocery stores and markets near you</p>
          {locationPermission === 'granted' && userLocation && (
            <p className="text-sm text-seafoam-600 mt-1">
              📍 Using your current location
            </p>
          )}
        </div>
        <div className="flex items-center space-x-4 mt-4 sm:mt-0">
          <div className="flex items-center bg-white/80 backdrop-blur-sm rounded-lg border border-seafoam-200/30">
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'list' ? 'bg-seafoam-500 text-white' : 'text-slate-600 hover:text-seafoam-700'
              }`}
            >
              <List className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('map')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'map' ? 'bg-seafoam-500 text-white' : 'text-slate-600 hover:text-seafoam-700'
              }`}
            >
              <Map className="w-4 h-4" />
            </button>
          </div>
          {locationPermission === 'denied' && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={requestLocation}
              className="flex items-center space-x-2 px-4 py-2 bg-pistachio-500 text-white rounded-lg hover:bg-pistachio-600 transition-colors"
            >
              <Navigation className="w-4 h-4" />
              <span>Enable Location</span>
            </motion.button>
          )}
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
              placeholder="Search stores or addresses..."
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

        {/* Store Type Tabs */}
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {storeTypes.map((type) => (
            <button
              key={type.id}
              onClick={() => setSelectedType(type.id)}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedType === type.id
                  ? 'bg-seafoam-500 text-white'
                  : 'bg-white/80 text-slate-700 hover:bg-white/90'
              }`}
            >
              {type.label} ({type.count})
            </button>
          ))}
        </div>
      </motion.div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {viewMode === 'map' ? (
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-seafoam-200/30">
            <div className="aspect-video bg-slate-100 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <Map className="w-12 h-12 text-slate-400 mx-auto mb-2" />
                <p className="text-slate-600 font-medium">Interactive Map View</p>
                <p className="text-sm text-slate-500 mt-1">Google Maps integration would be embedded here</p>
                {userLocation && (
                  <p className="text-xs text-seafoam-600 mt-2">
                    Your location: {userLocation.lat.toFixed(4)}, {userLocation.lng.toFixed(4)}
                  </p>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredStores.map((store, index) => (
              <motion.div
                key={store.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-seafoam-200/30 hover:shadow-lg transition-all duration-200"
              >
                <div className="flex items-start space-x-4">
                  <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                    <img 
                      src={store.image} 
                      alt={store.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-semibold text-slate-900 text-lg">{store.name}</h3>
                        <p className="text-sm text-slate-600">{store.type}</p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center space-x-1 mb-1">
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          <span className="text-sm font-medium text-slate-900">{store.rating}</span>
                        </div>
                        <p className="text-sm text-seafoam-600 font-medium">{store.distance} mi</p>
                      </div>
                    </div>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center space-x-2 text-sm text-slate-600">
                        <MapPin className="w-4 h-4 text-seafoam-600" />
                        <span>{store.address}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-slate-600">
                        <Phone className="w-4 h-4 text-seafoam-600" />
                        <span>{store.phone}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-slate-600">
                        <Clock className="w-4 h-4 text-seafoam-600" />
                        <span>{store.hours}</span>
                      </div>
                    </div>

                    <div className="flex space-x-3">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => getDirections(store)}
                        className="flex items-center space-x-2 px-4 py-2 bg-seafoam-500 text-white rounded-lg hover:bg-seafoam-600 transition-colors"
                      >
                        <Navigation className="w-4 h-4" />
                        <span>Directions</span>
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center space-x-2 px-4 py-2 bg-pistachio-500 text-white rounded-lg hover:bg-pistachio-600 transition-colors"
                      >
                        <Phone className="w-4 h-4" />
                        <span>Call</span>
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>

      {filteredStores.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <MapPin className="w-16 h-16 text-slate-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-slate-900 mb-2">No stores found</h3>
          <p className="text-slate-600">Try adjusting your search or filters</p>
        </motion.div>
      )}
    </div>
  );
};

export default StoreLocatorPage;