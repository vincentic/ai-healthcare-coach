import { useState, useEffect } from 'react';
import { useNavigate } from '../lib/navigation';
import { Card, Table, Button, Tabs } from 'antd';
import { message } from '../utils/message';
import { CompassOutlined, PlusOutlined } from '@ant-design/icons';
import { mindApi, booksApi } from '../api';
import { SystemNodeIntro } from '../components/SystemNodeIntro';

export default function MindView() {
  const navigate = useNavigate();
  const [healing, setHealing] = useState<any[]>([]);
  const [knowledge, setKnowledge] = useState<any[]>([]);
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
      const [healingData, knowledgeData] = await Promise.all([
        mindApi.getHealing(),
        mindApi.getKnowledge(),
      ]);
      setHealing(healingData);
      setKnowledge(knowledgeData);
    } catch (error) {
      message.error('加载失败');
    } finally {
      setLoading(false);
    }
  };

  const healingColumns = [
    { title: '日期', dataIndex: 'recordDate', key: 'recordDate' },
    { title: '类型', dataIndex: 'healingType', key: 'healingType' },
    { title: '标题', dataIndex: 'title', key: 'title' },
    { title: '技术', dataIndex: 'technique', key: 'technique' },
    { title: '时长', dataIndex: 'durationMinutes', key: 'durationMinutes' },
    { title: '进展', dataIndex: 'progress', key: 'progress', render: (p: number) => `${p || 0}%` },
  ];

  const knowledgeColumns = [
    { title: '日期', dataIndex: 'recordDate', key: 'recordDate' },
    { title: '类型', dataIndex: 'recordType', key: 'recordType' },
    { title: '收获', dataIndex: 'gains', key: 'gains', ellipsis: true },
  ];

  // 读书
  const loadBookRecords = async () => {
    setBookLoading(true);
    try {
      const data = await booksApi.getDimensionLinksByDimension('mind') as any;
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

  const bookColumns = [
    { title: '日期', dataIndex: 'recordDate', key: 'recordDate' },
    { title: '书名', dataIndex: 'title', key: 'title' },
    { title: '收获', dataIndex: 'readingGains', key: 'readingGains', width: 200, ellipsis: true },
  ];

  const healingTabItems = [
    { key: 'book', label: '价值输入', children: (
      <>
        <div style={{ marginBottom: 16 }}>
          <Button type="primary" icon={<PlusOutlined />} onClick={() => navigate('/add-book-record/mind')}>添加记录</Button>
        </div>
        <Table columns={bookColumns} dataSource={bookRecords} rowKey="id" loading={bookLoading} pagination={{ pageSize: 10 }} />
      </>
    )},
    { key: 'healing', label: '心灵自由练习', children: (
      <>
        <div style={{ marginBottom: 16 }}>
          <Button type="primary" icon={<PlusOutlined />} onClick={() => navigate('/add-mind-record/healing')}>添加记录</Button>
        </div>
        <Table columns={healingColumns} dataSource={healing} rowKey="id" loading={loading} pagination={{ pageSize: 10 }} />
      </>
    )},
    { key: 'knowledge', label: '决策原则', children: (
      <>
        <div style={{ marginBottom: 16 }}>
          <Button type="primary" icon={<PlusOutlined />} onClick={() => navigate('/add-mind-record/knowledge')}>添加记录</Button>
        </div>
        <Table columns={knowledgeColumns} dataSource={knowledge} rowKey="id" loading={loading} pagination={{ pageSize: 10 }} />
      </>
    )},
    { key: 'path', label: '身份路径', children: <div>内在/外在成长路径记录</div> },
    { key: 'synchronicity', label: '共时信号', children: <div>心流、正念、共时性体验</div> },
  ];

  return (
    <div>
      <SystemNodeIntro
        icon={<CompassOutlined />}
        kicker="Node B"
        title="价值与自由"
        description="把驱动力翻译成选择标准，检查健康、心灵、时间、关系、财务是否正在扩大真实选择。这里的 adaptive counterbalance 是：目标变硬时回到自由，选择发散时回到价值。"
        points={['价值观与身份', '五种自由扫描', '痛苦信号与边界', '长期方向校准']}
        steps={[
          { title: '看见偏移', detail: '我是在追求价值，还是被焦虑、比较、惯性推着走？' },
          { title: '选择制衡', detail: '过度控制时给自由，过度放任时给边界，过度消耗时给恢复。' },
          { title: '更新方向', detail: '把一个发现写成选择原则，供下一次目标和项目调用。' },
        ]}
      />
      <Card style={{ marginTop: 16 }}>
        <Tabs activeKey={activeTab} onChange={setActiveTab} items={healingTabItems} />
      </Card>
    </div>
  );
}
