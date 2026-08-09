import { useState, useEffect } from 'react';
import { useNavigate } from '../lib/navigation';
import { Card, Table, Button, Tabs } from 'antd';
import { message } from '../utils/message';
import { PlusOutlined, ClockCircleOutlined } from '@ant-design/icons';
import { timeApi, booksApi } from '../api';
import dayjs from 'dayjs';
import { SystemNodeIntro } from '../components/SystemNodeIntro';

export default function TimeView() {
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
      const today = dayjs().format('YYYY-MM-DD');
      const data = await timeApi.getByDate(today);
      setRecords(data);
    } catch (error) {
      message.error('加载失败');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await timeApi.delete(id);
      message.success('删除成功');
      loadData();
    } catch (error) {
      message.error('删除失败');
    }
  };

  // 读书
  const loadBookRecords = async () => {
    setBookLoading(true);
    try {
      const data = await booksApi.getDimensionLinksByDimension('time') as any;
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

  const columns = [
    { title: '任务名称', dataIndex: 'taskName', key: 'taskName' },
    { title: '时长(分钟)', dataIndex: 'durationMinutes', key: 'durationMinutes' },
    { title: '分类', dataIndex: 'category', key: 'category' },
    { title: '日期', dataIndex: 'recordDate', key: 'recordDate' },
    {
      title: '操作',
      key: 'action',
      render: (_: any, record: any) => (
        <Button type="link" danger onClick={() => handleDelete(record.id)}>
          删除
        </Button>
      ),
    },
  ];

  const bookColumns = [
    { title: '日期', dataIndex: 'recordDate', key: 'recordDate' },
    { title: '书名', dataIndex: 'title', key: 'title' },
    { title: '收获', dataIndex: 'readingGains', key: 'readingGains', width: 200, ellipsis: true },
  ];

  return (
    <div>
      <SystemNodeIntro
        icon={<ClockCircleOutlined />}
        kicker="Node E"
        title="清单、日历、状态"
        description="把项目拆成今天能发生的下一步，再根据能量、情绪、身体和注意力选择合适强度。这里的 adaptive counterbalance 是：计划拉你向前，状态决定剂量。"
        points={['今天必须发生什么', '今天最重要的一步', '当前状态适合做什么', '最低版本和恢复版本']}
        steps={[
          { title: '先看日历', detail: '确认固定承诺和真实可用时间，避免计划超过现实容量。' },
          { title: '只选一步', detail: '高能量做关键任务，低能量做最低版本或整理恢复。' },
          { title: '记录剂量', detail: '不是评价自己，而是校准明天的任务强度和恢复需求。' },
        ]}
      />
      <Card style={{ marginTop: 16 }}>
        <Tabs activeKey={activeTab} onChange={setActiveTab}
          items={[
            { key: 'book', label: '时间原则', children: (
              <>
                <div style={{ marginBottom: 16 }}>
                  <Button type="primary" icon={<PlusOutlined />} onClick={() => navigate('/add-book-record/time')}>添加记录</Button>
                </div>
                <Table columns={bookColumns} dataSource={bookRecords} rowKey="id" loading={bookLoading} pagination={{ pageSize: 10 }} />
              </>
            )},
            { key: 'today', label: '今日时间块', children: (
              <>
                <div style={{ marginBottom: 16 }}>
                  <Button type="primary" icon={<PlusOutlined />} onClick={() => navigate('/add-time-record')}>添加时间块</Button>
                </div>
                <Table columns={columns} dataSource={records} rowKey="id" loading={loading} pagination={{ pageSize: 10 }} />
              </>
            )},
            { key: 'stats', label: '节奏统计', children: <div>时间使用分析统计</div> },
          ]}
        />
      </Card>
    </div>
  );
}
