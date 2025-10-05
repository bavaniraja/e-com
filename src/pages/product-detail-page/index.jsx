import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import ProductImageGallery from './components/ProductImageGallery';
import ProductInfo from './components/ProductInfo';
import ProductDetails from './components/ProductDetails';
import ProductFAQ from './components/ProductFAQ';
import ProductReviews from './components/ProductReviews';
import RelatedProducts from './components/RelatedProducts';

const ProductDetailPage = () => {
  const [searchParams] = useSearchParams();
  const productId = searchParams?.get('id') || '1';
  
  const { cartItems, addToCart, addToWishlist, removeFromWishlist, isInWishlist, getCartItemCount } = useCart();

  // Mock product data
  const mockProduct = {
    id: productId,
    name: "Traditional Mango Pickle",
    shortDescription: "Authentic homemade mango pickle with traditional spices",
    description: `Our Traditional Mango Pickle is crafted using time-honored recipes passed down through generations. Made with fresh, hand-picked raw mangoes and a perfect blend of aromatic spices, this pickle brings the authentic taste of Indian households to your table.\n\nEach jar is prepared in small batches to ensure maximum freshness and flavor. The mangoes are carefully selected for their quality and sourced directly from organic farms. Our traditional preparation method involves sun-drying and natural fermentation, which enhances the taste and preserves the pickle naturally without any artificial preservatives.`,
    images: [
      "https://images.pexels.com/photos/4198015/pexels-photo-4198015.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/5560763/pexels-photo-5560763.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/4198017/pexels-photo-4198017.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/7129160/pexels-photo-7129160.jpeg?auto=compress&cs=tinysrgb&w=800"
    ],
    variants: [
      {
        id: "v1",
        weight: "225g",
        price: 149.00,
        originalPrice: 199.00,
        stock: 25
      },
      {
        id: "v2",
        weight: "450g",
        price: 279.00,
        originalPrice: 349.00,
        stock: 18
      },
      {
        id: "v3",
        weight: "900g",
        price: 499.00,
        originalPrice: 649.00,
        stock: 12
      }
    ],
    badges: ["Handmade", "No Palm Oil", "Organic", "Traditional Recipe"],
    features: [
      "Made with organic raw mangoes",
      "Traditional sun-drying process",
      "No artificial preservatives",
      "Small batch preparation",
      "Authentic family recipe",
      "Rich in probiotics",
      "Long shelf life"
    ],
    ingredients: {
      description: "Our mango pickle is made with carefully selected natural ingredients, following traditional recipes for authentic taste.",
      primary: [
        "Raw Mangoes (60%)",
        "Mustard Oil",
        "Rock Salt",
        "Jaggery"
      ],
      spices: [
        "Mustard Seeds",
        "Fenugreek Seeds",
        "Red Chili Powder",
        "Turmeric Powder",
        "Asafoetida",
        "Fennel Seeds"
      ]
    },
    nutrition: {
      energy: "180 kcal",
      protein: "2.5g",
      carbohydrates: "12g",
      fat: "14g",
      fiber: "3.2g",
      sodium: "890mg"
    },
    rating: 4.6,
    reviewCount: 127
  };

  // Mock FAQ data
  const mockFAQs = [
    {
      question: "How long does this pickle last?",
      answer: "Our traditional mango pickle has a shelf life of 12 months when stored in a cool, dry place. Once opened, it should be consumed within 3 months and kept refrigerated."
    },
    {
      question: "Is this pickle made without oil?",
      answer: "No, our mango pickle is made with premium mustard oil which is essential for the traditional taste and natural preservation. The oil also helps in maintaining the pickle's texture and flavor."
    },
    {
      question: "Can I get this pickle without spices?",
      answer: "This particular variant is our traditional spicy mango pickle. However, we do offer a mild version with reduced spice levels. Please check our other product variants or contact us for custom orders."
    },
    {
      question: "Is this suitable for people with diabetes?",
      answer: "Our pickle contains jaggery as a natural sweetener. While it's better than refined sugar, people with diabetes should consume it in moderation. We recommend consulting with your healthcare provider."
    },
    {
      question: "Do you use any artificial preservatives?",
      answer: "No, we don't use any artificial preservatives. Our pickle is naturally preserved using traditional methods including salt, oil, and sun-drying process."
    }
  ];

  // Mock reviews data
  const mockReviews = [
    {
      id: 1,
      customerName: "Priya Sharma",
      rating: 5,
      comment: "Absolutely delicious! Tastes exactly like my grandmother\'s homemade pickle. The spice level is perfect and the mango pieces are fresh and crunchy.",
      date: "2025-01-15",
      verified: true,
      helpful: 12
    },
    {
      id: 2,
      customerName: "Rajesh Kumar",
      rating: 4,
      comment: "Good quality pickle with authentic taste. The packaging is excellent and the product arrived fresh. Will definitely order again.",
      date: "2025-01-10",
      verified: true,
      helpful: 8
    },
    {
      id: 3,
      customerName: "Meera Patel",
      rating: 5,
      comment: "This is the best mango pickle I\'ve ever bought online. The oil quality is premium and you can taste the freshness in every bite. Highly recommended!",
      date: "2025-01-08",
      verified: true,
      helpful: 15
    },
    {
      id: 4,
      customerName: "Amit Singh",
      rating: 4,
      comment: "Great product! The pickle has the right balance of spices and the mango pieces are perfectly cut. My family loved it.",
      date: "2025-01-05",
      verified: false,
      helpful: 6
    },
    {
      id: 5,
      customerName: "Kavitha Reddy",
      rating: 5,
      comment: "Excellent quality and taste. The traditional preparation method really shows in the flavor. Worth every penny!",
      date: "2025-01-02",
      verified: true,
      helpful: 9
    },
    {
      id: 6,
      customerName: "Suresh Gupta",
      rating: 3,
      comment: "Good pickle but a bit too spicy for my taste. The quality is good though and packaging was secure.",
      date: "2024-12-28",
      verified: true,
      helpful: 3
    }
  ];

  // Mock related products
  const mockRelatedProducts = [
    {
      id: "2",
      name: "Lemon Pickle",
      image: "https://images.pexels.com/photos/5560763/pexels-photo-5560763.jpeg?auto=compress&cs=tinysrgb&w=400",
      variants: [{ id: "v1", weight: "225g", price: 129.00, originalPrice: 169.00 }],
      badges: ["Handmade"],
      rating: 4.4,
      reviewCount: 89
    },
    {
      id: "3",
      name: "Mixed Vegetable Pickle",
      image: "https://images.pexels.com/photos/4198017/pexels-photo-4198017.jpeg?auto=compress&cs=tinysrgb&w=400",
      variants: [{ id: "v1", weight: "300g", price: 179.00, originalPrice: 229.00 }],
      badges: ["Organic"],
      rating: 4.5,
      reviewCount: 156
    },
    {
      id: "4",
      name: "Garlic Pickle",
      image: "https://images.pexels.com/photos/7129160/pexels-photo-7129160.jpeg?auto=compress&cs=tinysrgb&w=400",
      variants: [{ id: "v1", weight: "200g", price: 159.00, originalPrice: 199.00 }],
      badges: ["No Palm Oil"],
      rating: 4.3,
      reviewCount: 67
    },
    {
      id: "5",
      name: "Ginger Pickle",
      image: "https://images.pexels.com/photos/4198015/pexels-photo-4198015.jpeg?auto=compress&cs=tinysrgb&w=400",
      variants: [{ id: "v1", weight: "225g", price: 139.00, originalPrice: 179.00 }],
      badges: ["Traditional Recipe"],
      rating: 4.6,
      reviewCount: 94
    }
  ];

  const breadcrumbItems = [
    { label: 'Home', path: '/homepage' },
    { label: 'Products', path: '/product-collection-grid' },
    { label: 'Pickles', path: '/product-collection-grid?category=pickles' },
    { label: mockProduct?.name, path: `/product-detail-page?id=${productId}` }
  ];

  const handleAddToCart = (item) => {
    const variant = mockProduct?.variants?.find(v => v?.id === item?.variantId);
    if (!variant) return;

    const productToAdd = {
      id: `${item?.productId}-${item?.variantId}`,
      productId: item?.productId,
      variantId: item?.variantId,
      name: mockProduct?.name,
      variant: variant?.weight,
      price: parseFloat(variant?.price) || 0,
      originalPrice: parseFloat(variant?.originalPrice) || parseFloat(variant?.price) || 0,
      image: mockProduct?.images?.[0],
      category: 'Pickles',
      brand: 'Neenu\'s Natural'
    };
    
    addToCart(productToAdd, item?.quantity || 1);
  };

  const handleAddToWishlist = () => {
    const isInWishlistStatus = isInWishlist(mockProduct?.id);
    
    if (isInWishlistStatus) {
      removeFromWishlist(mockProduct?.id);
    } else {
      const wishlistProduct = {
        id: mockProduct?.id,
        name: mockProduct?.name,
        image: mockProduct?.images?.[0],
        price: parseFloat(mockProduct?.variants?.[0]?.price) || 0
      };
      addToWishlist(wishlistProduct);
    }
  };

  const isProductInWishlist = isInWishlist(mockProduct?.id);
  const averageRating = mockReviews?.reduce((sum, review) => sum + review?.rating, 0) / mockReviews?.length;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [productId]);

  return (
    <div className="min-h-screen bg-background">
      <Header 
        cartItemCount={getCartItemCount()}
        cartItems={cartItems}
        onSearch={() => {}}
      />
      <main className="container mx-auto px-4 py-6">
        <Breadcrumb customItems={breadcrumbItems} />
        
        {/* Product Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Product Images */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <ProductImageGallery 
              images={mockProduct?.images}
              productName={mockProduct?.name}
            />
          </div>
          
          {/* Product Information */}
          <div>
            <ProductInfo
              product={mockProduct}
              onAddToCart={handleAddToCart}
              onAddToWishlist={handleAddToWishlist}
              isInWishlist={isProductInWishlist}
            />
          </div>
        </div>

        {/* Product Details */}
        <div className="mb-12">
          <ProductDetails product={mockProduct} />
        </div>

        {/* FAQ Section */}
        <div className="mb-12">
          <ProductFAQ faqs={mockFAQs} />
        </div>

        {/* Reviews Section */}
        <div className="mb-12">
          <ProductReviews
            reviews={mockReviews}
            averageRating={averageRating}
            totalReviews={mockReviews?.length}
          />
        </div>

        {/* Related Products */}
        <div className="mb-12">
          <RelatedProducts
            products={mockRelatedProducts}
            onAddToCart={handleAddToCart}
          />
        </div>
      </main>
    </div>
  );
};

export default ProductDetailPage;