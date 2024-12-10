import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Layout from '../components/Layout';
import SEO from '../components/SEO';

export default function TrackStatus() {
  const { t } = useTranslation();
  const [applicationId, setApplicationId] = useState('');
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`/api/applications/${applicationId}/status`);
      const data = await response.json();
      setStatus(data);
    } catch (error) {
      setStatus({ error: t('track.error') });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <SEO 
        title={t('track.seo.title')}
        description={t('track.seo.description')}
        keywords={t('track.seo.keywords')}
        path="/track"
      />

      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="max-w-xl mx-auto">
            {/* 标题部分 */}
            <div className="text-center animate-fade-in-up">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {t('track.title')}
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                {t('track.subtitle')}
              </p>
            </div>

            {/* 查询表单 */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-8 animate-fade-in-up">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="applicationId" className="block text-sm font-medium text-gray-700">
                    {t('track.form.label')}
                  </label>
                  <input
                    type="text"
                    id="applicationId"
                    value={applicationId}
                    onChange={(e) => setApplicationId(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder={t('track.form.placeholder')}
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                    loading ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {loading ? t('common.loading') : t('track.form.submit')}
                </button>
              </form>
            </div>

            {/* 状态显示 */}
            {status && (
              <div className="animate-fade-in-up">
                {status.error ? (
                  <div className="bg-red-50 border-l-4 border-red-400 p-4">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm text-red-700">{status.error}</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="bg-white shadow-md rounded-lg p-6">
                    <h2 className="text-lg font-medium text-gray-900 mb-4">
                      {t('track.result.title')}
                    </h2>
                    <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                      <div>
                        <dt className="text-sm font-medium text-gray-500">{t('track.result.status')}</dt>
                        <dd className="mt-1 text-sm text-gray-900">{status.status}</dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-gray-500">{t('track.result.updatedAt')}</dt>
                        <dd className="mt-1 text-sm text-gray-900">{new Date(status.updatedAt).toLocaleDateString()}</dd>
                      </div>
                    </dl>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
} 