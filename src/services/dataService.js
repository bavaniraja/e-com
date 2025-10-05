// Import database data
import databaseData from '../data/database.json';


// Mock data service to simulate API calls
const additionalProducts = [
  // Unpolished Pulses, Dals & Rice
  {
    id: 1,
    name: "Bengal Gram Dal",
    category: "unpolished-pulses-dals-rice",
    price: 120,
    originalPrice: 140,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=300&fit=crop",
    description: "Premium quality Bengal gram dal, rich in protein",
    inStock: true,
    weight: "1kg"
  },
  {
    id: 2,
    name: "Black Chickpeas",
    category: "unpolished-pulses-dals-rice",
    price: 110,
    originalPrice: 130,
    rating: 4.3,
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=300&fit=crop",
    description: "Nutritious black chickpeas for healthy cooking",
    inStock: true,
    weight: "500g"
  },
  {
    id: 3,
    name: "Green Gram",
    category: "unpolished-pulses-dals-rice",
    price: 95,
    originalPrice: 115,
    rating: 4.4,
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=300&fit=crop",
    description: "Fresh green gram for traditional recipes",
    inStock: true,
    weight: "1kg"
  },
  {
    id: 4,
    name: "Horse Gram",
    category: "unpolished-pulses-dals-rice",
    price: 85,
    originalPrice: 100,
    rating: 4.2,
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=300&fit=crop",
    description: "High protein horse gram for health conscious",
    inStock: true,
    weight: "500g"
  },
  {
    id: 5,
    name: "Idly Rice",
    category: "unpolished-pulses-dals-rice",
    price: 65,
    originalPrice: 75,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=300&fit=crop",
    description: "Perfect rice for making soft idlies",
    inStock: true,
    weight: "1kg"
  },
  {
    id: 6,
    name: "Jeera Samba Rice",
    category: "unpolished-pulses-dals-rice",
    price: 150,
    originalPrice: 170,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=300&fit=crop",
    description: "Aromatic jeera samba rice variety",
    inStock: true,
    weight: "1kg"
  },
  {
    id: 7,
    name: "Karuppu Kavuni Rice 1Kg",
    category: "unpolished-pulses-dals-rice",
    price: 180,
    originalPrice: 200,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=300&fit=crop",
    description: "Traditional black rice with antioxidants",
    inStock: true,
    weight: "1kg"
  },
  {
    id: 8,
    name: "Toor Dal 1Kg",
    category: "unpolished-pulses-dals-rice",
    price: 130,
    originalPrice: 150,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=300&fit=crop",
    description: "Pure toor dal for everyday cooking",
    inStock: true,
    weight: "1kg"
  },

  // Poha / Aval
  {
    id: 9,
    name: "Mapillai Samba Aval",
    category: "poha-aval",
    price: 80,
    originalPrice: 95,
    rating: 4.4,
    image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400&h=300&fit=crop",
    description: "Traditional mapillai samba flattened rice",
    inStock: true,
    weight: "500g"
  },
  {
    id: 10,
    name: "Ponni Boiled Aval",
    category: "poha-aval",
    price: 70,
    originalPrice: 85,
    rating: 4.3,
    image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400&h=300&fit=crop",
    description: "Quality ponni boiled aval for breakfast",
    inStock: true,
    weight: "500g"
  },
  {
    id: 11,
    name: "Wheat Aval",
    category: "poha-aval",
    price: 75,
    originalPrice: 90,
    rating: 4.2,
    image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400&h=300&fit=crop",
    description: "Nutritious wheat aval for healthy meals",
    inStock: true,
    weight: "500g"
  },

  // Sugars & Honey
  {
    id: 12,
    name: "Cane Sugar 1Kg",
    category: "sugars-honey",
    price: 90,
    originalPrice: 105,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=400&h=300&fit=crop",
    description: "Pure cane sugar for natural sweetness",
    inStock: true,
    weight: "1kg"
  },
  {
    id: 13,
    name: "Cane Jaggery 1Kg",
    category: "sugars-honey",
    price: 120,
    originalPrice: 140,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=400&h=300&fit=crop",
    description: "Traditional cane jaggery for healthy cooking",
    inStock: true,
    weight: "1kg"
  },
  {
    id: 14,
    name: "Honey 500g",
    category: "sugars-honey",
    price: 300,
    originalPrice: 350,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=400&h=300&fit=crop",
    description: "Pure organic honey from local farms",
    inStock: true,
    weight: "500g"
  },

  // Haircare Products
  {
    id: 15,
    name: "Aloe Vera Shampoo 500ml",
    category: "haircare-products",
    price: 250,
    originalPrice: 300,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400&h=300&fit=crop",
    description: "Natural aloe vera shampoo for healthy hair",
    inStock: true,
    weight: "500ml"
  },
  {
    id: 16,
    name: "Amla Shampoo 200ml",
    category: "haircare-products",
    price: 180,
    originalPrice: 220,
    rating: 4.4,
    image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400&h=300&fit=crop",
    description: "Amla enriched shampoo for strong hair",
    inStock: true,
    weight: "200ml"
  },
  {
    id: 17,
    name: "Hair Oil Mix 65gm",
    category: "haircare-products",
    price: 150,
    originalPrice: 180,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400&h=300&fit=crop",
    description: "Herbal hair oil mix for nourishment",
    inStock: true,
    weight: "65g"
  },

  // Skincare Products
  {
    id: 18,
    name: "Aloe Vera Gel 150g",
    category: "skincare-products",
    price: 120,
    originalPrice: 140,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=400&h=300&fit=crop",
    description: "Pure aloe vera gel for skin care",
    inStock: true,
    weight: "150g"
  },
  {
    id: 19,
    name: "Rose Water 200ml",
    category: "skincare-products",
    price: 80,
    originalPrice: 100,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=400&h=300&fit=crop",
    description: "Natural rose water for glowing skin",
    inStock: true,
    weight: "200ml"
  },

  // Millet Items
  {
    id: 20,
    name: "Millet Biscuits",
    category: "millet-items",
    price: 90,
    originalPrice: 110,
    rating: 4.3,
    image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400&h=300&fit=crop",
    description: "Healthy millet biscuits for snacking",
    inStock: true,
    weight: "200g"
  },
  {
    id: 21,
    name: "Pearl Millet 500g",
    category: "millet-items",
    price: 85,
    originalPrice: 100,
    rating: 4.4,
    image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400&h=300&fit=crop",
    description: "Nutritious pearl millet for healthy diet",
    inStock: true,
    weight: "500g"
  },

  // Powders
  {
    id: 22,
    name: "Turmeric Powder 200g",
    category: "powders",
    price: 60,
    originalPrice: 75,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1505576399279-565b52d4ac71?w=400&h=300&fit=crop",
    description: "Pure turmeric powder for cooking and health",
    inStock: true,
    weight: "200g"
  },
  {
    id: 23,
    name: "Sambar Powder 200g",
    category: "powders",
    price: 85,
    originalPrice: 100,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1505576399279-565b52d4ac71?w=400&h=300&fit=crop",
    description: "Authentic sambar powder blend",
    inStock: true,
    weight: "200g"
  },

  // Fries
  {
    id: 24,
    name: "Rice Fries 100g",
    category: "fries",
    price: 45,
    originalPrice: 55,
    rating: 4.2,
    image: "https://images.unsplash.com/photo-1601314002957-dd80bd16ac23?w=400&h=300&fit=crop",
    description: "Crispy rice fries for side dishes",
    inStock: true,
    weight: "100g"
  },

  // Herbal Handmade Soaps
  {
    id: 25,
    name: "Neem Handmade Soap",
    category: "herbal-handmade-soaps",
    price: 65,
    originalPrice: 80,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=300&fit=crop",
    description: "Natural neem soap for skin care",
    inStock: true,
    weight: "100g"
  },
  {
    id: 26,
    name: "Turmeric Handmade Soap",
    category: "herbal-handmade-soaps",
    price: 70,
    originalPrice: 85,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=300&fit=crop",
    description: "Turmeric enriched soap for glowing skin",
    inStock: true,
    weight: "100g"
  },

  // Snacks
  {
    id: 27,
    name: "Ragi Laddu 100g",
    category: "snacks",
    price: 120,
    originalPrice: 140,
    rating: 4.4,
    image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400&h=300&fit=crop",
    description: "Healthy ragi laddu for energy",
    inStock: true,
    weight: "100g"
  },
  {
    id: 28,
    name: "Sesame Laddu 100g",
    category: "snacks",
    price: 110,
    originalPrice: 130,
    rating: 4.3,
    image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400&h=300&fit=crop",
    description: "Traditional sesame laddu",
    inStock: true,
    weight: "100g"
  },

  // Herbal Products
  {
    id: 29,
    name: "Amla Powder 100g",
    category: "herbal-products",
    price: 95,
    originalPrice: 115,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1471943311424-646960669fbc?w=400&h=300&fit=crop",
    description: "Pure amla powder for health benefits",
    inStock: true,
    weight: "100g"
  },
  {
    id: 30,
    name: "Neem Leaf Powder",
    category: "herbal-products",
    price: 80,
    originalPrice: 95,
    rating: 4.4,
    image: "https://images.unsplash.com/photo-1471943311424-646960669fbc?w=400&h=300&fit=crop",
    description: "Natural neem leaf powder for wellness",
    inStock: true,
    weight: "100g"
  },

  // Herbal Powders
  {
    id: 31,
    name: "Moringa Powder",
    category: "herbal-powders",
    price: 150,
    originalPrice: 175,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1471943311424-646960669fbc?w=400&h=300&fit=crop",
    description: "Nutrient-rich moringa powder",
    inStock: true,
    weight: "100g"
  },
  {
    id: 32,
    name: "Hibiscus Powder 100g",
    category: "herbal-powders",
    price: 90,
    originalPrice: 110,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1471943311424-646960669fbc?w=400&h=300&fit=crop",
    description: "Natural hibiscus powder for hair care",
    inStock: true,
    weight: "100g"
  }
];

