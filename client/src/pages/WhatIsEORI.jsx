import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Layout from '../components/Layout';
import SEO from '../components/SEO';

export default function WhatIsEORI() {
  const { t } = useTranslation();

  return (
    <Layout>
      <SEO 
        title={t('whatIsEori.seo.title')}
        description={t('whatIsEori.seo.description')}
        keywords={t('whatIsEori.seo.keywords')}
        path="/what-is-eori"
      />

      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-50 to-blue-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="text-center animate-fade-in-up">
            <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
              {t('whatIsEori.hero.title')}
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-xl text-gray-500">
              {t('whatIsEori.hero.subtitle')}
            </p>
          </div>
        </div>
      </div>

      {/* 主要内容 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="space-y-16">
          {/* 什么是 EORI */}
          <section className="animate-fade-in-up">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              {t('whatIsEori.definition.title')}
            </h2>
            <div className="prose prose-blue max-w-none">
              <p className="text-lg text-gray-500">
                {t('whatIsEori.definition.content')}
              </p>
            </div>
          </section>

          {/* 为什么需要 EORI */}
          <section className="animate-fade-in-up">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              {t('whatIsEori.why.title')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {t('whatIsEori.why.reasons', { returnObjects: true }).map((reason, index) => (
                <div 
                  key={index}
                  className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                >
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">{reason.title}</h3>
                  <p className="text-gray-500">{reason.content}</p>
                </div>
              ))}
            </div>
          </section>

          {/* 申请流程 */}
          <section className="animate-fade-in-up">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              {t('whatIsEori.process.title')}
            </h2>
            <div className="relative">
              <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-200 transform -translate-y-1/2"></div>
              <div className="relative grid grid-cols-1 md:grid-cols-4 gap-8">
                {t('whatIsEori.process.steps', { returnObjects: true }).map((step, index) => (
                  <div key={index} className="relative bg-white p-6 rounded-lg shadow-md">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                      {index + 1}
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mt-4 mb-2">{step.title}</h3>
                    <p className="text-gray-500">{step.content}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center animate-fade-in-up">
          <Link
            to="/application"
            className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
          >
            {t('whatIsEori.cta.button')}
          </Link>
        </div>
      </div>
    </Layout>
  );
} 