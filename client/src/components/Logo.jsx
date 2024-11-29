import React from 'react';
import { useTranslation } from 'react-i18next';

export default function Logo() {
  const { i18n } = useTranslation();
  const isZh = i18n.language === 'zh';

  return (
    <div className="flex items-center">
      <div className="h-8 w-8">
        <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* 主圆形背景 */}
          <circle cx="20" cy="20" r="20" fill="#2563EB" />
          
          {/* 字母 E 的变体设计 */}
          <path
            d="M12 14h16M12 20h12M12 26h16"
            stroke="white"
            strokeWidth="3"
            strokeLinecap="round"
          />
          
          {/* 装饰性圆点，代表全球连接 */}
          <circle cx="32" cy="20" r="2" fill="white" />
        </svg>
      </div>
      <span className="ml-2 text-xl font-bold text-gray-900">
        {isZh ? 'EORI申请' : 'EORI Application'}
      </span>
    </div>
  );
} 