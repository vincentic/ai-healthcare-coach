import { useState, useEffect } from 'react';
import { useNavigate } from '../lib/navigation';
import { Card, Table, Button, Tabs } from 'antd';
import { AppstoreOutlined, PlusOutlined } from '@ant-design/icons';
import { healthApi, booksApi } from '../api';
import { SystemNodeIntro } from '../components/SystemNodeIntro';

export default function HealthView() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('book');

  // 安全记录 state
  const [healthRecords, setHealthRecords] = useState<any[]>([]);
  const [healthLoading, setHealthLoading] = useState(false);

  // 清洁卫生 state
  const [hygieneRecords, setHygieneRecords] = useState<any[]>([]);
  const [hygieneLoading, setHygieneLoading] = useState(false);

  // 睡眠 state
  const [sleepRecords, setSleepRecords] = useState<any[]>([]);
  const [sleepLoading, setSleepLoading] = useState(false);

  // 饮食 state
  const [dietRecords, setDietRecords] = useState<any[]>([]);
  const [dietLoading, setDietLoading] = useState(false);

  // 情绪 state
  const [emotionRecords, setEmotionRecords] = useState<any[]>([]);
  const [emotionLoading, setEmotionLoading] = useState(false);

  // 读书 state
  const [bookRecords, setBookRecords] = useState<any[]>([]);
  const [bookLoading, setBookLoading] = useState(false);

  // 运动 state
  const [exerciseRecords, setExerciseRecords] = useState<any[]>([]);
  const [exerciseLoading, setExerciseLoading] = useState(false);

  useEffect(() => {
    loadAllData();
  }, []);

  useEffect(() => {
    if (activeTab === 'book') {
      loadBookRecords();
    }
  }, [activeTab]);

  const loadAllData = async () => {
    await Promise.all([
      loadHealthRecords(),
      loadHygieneRecords(),
      loadSleepRecords(),
      loadDietRecords(),
      loadEmotionRecords(),
      loadExerciseRecords(),
    ]);
  };

  // 安全记录
  const loadHealthRecords = async () => {
    setHealthLoading(true);
    try {
      const data = await healthApi.getRecords();
      setHealthRecords(data);
    } catch (error) {
      console.error('加载健康记录失败', error);
    } finally {
      setHealthLoading(false);
    }
  };

  // 清洁卫生
  const loadHygieneRecords = async () => {
    setHygieneLoading(true);
    try {
      const data = await healthApi.getHygiene();
      setHygieneRecords(data);
    } catch (error) {
      console.error('加载清洁卫生记录失败', error);
    } finally {
      setHygieneLoading(false);
    }
  };

  // 睡眠复盘
  const loadSleepRecords = async () => {
    setSleepLoading(true);
    try {
      const data = await healthApi.getSleep();
      setSleepRecords(data);
    } catch (error) {
      console.error('加载睡眠记录失败', error);
    } finally {
      setSleepLoading(false);
    }
  };

  // 饮食复盘
  const loadDietRecords = async () => {
    setDietLoading(true);
    try {
      const data = await healthApi.getDiets();
      setDietRecords(data);
    } catch (error) {
      console.error('加载饮食记录失败', error);
    } finally {
      setDietLoading(false);
    }
  };

  // 情绪复盘
  const loadEmotionRecords = async () => {
    setEmotionLoading(true);
    try {
      const data = await healthApi.getEmotions();
      setEmotionRecords(data);
    } catch (error) {
      console.error('加载情绪记录失败', error);
    } finally {
      setEmotionLoading(false);
    }
  };

  // 运动
  const loadExerciseRecords = async () => {
    setExerciseLoading(true);
    try {
      const data = await healthApi.getRecords('exercise');
      setExerciseRecords(data);
    } catch (error) {
      console.error('加载运动记录失败', error);
    } finally {
      setExerciseLoading(false);
    }
  };

  // 读书
  const loadBookRecords = async () => {
    setBookLoading(true);
    try {
      const data = await booksApi.getDimensionLinksByDimension('health') as any;
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

  const bookColumns = [
    { title: '日期', dataIndex: 'recordDate', key: 'recordDate' },
    { title: '书名', dataIndex: 'title', key: 'title' },
    { title: '收获', dataIndex: 'readingGains', key: 'readingGains', width: 200, ellipsis: true },
  ];

  // Table columns
  const healthColumns = [
    { title: '日期', dataIndex: 'recordDate', key: 'recordDate' },
    { title: '人物', dataIndex: 'person', key: 'person' },
    { title: '地点', dataIndex: 'location', key: 'location' },
    { title: '内容', dataIndex: 'content', key: 'content', ellipsis: true },
  ];

  const hygieneColumns = [
    { title: '日期', dataIndex: 'recordDate', key: 'recordDate' },
    { title: '类型', dataIndex: 'hygieneType', key: 'hygieneType' },
    { title: '收获', dataIndex: 'gains', key: 'gains', ellipsis: true },
  ];

  const sleepColumns = [
    { title: '日期', dataIndex: 'recordDate', key: 'recordDate' },
    { title: '入睡时间', dataIndex: 'sleepTime', key: 'sleepTime' },
    { title: '醒来时间', dataIndex: 'wakeTime', key: 'wakeTime' },
    { title: '睡眠时长(分钟)', dataIndex: 'sleepDuration', key: 'sleepDuration' },
    { title: '入睡时长(分钟)', dataIndex: 'fallAsleepDuration', key: 'fallAsleepDuration' },
    { title: '起夜次数', dataIndex: 'nightWakeCount', key: 'nightWakeCount' },
    { title: '干扰', dataIndex: 'sleepDisturbance', key: 'sleepDisturbance', ellipsis: true },
  ];

  const dietColumns = [
    { title: '日期', dataIndex: 'recordDate', key: 'recordDate' },
    { title: '餐次', dataIndex: 'mealType', key: 'mealType' },
    { title: '时间', dataIndex: 'mealTime', key: 'mealTime' },
    { title: '地点', dataIndex: 'location', key: 'location' },
    { title: '食物', dataIndex: 'foodContent', key: 'foodContent', ellipsis: true },
    { title: '花费', dataIndex: 'cost', key: 'cost' },
  ];

  const emotionColumns = [
    { title: '日期', dataIndex: 'recordDate', key: 'recordDate' },
    { title: '触发事件', dataIndex: 'triggerEvent', key: 'triggerEvent', ellipsis: true },
    { title: '情绪类型', dataIndex: 'emotionType', key: 'emotionType' },
    { title: '强度', dataIndex: 'emotionLevel', key: 'emotionLevel' },
    { title: '内心需要', dataIndex: 'innerNeeds', key: 'innerNeeds', ellipsis: true },
  ];

  const exerciseColumns = [
    { title: '日期', dataIndex: 'recordDate', key: 'recordDate' },
    { title: '类型', dataIndex: 'recordType', key: 'recordType' },
    { title: '数值', dataIndex: 'value', key: 'value' },
    { title: '单位', dataIndex: 'unit', key: 'unit' },
    { title: '备注', dataIndex: 'notes', key: 'notes', ellipsis: true },
  ];

  const tabItems = [
    {
      key: 'book',
      label: '领域输入',
      children: (
        <>
          <div style={{ marginBottom: 16 }}>
            <Button type="primary" icon={<PlusOutlined />} onClick={() => navigate('/add-book-record/health')}>添加记录</Button>
          </div>
          <Table columns={bookColumns} dataSource={bookRecords} rowKey="id" loading={bookLoading} pagination={{ pageSize: 10 }} />
        </>
      ),
    },
    {
      key: 'records',
      label: '安全边界',
      children: (
        <>
          <div style={{ marginBottom: 16 }}>
            <Button type="primary" icon={<PlusOutlined />} onClick={() => navigate('/add-health-record/health')}>添加记录</Button>
          </div>
          <Table columns={healthColumns} dataSource={healthRecords} rowKey="id" loading={healthLoading} pagination={{ pageSize: 10 }} />
        </>
      ),
    },
    {
      key: 'hygiene',
      label: '环境清洁',
      children: (
        <>
          <div style={{ marginBottom: 16 }}>
            <Button type="primary" icon={<PlusOutlined />} onClick={() => navigate('/add-health-record/hygiene')}>添加记录</Button>
          </div>
          <Table columns={hygieneColumns} dataSource={hygieneRecords} rowKey="id" loading={hygieneLoading} pagination={{ pageSize: 10 }} />
        </>
      ),
    },
    {
      key: 'sleep',
      label: '睡眠身体',
      children: (
        <>
          <div style={{ marginBottom: 16 }}>
            <Button type="primary" icon={<PlusOutlined />} onClick={() => navigate('/add-health-record/sleep')}>添加记录</Button>
          </div>
          <Table columns={sleepColumns} dataSource={sleepRecords} rowKey="id" loading={sleepLoading} pagination={{ pageSize: 10 }} />
        </>
      ),
    },
    {
      key: 'diet',
      label: '饮食资源',
      children: (
        <>
          <div style={{ marginBottom: 16 }}>
            <Button type="primary" icon={<PlusOutlined />} onClick={() => navigate('/add-health-record/diet')}>添加记录</Button>
          </div>
          <Table columns={dietColumns} dataSource={dietRecords} rowKey="id" loading={dietLoading} pagination={{ pageSize: 10 }} />
        </>
      ),
    },
    {
      key: 'emotion',
      label: '情绪信号',
      children: (
        <>
          <div style={{ marginBottom: 16 }}>
            <Button type="primary" icon={<PlusOutlined />} onClick={() => navigate('/add-health-record/emotion')}>添加记录</Button>
          </div>
          <Table columns={emotionColumns} dataSource={emotionRecords} rowKey="id" loading={emotionLoading} pagination={{ pageSize: 10 }} />
        </>
      ),
    },
    {
      key: 'exercise',
      label: '运动维护',
      children: (
        <>
          <div style={{ marginBottom: 16 }}>
            <Button type="primary" icon={<PlusOutlined />} onClick={() => navigate('/add-health-record/exercise')}>添加记录</Button>
          </div>
          <Table columns={exerciseColumns} dataSource={exerciseRecords} rowKey="id" loading={exerciseLoading} pagination={{ pageSize: 10 }} />
        </>
      ),
    },
  ];

  return (
    <div>
      <SystemNodeIntro
        icon={<AppstoreOutlined />}
        kicker="Node C"
        title="目标与责任领域"
        description="把价值与自由落到现实责任：身体、关系、财务、环境和学习哪些地方需要维护，哪些地方需要改变。这里的 adaptive counterbalance 是：哪个领域过载就减压，哪个领域萎缩就补资源。"
        points={['持续维护的生活责任', '当前阶段的目标重点', '健康与环境基础', '关系和财务承载力']}
        steps={[
          { title: '扫描承载', detail: '睡眠、饮食、情绪、关系、财务中，哪一项正在拖慢整体系统？' },
          { title: '分配资源', detail: '把精力从过度投入处拿回一点，补给最缺资源的领域。' },
          { title: '定一个维护动作', detail: '只选一个本周维护动作，不把领域维护变成新负担。' },
        ]}
      />
      <Card style={{ marginTop: 16 }}>
        <Tabs activeKey={activeTab} onChange={setActiveTab} items={tabItems} />
      </Card>
    </div>
  );
}
