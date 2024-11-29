import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LanguageSwitch from './LanguageSwitch';

export default function Header() {
  const { t } = useTranslation();

  return (
    <header className="bg-white shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0">
              <img className="h-8 w-auto" src="/logo.png" alt="Logo" />
            </Link>
          </div>

          {/* 中间导航链接 */}
          <div className="hidden md:flex space-x-8">
            <Link to="/" className="text-gray-900 hover:text-blue-600 px-3 py-2 text-sm font-medium">
              {t('nav.home')}
            </Link>
            <Link to="/what-is-eori" className="text-gray-900 hover:text-blue-600 px-3 py-2 text-sm font-medium">
              {t('nav.whatEORI')}
            </Link>
            <Link to="/track" className="text-gray-900 hover:text-blue-600 px-3 py-2 text-sm font-medium">
              {t('nav.track')}
            </Link>
            <Link to="/about" className="text-gray-900 hover:text-blue-600 px-3 py-2 text-sm font-medium">
              {t('nav.about')}
            </Link>
          </div>

          {/* 右侧操作区 */}
          <div className="flex items-center space-x-4">
            {/* 这里使用 Link 组件替换原生 a 标签 */}
            <LanguageSwitch />
          </div>
        </div>
      </nav>
    </header>
  );
}