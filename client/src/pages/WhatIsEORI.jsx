import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import Layout from '../components/Layout';
import SEO from '../components/SEO';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export default function WhatIsEORI() {
  const { t } = useTranslation();

  return (
    <Layout>
      <SEO 
        title={t('about.what.title')}
        description={t('about.what.subtitle')}
        keywords="EORI,EORI介绍,欧盟经济运营商注册识别号"
        path="/what-is-eori"
      />

      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-blue-600/90 via-blue-500/90 to-blue-600/90 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute w-full h-full bg-grid-white/[0.05]" />
        </div>

        <div className="container mx-auto px-6 py-20 relative">
          <motion.div 
            className="max-w-4xl mx-auto text-center text-white"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.h1 
              className="text-5xl font-bold mb-6"
              variants={itemVariants}
            >
              {t('about.what.title')}
              <span className="text-blue-200 block mt-2">
                {t('about.what.subtitle')}
              </span>
            </motion.h1>
            <motion.p 
              className="text-xl text-blue-100 mb-8"
              variants={itemVariants}
            >
              {t('about.what.desc1')}
            </motion.p>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-gradient-to-b from-gray-50 to-white py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            {/* 介绍内容 */}
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 mb-12 text-lg leading-relaxed">
                {t('about.what.desc2')}
              </p>

              {/* 关键要点 */}
              <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <i className="fas fa-key text-blue-600 mr-3" />
                  {t('about.what.keyPoints')}
                </h2>
                <div className="grid gap-6">
                  {t('about.what.points', { returnObjects: true }).map((point, index) => (
                    <motion.div 
                      key={index}
                      className="flex items-start"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 mr-4">
                        <i className="fas fa-check text-sm" />
                      </span>
                      <div>
                        <p className="text-gray-700">{point}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* 为什么需要 EORI */}
              <div className="mb-16">
                <h2 className="text-3xl font-bold text-gray-900 mb-8">
                  {t('about.why.title')}
                </h2>
                <div className="grid md:grid-cols-3 gap-8">
                  {t('about.why.reasons', { returnObjects: true }).map((reason, index) => (
                    <motion.div
                      key={index}
                      className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.2 }}
                      viewport={{ once: true }}
                    >
                      <h3 className="text-xl font-semibold text-gray-900 mb-4">
                        {reason.title}
                      </h3>
                      <p className="text-gray-600">
                        {reason.desc}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* 申请流程 */}
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-8">
                  {t('about.process.title')}
                </h2>
                <div className="space-y-6">
                  {t('about.process.steps', { returnObjects: true }).map((step, index) => (
                    <motion.div
                      key={index}
                      className="flex items-start bg-white p-6 rounded-xl shadow-sm border border-gray-100"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.2 }}
                      viewport={{ once: true }}
                    >
                      <span className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full bg-blue-600 text-white font-bold text-lg mr-4">
                        {index + 1}
                      </span>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                          {step.title}
                        </h3>
                        <p className="text-gray-600">
                          {step.desc}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* FAQ 部分 */}
              <div className="mt-16">
                <h2 className="text-3xl font-bold text-gray-900 mb-8">
                  {t('about.faq.title')}
                </h2>
                <div className="space-y-6">
                  {t('about.faq.items', { returnObjects: true }).map((item, index) => (
                    <motion.div
                      key={index}
                      className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.2 }}
                      viewport={{ once: true }}
                    >
                      <h3 className="text-xl font-semibold text-gray-900 mb-3">
                        {item.q}
                      </h3>
                      <p className="text-gray-600">
                        {item.a}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* CTA 部分 */}
            <motion.div
              className="mt-16 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                {t('about.cta.title')}
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                {t('about.cta.subtitle')}
              </p>
              <a
                href="/application"
                className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-300"
              >
                {t('home.hero.button')}
                <i className="fas fa-arrow-right ml-2" />
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </Layout>
  );
} 