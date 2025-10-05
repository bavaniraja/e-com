import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const BestsellersCarousel = ({ onAddToCart }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const bestsellers = [
    {
      id: 1,
      name: "Traditional Mysore Pak",
      originalPrice: 450,
      salePrice: 399,
      image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400&h=400&fit=crop",
      rating: 4.8,
      reviewCount: 124,
      badges: ["Handmade", "No Palm Oil"],
      weight: "250g",
      inStock: true,
      quickAdd: true
    },
    {
      id: 2,
      name: "Homemade Mango Pickle",
      originalPrice: 320,
      salePrice: 280,
      image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400&h=400&fit=crop",
      rating: 4.9,
      reviewCount: 89,
      badges: ["Organic", "Traditional Recipe"],
      weight: "500g",
      inStock: true,
      quickAdd: true
    },
    {
      id: 3,
      name: "Coconut Laddu Box",
      originalPrice: 380,
      salePrice: 340,
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop",
      rating: 4.7,
      reviewCount: 156,
      badges: ["Fresh Made", "No Preservatives"],
      weight: "300g",
      inStock: true,
      quickAdd: true
    },
    {
      id: 4,
      name: "Spiced Cashew Mix",
      originalPrice: 550,
      salePrice: 495,
      image: "https://images.unsplash.com/photo-1599490659213-e2b9527bd087?w=400&h=400&fit=crop",
      rating: 4.6,
      reviewCount: 78,
      badges: ["Premium Quality", "Roasted Fresh"],
      weight: "200g",
      inStock: true,
      quickAdd: true
    },
    {
      id: 5,
      name: "Pure Ghee",
      originalPrice: 680,
      salePrice: 620,
      image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400&h=400&fit=crop",
      rating: 4.9,
      reviewCount: 203,
      badges: ["A2 Cow Milk", "Chemical Free"],
      weight: "500ml",
      inStock: true,
      quickAdd: true
    },
    {
      id: 6,
      name: "Sambar Powder",
      originalPrice: 180,
      salePrice: 160,
      image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400&h=400&fit=crop",
      rating: 4.8,
      reviewCount: 92,
      badges: ["Authentic Blend", "No Artificial Colors"],
      weight: "100g",
      inStock: true,
      quickAdd: true
    }
  ];

  const itemsPerSlide = {
    mobile: 2,
    tablet: 3,
    desktop: 4
  };

  const totalSlides = Math.ceil(bestsellers?.length / itemsPerSlide?.desktop);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const calculateSavings = (original, sale) => {
    return Math.round(((original - sale) / original) * 100);
  };

  const handleQuickAdd = (product) => {
    if (onAddToCart) {
      onAddToCart({
        id: product?.id,
        name: product?.name,
        price: product?.price || product?.salePrice || 0,
        originalPrice: product?.originalPrice || product?.price || product?.salePrice || 0,
        image: product?.image,
        variant: product?.weight,
        quantity: 1
      });
    }
  };

  return (
    <section className="py-16 lg:py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="font-heading font-bold text-3xl lg:text-4xl text-foreground mb-2">
              Bestsellers
            </h2>
            <p className="font-body text-muted-foreground">
              Most loved products by our customers
            </p>
          </div>
          
          {/* Navigation Arrows - Desktop */}
          <div className="hidden lg:flex items-center space-x-2">
            <button
              onClick={prevSlide}
              className="w-10 h-10 rounded-full border border-border bg-card hover:bg-muted transition-colors duration-200 flex items-center justify-center"
              aria-label="Previous products"
            >
              <Icon name="ChevronLeft" size={20} />
            </button>
            <button
              onClick={nextSlide}
              className="w-10 h-10 rounded-full border border-border bg-card hover:bg-muted transition-colors duration-200 flex items-center justify-center"
              aria-label="Next products"
            >
              <Icon name="ChevronRight" size={20} />
            </button>
          </div>
        </div>

        {/* Products Carousel */}
        <div className="relative overflow-hidden">
          <div 
            className="flex transition-transform duration-500 ease-in-out"
            style={{ 
              transform: `translateX(-${currentSlide * (100 / totalSlides)}%)`,
              width: `${totalSlides * 100}%`
            }}
          >
            {Array.from({ length: totalSlides })?.map((_, slideIndex) => (
              <div 
                key={slideIndex}
                className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6"
                style={{ width: `${100 / totalSlides}%` }}
              >
                {bestsellers?.slice(slideIndex * itemsPerSlide?.desktop, (slideIndex + 1) * itemsPerSlide?.desktop)?.map((product) => (
                    <div
                      key={product?.id}
                      className="group bg-card border border-border rounded-xl overflow-hidden hover:shadow-warm-lg transition-all duration-300 hover:-translate-y-1"
                    >
                      {/* Product Image */}
                      <div className="relative aspect-square overflow-hidden">
                        <Link to={`/product-detail-page?id=${product?.id}`}>
                          <Image
                            src={product?.image}
                            alt={product?.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </Link>
                        
                        {/* Badges */}
                        <div className="absolute top-2 left-2 space-y-1">
                          {product?.badges?.slice(0, 1)?.map((badge, index) => (
                            <span
                              key={index}
                              className="bg-primary text-primary-foreground px-2 py-1 rounded-full text-xs font-caption font-medium"
                            >
                              {badge}
                            </span>
                          ))}
                        </div>

                        {/* Discount Badge */}
                        {product?.originalPrice > product?.salePrice && (
                          <div className="absolute top-2 right-2">
                            <span className="bg-destructive text-destructive-foreground px-2 py-1 rounded-full text-xs font-caption font-medium">
                              {calculateSavings(product?.originalPrice, product?.salePrice)}% OFF
                            </span>
                          </div>
                        )}

                        {/* Quick Add Button */}
                        <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <button
                            onClick={() => handleQuickAdd(product)}
                            className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center hover:bg-primary/90 transition-colors duration-200"
                            aria-label="Quick add to cart"
                          >
                            <Icon name="Plus" size={16} />
                          </button>
                        </div>
                      </div>

                      {/* Product Info */}
                      <div className="p-4">
                        <Link to={`/product-detail-page?id=${product?.id}`}>
                          <h3 className="font-body font-semibold text-sm lg:text-base text-foreground mb-2 line-clamp-2 hover:text-primary transition-colors duration-200">
                            {product?.name}
                          </h3>
                        </Link>
                        
                        {/* Rating */}
                        <div className="flex items-center space-x-1 mb-2">
                          <div className="flex items-center">
                            {[...Array(5)]?.map((_, i) => (
                              <Icon
                                key={i}
                                name="Star"
                                size={12}
                                className={i < Math.floor(product?.rating) ? "text-warning fill-current" : "text-muted-foreground"}
                              />
                            ))}
                          </div>
                          <span className="font-caption text-xs text-muted-foreground">
                            ({product?.reviewCount})
                          </span>
                        </div>

                        {/* Weight */}
                        <p className="font-caption text-xs text-muted-foreground mb-2">
                          {product?.weight}
                        </p>

                        {/* Price */}
                        <div className="flex items-center space-x-2 mb-3">
                          <span className="font-data font-bold text-base text-foreground">
                            ₹{product?.salePrice}
                          </span>
                          {product?.originalPrice > product?.salePrice && (
                            <span className="font-data text-sm text-muted-foreground line-through">
                              ₹{product?.originalPrice}
                            </span>
                          )}
                        </div>

                        {/* Add to Cart Button */}
                        <Button
                          variant="outline"
                          size="sm"
                          fullWidth
                          onClick={() => handleQuickAdd(product)}
                          iconName="ShoppingCart"
                          iconPosition="left"
                          iconSize={14}
                        >
                          Add to Cart
                        </Button>
                      </div>
                    </div>
                  ))}
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Navigation Dots */}
        <div className="flex justify-center space-x-2 mt-6 lg:hidden">
          {Array.from({ length: totalSlides })?.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                index === currentSlide ? 'bg-primary' : 'bg-muted-foreground/30'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* View All Link */}
        <div className="text-center mt-8">
          <Link to="/product-collection-grid?filter=bestsellers">
            <Button variant="outline" iconName="ArrowRight" iconPosition="right">
              View All Bestsellers
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BestsellersCarousel;