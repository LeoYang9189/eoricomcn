import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Layout from '../components/Layout';
import SEO from '../components/SEO';

export default function Validation() {
  const { t } = useTranslation();
  const [eoriNumber, setEoriNumber] = useState('');
  const [validationResult, setValidationResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`/api/eori/validate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ eoriNumber })
      });
      const data = await response.json();
      setValidationResult(data);
    } catch (error) {
      setValidationResult({ error: t('validation.error') });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <SEO 
        title={t('validation.seo.title')}
        description={t('validation.seo.description')}
        keywords={t('validation.seo.keywords')}
        path="/validation"
      />

      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12">
        <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* 标题部分 */}
          <div className="text-center mb-8 animate-fade-in-up">
            <h1 className="text-3xl font-bold text-gray-900">
              {t('validation.title')}
            </h1>
            <p className="mt-2 text-gray-600">
              {t('validation.subtitle')}
            </p>
          </div>

          {/* 验证表单 */}
          <div className="bg-white rounded-lg shadow-lg p-8 animate-fade-in-up">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  {t('validation.fields.eori')}
                </label>
                <input
                  type="text"
                  value={eoriNumber}
                  onChange={(e) => setEoriNumber(e.target.value.toUpperCase())}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder={t('validation.fields.placeholder')}
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                  loading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {loading ? t('common.loading') : t('validation.submit')}
              </button>
            </form>
          </div>

          {/* 验证结果 */}
          {validationResult && (
            <div className="mt-6 animate-fade-in-up">
              <div className={`bg-white p-6 rounded-xl shadow-lg ${
                validationResult.error ? 'border-red-500' : 'border-green-500'
              } border-2`}>
                <h2 className="text-lg font-medium text-gray-900 mb-4">
                  {t('validation.result.title')}
                </h2>
                <p className={validationResult.error ? 'text-red-600' : 'text-green-600'}>
                  {validationResult.error || validationResult.message}
                </p>
                {validationResult.details && (
                  <div className="mt-4 space-y-2">
                    <p><strong>{t('validation.result.name')}:</strong> {validationResult.details.name}</p>
                    <p><strong>{t('validation.result.address')}:</strong> {validationResult.details.address}</p>
                    <p><strong>{t('validation.result.country')}:</strong> {validationResult.details.country}</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
} 