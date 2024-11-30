import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export default function WeChatLogin({ onSuccess, onError }) {
  const { t } = useTranslation();
  const [qrUrl, setQrUrl] = useState('');
  const [status, setStatus] = useState('loading'); // loading | ready | scanning | success | expired
  const [timer, setTimer] = useState(null);

  // 获取二维码
  const fetchQrCode = async () => {
    try {
      // TODO: 调用后端接口获取微信登录二维码
      const response = await fetch('/api/auth/wechat/qrcode');
      const data = await response.json();
      
      if (data.success) {
        setQrUrl(data.qrUrl);
        setStatus('ready');
        startPolling(data.ticket);
      } else {
        setStatus('error');
        onError?.(new Error(data.message));
      }
    } catch (err) {
      setStatus('error');
      onError?.(err);
    }
  };

  // 轮询检查扫码状态
  const startPolling = (ticket) => {
    const newTimer = setInterval(async () => {
      try {
        const response = await fetch(`/api/auth/wechat/check?ticket=${ticket}`);
        const data = await response.json();
        
        switch (data.status) {
          case 'SCANNING':
            setStatus('scanning');
            break;
          case 'SUCCESS':
            setStatus('success');
            clearInterval(newTimer);
            onSuccess?.(data.userInfo);
            break;
          case 'EXPIRED':
            setStatus('expired');
            clearInterval(newTimer);
            break;
          default:
            break;
        }
      } catch (err) {
        console.error('Poll error:', err);
      }
    }, 2000); // 每2秒检查一次

    setTimer(newTimer);
  };

  // 组件卸载时清理定时器
  useEffect(() => {
    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [timer]);

  // 初始化获取二维码
  useEffect(() => {
    fetchQrCode();
  }, []);

  // 刷新二维码
  const handleRefresh = () => {
    setStatus('loading');
    fetchQrCode();
  };

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-64 h-64 bg-gray-100 rounded-lg overflow-hidden">
        {/* 二维码容器 */}
        {status === 'loading' && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-2 border-blue-500 border-t-transparent"></div>
          </div>
        )}

        {qrUrl && (status === 'ready' || status === 'scanning') && (
          <>
            <img 
              src={qrUrl} 
              alt="WeChat QR Code"
              className="w-full h-full object-contain"
            />
            {status === 'scanning' && (
              <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
                <p className="text-white text-lg font-medium">
                  {t('auth.wechat.scanning')}
                </p>
              </div>
            )}
          </>
        )}

        {status === 'expired' && (
          <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col items-center justify-center">
            <p className="text-white text-lg font-medium mb-4">
              {t('auth.wechat.expired')}
            </p>
            <button
              onClick={handleRefresh}
              className="px-4 py-2 bg-white rounded-md text-sm font-medium text-gray-900 hover:bg-gray-100"
            >
              {t('auth.wechat.refresh')}
            </button>
          </div>
        )}

        {status === 'error' && (
          <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col items-center justify-center">
            <p className="text-white text-lg font-medium mb-4">
              {t('auth.wechat.error')}
            </p>
            <button
              onClick={handleRefresh}
              className="px-4 py-2 bg-white rounded-md text-sm font-medium text-gray-900 hover:bg-gray-100"
            >
              {t('auth.wechat.retry')}
            </button>
          </div>
        )}
      </div>

      {/* 提示文本 */}
      <div className="mt-4 text-center">
        <p className="text-sm text-gray-500">
          {t('auth.wechat.tip')}
        </p>
      </div>
    </div>
  );
} 