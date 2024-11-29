export const initializePayment = async (orderId, paymentMethod) => {
  try {
    const response = await fetch('/api/payments/initialize', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        orderId,
        paymentMethod, // 'wechat' 或 'alipay'
      }),
    });
    
    const paymentData = await response.json();
    
    if (paymentMethod === 'wechat') {
      // 调用微信支付
      return initWechatPay(paymentData);
    } else {
      // 调用支付宝支付
      return initAlipay(paymentData);
    }
  } catch (error) {
    console.error('支付初始化失败:', error);
    throw error;
  }
}; 