import React from 'react';
import { useTranslation } from 'react-i18next';
import Layout from '../../components/Layout';

export default function Privacy() {
  const { t } = useTranslation();

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          隐私政策
        </h1>
        <div className="prose prose-blue max-w-none">
          <h2>1. 信息收集</h2>
          <p>我们收集的信息包括：</p>
          <ul>
            <li>基本身份信息</li>
            <li>联系方式</li>
            <li>公司信息</li>
            <li>业务相关信息</li>
          </ul>

          <h2>2. 信息使用</h2>
          <p>我们使用收集的信息：</p>
          <ul>
            <li>处理EORI申请</li>
            <li>提供客户服务</li>
            <li>改进服务质量</li>
          </ul>

          {/* 更多隐私政策内容... */}
        </div>
      </div>
    </Layout>
  );
} 