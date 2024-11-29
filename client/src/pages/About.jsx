import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import Layout from '../components/Layout';
import SEO from '../components/SEO';

// 装饰性背景组件
const DecorativeBackground = () => (
  <div className="absolute inset-0 overflow-hidden">
    <div className="absolute -top-1/2 -right-1/2 w-[200%] h-[200%] bg-gradient-to-br from-blue-50 via-white to-blue-50 rounded-full opacity-70" />
    <div className="absolute inset-0 bg-grid-blue-500/[0.03]" />
  </div>
);

// 替换 heroicons 导入为自定义图标组件
const CustomIcons = {
  UserGroupIcon: () => (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  ),
  ClockIcon: () => (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  ChartBarIcon: () => (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  )
};

export default function About() {
  const { t } = useTranslation();

  // 在组件中使用自定义图标
  const advantageIcons = {
    'professional': CustomIcons.UserGroupIcon,
    'fast': CustomIcons.ClockIcon,
    'tracking': CustomIcons.ChartBarIcon
  };

  return (
    <Layout>
      <SEO 
        title={t('about.seo.title')}
        description={t('about.seo.description')}
        keywords={t('about.seo.keywords')}
        path="/about"
      />

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <DecorativeBackground />
        <div className="relative max-w-7xl mx-auto py-24 px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl mb-6">
              {t('about.company.title')}
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('about.company.subtitle')}
            </p>
          </motion.div>
        </div>
      </div>

      {/* 公司介绍 */}
      <div className="py-20 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-slate-50/[0.03]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              {t('about.company.intro.title')}
            </h2>
            <div className="space-y-8">
              {t('about.company.intro.content', { returnObjects: true }).map((paragraph, index) => (
                <motion.p
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-lg text-gray-600 leading-relaxed"
                >
                  {paragraph}
                </motion.p>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* 服务优势 */}
      <div className="py-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-grid-slate-50/[0.03]" />
          <div className="absolute top-0 inset-x-0 h-48 bg-gradient-to-b from-white" />
          <div className="absolute bottom-0 inset-x-0 h-48 bg-gradient-to-t from-white" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {t('about.advantages.title')}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('about.advantages.subtitle')}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {t('about.advantages.items', { returnObjects: true }).map((item, index) => {
              const Icon = advantageIcons[item.icon] || CustomIcons.UserGroupIcon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white rounded-xl shadow-md p-8 hover:shadow-lg transition-all duration-300"
                >
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                    <Icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 团队介绍 */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900">
              {t('about.team.title')}
            </h2>
            <p className="mt-4 text-xl text-gray-600">
              {t('about.team.subtitle')}
            </p>
          </motion.div>

          <div className="mt-12 grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
            {t('about.team.members', { returnObjects: true }).map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="relative">
                  <img
                    className="w-48 h-48 rounded-full mx-auto object-cover"
                    src={member.image}
                    alt={member.name}
                  />
                  <div className="absolute inset-0 rounded-full bg-gradient-to-t from-blue-600/20 to-transparent" />
                </div>
                <div className="mt-6">
                  <h3 className="text-xl font-semibold text-gray-900">{member.name}</h3>
                  <p className="text-blue-600">{member.position}</p>
                  <p className="mt-2 text-gray-600">{member.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-grid-white/[0.05]" />
          <div className="absolute inset-0 bg-gradient-to-t from-blue-600/50" />
        </div>
        <div className="relative max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold text-white mb-4">
              {t('about.cta.title')}
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              {t('about.cta.subtitle')}
            </p>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
} 