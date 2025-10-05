import React from 'react';
import { Link } from 'react-router-dom';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';

const CategoryTiles = () => {
  const categories = [
    {
      id: 1,
      name: "Unpolished Pulses, Dals & Rice",
      description: "Chemical-free rice varieties and authentic pulses",
      image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=300&fit=crop",
      link: "/product-collection-grid?category=unpolished-pulses-dals-rice",
      productCount: "15+ Products",
      featured: true
    },
    {
      id: 2,
      name: "Poha / Aval",
      description: "Traditional flattened rice varieties",
      image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400&h=300&fit=crop",
      link: "/product-collection-grid?category=poha-aval",
      productCount: "3+ Products"
    },
    {
      id: 3,
      name: "Sugars & Honey",
      description: "Natural sweeteners and organic honey",
      image: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=400&h=300&fit=crop",
      link: "/product-collection-grid?category=sugars-honey",
      productCount: "6+ Products"
    },
    {
      id: 4,
      name: "Haircare Products",
      description: "Natural hair care solutions and oils",
      image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400&h=300&fit=crop",
      link: "/product-collection-grid?category=haircare-products",
      productCount: "12+ Products",
      badge: "Natural"
    },
    {
      id: 5,
      name: "Skincare Products",
      description: "Herbal skincare and beauty products",
      image: "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=400&h=300&fit=crop",
      link: "/product-collection-grid?category=skincare-products",
      productCount: "8+ Products"
    },
    {
      id: 6,
      name: "Millet Items",
      description: "Nutritious millet-based food products",
      image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&h=300&fit=crop",
      link: "/product-collection-grid?category=millet-items",
      productCount: "10+ Products",
      badge: "Healthy"
    },
    {
      id: 7,
      name: "Powders",
      description: "Freshly ground spice powders and mixes",
      image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400&h=300&fit=crop",
      link: "/product-collection-grid?category=powders",
      productCount: "10+ Products"
    },
    {
      id: 8,
      name: "Fries",
      description: "Traditional dried and fried delicacies",
      image: "https://images.unsplash.com/photo-1599490659213-e2b9527bd087?w=400&h=300&fit=crop",
      link: "/product-collection-grid?category=fries",
      productCount: "7+ Products"
    },
    {
      id: 9,
      name: "Herbal Handmade Soaps",
      description: "Natural handcrafted soaps with herbs",
      image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=300&fit=crop",
      link: "/product-collection-grid?category=herbal-handmade-soaps",
      productCount: "20+ Products",
      featured: true
    },
    {
      id: 10,
      name: "Snacks",
      description: "Healthy millet-based snacks and sweets",
      image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400&h=300&fit=crop",
      link: "/product-collection-grid?category=snacks",
      productCount: "25+ Products",
      badge: "Popular"
    },
    {
      id: 11,
      name: "Herbal Products",
      description: "Traditional herbal remedies and health products",
      image: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=400&h=300&fit=crop",
      link: "/product-collection-grid?category=herbal-products",
      productCount: "30+ Products"
    },
    {
      id: 12,
      name: "Herbal Powders",
      description: "Natural herbal powders for health and wellness",
      image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&h=300&fit=crop",
      link: "/product-collection-grid?category=herbal-powders",
      productCount: "25+ Products"
    }
  ];

  return (
    <section className="py-16 lg:py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="font-heading font-bold text-3xl lg:text-4xl text-foreground mb-4">
            Shop by Category
          </h2>
          <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore our carefully curated collection of natural and handmade food products
          </p>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 lg:gap-6">
          {categories?.map((category) => (
            <Link
              key={category?.id}
              to={category?.link}
              className="group relative bg-card border border-border rounded-xl overflow-hidden hover:shadow-warm-lg transition-all duration-300 hover:-translate-y-1"
            >
              {/* Category Image */}
              <div className="aspect-square overflow-hidden">
                <Image
                  src={category?.image}
                  alt={category?.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="font-heading font-semibold text-sm lg:text-base mb-1">
                  {category?.name}
                </h3>
                <p className="font-caption text-xs opacity-90 hidden lg:block">
                  {category?.productCount}
                </p>
              </div>

              {/* Badges */}
              {category?.badge && (
                <div className="absolute top-2 right-2">
                  <span className="bg-primary text-primary-foreground px-2 py-1 rounded-full text-xs font-caption font-medium">
                    {category?.badge}
                  </span>
                </div>
              )}

              {category?.seasonal && (
                <div className="absolute top-2 left-2">
                  <span className="bg-accent text-accent-foreground px-2 py-1 rounded-full text-xs font-caption font-medium">
                    Seasonal
                  </span>
                </div>
              )}

              {category?.featured && (
                <div className="absolute top-2 left-2">
                  <div className="bg-warning text-warning-foreground p-1 rounded-full">
                    <Icon name="Star" size={12} />
                  </div>
                </div>
              )}

              {/* Hover Arrow */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="bg-white/20 backdrop-blur-sm rounded-full p-2">
                  <Icon name="ArrowRight" size={20} color="white" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* View All Categories */}
        <div className="text-center mt-8">
          <Link to="/product-collection-grid">
            <button className="font-body font-medium text-primary hover:text-primary/80 transition-colors duration-200 inline-flex items-center space-x-2">
              <span>View All Products</span>
              <Icon name="ArrowRight" size={16} />
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CategoryTiles;