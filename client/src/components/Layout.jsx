import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Logo from './Logo';
import LanguageSwitcher from './LanguageSwitcher';

export default function Layout({ children }) {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center space-x-8">
              <Logo />
              <div className="hidden md:flex items-center space-x-8">
                <Link to="/" className="text-gray-700 hover:text-blue-600 font-medium">
                  {t('nav.home')}
                </Link>
                <Link to="/application" className="text-gray-700 hover:text-blue-600 font-medium">
                  {t('nav.applyEORI')}
                </Link>
                <Link to="/what-is-eori" className="text-gray-700 hover:text-blue-600 font-medium">
                  {t('nav.whatEORI')}
                </Link>
                <Link to="/track" className="text-gray-700 hover:text-blue-600 font-medium">
                  {t('nav.track')}
                </Link>
                <Link to="/validation" className="text-gray-700 hover:text-blue-600 font-medium">
                  {t('nav.validation')}
                </Link>
                <Link to="/about" className="text-gray-700 hover:text-blue-600 font-medium">
                  {t('nav.about')}
                </Link>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                to="/auth"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
              >
                {t('nav.login')}/{t('nav.register')}
              </Link>
              <LanguageSwitcher />
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">
                {t('footer.contact.title')}
              </h3>
              <p>{t('footer.contact.phone')}</p>
              <p>{t('footer.contact.email')}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">
                {t('footer.links.title')}
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/" className="hover:text-blue-400">
                    {t('footer.links.home')}
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="hover:text-blue-400">
                    {t('footer.links.about')}
                  </Link>
                </li>
                <li>
                  <Link to="/application" className="hover:text-blue-400">
                    {t('footer.links.apply')}
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">
                {t('footer.hours.title')}
              </h3>
              <p>{t('footer.hours.weekday')}</p>
              <p>{t('footer.hours.weekend')}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">
                {t('footer.social.title')}
              </h3>
              <div className="flex space-x-4">
                <a href="#" className="hover:text-blue-400">
                  {t('footer.social.wechat')}
                </a>
                <a href="#" className="hover:text-blue-400">
                  {t('footer.social.linkedin')}
                </a>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700 text-center">
            <p>© 2024 {t('footer.copyright.company')}. {t('footer.copyright.rights')}</p>
          </div>
        </div>
      </footer>
    </div>
  );
} 