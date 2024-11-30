import React from 'react';
import { useTranslation } from 'react-i18next';
import { XMarkIcon } from '@heroicons/react/24/outline';
import WeChatLogin from './WeChatLogin';

export default function WeChatLoginModal({ isOpen, onClose, onSuccess }) {
  const { t } = useTranslation();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        {/* 背景遮罩 */}
        <div 
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          onClick={onClose}
        />

        {/* 弹窗内容 */}
        <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
          {/* 关闭按钮 */}
          <div className="absolute right-0 top-0 pr-4 pt-4">
            <button
              type="button"
              className="rounded-md bg-white text-gray-400 hover:text-gray-500"
              onClick={onClose}
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>

          {/* 标题 */}
          <div className="text-center mb-4">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              {t('auth.wechat.title')}
            </h3>
          </div>

          {/* 微信登录组件 */}
          <WeChatLogin
            onSuccess={(userInfo) => {
              onSuccess?.(userInfo);
              onClose();
            }}
            onError={(error) => {
              console.error('WeChat login error:', error);
            }}
          />
        </div>
      </div>
    </div>
  );
} 