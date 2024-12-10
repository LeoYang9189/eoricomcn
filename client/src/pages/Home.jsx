import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Layout from '../components/Layout';
import HeroImage from '../components/HeroImage';
import { ProfessionalIcon, SpeedIcon, TrackingIcon } from '../components/icons';
import SEO from '../components/SEO';

export default function Home() {
  const { t } = useTranslation();

  return (
    <Layout>
      <SEO 
        title={t('home.seo.title')}
        description={t('home.seo.description')}
        keywords={t('home.seo.keywords')}
        path="/"
      />

      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-50 to-blue-100 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="animate-fade-in-left">
              <h1 className="text-4xl font-bold text-gray-900 mb-6">
                {t('home.hero.title')}
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                {t('home.hero.subtitle')}
              </p>
              <Link
                to="/application"
                className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
              >
                {t('nav.applyEORI')}
              </Link>
            </div>
            <div className="hidden md:block animate-fade-in-right">
              <HeroImage />
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 animate-fade-in-up">
            <h2 className="text-3xl font-bold text-gray-900">
              {t('home.features.title')}
            </h2>
            <p className="mt-4 text-xl text-gray-600">
              {t('home.features.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {t('home.features.list', { returnObjects: true }).map((feature, index) => (
              <div 
                key={index}
                className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="text-blue-600 mb-4">
                  {index === 0 ? <ProfessionalIcon /> : index === 1 ? <SpeedIcon /> : <TrackingIcon />}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-fade-in-up">
            <h2 className="text-3xl font-bold text-white mb-4">
              {t('home.cta.title')}
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              {t('home.cta.subtitle')}
            </p>
            <Link
              to="/auth"
              className="inline-flex items-center px-8 py-3 border-2 border-white text-base font-medium rounded-md text-white hover:bg-white hover:text-blue-600 transition-colors"
            >
              {t('home.cta.button')}
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}