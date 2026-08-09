import { useState } from 'react';
import { useNavigate, useParams } from '../lib/navigation';
import { Card, Form, Input, Select, InputNumber, Button, Space } from 'antd';
import { message } from '../utils/message';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { mindApi } from '../api';
import dayjs from 'dayjs';

const { Option } = Select;
const { TextArea } = Input;

type RecordType = 'healing' | 'knowledge';

export default function AddMindRecordPage() {
  const navigate = useNavigate();
  const { type } = useParams<{ type: RecordType }>();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      setLoading(true);
      const today = dayjs().format('YYYY-MM-DD');

      if (type === 'healing') {
        await mindApi.createHealing({
          ...values,
          recordDate: today,
        });
      } else {
        await mindApi.createKnowledge({
          ...values,
          recordDate: today,
        });
      }
      message.success('添加成功');
      navigate(-1);
    } catch (error) {
      message.error('添加失败');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <Button icon={<ArrowLeftOutlined />} onClick={() => navigate(-1)}>
          返回
        </Button>
      </div>
      <Card title={type === 'healing' ? '添加疗愈实践' : '添加知识体验'}>
        <Form form={form} layout="vertical">
          {type === 'healing' ? (
            <>
              <Form.Item name="healingType" label="疗愈类型" rules={[{ required: true }]}>
                <Select>
                  <Option value="cbt">CBT认知行为</Option>
                  <Option value="dbt">DBT辩证行为</Option>
                  <Option value="eft">EFT情绪聚焦</Option>
                  <Option value="emdr">EMDR眼动脱敏</Option>
                  <Option value="feldenkrais">费登奎斯</Option>
                  <Option value="satir">萨提亚</Option>
                  <Option value="jung">荣格分析</Option>
                  <Option value="psychodrama">心理剧</Option>
                  <Option value="phil_stutz">Phil Stutz</Option>
                  <Option value="other">其他</Option>
                </Select>
              </Form.Item>
              <Form.Item name="title" label="标题" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
              <Form.Item name="technique" label="具体技术">
                <Input />
              </Form.Item>
              <Form.Item name="durationMinutes" label="时长(分钟)">
                <InputNumber min={0} style={{ width: '100%' }} />
              </Form.Item>
              <Form.Item name="progress" label="进展(%)">
                <InputNumber min={0} max={100} style={{ width: '100%' }} />
              </Form.Item>
              <Form.Item name="feeling" label="感受">
                <TextArea rows={2} />
              </Form.Item>
              <Form.Item name="insight" label="洞察">
                <TextArea rows={2} />
              </Form.Item>
            </>
          ) : (
            <>
              <Form.Item name="recordType" label="记录类型" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
              <Form.Item name="gains" label="收获">
                <TextArea rows={4} />
              </Form.Item>
            </>
          )}
          <Form.Item>
            <Space>
              <Button type="primary" onClick={handleSubmit} loading={loading}>
                保存
              </Button>
              <Button onClick={() => navigate(-1)}>
                取消
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}