// Categories data with all 12 categories
const categories = [
  {
    id: 'unpolished-pulses-dals-rice',
    name: 'Unpolished Pulses, Dals & Rice',
    description: 'Chemical-free rice varieties and authentic pulses',
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=300&fit=crop',
    productCount: 8
  },
  {
    id: 'poha-aval',
    name: 'Poha / Aval',
    description: 'Traditional flattened rice varieties',
    image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400&h=300&fit=crop',
    productCount: 3
  },
  {
    id: 'sugars-honey',
    name: 'Sugars & Honey',
    description: 'Natural sweeteners and organic honey',
    image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=400&h=300&fit=crop',
    productCount: 3
  },
  {
    id: 'haircare-products',
    name: 'Haircare Products',
    description: 'Natural hair care solutions and oils',
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400&h=300&fit=crop',
    productCount: 3
  },
  {
    id: 'skincare-products',
    name: 'Skincare Products',
    description: 'Herbal skincare and beauty products',
    image: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=400&h=300&fit=crop',
    productCount: 2
  },
  {
    id: 'millet-items',
    name: 'Millet Items',
    description: 'Healthy millet-based food products',
    image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400&h=300&fit=crop',
    productCount: 2
  },
  {
    id: 'powders',
    name: 'Powders',
    description: 'Spice powders and cooking essentials',
    image: 'https://images.unsplash.com/photo-1505576399279-565b52d4ac71?w=400&h=300&fit=crop',
    productCount: 2
  },
  {
    id: 'fries',
    name: 'Fries',
    description: 'Traditional South Indian fries and appetizers',
    image: 'https://images.unsplash.com/photo-1601314002957-dd80bd16ac23?w=400&h=300&fit=crop',
    productCount: 1
  },
  {
    id: 'herbal-handmade-soaps',
    name: 'Herbal Handmade Soaps',
    description: 'Natural handmade soaps for skin care',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=300&fit=crop',
    productCount: 2
  },
  {
    id: 'snacks',
    name: 'Snacks',
    description: 'Healthy traditional snacks and sweets',
    image: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400&h=300&fit=crop',
    productCount: 2
  },
  {
    id: 'herbal-products',
    name: 'Herbal Products',
    description: 'Natural herbal remedies and wellness products',
    image: 'https://images.unsplash.com/photo-1471943311424-646960669fbc?w=400&h=300&fit=crop',
    productCount: 2
  },
  {
    id: 'herbal-powders',
    name: 'Herbal Powders',
    description: 'Pure herbal powders for health and beauty',
    image: 'https://images.unsplash.com/photo-1471943311424-646960669fbc?w=400&h=300&fit=crop',
    productCount: 2
  }
];

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Use users from database.json and extend with additional properties
let users = databaseData.users.map(user => ({
  ...user,
  id: parseInt(user.id),
  totalOrders: user.totalOrders || 0,
  totalSpent: user.totalSpent || 0,
  loyaltyPoints: user.loyaltyPoints || 0,
  totalSaved: user.totalSaved || 0
}));

