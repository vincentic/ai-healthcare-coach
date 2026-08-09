import { useEffect, useMemo, useState } from 'react';
import { Button, Calendar, Card, Col, DatePicker, Form, Input, Progress, Row, Space, Statistic, Table, Tabs, Tag } from 'antd';
import { message } from '../utils/message';
import { DeleteOutlined, SaveOutlined, SyncOutlined } from '@ant-design/icons';
import dayjs, { Dayjs } from 'dayjs';
import { dailyReviewsApi } from '../api';
import { SystemNodeIntro } from '../components/SystemNodeIntro';

const { TextArea } = Input;

const reviewFields = [
  { key: 'contactReview', label: '联系', placeholder: '今天真实连接、边界、冲突或修复是什么？' },
  { key: 'sleepReview', label: '睡眠', placeholder: '睡眠如何影响今天的能量和恢复？' },
  { key: 'dietReview', label: '饮食', placeholder: '饮食给身体带来了稳定、消耗还是波动？' },
  { key: 'accountReview', label: '帐目', placeholder: '今天的消费、收入或财务判断说明什么？' },
  { key: 'cleaningReview', label: '清洁', placeholder: '环境有没有支持我的状态和行动？' },
  { key: 'emotionReview', label: '情绪', placeholder: '最强情绪是什么？强度几分？它在提醒什么？' },
  { key: 'exerciseReview', label: '运动', placeholder: '今天做了标准版、最低版还是恢复版？' },
  { key: 'timeReview', label: '时间', placeholder: '日历、清单、注意力哪里顺，哪里卡？' },
  { key: 'bodyReview', label: '身体', placeholder: '身体最紧张、疲惫或放松的位置在哪里？' },
  { key: 'readingReview', label: '读书', placeholder: '读到什么能进入内容库或决策原则？' },
  { key: 'inputReview', label: '输入', placeholder: '今天的输入是营养、噪音还是线索？' },
  { key: 'outputReview', label: '输出', placeholder: '今天形成了什么应用、作品或可见成果？' },
  { key: 'newKnowledgeReview', label: '新知', placeholder: '我理解了什么？以后类似情况怎么办？' },
  { key: 'dreamReview', label: '梦境', placeholder: '梦境、直觉或隐约信号有什么可观察内容？' },
];

