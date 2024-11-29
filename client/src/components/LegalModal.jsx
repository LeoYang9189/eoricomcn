import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { XMarkIcon } from '@heroicons/react/24/outline';

export default function LegalModal({ isOpen, onClose, type }) {
  const content = type === 'terms' ? termsContent : privacyContent;

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="flex min-h-screen items-center justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={onClose} />

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="relative inline-block transform overflow-hidden rounded-lg bg-white text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-4xl sm:align-middle"
          >
            <div className="absolute right-0 top-0 pr-4 pt-4">
              <button
                type="button"
                className="rounded-md bg-white text-gray-400 hover:text-gray-500"
                onClick={onClose}
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>

            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="mt-3 text-center sm:mt-0 sm:text-left">
                <h3 className="text-2xl font-semibold leading-6 text-gray-900 mb-8">
                  {type === 'terms' ? '服务条款' : '隐私政策'}
                </h3>
                <div className="mt-4 prose prose-blue max-w-none overflow-y-auto max-h-[60vh]">
                  {content}
                </div>
              </div>
            </div>

            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button
                type="button"
                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                onClick={onClose}
              >
                关闭
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
}

const termsContent = (
  <>
    <h2>1. 服务协议的范围</h2>
    <p>本协议是您与上海秉渔供应链管理有限公司（以下简称"我们"）之间就EORI申请服务等相关事宜所订立的契约。请您仔细阅读本协议，您点击"同意"、"注册"按钮后，本协议即构成对双方有约束力的法律文件。</p>

    <h2>2. 服务内容</h2>
    <p>我们提供的服务包括但不限于：</p>
    <ul>
      <li>EORI号码申请咨询与指导</li>
      <li>申请材料准备与审核</li>
      <li>申请文件提交</li>
      <li>申请进度跟踪</li>
      <li>结果通知与后续支持</li>
    </ul>

    <h2>3. 用户权利与义务</h2>
    <p>3.1 用户权利：</p>
    <ul>
      <li>获得专业的EORI申请服务</li>
      <li>获取申请进度的实时更新</li>
      <li>获得技术支持和客户服务</li>
      <li>对服务质量提出意见和建议</li>
    </ul>
    
    <p>3.2 用户义务：</p>
    <ul>
      <li>提供真实、准确、完整的个人和公司信息</li>
      <li>及时提供申请所需的各项文件</li>
      <li>遵守相关法律法规和行业规范</li>
      <li>按约定支付服务费用</li>
    </ul>

    <h2>4. 服务费用</h2>
    <p>4.1 服务费用标准将在订购页面明确标示。</p>
    <p>4.2 特殊情况下的额外费用将事先告知并获得您的同意。</p>
    <p>4.3 支付方式包括但不限于：银行转账、在线支付等。</p>

    <h2>5. 保密条款</h2>
    <p>5.1 我们承诺对提供的所有信息严格保密。</p>
    <p>5.2 未经您的许可，不会向第三方披露您的信息。</p>
    <p>5.3 法律法规要求披露的情况除外。</p>

    <h2>6. 知识产权</h2>
    <p>6.1 我们的商标、网站内容等知识产权受法律保护。</p>
    <p>6.2 未经许可，不得擅自使用相关知识产权。</p>

    <h2>7. 免责条款</h2>
    <p>7.1 因不可抗力导致的服务中断或延迟，我们不承担责任。</p>
    <p>7.2 因用户提供虚假信息导致的损失，由用户自行承担。</p>

    <h2>8. 协议终止</h2>
    <p>8.1 服务完成后本协议自动终止。</p>
    <p>8.2 违反协议条款可能导致服务终止。</p>

    <h2>9. 法律适用与争议解决</h2>
    <p>9.1 本协议适用中华人民共和国法律。</p>
    <p>9.2 争议优先通过友好协商解决。</p>

    <h2>9. 联系我们</h2>
    <p>如有隐私相关问题，请通过以下方式联系：</p>
    <ul>
      <li>邮箱：gm@leotech.site</li>
      <li>电话：+86 13482360085</li>
    </ul>
  </>
);

const privacyContent = (
  <>
    <h2>1. 信息收集</h2>
    <p>我们收集的信息类型包括：</p>
    <ul>
      <li>基本身份信息（姓名、身份证号等）</li>
      <li>联系方式（电话、邮箱、地址等）</li>
      <li>公司信息（营业执照、税号等）</li>
      <li>业务信息（贸易类型、进出口规模等）</li>
      <li>设备信息（IP地址、浏览器类型等）</li>
    </ul>

    <h2>2. 信息使用</h2>
    <p>我们使用收集的信息用于：</p>
    <ul>
      <li>处理EORI号码申请</li>
      <li>提供客户支持服务</li>
      <li>改进我们的服务</li>
      <li>发送服务通知</li>
      <li>防止欺诈和增强安全性</li>
    </ul>

    <h2>3. 信息保护</h2>
    <p>我们采取的保护措施包括：</p>
    <ul>
      <li>数据加密存储</li>
      <li>访问控制和权限管理</li>
      <li>安全审计和监控</li>
      <li>定期安全评估</li>
    </ul>

    <h2>4. 信息共享</h2>
    <p>我们可能在以下情况下共享您的信息：</p>
    <ul>
      <li>获得您的明确同意</li>
      <li>法律法规要求</li>
      <li>保护我们的合法权益</li>
    </ul>

    <h2>5. Cookie使用</h2>
    <p>我们使用Cookie来：</p>
    <ul>
      <li>记住您的登录状态</li>
      <li>分析网站使用情况</li>
      <li>优化用户体验</li>
    </ul>

    <h2>6. 用户权利</h2>
    <p>您对个人信息享有以下权利：</p>
    <ul>
      <li>访问和查看</li>
      <li>更正和更新</li>
      <li>删除</li>
      <li>撤回同意</li>
    </ul>

    <h2>7. 儿童隐私</h2>
    <p>我们的服务不面向16岁以下儿童，不会故意收集儿童的个人信息。</p>

    <h2>8. 隐私政策更新</h2>
    <p>我们可能会更新本隐私政策，更新后将在网站公告。</p>

    <h2>9. 联系我们</h2>
    <p>如有隐私相关问题，请通过以下方式联系：</p>
    <ul>
      <li>邮箱：gm@leotech.site</li>
      <li>电话：+86 13482360085</li>
    </ul>
  </>
); 