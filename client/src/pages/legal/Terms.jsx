import React from 'react';
import { useTranslation } from 'react-i18next';
import Layout from '../../components/Layout';

export default function Terms() {
  const { t } = useTranslation();

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          服务条款
        </h1>
        <div className="prose prose-blue max-w-none">
          <h2>1. 服务范围</h2>
          <p>我们提供EORI号码申请服务，包括但不限于：</p>
          <ul>
            <li>EORI号码申请指导</li>
            <li>文件准备协助</li>
            <li>申请进度跟踪</li>
            <li>结果通知服务</li>
          </ul>

          <h2>2. 用户责任</h2>
          <p>用户需要：</p>
          <ul>
            <li>提供真实、准确的信息</li>
            <li>及时提供所需文件</li>
            <li>遵守相关法律法规</li>
          </ul>

          {/* 更多条款... */}
        </div>
      </div>
    </Layout>
  );
} 