export default function DailyReviewsView() {
  const [form] = Form.useForm();
  const [selectedDate, setSelectedDate] = useState<Dayjs>(dayjs());
  const [records, setRecords] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const selectedDateText = selectedDate.format('YYYY-MM-DD');
  const currentMonthRecords = useMemo(
    () => records.filter((record) => dayjs(record.reviewDate).isSame(selectedDate, 'month')),
    [records, selectedDate],
  );
  const recordDateSet = useMemo(
    () => new Set(records.map((record) => dayjs(record.reviewDate).format('YYYY-MM-DD'))),
    [records],
  );
  const checkinStats = useMemo(() => {
    const today = dayjs();
    const sortedDates = [...recordDateSet].sort();
    const currentMonthDays = selectedDate.daysInMonth();
    const monthCount = currentMonthRecords.length;
    let currentStreak = 0;
    let cursor = today;
    while (recordDateSet.has(cursor.format('YYYY-MM-DD'))) {
      currentStreak += 1;
      cursor = cursor.subtract(1, 'day');
    }

    let longestStreak = 0;
    let runningStreak = 0;
    let previousDate: Dayjs | null = null;
    sortedDates.forEach((dateText) => {
      const date = dayjs(dateText);
      runningStreak = previousDate && date.diff(previousDate, 'day') === 1 ? runningStreak + 1 : 1;
      longestStreak = Math.max(longestStreak, runningStreak);
      previousDate = date;
    });

    const recentThirty = Array.from({ length: 30 }, (_, index) => today.subtract(index, 'day').format('YYYY-MM-DD'));
    const recentCount = recentThirty.filter((date) => recordDateSet.has(date)).length;

    return {
      monthCount,
      monthRate: Math.round((monthCount / currentMonthDays) * 100),
      currentStreak,
      longestStreak,
      recentRate: Math.round((recentCount / 30) * 100),
    };
  }, [currentMonthRecords, recordDateSet, selectedDate]);

  useEffect(() => {
    loadRecords();
  }, []);

  useEffect(() => {
    loadSelectedReview(selectedDateText);
  }, [selectedDateText]);

  const loadRecords = async () => {
    setLoading(true);
    try {
      const data = await dailyReviewsApi.getAll();
      setRecords(data || []);
    } catch (error) {
      console.error('加载每日回顾失败', error);
      message.error('加载每日回顾失败');
    } finally {
      setLoading(false);
    }
  };

  const loadSelectedReview = async (date: string) => {
    try {
      const data = await dailyReviewsApi.getByDate(date);
      form.resetFields();
      if (data) {
        form.setFieldsValue(data);
      }
    } catch (error) {
      console.error('加载当日回顾失败', error);
    }
  };

  const saveReview = async () => {
    setSaving(true);
    try {
      const values = await form.validateFields();
      await dailyReviewsApi.createOrUpdate(selectedDateText, values);
      message.success('每日回顾已保存');
      await loadRecords();
    } catch (error) {
      console.error('保存每日回顾失败', error);
      message.error('保存每日回顾失败');
    } finally {
      setSaving(false);
    }
  };

  const deleteReview = async (id: number) => {
    try {
      await dailyReviewsApi.delete(id);
      message.success('已删除');
      await loadRecords();
      await loadSelectedReview(selectedDateText);
    } catch (error) {
      console.error('删除每日回顾失败', error);
      message.error('删除失败');
    }
  };

  const columns = useMemo(
    () => [
      { title: '日期', dataIndex: 'reviewDate', key: 'reviewDate', width: 120 },
      { title: '总结', dataIndex: 'summary', key: 'summary', ellipsis: true },
      { title: '下一步', dataIndex: 'nextAction', key: 'nextAction', ellipsis: true },
      {
        title: '操作',
        key: 'action',
        width: 96,
        render: (_: any, record: any) => (
          <Button
            danger
            size="small"
            icon={<DeleteOutlined />}
            onClick={() => deleteReview(record.id)}
          />
        ),
      },
    ],
    [selectedDateText],
  );

  const editor = (
    <Form form={form} layout="vertical">
      <Space style={{ marginBottom: 16, width: '100%', justifyContent: 'space-between' }}>
        <DatePicker
          value={selectedDate}
          onChange={(value) => value && setSelectedDate(value)}
          allowClear={false}
        />
        <Button type="primary" icon={<SaveOutlined />} loading={saving} onClick={saveReview}>
          保存
        </Button>
      </Space>

      <Row gutter={[16, 8]}>
        {reviewFields.map((field) => (
          <Col xs={24} md={12} xl={8} key={field.key}>
            <Form.Item name={field.key} label={field.label}>
              <TextArea rows={4} placeholder={field.placeholder} />
            </Form.Item>
          </Col>
        ))}
        <Col xs={24} md={12}>
          <Form.Item name="summary" label="发生 - 发现 - 调整">
            <TextArea rows={4} placeholder="发生：事实是什么？发现：规律是什么？调整：下次改变哪个变量？" />
          </Form.Item>
        </Col>
        <Col xs={24} md={12}>
          <Form.Item name="nextAction" label="明天最低下一步">
            <TextArea rows={4} placeholder="标准版本是什么？如果状态不好，10分钟最低版本是什么？" />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );

  const calendarTab = (
    <Space direction="vertical" size={16} style={{ width: '100%' }}>
      <Row gutter={[16, 16]}>
        <Col xs={24} md={6}>
          <Card><Statistic title="本月打卡" value={checkinStats.monthCount} suffix="天" /></Card>
        </Col>
        <Col xs={24} md={6}>
          <Card><Statistic title="本月完成率" value={checkinStats.monthRate} suffix="%" /></Card>
        </Col>
        <Col xs={24} md={6}>
          <Card><Statistic title="当前连续" value={checkinStats.currentStreak} suffix="天" /></Card>
        </Col>
        <Col xs={24} md={6}>
          <Card><Statistic title="最长连续" value={checkinStats.longestStreak} suffix="天" /></Card>
        </Col>
      </Row>
      <Card title="近 30 天覆盖率">
        <Progress percent={checkinStats.recentRate} />
      </Card>
      <Card title="打卡日历">
        <Calendar
          fullscreen={false}
          value={selectedDate}
          onSelect={(date) => setSelectedDate(date)}
          cellRender={(date) => {
            const dateText = date.format('YYYY-MM-DD');
            const record = records.find((item) => dayjs(item.reviewDate).format('YYYY-MM-DD') === dateText);
            if (!record) return null;
            const filledFields = reviewFields.filter((field) => record[field.key]).length;
            return (
              <div className="checkin-cell">
                <Tag color="green">已打卡</Tag>
                <span>{filledFields}/{reviewFields.length}</span>
              </div>
            );
          }}
        />
      </Card>
    </Space>
  );

  return (
    <div>
      <SystemNodeIntro
        icon={<SyncOutlined />}
        kicker="Node G"
        title="复盘与个人规律"
        description="把经历转成反馈：发生什么，发现了什么规律，下一次要调整哪个变量。这里的 adaptive counterbalance 是：经验不拿来审判自己，而是拿来校准系统。"
        points={['发生：看见事实', '发现：识别规律', '调整：改变变量', '回到价值与自由']}
        steps={[
          { title: '记录事实', detail: '先写发生了什么，避免把事件直接升级成身份判断。' },
          { title: '识别规律', detail: '找出反复出现的消耗、快乐、平静和恢复来源。' },
          { title: '改一变量', detail: '下一次只调整一个结构、剂量、环境或支持方式。' },
        ]}
      />
      <Card style={{ marginTop: 16 }}>
        <Tabs
          defaultActiveKey="editor"
          items={[
            { key: 'editor', label: '写复盘', children: editor },
            { key: 'calendar', label: '规律日历', children: calendarTab },
            {
              key: 'history',
              label: '历史证据',
              children: (
                <Table
                  columns={columns}
                  dataSource={records}
                  rowKey="id"
                  loading={loading}
                  pagination={{ pageSize: 10 }}
                  onRow={(record) => ({
                    onClick: () => {
                      setSelectedDate(dayjs(record.reviewDate));
                      form.setFieldsValue(record);
                    },
                  })}
                />
              ),
            },
          ]}
        />
      </Card>
    </div>
  );
}
