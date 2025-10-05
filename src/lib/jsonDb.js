
class JsonDatabase {
  constructor() {
    this.data = null;
    this.loadData();
  }

  async loadData() {
    try {
      const response = await fetch('/src/data/database.json');
      this.data = await response.json();
    } catch (error) {
      console.error('Failed to load database:', error);
      // Fallback data
      this.data = {
        users: [
          {
            id: "1",
            username: "admin",
            password: "admin123",
            email: "admin@neenusnatural.com",
            role: "admin",
            name: "Administrator",
            phone: "+91 80 4567 8901",
            memberSince: "2024-01-01",
            isActive: true
          }
        ],
        products: [],
        orders: [],
        categories: []
      };
    }
  }

  // User authentication
  async authenticateUser(username, password) {
    await this.loadData();
    const user = this.data.users.find(u => 
      u.username === username && u.password === password && u.isActive
    );
    return user || null;
  }

  // Get user by ID
  async getUserById(id) {
    await this.loadData();
    return this.data.users.find(u => u.id === id) || null;
  }

  // Products CRUD
  async getProducts() {
    await this.loadData();
    return this.data.products;
  }

  async getProductById(id) {
    await this.loadData();
    return this.data.products.find(p => p.id === id) || null;
  }

  async addProduct(product) {
    await this.loadData();
    const newProduct = {
      ...product,
      id: (this.data.products.length + 1).toString(),
      createdAt: new Date().toISOString()
    };
    this.data.products.push(newProduct);
    this.saveData();
    return newProduct;
  }

  async updateProduct(id, updates) {
    await this.loadData();
    const index = this.data.products.findIndex(p => p.id === id);
    if (index !== -1) {
      this.data.products[index] = { ...this.data.products[index], ...updates };
      this.saveData();
      return this.data.products[index];
    }
    return null;
  }

  async deleteProduct(id) {
    await this.loadData();
    const index = this.data.products.findIndex(p => p.id === id);
    if (index !== -1) {
      this.data.products.splice(index, 1);
      this.saveData();
      return true;
    }
    return false;
  }

  // Orders CRUD
  async getOrders() {
    await this.loadData();
    return this.data.orders;
  }

  async addOrder(order) {
    await this.loadData();
    const newOrder = {
      ...order,
      id: (this.data.orders.length + 1).toString(),
      createdAt: new Date().toISOString(),
      status: 'pending'
    };
    this.data.orders.push(newOrder);
    this.saveData();
    return newOrder;
  }

  // Categories
  async getCategories() {
    await this.loadData();
    return this.data.categories;
  }

  // Save data (in a real app, this would save to server)
  saveData() {
    // Store in localStorage for persistence in browser
    localStorage.setItem('neenu_natural_db', JSON.stringify(this.data));
    console.log('Data saved to localStorage');
  }

  // Load from localStorage if available
  loadFromStorage() {
    const stored = localStorage.getItem('neenu_natural_db');
    if (stored) {
      this.data = JSON.parse(stored);
      return true;
    }
    return false;
  }
}

export const jsonDb = new JsonDatabase();
