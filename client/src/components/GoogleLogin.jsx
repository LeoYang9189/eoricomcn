import React from 'react';
import { useTranslation } from 'react-i18next';

export default function GoogleLogin({ onSuccess, onError }) {
  const { t } = useTranslation();

  // 初始化谷歌登录
  const initGoogleLogin = () => {
    // 确保 Google API 已加载
    if (typeof window.google === 'undefined') {
      console.error('Google API not loaded');
      return;
    }

    window.google.accounts.id.initialize({
      client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
      callback: handleCredentialResponse,
      auto_select: false,
      cancel_on_tap_outside: true,
    });

    window.google.accounts.id.renderButton(
      document.getElementById('google-login-button'),
      {
        theme: 'outline',
        size: 'large',
        width: '100%',
        text: 'continue_with',
        shape: 'rectangular',
      }
    );
  };

  // 处理谷歌登录响应
  const handleCredentialResponse = async (response) => {
    try {
      // 发送 ID token 到后端进行验证
      const verifyResponse = await fetch('/api/auth/google/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token: response.credential,
        }),
      });

      const data = await verifyResponse.json();

      if (data.success) {
        onSuccess?.(data.user);
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      console.error('Google login error:', error);
      onError?.(error);
    }
  };

  // 加载 Google API
  React.useEffect(() => {
    // 加载 Google API 脚本
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    script.onload = initGoogleLogin;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="w-full">
      <div id="google-login-button" className="w-full"></div>
    </div>
  );
} 