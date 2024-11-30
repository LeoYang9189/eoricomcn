import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Layout from '../components/Layout';
import SEO from '../components/SEO';
import WeChatLoginModal from '../components/WeChatLoginModal';
import GoogleLogin from '../components/GoogleLogin';

export default function Auth() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [verifyMethod, setVerifyMethod] = useState('email'); // 'email' | 'phone'
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    verificationCode: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [countdown, setCountdown] = useState(0);
  const [showWeChatModal, setShowWeChatModal] = useState(false);

  // 发送验证码
  const handleSendCode = async () => {
    try {
      // TODO: 实现发送验证码逻辑
      setCountdown(60);
      const timer = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } catch (err) {
      setError(t('auth.verificationCode.sendFailed'));
    }
  };

  // 处理表单提交
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isLogin && formData.password !== formData.confirmPassword) {
      setError(t('auth.register.passwordMismatch'));
      return;
    }
    try {
      // TODO: 实现登录/注册逻辑
      console.log('Auth attempt:', { isLogin, verifyMethod, formData });
    } catch (err) {
      setError(isLogin ? t('auth.login.failed') : t('auth.register.failed'));
    }
  };

  // 处理第三方登录
  const handleThirdPartyAuth = async (type) => {
    try {
      switch (type) {
        case 'google':
          // 谷歌登录按钮会自动处理点击事件
          break;
        case 'wechat':
          setShowWeChatModal(true);
          break;
        default:
          break;
      }
    } catch (err) {
      setError(t('auth.thirdParty.failed'));
    }
  };

  return (
    <Layout>
      <SEO title={isLogin ? t('auth.login.title') : t('auth.register.title')} />
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {isLogin ? t('auth.login.title') : t('auth.register.title')}
          </h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-lg">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            {/* 登录/注册切换 */}
            <div className="flex justify-center space-x-4 mb-6">
              <button
                className={`px-4 py-2 text-sm font-medium rounded-md ${
                  isLogin ? 'bg-blue-600 text-white' : 'text-gray-500'
                }`}
                onClick={() => setIsLogin(true)}
              >
                {t('auth.login.title')}
              </button>
              <button
                className={`px-4 py-2 text-sm font-medium rounded-md ${
                  !isLogin ? 'bg-blue-600 text-white' : 'text-gray-500'
                }`}
                onClick={() => setIsLogin(false)}
              >
                {t('auth.register.title')}
              </button>
            </div>

            {/* 验证方式切换 */}
            {!isLogin && (
              <div className="relative mb-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center">
                  <div className="inline-flex rounded-full p-1 bg-white border border-gray-300">
                    <button
                      className={`px-6 py-2 text-sm font-medium rounded-full transition-colors ${
                        verifyMethod === 'email' 
                          ? 'bg-blue-600 text-white' 
                          : 'text-gray-500 hover:text-gray-700'
                      }`}
                      onClick={() => setVerifyMethod('email')}
                    >
                      {t('auth.verify.email')}
                    </button>
                    <button
                      className={`px-6 py-2 text-sm font-medium rounded-full transition-colors ${
                        verifyMethod === 'phone' 
                          ? 'bg-blue-600 text-white' 
                          : 'text-gray-500 hover:text-gray-700'
                      }`}
                      onClick={() => setVerifyMethod('phone')}
                    >
                      {t('auth.verify.phone')}
                    </button>
                  </div>
                </div>
              </div>
            )}

            <form className="space-y-6" onSubmit={handleSubmit}>
              {error && (
                <div className="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded">
                  {error}
                </div>
              )}

              {/* 邮箱/手机输入 */}
              <div>
                <label htmlFor={verifyMethod} className="block text-sm font-medium text-gray-700">
                  {t(`auth.${verifyMethod}.label`)}
                </label>
                <div className="mt-1">
                  <input
                    id={verifyMethod}
                    name={verifyMethod}
                    type={verifyMethod === 'email' ? 'email' : 'tel'}
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    value={formData[verifyMethod]}
                    onChange={(e) => setFormData({ ...formData, [verifyMethod]: e.target.value })}
                  />
                </div>
              </div>

              {/* 验证码输入框 */}
              {!isLogin && (
                <div>
                  <label htmlFor="verificationCode" className="block text-sm font-medium text-gray-700">
                    {t('auth.verificationCode.label')}
                  </label>
                  <div className="mt-1 flex">
                    <input
                      id="verificationCode"
                      name="verificationCode"
                      type="text"
                      required
                      className="appearance-none block flex-1 min-w-0 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      value={formData.verificationCode}
                      onChange={(e) => setFormData({ ...formData, verificationCode: e.target.value })}
                    />
                    <button
                      type="button"
                      onClick={handleSendCode}
                      disabled={countdown > 0}
                      className="inline-flex items-center whitespace-nowrap px-6 py-2 border border-transparent text-sm font-medium rounded-r-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                    >
                      {countdown > 0 ? `${countdown}s` : t('auth.verificationCode.send')}
                    </button>
                  </div>
                </div>
              )}

              {/* 密码输入 */}
              {isLogin && (
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    {t('auth.password.label')}
                  </label>
                  <div className="mt-1">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      required
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    />
                  </div>
                </div>
              )}

              {/* 认密码 */}
              {!isLogin && (
                <>
                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                      {t('auth.password.label')}
                    </label>
                    <div className="mt-1">
                      <input
                        id="password"
                        name="password"
                        type="password"
                        required
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                      {t('auth.password.confirm')}
                    </label>
                    <div className="mt-1">
                      <input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        required
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        value={formData.confirmPassword}
                        onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                      />
                    </div>
                  </div>
                </>
              )}

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  {isLogin ? t('auth.login.submit') : t('auth.register.submit')}
                </button>
              </div>
            </form>

            {/* 第三方登录 */}
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">
                    {t('auth.thirdParty.title')}
                  </span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <GoogleLogin
                  onSuccess={(userInfo) => {
                    console.log('Google login success:', userInfo);
                    navigate('/dashboard');
                  }}
                  onError={(error) => {
                    setError(t('auth.google.failed'));
                  }}
                />
                <button
                  type="button"
                  onClick={() => handleThirdPartyAuth('wechat')}
                  className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                >
                  <img className="h-5 w-5" src="/images/wechat-logo.svg" alt="WeChat" />
                  <span className="ml-2">{t('auth.thirdParty.wechat')}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 微信登录弹窗 */}
      <WeChatLoginModal
        isOpen={showWeChatModal}
        onClose={() => setShowWeChatModal(false)}
        onSuccess={(userInfo) => {
          // TODO: 处理登录成功
          console.log('WeChat login success:', userInfo);
          navigate('/dashboard');
        }}
      />
    </Layout>
  );
} 