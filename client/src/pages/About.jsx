import React from 'react';
import { useTranslation } from 'react-i18next';
import Layout from '../components/Layout';
import SEO from '../components/SEO';

export default function About() {
  const { t } = useTranslation();

  return (
    <Layout>
      <SEO 
        title={t('about.seo.title')}
        description={t('about.seo.description')}
        keywords={t('about.seo.keywords')}
        path="/about"
      />

      <div className="bg-gradient-to-b from-blue-50 to-white">
        {/* Hero Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="text-center animate-fade-in-up">
            <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
              {t('about.hero.title')}
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-xl text-gray-500">
              {t('about.hero.subtitle')}
            </p>
          </div>
        </div>

        {/* 公司介绍 */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in-left">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                {t('about.company.title')}
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                {t('about.company.description')}
              </p>
              <ul className="space-y-4">
                {t('about.company.features', { returnObjects: true }).map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <svg className="h-6 w-6 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="animate-fade-in-right">
              <img 
                src="/images/eu-map.svg" 
                alt="EU Map" 
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>

        {/* 团队介绍 */}
        <div className="bg-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 animate-fade-in-up">
              <h2 className="text-3xl font-bold text-gray-900">
                {t('about.team.title')}
              </h2>
              <p className="mt-4 text-lg text-gray-600">
                {t('about.team.subtitle')}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {t('about.team.members', { returnObjects: true }).map((member, index) => (
                <div 
                  key={index}
                  className="bg-white rounded-lg shadow-lg p-6 animate-fade-in-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="text-center">
                    <div className="h-24 w-24 rounded-full bg-blue-100 mx-auto mb-4 flex items-center justify-center">
                      <svg className="h-12 w-12 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-medium text-gray-900">{member.name}</h3>
                    <p className="text-sm text-gray-500">{member.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
} 