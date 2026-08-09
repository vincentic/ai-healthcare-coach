import { useState } from 'react';
import { useNavigate } from '../lib/navigation';
import { Card, Form, Input, Select, Button, Space } from 'antd';
import { message } from '../utils/message';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { relationshipsApi } from '../api';
import dayjs from 'dayjs';

const { Option } = Select;
const { TextArea } = Input;

export default function AddRelationshipRecordPage() {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      setLoading(true);
      await relationshipsApi.create({
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
      <Card title="添加自我关系记录">
        <Form form={form} layout="vertical">
          <Form.Item name="personName" label="联系人" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="category" label="分类" rules={[{ required: true }]}>
            <Select>
              <Option value="natural">自然</Option>
              <Option value="social">社会</Option>
              <Option value="family">家庭</Option>
              <Option value="friends">朋友</Option>
              <Option value="colleagues">同事</Option>
            </Select>
          </Form.Item>
          <Form.Item name="interactionType" label="互动类型">
            <Input />
          </Form.Item>
          <Form.Item name="notes" label="备注">
            <TextArea rows={3} />
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
