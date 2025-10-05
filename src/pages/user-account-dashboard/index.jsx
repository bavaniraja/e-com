import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useCart } from '../../contexts/CartContext';
import dataService from '../../services/dataService';
import Header from '../../components/ui/Header';
import DashboardSidebar from './components/DashboardSidebar';
import DashboardOverview from './components/DashboardOverview';
import OrderHistory from './components/OrderHistory';
import ProfileManagement from './components/ProfileManagement';
import AddressBook from './components/AddressBook';
import WishlistSection from './components/WishlistSection';
import PreferencesSection from './components/PreferencesSection';

const UserAccountDashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user: authUser, userProfile, loading } = useAuth();
  const { getCartItemCount } = useCart();
  const [activeSection, setActiveSection] = useState('overview');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Real orders data - moved before any useEffect that uses it
  const [orders, setOrders] = useState([]);

  // Redirect to login if user is not authenticated
  useEffect(() => {
    if (!loading && !authUser) {
      navigate('/user-login', { 
        state: { 
          from: '/user-account-dashboard',
          message: 'Please sign in to access your account dashboard'
        },
        replace: true
      });
    }
  }, [authUser, loading, navigate]);

  // Only use authenticated user data - no fallback data
  const [user, setUser] = useState({
    id: authUser?.id,
    name: authUser?.name || authUser?.email,
    email: authUser?.email,
    phone: authUser?.phone,
    dateOfBirth: authUser?.dateOfBirth,
    gender: authUser?.gender,
    memberSince: authUser?.memberSince,
    totalOrders: authUser?.totalOrders || 0,
    totalSpent: authUser?.totalSpent || 0,
    totalSaved: authUser?.totalSaved || 0,
    loyaltyPoints: authUser?.loyaltyPoints || 0,
    cartItemCount: getCartItemCount(),
    wishlistCount: authUser?.wishlistCount || 0,
    lastPasswordChange: authUser?.lastPasswordChange
  });

  // Calculate real user stats from orders
  useEffect(() => {
    if (orders.length > 0) {
      const totalSpent = orders.reduce((sum, order) => sum + (parseFloat(order.total) || 0), 0);
      const totalSaved = orders.reduce((sum, order) => sum + (parseFloat(order.discount) || 0), 0);
      const loyaltyPoints = Math.floor(totalSpent * 0.1); // 10% of spending as points
      
      setUser(prev => ({
        ...prev,
        totalOrders: orders.length,
        totalSpent: totalSpent.toFixed(2),
        totalSaved: totalSaved.toFixed(2),
        loyaltyPoints: loyaltyPoints,
        cartItemCount: getCartItemCount()
      }));
    }
  }, [orders, getCartItemCount]);

  // Update user data when authUser changes
  useEffect(() => {
    if (authUser) {
      setUser({
        id: authUser.id || 1,
        name: authUser.name || authUser.email || "Guest User",
        email: authUser.email || "guest@example.com",
        phone: authUser.phone || "+91 9876543210",
        dateOfBirth: authUser.dateOfBirth || "1990-05-15",
        gender: authUser.gender || "Not specified",
        memberSince: authUser.memberSince || "January 2023",
        totalOrders: authUser.totalOrders || 0,
        totalSpent: authUser.totalSpent || "0",
        totalSaved: authUser.totalSaved || "0",
        loyaltyPoints: authUser.loyaltyPoints || 0,
        wishlistCount: authUser.wishlistCount || 0,
        lastPasswordChange: authUser.lastPasswordChange || "Not set"
      });
    }
  }, [authUser]);

  // Load user orders
  useEffect(() => {
    const loadUserOrders = () => {
      try {
        const userOrders = dataService.getOrdersByUserId(user?.id);
        console.log('Loaded user orders:', userOrders);
        setOrders(userOrders);
      } catch (error) {
        console.error('Error loading user orders:', error);
        setOrders([]);
      }
    };

    if (user?.id) {
      loadUserOrders();
    }
  }, [user?.id]);

  // Mock addresses data
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      name: "Priya Sharma",
      phone: "+91 9876543210",
      street: "123, MG Road, Koramangala",
      city: "Bengaluru",
      state: "Karnataka",
      pincode: "560034",
      landmark: "Near Forum Mall",
      addressType: "Home",
      isDefault: true
    },
    {
      id: 2,
      name: "Priya Sharma",
      phone: "+91 9876543210",
      street: "456, Brigade Road, Commercial Street",
      city: "Bengaluru",
      state: "Karnataka",
      pincode: "560001",
      landmark: "Opposite Metro Station",
      addressType: "Work",
      isDefault: false
    }
  ]);

  // Mock wishlist data
  const [wishlistItems, setWishlistItems] = useState([
    {
      id: 1,
      name: "Organic Basmati Rice",
      price: 299.00,
      originalPrice: 349.00,
      image: "https://images.pexels.com/photos/4198015/pexels-photo-4198015.jpeg",
      variants: ["1kg", "2kg", "5kg"],
      selectedVariant: "1kg",
      inStock: true,
      rating: 4.5,
      reviewCount: 128,
      badges: ["Organic", "Premium"],
      addedDate: "2024-08-20T10:30:00Z"
    },
    {
      id: 2,
      name: "Cold Pressed Sesame Oil",
      price: 449.00,
      originalPrice: 499.00,
      image: "https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg",
      variants: ["500ml", "1L"],
      selectedVariant: "500ml",
      inStock: true,
      rating: 4.8,
      reviewCount: 89,
      badges: ["Cold Pressed"],
      addedDate: "2024-08-18T14:15:00Z"
    },
    {
      id: 3,
      name: "Handmade Pickle Combo",
      price: 599.00,
      originalPrice: 699.00,
      image: "https://images.pexels.com/photos/4198015/pexels-photo-4198015.jpeg",
      variants: ["3 Jars", "6 Jars"],
      selectedVariant: "3 Jars",
      inStock: false,
      rating: 4.3,
      reviewCount: 45,
      badges: ["Handmade", "Traditional"],
      addedDate: "2024-08-15T09:45:00Z"
    }
  ]);

  // Mock preferences data
  const [preferences, setPreferences] = useState({
    emailNotifications: {
      orderUpdates: true,
      promotions: true,
      newsletter: false,
      productRecommendations: false,
      priceDropAlerts: true
    },
    smsNotifications: {
      orderUpdates: true,
      deliveryUpdates: true,
      promotions: false
    },
    privacy: {
      profileVisibility: 'private',
      dataSharing: false,
      marketingCommunication: false
    },
    shopping: {
      currency: 'INR',
      language: 'English',
      defaultPaymentMethod: 'COD',
      savePaymentMethods: false
    }
  });

  // Mock cart data
  const [cartItems] = useState([
    {
      id: 1,
      name: "Organic Turmeric Powder",
      variant: "500g",
      price: 299.00,
      quantity: 1,
      image: "https://images.pexels.com/photos/4198015/pexels-photo-4198015.jpeg"
    }
  ]);

  const recentOrders = orders?.slice(0, 3);
  const loyaltyPoints = user?.loyaltyPoints;

  // Handle section changes from URL params
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const section = urlParams?.get('section');
    if (section && ['overview', 'orders', 'profile', 'addresses', 'wishlist', 'preferences']?.includes(section)) {
      setActiveSection(section);
    }
  }, [location]);

  const handleSectionChange = (section) => {
    setActiveSection(section);
    setIsMobileSidebarOpen(false);
  };

  const handleUpdateProfile = (updatedData) => {
    setUser(prev => ({
      ...prev,
      ...updatedData
    }));
    console.log('Profile updated:', updatedData);
  };

  const handleAddAddress = (addressData) => {
    const newAddress = {
      id: Date.now(),
      ...addressData,
      isDefault: addresses?.length === 0
    };
    setAddresses(prev => [...prev, newAddress]);
    console.log('Address added:', newAddress);
  };

  const handleUpdateAddress = (id, updatedData) => {
    setAddresses(prev => prev?.map(addr => 
      addr?.id === id ? { ...addr, ...updatedData } : addr
    ));
    console.log('Address updated:', id, updatedData);
  };

  const handleDeleteAddress = (id) => {
    setAddresses(prev => prev?.filter(addr => addr?.id !== id));
    console.log('Address deleted:', id);
  };

  const handleSetDefaultAddress = (id) => {
    setAddresses(prev => prev?.map(addr => ({
      ...addr,
      isDefault: addr?.id === id
    })));
    console.log('Default address set:', id);
  };

  const handleRemoveFromWishlist = (id) => {
    setWishlistItems(prev => prev?.filter(item => item?.id !== id));
    console.log('Removed from wishlist:', id);
  };

  const handleAddToCart = (item) => {
    console.log('Added to cart:', item);
    // Handle add to cart logic
  };

  const handleUpdatePreferences = (updatedPreferences) => {
    setPreferences(updatedPreferences);
    console.log('Preferences updated:', updatedPreferences);
  };

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'orders':
        return <OrderHistory orders={orders} />;
      case 'profile':
        return <ProfileManagement user={user} onUpdateProfile={handleUpdateProfile} />;
      case 'addresses':
        return (
          <AddressBook
            addresses={addresses}
            onAddAddress={handleAddAddress}
            onUpdateAddress={handleUpdateAddress}
            onDeleteAddress={handleDeleteAddress}
            onSetDefault={handleSetDefaultAddress}
          />
        );
      case 'wishlist':
        return (
          <WishlistSection
            wishlistItems={wishlistItems}
            onRemoveFromWishlist={handleRemoveFromWishlist}
            onAddToCart={handleAddToCart}
          />
        );
      case 'preferences':
        return (
          <PreferencesSection
            preferences={preferences}
            onUpdatePreferences={handleUpdatePreferences}
          />
        );
      case 'overview':
      default:
        return (
          <DashboardOverview
            user={user}
            recentOrders={recentOrders}
            loyaltyPoints={loyaltyPoints}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header 
        isLoggedIn={!!authUser}
        onSearch={(query) => console.log('Search:', query)}
      />
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Mobile Sidebar Toggle */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
              className="w-full bg-card border border-border rounded-lg p-4 flex items-center justify-between"
            >
              <span className="font-body font-medium text-foreground">
                Account Menu
              </span>
              <span className="text-muted-foreground">
                {isMobileSidebarOpen ? '×' : '☰'}
              </span>
            </button>
            
            {isMobileSidebarOpen && (
              <div className="mt-4">
                <DashboardSidebar
                  user={user}
                  onSectionChange={handleSectionChange}
                  activeSection={activeSection}
                />
              </div>
            )}
          </div>

          {/* Desktop Sidebar */}
          <div className="hidden lg:block lg:w-1/4">
            <DashboardSidebar
              user={user}
              onSectionChange={handleSectionChange}
              activeSection={activeSection}
            />
          </div>

          {/* Main Content */}
          <div className="flex-1 lg:w-3/4">
            {renderActiveSection()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserAccountDashboard;