import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';
import { useAuth } from '../../contexts/AuthContext';
import { sendOrderToWhatsApp } from '../../utils/whatsapp';
import dataService from '../../services/dataService';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import CheckoutProgress from './components/CheckoutProgress';
import ShippingForm from './components/ShippingForm';
import DeliveryOptions from './components/DeliveryOptions';
import PaymentForm from './components/PaymentForm';
import OrderReview from './components/OrderReview';
import OrderSummary from './components/OrderSummary';
import TrustSignals from './components/TrustSignals';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

const CheckoutProcess = () => {
  const navigate = useNavigate();
  const { cartItems, clearCart } = useCart();
  const { user, loading } = useAuth();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!loading && !user) {
      navigate('/user-login', { 
        state: { 
          from: '/checkout-process',
          message: 'Please sign in to continue with checkout'
        }
      });
    }
  }, [user, loading, navigate]);
  const [currentStep, setCurrentStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderSummaryExpanded, setOrderSummaryExpanded] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);


  // Form data states
  const [shippingData, setShippingData] = useState(null);
  const [deliveryData, setDeliveryData] = useState(null);
  const [paymentData, setPaymentData] = useState(null);

  // Calculate totals
  const subtotal = cartItems?.reduce((sum, item) => {
    const itemPrice = parseFloat(item?.price) || 0;
    const itemQuantity = parseInt(item?.quantity) || 0;
    return sum + (itemPrice * itemQuantity);
  }, 0);
  const shippingCost = deliveryData?.price || (subtotal >= 499 ? 0 : 49);
  const discountAmount = appliedCoupon === 'FLAT10' && subtotal >= 1499 ? subtotal * 0.1 : 0;
  const total = subtotal + shippingCost - discountAmount;

  // Auto-apply FLAT10 coupon if eligible
  useEffect(() => {
    if (subtotal >= 1499 && !appliedCoupon) {
      setAppliedCoupon('FLAT10');
    }
  }, [subtotal, appliedCoupon]);

  useEffect(() => {
    if (!user) {
      navigate('/user-auth');
    }

    // Get current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
        },
        (error) => {
          console.log('Location access denied:', error);
        }
      );
    }
  }, [user, navigate]);


  const breadcrumbItems = [
    { label: 'Home', path: '/homepage' },
    { label: 'Shopping Cart', path: '/shopping-cart' },
    { label: 'Checkout', path: '/checkout-process' }
  ];

  const handleStepNext = (stepData) => {
    switch (currentStep) {
      case 1:
        setShippingData(stepData);
        setCurrentStep(2);
        break;
      case 2:
        setDeliveryData(stepData);
        setCurrentStep(3);
        break;
      case 3:
        setPaymentData(stepData);
        setCurrentStep(4);
        break;
      default:
        break;
    }
  };

  const handleStepBack = (targetStep = null) => {
    const newStep = targetStep || currentStep - 1;
    if (newStep >= 1 && newStep <= 4) {
      setCurrentStep(newStep);
    }
  };

  const handlePlaceOrder = async () => {
    setIsProcessing(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));

      const orderId = `NN${Date.now().toString().slice(-6)}`;

      // Create order data
      const orderData = {
        orderId,
        orderNumber: orderId,
        userId: user?.id,
        customerName: user?.name || shippingData?.firstName + ' ' + shippingData?.lastName,
        customerEmail: user?.email || shippingData?.email,
        customerPhone: user?.phone || shippingData?.phone,
        items: cartItems?.map(item => ({
          productId: item?.productId || item?.id,
          name: item?.name,
          variant: item?.variant,
          quantity: parseInt(item?.quantity) || 0,
          price: parseFloat(item?.price) || 0,
          total: (parseFloat(item?.price) || 0) * (parseInt(item?.quantity) || 0)
        })),
        shippingAddress: {
          firstName: shippingData?.firstName || user?.firstName,
          lastName: shippingData?.lastName || user?.lastName,
          email: shippingData?.email || user?.email,
          phone: shippingData?.phone || user?.phone,
          address: shippingData?.address,
          apartment: shippingData?.apartment,
          city: shippingData?.city,
          state: shippingData?.state,
          pincode: shippingData?.pincode,
          country: shippingData?.country || 'India'
        },
        billingAddress: shippingData, // Assuming billing address is same as shipping for now
        currentLocation,
        paymentMethod: paymentData?.method,
        subtotal: subtotal,
        shipping: shippingCost,
        discount: discountAmount,
        total: total,
        appliedCoupon,
        status: 'pending',
        createdAt: new Date().toISOString()
      };

      // Store order in database
      const savedOrder = await dataService.addOrder(orderData);


      // Send WhatsApp message
      const customerName = orderData.customerName || 'Unknown Customer';
      const customerPhone = orderData.customerPhone || 'Not provided';
      const customerEmail = orderData.customerEmail || 'Not provided';
      const locationInfo = currentLocation ? `Location: ${currentLocation.latitude}, ${currentLocation.longitude}` : 'Location not available';

      const orderDetails = `NEW ORDER RECEIVED

Order ID: NN${Math.floor(Math.random() * 900000) + 100000}
Customer: ${customerName}
Phone: ${customerPhone}
Email: ${customerEmail}

Items Ordered:
${cartItems?.map((item, index) => {
  const itemPrice = parseFloat(item?.price) || 0;
  const itemQuantity = parseInt(item?.quantity) || 0;
  const itemTotal = itemPrice * itemQuantity;
  return `${index + 1}. ${item?.name || 'Unknown Item'}
   Qty: ${itemQuantity} x ₹${itemPrice.toFixed(2)} = ₹${itemTotal.toFixed(2)}`;
}).join('\n\n')}

Shipping Address:
${orderData.shippingAddress?.firstName} ${orderData.shippingAddress?.lastName}
${orderData.shippingAddress?.address}
${orderData.shippingAddress?.apartment || ''}
${orderData.shippingAddress?.city}, ${orderData.shippingAddress?.state} - ${orderData.shippingAddress?.pincode}
Phone: ${orderData.shippingAddress?.phone}

${locationInfo}

Payment Method: ${paymentData?.method}

Order Summary:
Subtotal: ₹${subtotal?.toFixed(2)}
Shipping: ₹${shippingCost?.toFixed(2)}
${discountAmount > 0 ? `Discount: -₹${discountAmount?.toFixed(2)}` : ''}
Total: ₹${total?.toFixed(2)}

Order Time: ${new Date().toLocaleString('en-IN')}`;

      const phone = '917892783668'; // Replace with your WhatsApp number
      const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(orderDetails)}`;
      window.open(whatsappUrl, '_blank');


      // Clear cart
      clearCart();

      alert(`Order placed successfully! Order ID: ${orderId}\n\nOrder details have been sent to WhatsApp and you will receive a confirmation call shortly.`);
      navigate('/user-account-dashboard?section=orders');

    } catch (error) {
      console.error('Order placement failed:', error);
      alert('Failed to place order. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleApplyCoupon = (couponCode) => {
    setAppliedCoupon(couponCode);
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <ShippingForm
            onNext={handleStepNext}
            onAddressSelect={(address) => setShippingData(address)}
          />
        );
      case 2:
        return (
          <DeliveryOptions
            onNext={handleStepNext}
            onBack={handleStepBack}
            shippingAddress={shippingData}
          />
        );
      case 3:
        return (
          <PaymentForm
            onNext={handleStepNext}
            onBack={handleStepBack}
            orderTotal={total}
            paymentMethod={paymentData?.method}
            setPaymentMethod={setPaymentData}
          />
        );
      case 4:
        return (
          <OrderReview
            onBack={handleStepBack}
            onPlaceOrder={handlePlaceOrder}
            shippingAddress={shippingData}
            deliveryOption={deliveryData}
            paymentMethod={paymentData?.method}
            orderTotal={total}
            isProcessing={isProcessing}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-6">
        <Breadcrumb customItems={breadcrumbItems} />

        {/* Mobile Order Summary Toggle */}
        <div className="lg:hidden mb-6">
          <Button
            variant="outline"
            fullWidth
            onClick={() => setOrderSummaryExpanded(!orderSummaryExpanded)}
            iconName={orderSummaryExpanded ? "ChevronUp" : "ChevronDown"}
            iconPosition="right"
          >
            {orderSummaryExpanded ? 'Hide' : 'Show'} order summary (₹{total?.toFixed(2)})
          </Button>

          {orderSummaryExpanded && (
            <div className="mt-4">
              <OrderSummary
                cartItems={cartItems}
                subtotal={subtotal}
                shipping={shippingCost}
                discount={discountAmount}
                total={total}
                onApplyCoupon={handleApplyCoupon}
                appliedCoupon={appliedCoupon}
              />
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Checkout Form */}
          <div className="lg:col-span-2 space-y-6">
            <CheckoutProgress currentStep={currentStep} />
            {renderCurrentStep()}
          </div>

          {/* Sidebar */}
          <div className="hidden lg:block space-y-6">
            <OrderSummary
              cartItems={cartItems}
              subtotal={subtotal}
              shipping={shippingCost}
              discount={discountAmount}
              total={total}
              onApplyCoupon={handleApplyCoupon}
              appliedCoupon={appliedCoupon}
            />

            <TrustSignals />
          </div>
        </div>

        {/* Mobile Trust Signals */}
        <div className="lg:hidden mt-8">
          <TrustSignals />
        </div>

        {/* Guest Checkout Notice */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center space-x-2 bg-muted/50 px-4 py-2 rounded-lg">
            <Icon name="User" size={16} className="text-muted-foreground" />
            <span className="font-body text-sm text-muted-foreground">
              Checking out as guest •{' '}
              <button
                onClick={() => navigate('/user-account-dashboard')}
                className="text-primary hover:underline font-medium"
              >
                Create account
              </button>{' '}
              for faster checkout
            </span>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CheckoutProcess;