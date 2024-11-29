import React, { useState } from 'react';
import { Form, Input, Button, Message } from '@arco-design/web-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Login() {
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      const success = await login(values.email, values.password);
      
      if (success) {
        Message.success('登录成功');
        navigate('/applications');
      } else {
        Message.error('登录失败，请检查用户名和密码');
      }
    } catch (error) {
      Message.error('登录失败');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
        <div>
          <h2 className="text-center text-3xl font-extrabold text-gray-900">
            管理员登录
          </h2>
        </div>
        
        <Form
          form={form}
          onSubmit={handleSubmit}
          className="mt-8 space-y-6"
          layout="vertical"
        >
          <Form.Item
            label="邮箱"
            field="email"
            rules={[{ required: true, message: '请输入邮箱' }]}
          >
            <Input placeholder="请输入邮箱" />
          </Form.Item>

          <Form.Item
            label="密码"
            field="password"
            rules={[{ required: true, message: '请输入密码' }]}
          >
            <Input.Password placeholder="请输入密码" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} long>
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
} 