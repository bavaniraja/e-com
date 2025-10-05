
export const sendOrderToWhatsApp = (orderData) => {
  const phoneNumber = "7892783668"; // WhatsApp number
  
  const formatOrderMessage = (order) => {
    const {
      orderId,
      customerInfo,
      items,
      shippingAddress,
      paymentMethod,
      subtotal,
      shipping,
      discount,
      total
    } = order;
    
    let message = `🛍️ *NEW ORDER RECEIVED*\n\n`;
    message += `📋 *Order ID:* ${orderId}\n`;
    message += `👤 *Customer:* ${customerInfo.name}\n`;
    message += `📞 *Phone:* ${customerInfo.phone}\n`;
    message += `📧 *Email:* ${customerInfo.email}\n\n`;
    
    message += `🛒 *Items Ordered:*\n`;
    items.forEach((item, index) => {
      message += `${index + 1}. ${item.name}\n`;
      message += `   Qty: ${item.quantity} x ₹${item.price} = ₹${item.quantity * item.price}\n`;
    });
    
    message += `\n📍 *Shipping Address:*\n`;
    message += `${shippingAddress.name}\n`;
    message += `${shippingAddress.street}\n`;
    message += `${shippingAddress.city}, ${shippingAddress.state} - ${shippingAddress.pincode}\n`;
    message += `Phone: ${shippingAddress.phone}\n\n`;
    
    message += `💳 *Payment Method:* ${paymentMethod}\n\n`;
    
    message += `💰 *Order Summary:*\n`;
    message += `Subtotal: ₹${subtotal.toFixed(2)}\n`;
    message += `Shipping: ₹${shipping.toFixed(2)}\n`;
    if (discount > 0) {
      message += `Discount: -₹${discount.toFixed(2)}\n`;
    }
    message += `*Total: ₹${total.toFixed(2)}*\n\n`;
    
    message += `⏰ *Order Time:* ${new Date().toLocaleString()}\n`;
    
    return message;
  };
  
  const message = formatOrderMessage(orderData);
  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
  
  // Open WhatsApp in new tab
  window.open(whatsappUrl, '_blank');
};
