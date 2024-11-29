import React, { useState, useEffect } from 'react';
import { Table, Button, Message } from '@arco-design/web-react';
import { useAuth } from '../contexts/AuthContext';

export default function ApplicationList() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(false);
  const { token } = useAuth();

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/applications', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      
      if (data.success) {
        setApplications(data.applications);
      } else {
        Message.error(data.message);
      }
    } catch (error) {
      Message.error('获取申请列表失败');
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      title: '申请编号',
      dataIndex: 'applicationId',
    },
    {
      title: '公司名称',
      dataIndex: 'companyName',
    },
    {
      title: '申请状态',
      dataIndex: 'status',
      render: (status) => (
        <span className={`status-${status.toLowerCase()}`}>
          {status}
        </span>
      ),
    },
    {
      title: '支付状态',
      dataIndex: 'paymentStatus',
    },
    {
      title: '操作',
      render: (_, record) => (
        <div className="space-x-2">
          <Button type="primary" size="small">
            查看详情
          </Button>
          <Button type="secondary" size="small">
            上传证书
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="p-6">
      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">申请记录管理</h2>
      </div>
      
      <Table
        loading={loading}
        columns={columns}
        data={applications}
        pagination={{
          total: applications.length,
          pageSize: 10,
        }}
      />
    </div>
  );
} 