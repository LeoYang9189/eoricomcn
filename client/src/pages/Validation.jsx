import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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
      const response = await fetch('/api/eori/validate', {
        method: 'POST',
        headers: {
// 动画配置
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

export default function Validation() {
  const { t, i18n } = useTranslation();
  const [eoriNumber, setEoriNumber] = useState('');
  const [validationResult, setValidationResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // 切换语言
  const toggleLanguage = () => {
    const currentLang = i18n.language;
    i18n.changeLanguage(currentLang === 'zh' ? 'en' : 'zh');
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setValidationResult(null);

    try {
      if (!eoriNumber.trim()) {
        throw new Error(t('validation.error.empty'));
      }

      const result = await validateEORI(eoriNumber);
      setValidationResult(result);
    } catch (error) {
      setValidationResult({
        isValid: false,
        message: error.message
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <SEO 
        title={t('validation.title')}
        description={t('validation.subtitle')}
        keywords="EORI validation,EORI check,EORI verification"
        path="/validation"
      />

      {/* 添加语言切换按钮 */}
      <div className="fixed top-4 right-4 z-50">
        <button
          onClick={toggleLanguage}
          className="px-4 py-2 bg-white/10 backdrop-blur-md rounded-lg text-white hover:bg-white/20 transition-colors"
        >
          {i18n.language === 'zh' ? 'English' : '中文'}
        </button>
      </div>

      {/* 背景横幅 - 调整颜色为更浅的蓝色 */}
      <div className="relative bg-gradient-to-br from-blue-600/90 via-blue-500/90 to-blue-600/90 overflow-hidden">
        {/* 网格背景 */}
        <motion.div 
          className="absolute inset-0 opacity-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.05 }}
          transition={{ duration: 1 }}
        >
          <div className="absolute w-full h-full">
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5"/>
              </pattern>
              <rect width="100" height="100" fill="url(#grid)"/>
            </svg>
          </div>
        </motion.div>

        <div className="container mx-auto px-6 py-20">
          <div className="flex flex-col md:flex-row items-center justify-between">
            {/* 左侧文本 */}
            <motion.div 
              className="md:w-1/2 text-white z-10"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.h1 
                className="text-5xl font-bold mb-6"
                variants={itemVariants}
              >
                {t('validation.hero.title')}
                <span className="text-blue-300 block mt-2">
                  {t('validation.hero.subtitle')}
                </span>
              </motion.h1>
              <motion.p 
                className="text-xl text-blue-100 mb-8"
                variants={itemVariants}
              >
                {t('validation.hero.description')}
              </motion.p>
              <motion.div 
                className="flex flex-wrap gap-4"
                variants={itemVariants}
              >
                {/* 特性标签 */}
                <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-blue-700 text-blue-100">
                  <i className="fas fa-check-circle mr-2" />
                  {t('validation.features.official')}
                </span>
                <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-blue-700 text-blue-100">
                  <i className="fas fa-bolt mr-2" />
                  {t('validation.features.fast')}
                </span>
                <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-blue-700 text-blue-100">
                  <i className="fas fa-shield-alt mr-2" />
                  {t('validation.features.secure')}
                </span>
              </motion.div>
            </motion.div>

            {/* 右侧动画 - 使用多个物流相关动画 */}
            <motion.div 
              className="md:w-1/2 relative h-96 mt-8 md:mt-0"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              {/* 集装箱船动画 */}
              <div className="absolute right-0 bottom-0 w-2/3 h-2/3">
                <lottie-player
                  src="/animations/container-ship.json"
                  background="transparent"
                  speed="1"
                  style={{ width: '100%', height: '100%' }}
                  loop
                  autoplay
                />
              </div>
              
              {/* 货运卡车动画 */}
              <div className="absolute left-0 bottom-20 w-1/3 h-1/3">
                <lottie-player
                  src="/animations/delivery-truck.json"
                  background="transparent"
                  speed="1"
                  style={{ width: '100%', height: '100%' }}
                  loop
                  autoplay
                />
              </div>
              
              {/* 货运飞机动画 */}
              <div className="absolute right-10 top-10 w-1/4 h-1/4">
                <lottie-player
                  src="/animations/cargo-plane.json"
                  background="transparent"
                  speed="1"
                  style={{ width: '100%', height: '100%' }}
                  loop
                  autoplay
                />
              </div>

              {/* 集装箱码头吊机动画 */}
              <div className="absolute left-20 top-20 w-1/4 h-1/4">
                <lottie-player
                  src="/animations/container-crane.json"
                  background="transparent"
                  speed="1"
                  style={{ width: '100%', height: '100%' }}
                  loop
                  autoplay
                />
              </div>

              {/* 装饰性光晕效果 */}
              <div className="absolute -right-10 top-10 w-32 h-32 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-blob"/>
              <div className="absolute -right-20 bottom-10 w-32 h-32 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-blob animation-delay-2000"/>
            </motion.div>
          </div>
        </div>
      </div>

      {/* 主要内容区域 */}
      <div className="bg-gradient-to-b from-gray-50 to-white py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-xl mx-auto">
            {/* 验证表单 */}
            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
              <div className="flex items-center mb-6">
                <i className="fas fa-search text-blue-600 text-xl mr-3" />
                <h2 className="text-xl font-semibold">{t('validation.title')}</h2>
              </div>
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  value={eoriNumber}
                  onChange={(e) => setEoriNumber(e.target.value.toUpperCase())}
                  placeholder={t('validation.placeholder')}
                  pattern="[A-Z]{2}[0-9A-Z]{1,15}"
                  title={t('validation.error.format')}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 mb-4 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 flex items-center justify-center"
                >
                  <i className="fas fa-check-circle mr-2" />
                  {isLoading ? t('validation.validating') : t('validation.submit')}
                </button>
              </form>
            </div>

            {/* 验证结果 */}
            {validationResult && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6"
              >
                <div className="bg-white p-6 rounded-xl shadow-lg">
                  {/* ... 结果显示部分保持不变 */}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
} 