// Load additional users from localStorage if available
const loadUsersFromStorage = () => {
  const stored = localStorage.getItem('neenu_natural_users');
  if (stored) {
    const storedUsers = JSON.parse(stored);
    // Merge with existing users, avoiding duplicates
    storedUsers.forEach(storedUser => {
      if (!users.find(u => u.id === storedUser.id || u.email === storedUser.email)) {
        users.push(storedUser);
      }
    });
  }
};

// Save users to localStorage
const saveUsersToStorage = () => {
  // Only save customer users (not admin) to storage
  const customerUsers = users.filter(u => u.role === 'customer');
  localStorage.setItem('neenu_natural_users', JSON.stringify(customerUsers));
};

// Initialize users on load
loadUsersFromStorage();

// Mock orders data - load from localStorage if available
let orders = [
  {
    id: 1,
    userId: 2,
    items: [
      { productId: 1, name: "Organic Coconut Oil", quantity: 2, price: 450 }
    ],
    total: 950,
    subtotal: 900,
    shipping: 50,
    status: "delivered",
    paymentMethod: "cod",
    shippingAddress: {
      name: "John Doe",
      street: "123 Main Street",
      city: "Mumbai",
      state: "Maharashtra",
      pincode: "400001"
    },
    createdAt: "2024-08-15T10:30:00Z"
  },
  {
    id: 2,
    userId: 2,
    items: [
      { productId: 2, name: "A2 Cow Ghee", quantity: 1, price: 850 }
    ],
    total: 900,
    subtotal: 850,
    shipping: 50,
    status: "shipped",
    paymentMethod: "upi",
    shippingAddress: {
      name: "John Doe",
      street: "123 Main Street",
      city: "Mumbai",
      state: "Maharashtra",
      pincode: "400001"
    },
    createdAt: "2024-08-20T14:15:00Z"
  }
];

