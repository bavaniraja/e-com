import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const OrderReview = ({ 
  onBack, 
  onPlaceOrder, 
  shippingAddress, 
  deliveryOption, 
  paymentMethod, 
  orderTotal,
  isProcessing = false 
}) => {
  const handlePlaceOrder = () => {
    if (onPlaceOrder) {
      onPlaceOrder();
    }
  };

  const formatAddress = (address) => {
    if (!address) return 'No address provided';
    
    if (typeof address === 'object') {
      return `${address?.firstName} ${address?.lastName}\n${address?.address}${address?.apartment ? ', ' + address?.apartment : ''}\n${address?.city}, ${address?.state} - ${address?.pincode}\n${address?.phone}`;
    }
    
    return address;
  };

  const getPaymentMethodDisplay = (method) => {
    const methodMap = {
      'cod': 'Cash on Delivery',
      'upi': 'UPI Payment',
      'card': 'Credit/Debit Card',
      'netbanking': 'Net Banking'
    };
    return methodMap?.[method] || method;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h2 className="font-heading font-semibold text-xl text-foreground mb-6">
        Review Your Order
      </h2>
      <div className="space-y-6">
        {/* Shipping Information */}
        <div className="p-4 bg-muted/30 rounded-lg border border-border">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-body font-medium text-foreground flex items-center space-x-2">
              <Icon name="MapPin" size={16} />
              <span>Shipping Address</span>
            </h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onBack && onBack(1)}
              iconName="Edit"
              iconPosition="left"
            >
              Edit
            </Button>
          </div>
          <div className="font-body text-sm text-muted-foreground whitespace-pre-line">
            {formatAddress(shippingAddress)}
          </div>
        </div>

        {/* Delivery Information */}
        <div className="p-4 bg-muted/30 rounded-lg border border-border">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-body font-medium text-foreground flex items-center space-x-2">
              <Icon name="Truck" size={16} />
              <span>Delivery Option</span>
            </h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onBack && onBack(2)}
              iconName="Edit"
              iconPosition="left"
            >
              Edit
            </Button>
          </div>
          {deliveryOption ? (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-body font-medium text-foreground">
                  {deliveryOption?.name}
                </span>
                <span className="font-data font-medium text-foreground">
                  {deliveryOption?.price === 0 ? 'Free' : `₹${deliveryOption?.price}`}
                </span>
              </div>
              <p className="font-body text-sm text-muted-foreground">
                {deliveryOption?.description}
              </p>
            </div>
          ) : (
            <p className="font-body text-sm text-muted-foreground">
              No delivery option selected
            </p>
          )}
        </div>

        {/* Payment Information */}
        <div className="p-4 bg-muted/30 rounded-lg border border-border">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-body font-medium text-foreground flex items-center space-x-2">
              <Icon name="CreditCard" size={16} />
              <span>Payment Method</span>
            </h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onBack && onBack(3)}
              iconName="Edit"
              iconPosition="left"
            >
              Edit
            </Button>
          </div>
          <div className="space-y-2">
            <p className="font-body font-medium text-foreground">
              {getPaymentMethodDisplay(paymentMethod?.method)}
            </p>
            {paymentMethod?.method === 'cod' && (
              <p className="font-body text-sm text-muted-foreground">
                Pay ₹{orderTotal?.toFixed(2)} when your order is delivered
              </p>
            )}
            {paymentMethod?.method === 'upi' && paymentMethod?.upiId && (
              <p className="font-body text-sm text-muted-foreground">
                UPI ID: {paymentMethod?.upiId}
              </p>
            )}
            {paymentMethod?.method === 'card' && paymentMethod?.cardData && (
              <p className="font-body text-sm text-muted-foreground">
                Card ending in {paymentMethod?.cardData?.cardNumber?.slice(-4)}
              </p>
            )}
          </div>
        </div>

        {/* Order Confirmation */}
        <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <Icon name="Info" size={16} className="text-primary mt-0.5" />
            <div className="space-y-2">
              <h4 className="font-body font-medium text-foreground">
                Order Confirmation
              </h4>
              <ul className="font-body text-sm text-muted-foreground space-y-1">
                <li>• You will receive an order confirmation email shortly</li>
                <li>• Track your order status in your account dashboard</li>
                <li>• Contact support for any questions about your order</li>
                <li>• Return policy applies for 7 days from delivery</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Terms and Conditions */}
        <div className="text-center">
          <p className="font-body text-sm text-muted-foreground">
            By placing this order, you agree to our{' '}
            <a href="/terms" className="text-primary hover:underline">
              Terms of Service
            </a>{' '}
            and{' '}
            <a href="/privacy" className="text-primary hover:underline">
              Privacy Policy
            </a>
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between pt-6">
          <Button
            type="button"
            variant="outline"
            onClick={() => onBack && onBack(3)}
            iconName="ArrowLeft"
            iconPosition="left"
            disabled={isProcessing}
          >
            Back to Payment
          </Button>
          <Button
            type="button"
            variant="default"
            onClick={handlePlaceOrder}
            loading={isProcessing}
            iconName="CheckCircle"
            iconPosition="right"
            className="min-w-[140px]"
          >
            {isProcessing ? 'Processing...' : 'Place Order'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OrderReview;