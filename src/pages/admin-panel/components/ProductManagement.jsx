import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Search, Filter } from 'lucide-react';
import dataService from '../../../services/dataService';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
import ProductForm from './ProductForm';

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showProductForm, setShowProductForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const response = await dataService.getProducts();
      setProducts(response.data);
    } catch (error) {
      console.error('Error loading products:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAddProduct = () => {
    setEditingProduct(null);
    setShowProductForm(true);
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setShowProductForm(true);
  };

  const handleDeleteProduct = (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      dataService.deleteProduct(productId);
      loadProducts();
    }
  };

  const handleProductSaved = () => {
    setShowProductForm(false);
    setEditingProduct(null);
    loadProducts();
  };

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const response = await dataService.getCategories();
        setCategories(response.data);
      } catch (error) {
        console.error('Error loading categories:', error);
      }
    };
    loadCategories();
  }, []);

  if (loading) {
    return <div className="flex items-center justify-center h-64">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-heading font-bold text-foreground">Product Management</h1>
          <p className="text-muted-foreground">Manage your product catalog</p>
        </div>
        <Button onClick={handleAddProduct} className="flex items-center space-x-2">
          <Plus size={20} />
          <span>Add Product</span>
        </Button>
      </div>

      {/* Filters */}
      <div className="bg-card border border-border rounded-lg p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
              <Input
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <div className="sm:w-48">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full h-10 px-3 rounded-md border border-border bg-background text-foreground"
            >
              <option value="" key="all-categories">All Categories</option>
              {categories.map((category, index) => (
                <option key={index} value={category.id || category}>
                  {category.name || category}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <div key={product.id} className="bg-card border border-border rounded-lg overflow-hidden">
            <div className="aspect-square bg-muted relative">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = '/assets/images/no_image.png';
                }}
              />
              <div className="absolute top-2 right-2 flex space-x-2">
                <button
                  onClick={() => handleEditProduct(product)}
                  className="p-2 bg-card/80 backdrop-blur-sm rounded-full hover:bg-card transition-colors"
                >
                  <Edit size={16} className="text-primary" />
                </button>
                <button
                  onClick={() => handleDeleteProduct(product.id)}
                  className="p-2 bg-card/80 backdrop-blur-sm rounded-full hover:bg-card transition-colors"
                >
                  <Trash2 size={16} className="text-destructive" />
                </button>
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-body font-medium text-foreground line-clamp-2 mb-2">
                {product.name}
              </h3>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <span className="text-lg font-bold text-foreground">₹{product.price}</span>
                  {product.originalPrice > product.price && (
                    <span className="text-sm text-muted-foreground line-through">
                      ₹{product.originalPrice}
                    </span>
                  )}
                </div>
                <span className="text-sm text-muted-foreground">{product.weight}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className={`px-2 py-1 rounded-full ${
                  product.inStock ? 'bg-success/10 text-success' : 'bg-destructive/10 text-destructive'
                }`}>
                  {product.inStock ? 'In Stock' : 'Out of Stock'}
                </span>
                <span className="text-muted-foreground">Stock: {product.stockQuantity}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No products found matching your criteria.</p>
        </div>
      )}

      {/* Product Form Modal */}
      {showProductForm && (
        <ProductForm
          product={editingProduct}
          onSave={handleProductSaved}
          onCancel={() => setShowProductForm(false)}
        />
      )}
    </div>
  );
};

export default ProductManagement;