// Load additional orders from localStorage if available
const loadOrdersFromStorage = () => {
  const stored = localStorage.getItem('neenu_natural_orders');
  if (stored) {
    const storedOrders = JSON.parse(stored);
    // Merge with existing orders, avoiding duplicates
    storedOrders.forEach(storedOrder => {
      if (!orders.find(o => o.id === storedOrder.id)) {
        orders.push(storedOrder);
      }
    });
  }
};

// Save orders to localStorage
const saveOrdersToStorage = () => {
  localStorage.setItem('neenu_natural_orders', JSON.stringify(orders));
};

// Initialize orders on load
loadOrdersFromStorage();

// Settings data
const settings = {
  siteName: "Neenu's Natural",
  currency: "INR",
  shippingFee: 50,
  freeShippingThreshold: 500,
  taxRate: 0.18
};

// Combine products from database.json and additional products with unique IDs
const products = [
  ...databaseData.products,
  ...additionalProducts.map(product => ({
    ...product,
    id: product.id + 100 // Offset additional products to avoid ID conflicts
  }))
];

const dataService = {
  // Authentication methods
  authenticate(emailOrUsername, password) {
    console.log('Authenticating user:', emailOrUsername);
    console.log('Available users:', users.map(u => ({ email: u.email, username: u.username, role: u.role })));
    const user = users.find(u => 
      (u.email === emailOrUsername || u.username === emailOrUsername) && 
      u.password === password
    );
    console.log('Found user:', user);
    return user || null;
  },

  // User management
  getUser(id) {
    return users.find(u => u.id === parseInt(id));
  },

  getUserByEmail(email) {
    return users.find(u => u.email === email);
  },

  getUsers() {
    return users;
  },

  addUser(userData) {
    const newUser = {
      ...userData,
      id: Math.max(...users.map(u => u.id), 0) + 1,
      createdAt: new Date().toISOString(),
      addresses: [],
      orders: [],
      wishlist: []
    };
    users.push(newUser);
    saveUsersToStorage(); // Persist to localStorage
    console.log('New user added:', newUser);
    return newUser;
  },

  updateUser(id, updates) {
    const userIndex = users.findIndex(u => u.id === parseInt(id));
    if (userIndex !== -1) {
      users[userIndex] = { ...users[userIndex], ...updates };
      saveUsersToStorage();
      return users[userIndex];
    }
    return null;
  },

  // Order management  
  getOrders() {
    return orders;
  },

  getOrdersByUserId(userId) {
    return orders.filter(o => o.userId === parseInt(userId));
  },

  getOrder(id) {
    return orders.find(o => o.id === parseInt(id));
  },

  updateOrder(id, updates) {
    const orderIndex = orders.findIndex(o => o.id === parseInt(id));
    if (orderIndex !== -1) {
      orders[orderIndex] = { ...orders[orderIndex], ...updates };
      saveOrdersToStorage(); // Persist changes
      return orders[orderIndex];
    }
    return null;
  },

  addOrder(orderData) {
    const newOrder = {
      ...orderData,
      id: Math.max(...orders.map(o => o.id), 0) + 1,
      orderId: orderData.orderId || `NN${Date.now().toString().slice(-6)}`,
      createdAt: new Date().toISOString()
    };
    orders.push(newOrder);
    saveOrdersToStorage(); // Persist to localStorage
    
    // Update user's order history and stats
    if (orderData.userId) {
      const user = users.find(u => u.id === parseInt(orderData.userId));
      if (user) {
        user.totalOrders = (user.totalOrders || 0) + 1;
        user.totalSpent = (user.totalSpent || 0) + (orderData.total || 0);
        saveUsersToStorage();
      }
    }
    
    console.log('Order added to database:', newOrder);
    return newOrder;
  },

  // Settings management
  getSettings() {
    return settings;
  },

  updateSettings(newSettings) {
    Object.assign(settings, newSettings);
    return settings;
  },

  // Get all products
  async getProducts(filters = {}) {
    await delay(500);
    let filteredProducts = [...products];

    // Filter by category
    if (filters.category) {
      filteredProducts = filteredProducts.filter(product =>
        product.category === filters.category
      );
    }

    // Filter by search query
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      filteredProducts = filteredProducts.filter(product =>
        product.name.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm)
      );
    }

    // Filter by price range
    if (filters.priceRange) {
      const [min, max] = filters.priceRange.split('-').map(Number);
      filteredProducts = filteredProducts.filter(product =>
        product.price >= min && product.price <= max
      );
    }

    // Sort products
    if (filters.sortBy) {
      switch (filters.sortBy) {
        case 'price-low':
          filteredProducts.sort((a, b) => a.price - b.price);
          break;
        case 'price-high':
          filteredProducts.sort((a, b) => b.price - a.price);
          break;
        case 'rating':
          filteredProducts.sort((a, b) => b.rating - a.rating);
          break;
        case 'name':
          filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
          break;
        default:
          break;
      }
    }

    return {
      data: filteredProducts,
      total: filteredProducts.length
    };
  },

  // Get product by ID
  async getProductById(id) {
    await delay(300);
    const product = products.find(p => p.id === parseInt(id));
    if (!product) {
      throw new Error('Product not found');
    }
    return { data: product };
  },

  // Get categories
  async getCategories() {
    await delay(200);
    return { data: categories };
  },

  // Get featured products
  async getFeaturedProducts(limit = 8) {
    await delay(400);
    const featured = products
      .filter(product => product.rating >= 4.5)
      .slice(0, limit);
    return { data: featured };
  },

  // Get bestsellers
  async getBestsellers(limit = 6) {
    await delay(300);
    const bestsellers = products
      .sort((a, b) => b.rating - a.rating)
      .slice(0, limit);
    return { data: bestsellers };
  },

  // Get related products
  async getRelatedProducts(productId, limit = 4) {
    await delay(300);
    const product = products.find(p => p.id === parseInt(productId));
    if (!product) return { data: [] };

    const related = products
      .filter(p => p.category === product.category && p.id !== product.id)
      .slice(0, limit);
    return { data: related };
  }
};

export default dataService;