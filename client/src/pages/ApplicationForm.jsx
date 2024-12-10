import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Layout from '../components/Layout';
import SEO from '../components/SEO';
import CountrySelect from '../components/CountrySelect';
import DatePicker from '../components/DatePicker';

export default function ApplicationForm() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    companyName: '',
    registrationNumber: '',
    country: '',
    address: '',
    contactName: '',
    email: '',
    phone: '',
    establishDate: '',
    vatNumber: '',
    businessType: '',
    documents: []
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch('/api/applications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      
      const data = await response.json();
      if (data.success) {
        navigate(`/track?id=${data.applicationId}`);
      }
    } catch (error) {
      console.error('Application submission failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData(prev => ({
      ...prev,
      documents: [...prev.documents, ...files]
    }));
  };

  return (
    <Layout>
      <SEO 
        title={t('application.seo.title')}
        description={t('application.seo.description')}
        keywords={t('application.seo.keywords')}
        path="/application"
      />

      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* 标题部分 */}
          <div className="text-center mb-12 animate-fade-in-up">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {t('application.title')}
            </h1>
            <p className="text-lg text-gray-600">
              {t('application.subtitle')}
            </p>
          </div>

          {/* 申请表单 */}
          <div className="bg-white rounded-lg shadow-lg p-8 animate-fade-in-up">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* 公司信息 */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-900">
                  {t('application.sections.company')}
                </h2>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    {t('application.fields.companyName')}
                  </label>
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    {t('application.fields.registrationNumber')}
                  </label>
                  <input
                    type="text"
                    name="registrationNumber"
                    value={formData.registrationNumber}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    {t('application.fields.country')}
                  </label>
                  <CountrySelect
                    value={formData.country}
                    onChange={(value) => handleChange({ target: { name: 'country', value } })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    {t('application.fields.establishDate')}
                  </label>
                  <DatePicker
                    value={formData.establishDate}
                    onChange={(value) => handleChange({ target: { name: 'establishDate', value } })}
                  />
                </div>
              </div>

              {/* 联系人信息 */}
              <div className="space-y-4 pt-6">
                <h2 className="text-xl font-semibold text-gray-900">
                  {t('application.sections.contact')}
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      {t('application.fields.contactName')}
                    </label>
                    <input
                      type="text"
                      name="contactName"
                      value={formData.contactName}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      {t('application.fields.email')}
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* 提交按钮 */}
              <div className="pt-6">
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                    loading ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {loading ? t('common.submitting') : t('application.submit')}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
} 