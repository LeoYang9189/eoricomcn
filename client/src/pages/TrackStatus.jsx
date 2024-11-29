import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import Layout from '../components/Layout';
import SEO from '../components/SEO';

export default function TrackStatus() {
  const { t } = useTranslation();
  const [applicationId, setApplicationId] = useState('');
  const [trackingResult, setTrackingResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTrackingResult(null);

    try {
      // 模拟查询延迟
      await new Promise(resolve => setTimeout(resolve, 1000));

      // TODO: 实现实际的查询逻辑
      setTrackingResult({
        status: 'processing',
        stage: 'document_review',
        updatedAt: new Date().toISOString(),
        estimatedCompletion: '2-3个工作日',
        message: '您的申请正在审核中，预计2-3个工作日完成'
      });
    } catch (error) {
      setTrackingResult({
        status: 'error',
        message: '查询失败，请稍后重试'
      });
    } finally {
      setIsLoading(false);
    }
  };

  // 获取状态对应的样式
  const getStatusStyle = (status) => {
    const styles = {
      pending: { bg: 'bg-yellow-100', text: 'text-yellow-800', icon: 'clock' },
      processing: { bg: 'bg-blue-100', text: 'text-blue-800', icon: 'spinner' },
      completed: { bg: 'bg-green-100', text: 'text-green-800', icon: 'check-circle' },
      rejected: { bg: 'bg-red-100', text: 'text-red-800', icon: 'x-circle' },
      error: { bg: 'bg-red-100', text: 'text-red-800', icon: 'exclamation-circle' }
    };
    return styles[status] || styles.pending;
  };

  return (
    <Layout>
      <SEO 
        title="查询申请进度 - EORI申请进度查询"
        description="查询您的EORI申请当前处理状态和进度"
        keywords="EORI申请进度,EORI状态查询,申请跟踪"
        path="/track"
      />

      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-32 pb-20">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            {/* 主标题区域 */}
            <div className="flex flex-col md:flex-row items-center justify-between mb-16">
              <div className="md:w-1/2 text-left mb-8 md:mb-0">
                <h1 className="text-5xl font-bold mb-6 text-gray-900">
                  实时跟踪
                  <span className="text-blue-600 block">申请进度</span>
                </h1>
                <p className="text-xl text-gray-700 mb-8">
                  随时了解您的EORI申请处理状态，获取最新进展
                </p>
                {/* 特性标签 */}
                <div className="flex flex-wrap gap-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                    <i className="fas fa-clock mr-2" />
                    实时更新
                  </span>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                    <i className="fas fa-shield-alt mr-2" />
                    安全可靠
                  </span>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
                    <i className="fas fa-history mr-2" />
                    全程追踪
                  </span>
                </div>
              </div>
            </div>

            {/* 查询区域 */}
            <div className="max-w-xl mx-auto">
              <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
                <div className="flex items-center mb-6">
                  <i className="fas fa-search text-blue-600 text-xl mr-3" />
                  <h2 className="text-xl font-semibold">进度查询</h2>
                </div>
                <form onSubmit={handleSubmit}>
                  <input
                    type="text"
                    value={applicationId}
                    onChange={(e) => setApplicationId(e.target.value)}
                    placeholder="请输入申请编号"
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 mb-4 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    disabled={isLoading}
                  />
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 flex items-center justify-center"
                  >
                    <i className="fas fa-search mr-2" />
                    {isLoading ? '查询中...' : '查询进度'}
                  </button>
                </form>
              </div>

              {/* 查询结果 */}
              {trackingResult && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6"
                >
                  <div className="bg-white p-6 rounded-xl shadow-lg">
                    <div className="border-b pb-4 mb-4">
                      <h3 className="text-xl font-semibold mb-2">查询结果</h3>
                      <div className={`flex items-center ${getStatusStyle(trackingResult.status).text}`}>
                        <i className={`fas fa-${getStatusStyle(trackingResult.status).icon} mr-2`} />
                        <p className="text-lg">{trackingResult.message}</p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-gray-600">当前状态:</div>
                        <div className="font-medium">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium ${getStatusStyle(trackingResult.status).bg} ${getStatusStyle(trackingResult.status).text}`}>
                            {trackingResult.stage === 'document_review' ? '文件审核中' : trackingResult.stage}
                          </span>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-gray-600">更新时间:</div>
                        <div className="font-medium">
                          {new Date(trackingResult.updatedAt).toLocaleString()}
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-gray-600">预计完成时间:</div>
                        <div className="font-medium">{trackingResult.estimatedCompletion}</div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
} 