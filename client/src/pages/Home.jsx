                                            import React from 'react';
                                            import { Link } from 'react-router-dom';
                                            import { useTranslation } from 'react-i18next';
                                            import { motion } from 'framer-motion/dist/framer-motion';
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
                                                        <motion.div
                                                        initial={{ opacity: 0, x: -20 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        transition={{ duration: 0.6 }}
                                                        >
                                                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
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
                                                        </motion.div>
                                                        <motion.div
                                                        initial={{ opacity: 0, x: 20 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        transition={{ duration: 0.6, delay: 0.2 }}
                                                        className="hidden md:block"
                                                        >
                                                        <HeroImage />
                                                        </motion.div>
                                                    </div>
                                                    </div>
                                                </div>

                                                {/* 服务优势 */}
                                                <div className="py-20 bg-white">
                                                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                                                    <div className="text-center mb-16">
                                                        <h2 className="text-3xl font-bold text-gray-900 mb-4">
                                                        {t('home.features.title')}
                                                        </h2>
                                                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                                                        {t('home.features.subtitle')}
                                                        </p>
                                                    </div>
                                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                                        {[
                                                        {
                                                            icon: <ProfessionalIcon />,
                                                            title: t('home.features.professional.title'),
                                                            description: t('home.features.professional.desc'),
                                                            benefits: t('home.features.professional.benefits', { returnObjects: true })
                                                        },
                                                        {
                                                            icon: <SpeedIcon />,
                                                            title: t('home.features.fast.title'),
                                                            description: t('home.features.fast.desc'),
                                                            benefits: t('home.features.fast.benefits', { returnObjects: true })
                                                        },
                                                        {
                                                            icon: <TrackingIcon />,
                                                            title: t('home.features.tracking.title'),
                                                            description: t('home.features.tracking.desc'),
                                                            benefits: t('home.features.tracking.benefits', { returnObjects: true })
                                                        }
                                                        ].map((feature, index) => (
                                                        <motion.div
                                                            key={index}
                                                            initial={{ opacity: 0, y: 20 }}
                                                            animate={{ opacity: 1, y: 0 }}
                                                            transition={{ duration: 0.6, delay: index * 0.1 }}
                                                            className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 group"
                                                        >
                                                            <div className="text-4xl text-blue-600 mb-6">
                                                            {feature.icon}
                                                            </div>
                                                            <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                                                            <p className="text-gray-600 mb-6">{feature.description}</p>
                                                            <ul className="space-y-3">
                                                            {feature.benefits.map((benefit, idx) => (
                                                                <li key={idx} className="flex items-start">
                                                                <svg className="h-6 w-6 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                                </svg>
                                                                <span className="text-gray-600">{benefit}</span>
                                                                </li>
                                                            ))}
                                                            </ul>
                                                        </motion.div>
                                                        ))}
                                                    </div>
                                                    </div>
                                                </div>

                                                {/* 为什么选择我们 */}
                                                <div className="py-20 bg-gray-50">
                                                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                                                    <div className="text-center mb-16">
                                                        <h2 className="text-3xl font-bold text-gray-900 mb-4">
                                                        {t('home.whyUs.title')}
                                                        </h2>
                                                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                                                        {t('home.whyUs.subtitle')}
                                                        </p>
                                                    </div>
                                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                                                        {t('home.whyUs.reasons', { returnObjects: true }).map((reason, index) => (
                                                        <motion.div
                                                            key={index}
                                                            initial={{ opacity: 0, y: 20 }}
                                                            animate={{ opacity: 1, y: 0 }}
                                                            transition={{ duration: 0.6, delay: index * 0.1 }}
                                                            className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-all duration-300 group"
                                                        >
                                                            <div className="text-blue-600 text-xl font-bold mb-2 group-hover:scale-110 transition-transform duration-300">
                                                            {reason.number}
                                                            </div>
                                                            <h3 className="text-lg font-semibold mb-2">{reason.title}</h3>
                                                            <p className="text-gray-600">{reason.desc}</p>
                                                        </motion.div>
                                                        ))}
                                                    </div>
                                                    </div>
                                                </div>

                                                {/* 服务流程 */}
                                                <div className="py-20 bg-white">
                                                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                                                    <div className="text-center mb-16">
                                                        <h2 className="text-3xl font-bold text-gray-900 mb-4">
                                                        {t('home.process.title')}
                                                        </h2>
                                                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                                                        {t('home.process.subtitle')}
                                                        </p>
                                                    </div>
                                                    <div className="relative">
                                                        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-blue-100 transform -translate-y-1/2" />
                                                        <div className="relative grid grid-cols-1 md:grid-cols-4 gap-8">
                                                        {t('home.process.steps', { returnObjects: true }).map((step, index) => (
                                                            <motion.div
                                                            key={index}
                                                            initial={{ opacity: 0, y: 20 }}
                                                            animate={{ opacity: 1, y: 0 }}
                                                            transition={{ duration: 0.6, delay: index * 0.1 }}
                                                            className="relative bg-white rounded-lg p-6 shadow-md group"
                                                            >
                                                            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold group-hover:scale-110 transition-transform duration-300">
                                                                {index + 1}
                                                            </div>
                                                            <h3 className="text-lg font-semibold mb-2 mt-4 text-center">{step.title}</h3>
                                                            <p className="text-gray-600 text-center">{step.desc}</p>
                                                            </motion.div>
                                                        ))}
                                                        </div>
                                                    </div>
                                                    </div>
                                                </div>

                                                {/* CTA Section */}
                                                <div className="bg-blue-600 py-16">
                                                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                                                    <motion.div
                                                        initial={{ opacity: 0, y: 20 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        transition={{ duration: 0.6 }}
                                                    >
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
                                                    </motion.div>
                                                    </div>
                                                </div>
                                                </Layout>
                                            );
                                            }