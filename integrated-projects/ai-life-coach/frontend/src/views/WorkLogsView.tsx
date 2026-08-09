import { useEffect, useMemo, useState } from 'react';
import {
  Alert,
  Button,
  Card,
  Col,
  Form,
  Input,
  InputNumber,
  Progress,
  Row,
  Select,
  Space,
  Statistic,
  Table,
  Tabs,
  Tag,
  message,
} from 'antd';
import { DeleteOutlined, GithubOutlined, LineChartOutlined, PlusOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { workLogsApi } from '../api';
import { SystemNodeIntro } from '../components/SystemNodeIntro';

const LOCAL_WORK_LOGS_KEY = 'life-stability-work-logs';

const moduleOptions = [
  { label: '财务', value: 'financial' },
  { label: '健康', value: 'health' },
  { label: '时间', value: 'time' },
  { label: '心灵', value: 'mind' },
  { label: '关系', value: 'relationships' },
  { label: '项目', value: 'project' },
];

const moduleLabels: Record<string, string> = {
  financial: '财务',
  health: '健康',
  time: '时间',
  mind: '心灵',
  relationships: '关系',
  project: '项目',
};

const statusColors: Record<string, string> = {
  '进行中': 'blue',
  '已完成': 'green',
  '受阻': 'red',
  '观察中': 'gold',
};

const projectLinks = [
  {
    title: 'GitHub 仓库',
    url: 'https://github.com/vincentic/life-consistency-coach',
  },
  {
    title: 'Vercel 生产站点',
    url: 'https://life-consistency-coach.vercel.app',
  },
  {
    title: 'SCYS 内容资讯',
    url: 'https://scys.com',
  },
];

function readLocalLogs() {
  try {
    return JSON.parse(localStorage.getItem(LOCAL_WORK_LOGS_KEY) || '[]');
  } catch (error) {
    return [];
  }
}

function writeLocalLogs(logs: any[]) {
  localStorage.setItem(LOCAL_WORK_LOGS_KEY, JSON.stringify(logs));
}

function buildStats(logs: any[]) {
  const byModule: Record<string, { count: number; totalDelta: number; latestProgress: number; latestDate: string }> = {};
  let totalDelta = 0;

  logs.forEach((record) => {
    const moduleName = record.module || 'project';
    const delta = (record.progressAfter || 0) - (record.progressBefore || 0);
    totalDelta += delta;

    if (!byModule[moduleName]) {
      byModule[moduleName] = {
        count: 0,
        totalDelta: 0,
        latestProgress: record.progressAfter || 0,
        latestDate: record.recordDate,
      };
    }

    byModule[moduleName].count += 1;
    byModule[moduleName].totalDelta += delta;
    if (!byModule[moduleName].latestDate || dayjs(record.recordDate).isAfter(byModule[moduleName].latestDate)) {
      byModule[moduleName].latestProgress = record.progressAfter || 0;
      byModule[moduleName].latestDate = record.recordDate;
    }
  });

  return {
    recordCount: logs.length,
    totalDelta,
    byModule,
  };
}

export default function WorkLogsView() {
  const [form] = Form.useForm();
  const [records, setRecords] = useState<any[]>([]);
  const [stats, setStats] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [activeModule, setActiveModule] = useState<string>();
  const [storageMode, setStorageMode] = useState<'api' | 'local'>('api');
  const [mysqlSummary, setMysqlSummary] = useState<any>();
  const [mysqlStatus, setMysqlStatus] = useState<any>();

  const moduleStats = useMemo(() => Object.entries(stats.byModule || {}), [stats]);
  const filteredRecords = useMemo(
    () => (activeModule ? records.filter((record) => record.module === activeModule) : records),
    [activeModule, records],
  );

  useEffect(() => {
    loadData();
    loadStaticMysqlData();
  }, []);

  const loadStaticMysqlData = async () => {
    try {
      const [statusResponse, summaryResponse] = await Promise.all([
        fetch('/static-data/mysql-export-status.json'),
        fetch('/static-data/mysql-summary.json'),
      ]);
      if (statusResponse.ok) {
        setMysqlStatus(await statusResponse.json());
      }
      if (summaryResponse.ok) {
        setMysqlSummary(await summaryResponse.json());
      }
    } catch (error) {
      setMysqlStatus(undefined);
      setMysqlSummary(undefined);
    }
  };

  const loadLocalData = () => {
    const localLogs = readLocalLogs().sort((a: any, b: any) => {
      const dateDiff = dayjs(b.recordDate).valueOf() - dayjs(a.recordDate).valueOf();
      return dateDiff || Number(b.id || 0) - Number(a.id || 0);
    });
    setRecords(localLogs);
    setStats(buildStats(localLogs));
    setStorageMode('local');
  };

  const loadData = async () => {
    setLoading(true);
    try {
      const [logData, statData] = await Promise.all([
        workLogsApi.getAll(),
        workLogsApi.getStats(),
      ]);
      setRecords(logData);
      setStats(statData);
      setStorageMode('api');
    } catch (error) {
      loadLocalData();
    } finally {
      setLoading(false);
    }
  };

  const saveLocalRecord = (values: any) => {
    const localLogs = readLocalLogs();
    const record = {
      ...values,
      id: Date.now(),
      recordDate: dayjs().format('YYYY-MM-DD'),
      createdAt: new Date().toISOString(),
    };
    const nextLogs = [record, ...localLogs];
    writeLocalLogs(nextLogs);
    setRecords(nextLogs);
    setStats(buildStats(nextLogs));
    setStorageMode('local');
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      setSaving(true);

      if (storageMode === 'local') {
        saveLocalRecord(values);
      } else {
        try {
          await workLogsApi.create({
            ...values,
            recordDate: dayjs().format('YYYY-MM-DD'),
          });
          await loadData();
        } catch (error) {
          saveLocalRecord(values);
        }
      }

      message.success('工作日志已记录');
      form.resetFields();
    } catch (error) {
      message.error('保存失败');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      if (storageMode === 'api') {
        await workLogsApi.delete(id);
        await loadData();
      } else {
        const nextLogs = readLocalLogs().filter((record: any) => record.id !== id);
        writeLocalLogs(nextLogs);
        setRecords(nextLogs);
        setStats(buildStats(nextLogs));
      }
      message.success('删除成功');
    } catch (error) {
      message.error('删除失败');
    }
  };

  const columns = [
    { title: '日期', dataIndex: 'recordDate', key: 'recordDate', width: 110 },
    { title: '标题', dataIndex: 'title', key: 'title' },
    {
      title: '模块',
      dataIndex: 'module',
      key: 'module',
      width: 90,
      render: (module: string) => moduleLabels[module] || module,
    },
    {
      title: '进度变化',
      key: 'progress',
      width: 180,
      render: (_: unknown, record: any) => (
        <Space direction="vertical" size={2} style={{ width: '100%' }}>
          <span>{record.progressBefore}% -&gt; {record.progressAfter}%</span>
          <Progress percent={record.progressAfter} size="small" />
        </Space>
      ),
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 90,
      render: (status: string) => <Tag color={statusColors[status] || 'default'}>{status}</Tag>,
    },
    { title: '变化记录', dataIndex: 'changeSummary', key: 'changeSummary', ellipsis: true },
    { title: '下一步', dataIndex: 'nextStep', key: 'nextStep', ellipsis: true },
    {
      title: '操作',
      key: 'action',
      width: 80,
      render: (_: unknown, record: any) => (
        <Button type="text" danger icon={<DeleteOutlined />} onClick={() => handleDelete(record.id)} />
      ),
    },
  ];

  const overviewTab = (
    <>
      <Row gutter={[16, 16]}>
        <Col xs={24} md={8}>
          <Card>
            <Statistic title="日志数量" value={stats.recordCount || 0} />
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card>
            <Statistic title="累计进步" value={stats.totalDelta || 0} suffix="%" />
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card>
            <Statistic title="追踪模块" value={moduleStats.length} />
          </Card>
        </Col>
      </Row>

      <Card title="模块进步追踪" style={{ marginTop: 16 }}>
        <Row gutter={[16, 16]}>
          {moduleStats.map(([moduleName, item]: [string, any]) => (
            <Col xs={24} md={12} lg={8} key={moduleName}>
              <Card size="small">
                <Space direction="vertical" style={{ width: '100%' }}>
                  <strong>{moduleLabels[moduleName] || moduleName}</strong>
                  <Progress percent={item.latestProgress || 0} />
                  <span>累计变化 {item.totalDelta || 0}% / {item.count || 0} 条记录</span>
                </Space>
              </Card>
            </Col>
          ))}
        </Row>
      </Card>
    </>
  );

  const createTab = (
    <Card title="定义阶段成果">
      <Form form={form} layout="vertical" initialValues={{ status: '进行中', progressBefore: 0, progressAfter: 10 }}>
        <Row gutter={16}>
          <Col xs={24} md={12}>
            <Form.Item name="title" label="项目或成果" rules={[{ required: true, message: '请输入项目或成果' }]}>
              <Input placeholder="例如：完成 Agent 工作流第一个可演示节点" />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item name="module" label="模块" rules={[{ required: true, message: '请选择模块' }]}>
              <Select options={moduleOptions} />
            </Form.Item>
          </Col>
          <Col xs={24} md={8}>
            <Form.Item name="progressBefore" label="开始进度" rules={[{ required: true }]}>
              <InputNumber min={0} max={100} addonAfter="%" style={{ width: '100%' }} />
            </Form.Item>
          </Col>
          <Col xs={24} md={8}>
            <Form.Item name="progressAfter" label="当前进度" rules={[{ required: true }]}>
              <InputNumber min={0} max={100} addonAfter="%" style={{ width: '100%' }} />
            </Form.Item>
          </Col>
          <Col xs={24} md={8}>
            <Form.Item name="status" label="状态">
              <Select options={['进行中', '已完成', '受阻', '观察中'].map((value) => ({ label: value, value }))} />
            </Form.Item>
          </Col>
          <Col xs={24}>
            <Form.Item name="changeSummary" label="完成标准与变化记录" rules={[{ required: true, message: '请记录本次变化' }]}>
              <Input.TextArea rows={3} placeholder="这次推进了什么？怎样判断它更接近完成？" />
            </Form.Item>
          </Col>
          <Col xs={24}>
            <Form.Item name="nextStep" label="下一步">
              <Input.TextArea rows={2} placeholder="下一个可执行动作是什么？如果受阻，最低版本是什么？" />
            </Form.Item>
          </Col>
        </Row>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleSubmit} loading={saving}>
          保存日志
        </Button>
      </Form>
    </Card>
  );

  const recordsTab = (
    <Card>
      <div style={{ marginBottom: 16 }}>
        <Select
          allowClear
          placeholder="筛选模块"
          style={{ width: 180 }}
          options={moduleOptions}
          value={activeModule}
          onChange={setActiveModule}
        />
      </div>
      <Table columns={columns} dataSource={filteredRecords} rowKey="id" loading={loading} pagination={{ pageSize: 10 }} />
    </Card>
  );

  const mysqlColumns = [
    { title: '表名', dataIndex: 'tableName', key: 'tableName' },
    { title: '行数', dataIndex: 'rows', key: 'rows', width: 90 },
    { title: '引擎', dataIndex: 'engine', key: 'engine', width: 100 },
    { title: '创建时间', dataIndex: 'createdAt', key: 'createdAt', width: 170 },
  ];

  const projectTab = (
    <Row gutter={[16, 16]}>
      {projectLinks.map((link) => (
        <Col xs={24} md={12} key={link.url}>
          <Card
            title={link.title}
            extra={<GithubOutlined />}
            hoverable
            onClick={() => window.open(link.url, '_blank', 'noopener,noreferrer')}
          >
            <a href={link.url} target="_blank" rel="noreferrer">{link.url}</a>
          </Card>
        </Col>
      ))}
      <Col xs={24}>
        <Card title="数据连接状态">
          <Space direction="vertical">
            <Tag color={storageMode === 'api' ? 'green' : 'gold'}>
              {storageMode === 'api' ? 'API 在线读写' : '浏览器本地写入'}
            </Tag>
            <span>Vercel 静态前端需要配置 `VITE_API_BASE_URL` 指向公网后端，才能多人共享读写。</span>
          </Space>
        </Card>
      </Col>
      <Col xs={24}>
        <Card title="本地 MySQL 导出摘要">
          <Row gutter={[16, 16]}>
            <Col xs={24} md={8}>
              <Statistic title="数据库" value={mysqlSummary?.database || mysqlStatus?.database || '未导出'} />
            </Col>
            <Col xs={24} md={8}>
              <Statistic title="数据表" value={mysqlSummary?.tableCount || 0} />
            </Col>
            <Col xs={24} md={8}>
              <Statistic title="估算行数" value={mysqlSummary?.totalRows || 0} />
            </Col>
          </Row>
          <div style={{ marginTop: 16 }}>
            <Space direction="vertical">
              <Tag color={mysqlStatus?.status === 'exported' ? 'green' : 'default'}>
                {mysqlStatus?.status === 'exported' ? '已导出' : '未导出'}
              </Tag>
              <span>导出时间：{mysqlSummary?.exportedAt || mysqlStatus?.exportedAt || '暂无'}</span>
              <span>本地全量 SQL：{mysqlStatus?.sqlFile || '暂无'}</span>
            </Space>
          </div>
          <Table
            style={{ marginTop: 16 }}
            columns={mysqlColumns}
            dataSource={mysqlSummary?.tables || []}
            rowKey="tableName"
            pagination={{ pageSize: 8 }}
            size="small"
          />
        </Card>
      </Col>
    </Row>
  );

  return (
    <div>
      <SystemNodeIntro
        icon={<LineChartOutlined />}
        kicker="Node D"
        title="项目与看板"
        description="把目标变成有完成标准的阶段成果，用看板记录进展、阻塞、下一步和可展示结果。这里的 adaptive counterbalance 是：项目过大就切小，行动过散就收束，受阻时先恢复路径。"
        points={['一个阶段成果', '明确完成标准', '进度变化证据', '受阻后的下一步']}
        steps={[
          { title: '定义完成', detail: '写清楚这个项目做到什么程度，才算阶段完成或可展示。' },
          { title: '限制并行', detail: '项目太多时选择一个主项目，其他只保留维护动作。' },
          { title: '处理受阻', detail: '受阻不是失败，记录阻塞原因并设计最低重启动作。' },
        ]}
      />

      {storageMode === 'local' && (
        <Alert
          style={{ marginTop: 16 }}
          type="warning"
          showIcon
          message="当前使用浏览器本地写入"
          description="后端 API 暂不可用，日志会保存在当前浏览器。配置公网 API 和托管数据库后会自动使用在线读写。"
        />
      )}

      <Tabs
        style={{ marginTop: 16 }}
        items={[
          { key: 'overview', label: '项目概览', children: overviewTab },
          { key: 'create', label: '定义成果', children: createTab },
          { key: 'records', label: '看板记录', children: recordsTab },
          { key: 'project', label: '项目链接', children: projectTab },
        ]}
      />
    </div>
  );
}
