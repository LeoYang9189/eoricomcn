import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import Layout from '../components/Layout';
import SEO from '../components/SEO';

export default function ApplicationForm() {
  const { t } = useTranslation();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // 公司信息
    companyName: '',
    registrationNumber: '',
    vatNumber: '',
    address: '',
    country: '',
    city: '',
    postalCode: '',
    
    // 联系人信息
    contactName: '',
    contactPosition: '',
    contactEmail: '',
    contactPhone: '',
    
    // 业务信息
    businessType: '',
    importExportVolume: '',
    mainProducts: '',
    targetCountries: [],
    
    // 文件上传
    businessLicense: null,
    idCard: null,
    proofOfAddress: null,
    otherDocuments: []
  });

  // 步骤配置
  const steps = [
    {
      key: 'company',
      title: t('application.steps.company'),
      fields: ['companyName', 'registrationNumber', 'vatNumber', 'address', 'country', 'city', 'postalCode']
    },
    {
      key: 'contact',
      title: t('application.steps.contact'),
      fields: ['contactName', 'contactPosition', 'contactEmail', 'contactPhone']
    },
    {
      key: 'business',
      title: t('application.steps.business'),
      fields: ['businessType', 'importExportVolume', 'mainProducts', 'targetCountries']
    },
    {
      key: 'documents',
      title: t('application.steps.documents'),
      fields: ['businessLicense', 'idCard', 'proofOfAddress', 'otherDocuments']
    }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (step < steps.length) {
      setStep(step + 1);
      return;
    }

    // TODO: 实现表单提交逻辑
  };

  const renderStepIndicator = () => (
    <div className="mb-8">
      <div className="flex justify-between items-center">
        {steps.map((s, index) => (
          <div key={s.key} className="flex items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                step >= index + 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
              }`}
            >
              {index + 1}
            </div>
            {index < steps.length - 1 && (
              <div
                className={`w-24 h-1 ${
                  step > index + 1 ? 'bg-blue-600' : 'bg-gray-200'
                }`}
              />
            )}
          </div>
        ))}
      </div>
      <div className="flex justify-between mt-2">
        {steps.map((s) => (
          <span key={s.key} className="text-sm text-gray-600">{s.title}</span>
        ))}
      </div>
    </div>
  );

  const renderFormFields = () => {
    const currentStep = steps[step - 1];
    return (
      <div className="space-y-6">
        {currentStep.fields.map((field) => (
          <div key={field}>
            <label className="block text-sm font-medium text-gray-700">
              {t(`application.fields.${field}`)}
            </label>
            {field.includes('Documents') ? (
              <input
                type="file"
                multiple={field === 'otherDocuments'}
                onChange={(e) => {
                  const files = field === 'otherDocuments' ? 
                    Array.from(e.target.files) : 
                    e.target.files[0];
                  setFormData({ ...formData, [field]: files });
                }}
                className="mt-1 block w-full"
              />
            ) : (
              <input
                type={field.includes('email') ? 'email' : field.includes('phone') ? 'tel' : 'text'}
                value={formData[field] || ''}
                onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <Layout>
      <SEO 
        title={t('application.seo.title')}
        description={t('application.seo.description')}
        keywords={t('application.seo.keywords')}
      />
      <div className="max-w-3xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl font-bold text-gray-900 text-center mb-8">
            {t('application.title')}
          </h1>
          
          {renderStepIndicator()}

          <div className="bg-white shadow rounded-lg p-6 mb-6">
            <form onSubmit={handleSubmit}>
              {renderFormFields()}

              <div className="mt-6 flex justify-between">
                {step > 1 && (
                  <button
                    type="button"
                    onClick={() => setStep(step - 1)}
                    className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                  >
                    {t('application.back')}
                  </button>
                )}
                <button
                  type="submit"
                  className={`ml-auto inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 ${
                    step === 1 ? 'ml-0' : ''
                  }`}
                >
                  {step === steps.length ? t('application.submit') : t('application.next')}
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </Layout>
  );
} 