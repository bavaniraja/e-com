import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import dataService from '../../../services/dataService';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';

const ProductForm = ({ product, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    originalPrice: '',
    category: '',
    subcategory: '',
    image: '',
    weight: '',
    stockQuantity: '',
    ingredients: '',
    benefits: '',
    inStock: true
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (product) {
      setFormData({
        ...product,
        price: product.price.toString(),
        originalPrice: product.originalPrice.toString(),
        stockQuantity: product.stockQuantity.toString(),
        ingredients: product.ingredients?.join(', ') || '',
        benefits: product.benefits?.join(', ') || ''
      });
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const productData = {
        ...formData,
        price: parseFloat(formData.price),
        originalPrice: parseFloat(formData.originalPrice),
        stockQuantity: parseInt(formData.stockQuantity),
        ingredients: formData.ingredients.split(',').map(item => item.trim()).filter(Boolean),
        benefits: formData.benefits.split(',').map(item => item.trim()).filter(Boolean),
        rating: product?.rating || 4.5,
        reviewCount: product?.reviewCount || 0,
        badges: product?.badges || []
      };

      if (product) {
        dataService.updateProduct(product.id, productData);
      } else {
        dataService.addProduct(productData);
      }

      onSave();
    } catch (err) {
      setError('Failed to save product. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    { id: 'oils-ghee', name: 'Oils & Ghee' },
    { id: 'spices-masalas', name: 'Spices & Masalas' },
    { id: 'natural-sweeteners', name: 'Natural Sweeteners' },
    { id: 'dairy-products', name: 'Dairy Products' },
    { id: 'pickles-preserves', name: 'Pickles & Preserves' },
    { id: 'sweets-desserts', name: 'Sweets & Desserts' }
  ];

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setFormData(prev => ({
          ...prev,
          image: event.target.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card border border-border rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-heading font-bold text-foreground">
            {product ? 'Edit Product' : 'Add New Product'}
          </h2>
          <button
            onClick={onCancel}
            className="p-2 hover:bg-muted rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                Product Name *
              </label>
              <Input
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Enter product name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                Weight/Size *
              </label>
              <Input
                name="weight"
                value={formData.weight}
                onChange={handleChange}
                required
                placeholder="e.g., 500ml, 250g"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              Description *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows={3}
              className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground"
              placeholder="Enter product description"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                Price *
              </label>
              <Input
                name="price"
                type="number"
                value={formData.price}
                onChange={handleChange}
                required
                placeholder="0.00"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                Original Price
              </label>
              <Input
                name="originalPrice"
                type="number"
                value={formData.originalPrice}
                onChange={handleChange}
                placeholder="0.00"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                Stock Quantity *
              </label>
              <Input
                name="stockQuantity"
                type="number"
                value={formData.stockQuantity}
                onChange={handleChange}
                required
                placeholder="0"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                Category *
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="w-full h-10 px-3 rounded-md border border-border bg-background text-foreground"
              >
                <option value="">Select Category</option>
                {categories.map((category, index) => (
                  <option key={index} value={category.id}>{category.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                Subcategory
              </label>
              <Input
                name="subcategory"
                value={formData.subcategory}
                onChange={handleChange}
                placeholder="Enter subcategory"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              Product Image
            </label>
            <div className="space-y-2">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
              />
              {formData.image && (
                <div className="mt-2">
                  <img
                    src={formData.image}
                    alt="Preview"
                    className="w-20 h-20 object-cover rounded-md border"
                  />
                </div>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              Ingredients (comma-separated)
            </label>
            <Input
              name="ingredients"
              value={formData.ingredients}
              onChange={handleChange}
              placeholder="Organic coconut, Sea salt, etc."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              Benefits (comma-separated)
            </label>
            <Input
              name="benefits"
              value={formData.benefits}
              onChange={handleChange}
              placeholder="Rich in vitamins, Natural antioxidants, etc."
            />
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="inStock"
              checked={formData.inStock}
              onChange={handleChange}
              className="w-4 h-4 text-primary border-border rounded"
            />
            <label className="text-sm font-medium text-foreground">
              In Stock
            </label>
          </div>

          {error && (
            <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-3">
              <p className="text-sm text-destructive">{error}</p>
            </div>
          )}

          <div className="flex justify-end space-x-3 pt-4">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Saving...' : 'Save Product'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;