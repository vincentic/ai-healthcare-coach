import { useState, useEffect } from 'react';
import { useNavigate } from '../lib/navigation';
import { Alert, Card, Table, Button, Tabs, Row, Col, Statistic, Tag, Space, Timeline, List, Typography } from 'antd';
import { PlusOutlined, DollarOutlined, FundOutlined, SafetyOutlined, LinkOutlined } from '@ant-design/icons';
import { booksApi } from '../api';

const { Text } = Typography;

const financialMetrics = [
  { title: '现金流', value: '稳定', detail: '先保证 3-6 个月风险缓冲', color: 'green' },
  { title: '储蓄率', value: '月度追踪', detail: '收入 - 必要支出 - 投资学习', color: 'blue' },
  { title: '净资产', value: '季度复盘', detail: '资产、负债、应收和长期投入', color: 'purple' },
  { title: '决策质量', value: '事前记录', detail: '大额支出先写理由、风险和替代方案', color: 'gold' },
];

const financialFlows = [
  ['收入来源', '主业收入、副业收入、投资收入、一次性收入', '看收入是否过度依赖单点。'],
  ['支出分析', '固定支出、可变支出、学习投入、健康投入', '区分消耗、投资和必要保障。'],
  ['资产负债', '现金、投资、应收、负债、风险缓冲', '每月看结构，每季度看趋势。'],
  ['财务决策', '大额支出、职业选择、学习投资、家庭责任', '财务不是孤立数字，要和人生选择一起判断。'],
];

const financialRules = [
  '每周检查现金流，确保不会被短期波动击穿。',
  '每月复盘资产负债，把净资产变化写成一句话。',
  '每次重大支出前记录理由、风险、替代方案和复盘日期。',
  '把财务目标和健康、时间、职业、关系一起判断。',
];

const scysContentFeeds = [
  {
    title: 'SCYS 内容资讯主页',
    url: 'https://scys.com',
    focus: '作为外部内容资讯入口，承接财务、生活稳定和成长系统相关材料。',
    tags: ['外部资讯', '内容源'],
  },
  {
    title: '财务一致性选题',
    url: 'https://scys.com',
    focus: '围绕现金流、资产配置、事业收入和消费决策建立摘录、判断和行动清单。',
    tags: ['财务', '决策', '复盘'],
  },
  {
    title: '打卡后的阅读补给',
    url: 'https://scys.com',
    focus: '把每日回顾中的财务、健康、时间、关系问题，转成下一步要阅读和追踪的资讯主题。',
    tags: ['打卡', '资讯', '行动'],
  },
];

export default function FinancialView() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('book');

  // 读书
  const [bookRecords, setBookRecords] = useState([]);
  const [bookLoading, setBookLoading] = useState(false);

  // 读书
  const loadBookRecords = async () => {
    setBookLoading(true);
    try {
      const data = await booksApi.getDimensionLinksByDimension('financial') as any;
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

  const tabItems = [
    { key: 'book', label: '读书', children: (
      <>
        <div style={{ marginBottom: 16 }}>
          <Button type="primary" icon={<PlusOutlined />} onClick={() => navigate('/add-book-record/financial')}>添加记录</Button>
        </div>
        <Table columns={bookColumns} dataSource={bookRecords} rowKey="id" loading={bookLoading} pagination={{ pageSize: 10 }} />
      </>
    )},
    { key: 'overview', label: '财务总览', children: (
      <Space direction="vertical" size={16} style={{ width: '100%' }}>
        <Row gutter={[16, 16]}>
          {financialMetrics.map((metric) => (
            <Col xs={24} md={12} xl={6} key={metric.title}>
              <Card className="metric-card">
                <Statistic title={metric.title} value={metric.value} />
                <Tag color={metric.color} style={{ marginTop: 10 }}>{metric.detail}</Tag>
              </Card>
            </Col>
          ))}
        </Row>
        <Card title={<><SafetyOutlined /> 财务稳定原则</>}>
          <Timeline
            items={financialRules.map((rule) => ({
              children: rule,
            }))}
          />
        </Card>
      </Space>
    ) },
    { key: 'income', label: '收入来源', children: (
      <Row gutter={[16, 16]}>
        {financialFlows.slice(0, 1).map(([title, scope, use]) => (
          <Col xs={24} key={title}>
            <Card title={title}>
              <p className="muted-text">{scope}</p>
              <p>{use}</p>
            </Card>
          </Col>
        ))}
      </Row>
    ) },
    { key: 'expense', label: '支出分析', children: (
      <Row gutter={[16, 16]}>
        {financialFlows.slice(1, 3).map(([title, scope, use]) => (
          <Col xs={24} md={12} key={title}>
            <Card title={title}>
              <p className="muted-text">{scope}</p>
              <p>{use}</p>
            </Card>
          </Col>
        ))}
      </Row>
    ) },
    { key: 'career', label: '事业规划', children: (
      <Card title={<><FundOutlined /> 财务决策与事业规划</>}>
        <p className="muted-text">{financialFlows[3][1]}</p>
        <p>{financialFlows[3][2]}</p>
      </Card>
    ) },
    { key: 'scys', label: 'SCYS资讯', children: (
      <Space direction="vertical" size={16} style={{ width: '100%' }}>
        <Alert
          type="info"
          showIcon
          message="关联 scys.com 内容资讯"
          description="当前以外部入口和主题清单方式接入；后续若提供 RSS/API，可自动同步为站内资讯卡片，并关联到每日打卡复盘。"
        />
        <List
          itemLayout="vertical"
          dataSource={scysContentFeeds}
          renderItem={(item) => (
            <List.Item
              actions={[
                <a key="open" href={item.url} target="_blank" rel="noreferrer">
                  <LinkOutlined /> 打开 scys.com
                </a>,
              ]}
            >
              <List.Item.Meta
                title={item.title}
                description={<Text type="secondary">{item.focus}</Text>}
              />
              <Space wrap>
                {item.tags.map((tag) => <Tag key={tag} color="blue">{tag}</Tag>)}
              </Space>
            </List.Item>
          )}
        />
      </Space>
    ) },
  ];

  return (
    <div>
      <h2><DollarOutlined /> 财务维度</h2>
      <p className="page-intro">财务模块是个人稳定系统的资源调度层：看现金流、储蓄率、资产负债和重大选择，避免只记账、不决策。</p>
      <Card style={{ marginTop: 16 }}>
        <Tabs activeKey={activeTab} onChange={setActiveTab} items={tabItems} />
      </Card>
    </div>
  );
}
