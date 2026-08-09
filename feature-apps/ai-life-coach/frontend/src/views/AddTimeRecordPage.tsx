import { useState } from 'react';
import { useNavigate } from '../lib/navigation';
import { Card, Form, Input, InputNumber, Select, Button, Space } from 'antd';
import { message } from '../utils/message';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { timeApi } from '../api';
import dayjs from 'dayjs';

const { Option } = Select;

export default function AddTimeRecordPage() {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      setLoading(true);
      await timeApi.create({
        ...values,
        recordDate: dayjs().format('YYYY-MM-DD'),
      });
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
      <Card title="添加时间块">
        <Form form={form} layout="vertical">
          <Form.Item name="taskName" label="任务名称" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="durationMinutes" label="时长(分钟)" rules={[{ required: true }]}>
            <InputNumber min={1} style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item name="category" label="分类">
            <Select allowClear>
              <Option value="work">工作</Option>
              <Option value="study">学习</Option>
              <Option value="exercise">运动</Option>
              <Option value="rest">休息</Option>
              <Option value="other">其他</Option>
            </Select>
          </Form.Item>
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
