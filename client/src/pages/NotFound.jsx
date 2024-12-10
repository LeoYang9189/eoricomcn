import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Layout from '../components/Layout';
import SEO from '../components/SEO';

export default function NotFound() {
  const { t } = useTranslation();

  return (
    <Layout>
      <SEO 
        title={t('notFound.seo.title')}
        description={t('notFound.seo.description')}
        path="/404"
      />
      
      <div className="min-h-[70vh] flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="text-center animate-fade-in-up">
          <div className="text-6xl font-bold text-blue-600 mb-4">404</div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {t('notFound.title')}
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            {t('notFound.message')}
          </p>
          <div className="space-x-4">
            <Link
              to="/"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
            >
              {t('notFound.backHome')}
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center px-6 py-3 border border-blue-600 text-base font-medium rounded-md text-blue-600 hover:bg-blue-50 transition-colors"
            >
              {t('notFound.contact')}
            </Link>
          </div>
          
          {/* 装饰性图形 */}
          <div className="mt-12 relative">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64">
              <div className="absolute inset-0 bg-blue-100 rounded-full animate-pulse opacity-20"></div>
              <div className="absolute inset-4 bg-blue-200 rounded-full animate-pulse opacity-20 delay-100"></div>
              <div className="absolute inset-8 bg-blue-300 rounded-full animate-pulse opacity-20 delay-200"></div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
} 