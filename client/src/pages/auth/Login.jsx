import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '../../components/Layout';
import SEO from '../../components/SEO';

export default function Login() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // TODO: 实现登录逻辑
      navigate('/');
    } catch (error) {
      setError(error.message || t('auth.login.error'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <SEO 
        title={t('auth.login.title')}
        description={t('auth.login.subtitle')}
        path="/login"
      />

      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">
              {t('auth.login.title')}
            </h2>
          </div>

          <div className="mt-8 bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6" onSubmit={handleSubmit}>
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded">
                  {error}
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  {t('auth.login.email')}
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  {t('auth.login.password')}
                </label>
                <input
                  type="password"
                  required
                  value={formData.password}
                  onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  {isLoading ? t('common.loading') : t('auth.login.submit')}
                </button>
              </div>
            </form>

            <div className="mt-6">
              <p className="text-center text-sm text-gray-600">
                {t('auth.login.noAccount')}{' '}
                <Link to="/register" className="font-medium text-blue-600 hover:text-blue-500">
                  {t('auth.login.registerLink')}
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
} 