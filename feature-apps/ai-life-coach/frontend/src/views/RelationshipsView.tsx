import { useState, useEffect } from 'react';
import { useNavigate } from '../lib/navigation';
import { Card, Table, Button, Tabs, Tag } from 'antd';
import { PlusOutlined, TeamOutlined } from '@ant-design/icons';
import { relationshipsApi, booksApi } from '../api';
import { message } from '../utils/message';

export default function RelationshipsView() {
  const navigate = useNavigate();
  const [records, setRecords] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('book');

  // 读书
  const [bookRecords, setBookRecords] = useState<any[]>([]);
  const [bookLoading, setBookLoading] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await relationshipsApi.getAll();
      setRecords(data);
    } catch (error) {
      message.error('加载失败');
    } finally {
      setLoading(false);
    }
  };

  // 读书
  const loadBookRecords = async () => {
    setBookLoading(true);
    try {
      const data = await booksApi.getDimensionLinksByDimension('relationships') as any;
      const links = ((data as any) || []).map((link: any) => ({
        id: link.id,
        title: link.book?.title || '未知书籍',
        readingGains: link.readingGains,
        recordDate: link.recordDate,
      }));
      setBookRecords(links);
    } catch (error) {
      console.error('加载读书记录失败', error);
    } finally {
      setBookLoading(false);
    }
  };

  useEffect(() => {
    if (activeTab === 'book') {
      loadBookRecords();
    }
  }, [activeTab]);

  const categoryMap: Record<string, { text: string; color: string }> = {
    natural: { text: '自然', color: 'green' },
    social: { text: '社会', color: 'blue' },
    family: { text: '家庭', color: 'orange' },
    friends: { text: '朋友', color: 'purple' },
    colleagues: { text: '同事', color: 'cyan' },
  };

  const columns = [
    { title: '日期', dataIndex: 'recordDate', key: 'recordDate' },
    { title: '联系人', dataIndex: 'personName', key: 'personName' },
    { title: '互动类型', dataIndex: 'interactionType', key: 'interactionType' },
    {
      title: '分类',
      dataIndex: 'category',
      key: 'category',
      render: (c: string) => {
        const cat = categoryMap[c] || { text: c, color: 'default' };
        return <Tag color={cat.color}>{cat.text}</Tag>;
      },
    },
    { title: '备注', dataIndex: 'notes', key: 'notes', ellipsis: true },
  ];

  const bookColumns = [
    { title: '日期', dataIndex: 'recordDate', key: 'recordDate' },
    { title: '书名', dataIndex: 'title', key: 'title' },
    { title: '收获', dataIndex: 'readingGains', key: 'readingGains', width: 200, ellipsis: true },
  ];

  return (
    <div>
      <h2><TeamOutlined /> 关系维度</h2>
      <Card style={{ marginTop: 16 }}>
        <Tabs activeKey={activeTab} onChange={setActiveTab}
          items={[
            { key: 'book', label: '读书', children: (
              <>
                <div style={{ marginBottom: 16 }}>
                  <Button type="primary" icon={<PlusOutlined />} onClick={() => navigate('/add-book-record/relationships')}>添加记录</Button>
                </div>
                <Table columns={bookColumns} dataSource={bookRecords} rowKey="id" loading={bookLoading} pagination={{ pageSize: 10 }} />
              </>
            )},
            {
              key: 'records',
              label: '自我关系',
              children: (
                <>
                  <div style={{ marginBottom: 16 }}>
                    <Button type="primary" icon={<PlusOutlined />} onClick={() => navigate('/add-relationship-record')}>
                      添加记录
                    </Button>
                  </div>
                  <Table columns={columns} dataSource={records} rowKey="id" loading={loading} pagination={{ pageSize: 10 }} />
                </>
              ),
            },
            { key: 'natural', label: '自然关系', children: <div>与自然的互动与感悟</div> },
            { key: 'social', label: '社会关系', children: <div>社会活动、角色与贡献</div> },
            { key: 'family', label: '家庭关系', children: <div>家庭互动、沟通与事务</div> },
            { key: 'friends', label: '朋友关系', children: <div>朋友联系、友谊维护</div> },
            { key: 'colleagues', label: '同事关系', children: <div>工作协作、职场互动</div> },
          ]}
        />
      </Card>
    </div>
  );
}
