import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const ProductInfo = ({ product, onAddToCart, onAddToWishlist, isInWishlist }) => {
  const [selectedVariant, setSelectedVariant] = useState(product?.variants?.[0]);
  const [quantity, setQuantity] = useState(1);

  const handleVariantChange = (variantId) => {
    const variant = product?.variants?.find(v => v?.id === variantId);
    setSelectedVariant(variant);
  };

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    onAddToCart({
      productId: product?.id,
      variantId: selectedVariant?.id,
      quantity: quantity
    });
  };

  const discountPercentage = Math.round(
    ((selectedVariant?.originalPrice - selectedVariant?.price) / selectedVariant?.originalPrice) * 100
  );

  const variantOptions = product?.variants?.map(variant => ({
    value: variant?.id,
    label: `${variant?.weight} - ₹${variant?.price?.toFixed(2)}`
  }));

  return (
    <div className="space-y-6">
      {/* Product Title */}
      <div>
        <h1 className="font-heading font-bold text-2xl lg:text-3xl text-foreground mb-2">
          {product?.name}
        </h1>
        <p className="font-body text-muted-foreground">
          {product?.shortDescription}
        </p>
      </div>
      {/* Product Badges */}
      <div className="flex flex-wrap gap-2">
        {product?.badges?.map((badge, index) => (
          <span
            key={index}
            className="inline-flex items-center px-3 py-1 rounded-full text-xs font-caption font-medium bg-accent/10 text-accent border border-accent/20"
          >
            {badge}
          </span>
        ))}
      </div>
      {/* Pricing */}
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <span className="font-heading font-bold text-2xl text-foreground">
            ₹{selectedVariant?.price?.toFixed(2)}
          </span>
          {selectedVariant?.originalPrice > selectedVariant?.price && (
            <>
              <span className="font-data text-lg text-muted-foreground line-through">
                ₹{selectedVariant?.originalPrice?.toFixed(2)}
              </span>
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-caption font-medium bg-success/10 text-success">
                Save {discountPercentage}%
              </span>
            </>
          )}
        </div>
        <p className="font-caption text-sm text-muted-foreground">
          Inclusive of all taxes
        </p>
      </div>
      {/* Variant Selection */}
      <div>
        <Select
          label="Select Weight"
          options={variantOptions}
          value={selectedVariant?.id}
          onChange={handleVariantChange}
          className="max-w-xs"
        />
      </div>
      {/* Quantity and Add to Cart */}
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <span className="font-body font-medium text-foreground">Quantity:</span>
          <div className="flex items-center border border-border rounded-lg">
            <button
              onClick={() => handleQuantityChange(-1)}
              disabled={quantity <= 1}
              className="w-10 h-10 flex items-center justify-center hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              <Icon name="Minus" size={16} />
            </button>
            <span className="w-12 text-center font-data font-medium">
              {quantity}
            </span>
            <button
              onClick={() => handleQuantityChange(1)}
              disabled={quantity >= 10}
              className="w-10 h-10 flex items-center justify-center hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              <Icon name="Plus" size={16} />
            </button>
          </div>
        </div>

        <div className="flex gap-3">
          <Button
            variant="default"
            onClick={handleAddToCart}
            iconName="ShoppingCart"
            iconPosition="left"
            className="flex-1"
          >
            Add to Cart
          </Button>
          <Button
            variant="outline"
            onClick={onAddToWishlist}
            iconName={isInWishlist ? "Heart" : "Heart"}
            size="icon"
            className={isInWishlist ? "text-destructive" : ""}
          >
          </Button>
        </div>
      </div>
      {/* Stock Status */}
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 bg-success rounded-full"></div>
        <span className="font-caption text-sm text-success font-medium">
          In Stock ({selectedVariant?.stock} units available)
        </span>
      </div>
    </div>
  );
};

export default ProductInfo;