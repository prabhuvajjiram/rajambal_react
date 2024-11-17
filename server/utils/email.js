// Simplified email handling for browser environment
export const sendOrderConfirmation = async (order) => {
  // Log order confirmation for development
  console.log('Order confirmation:', {
    orderId: order._id,
    customer: order.customer,
    total: order.total,
    items: order.items
  });
  
  // In a production environment, you would integrate with an email service API
  return Promise.resolve();
};

export const sendContactEmail = async ({ name, email, subject, message }) => {
  // Log contact form submission for development
  console.log('Contact form submission:', {
    name,
    email,
    subject,
    message
  });
  
  // In a production environment, you would integrate with an email service API
  return Promise.resolve();
};