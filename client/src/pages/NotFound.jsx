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
        title="404 - 页面未找到"
        description="抱歉，您访问的页面不存在"
        path="/404"
      />

      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="text-center">
            <h1 className="text-6xl font-bold text-blue-600">404</h1>
            <h2 className="mt-4 text-2xl font-bold text-gray-900">
              页面未找到
            </h2>
            <p className="mt-2 text-base text-gray-600">
              抱歉，您访问的页面不存在。
            </p>
            <div className="mt-6">
              <Link
                to="/"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                返回首页
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
} 