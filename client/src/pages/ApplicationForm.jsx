import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Layout from '../components/Layout';
import StepProgress from '../components/StepProgress';
import CountrySelect from '../components/CountrySelect';
import DatePicker from '../components/DatePicker';

export default function ApplicationForm() {
  const { t } = useTranslation();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    // 公司信息
    companyNameEn: '',
    establishDate: '',
    registrationNumber: '',
    vatNumber: '',
    addressEn: '',
    country: '',
    region: '',
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
  const stepFields = {
    0: ['companyNameEn', 'establishDate', 'addressEn', 'country', 'region', 'postalCode'],
    1: ['contactName', 'contactPosition', 'contactEmail', 'contactPhone'],
    2: ['businessType', 'importExportVolume', 'mainProducts', 'targetCountries'],
    3: ['businessLicense', 'idCard', 'proofOfAddress', 'otherDocuments']
  };

  const steps = [
    t('application.steps.company'),
    t('application.steps.contact'),
    t('application.steps.business'),
    t('application.steps.documents')
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
      return;
    }

    // TODO: 实现表单提交逻辑
    console.log('Form submitted:', formData);
  };

  const handleStepClick = (stepIndex) => {
    // 可以添加表单验证逻辑
    setCurrentStep(stepIndex);
  };

  const renderFormFields = () => {
    const fields = stepFields[currentStep];
    
    return (
      <div className="grid grid-cols-1 gap-8">
        {fields.map((field) => (
          <div key={field} className="space-y-2">
            <label className="block text-base font-medium text-gray-900">
              {t(`application.fields.${field}`)}
            </label>
            {field === 'country' ? (
              <CountrySelect
                value={formData[field]}
                onChange={(value) => setFormData({ ...formData, [field]: value })}
              />
            ) : field === 'establishDate' ? (
              <DatePicker
                value={formData[field]}
                onChange={(value) => setFormData({ ...formData, [field]: value })}
              />
            ) : (
              <input
                type="text"
                value={formData[field]}
                onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
                placeholder={t(`application.fields.${field}Placeholder`)}
                className="block w-full px-4 py-3 text-base rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow duration-200"
              />
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <h1 className="text-3xl font-bold text-gray-900 text-center mb-6">
              {t('application.title')}
            </h1>
            <StepProgress 
              steps={steps} 
              currentStep={currentStep} 
              onStepClick={handleStepClick}
            />
          </div>
          
          <div className="bg-white shadow-lg rounded-xl p-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              {renderFormFields()}

              <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                {currentStep > 0 && (
                  <button
                    type="button"
                    onClick={() => setCurrentStep(currentStep - 1)}
                    className="inline-flex items-center px-6 py-3 text-base font-medium rounded-lg text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                  >
                    {t('application.back')}
                  </button>
                )}
                <button
                  type="submit"
                  className={`inline-flex items-center px-6 py-3 text-base font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200 ${
                    currentStep === 0 ? 'ml-auto' : ''
                  }`}
                >
                  {currentStep === steps.length - 1 ? t('application.submit') : t('application.next')}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
} 