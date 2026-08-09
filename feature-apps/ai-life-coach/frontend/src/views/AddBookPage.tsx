import { useState, useEffect } from 'react';
import { useNavigate, useParams } from '../lib/navigation';
import { Card, Form, Input, Select, DatePicker, Button, Space } from 'antd';
import { message } from '../utils/message';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { booksApi } from '../api';
import dayjs from 'dayjs';

const { Option } = Select;

export default function AddBookPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id?: string }>();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const isEdit = !!id;

  useEffect(() => {
    if (isEdit && id) {
      loadBook(id);
    }
  }, [id]);

  const loadBook = async (bookId: string) => {
    try {
      const data = await booksApi.getById(Number(bookId));
      form.setFieldsValue({
        ...data,
        startDate: data.startDate ? dayjs(data.startDate) : null,
        finishDate: data.finishDate ? dayjs(data.finishDate) : null,
        estimatedFinishDate: data.estimatedFinishDate ? dayjs(data.estimatedFinishDate) : null,
      });
    } catch (error) {
      message.error('加载书籍失败');
    }
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      setLoading(true);
      const data: Record<string, any> = { ...values };
      data.startDate = values.startDate?.format('YYYY-MM-DD') || null;
      data.finishDate = values.finishDate?.format('YYYY-MM-DD') || null;
      data.estimatedFinishDate = values.estimatedFinishDate?.format('YYYY-MM-DD') || null;

      if (isEdit && id) {
        await booksApi.update(Number(id), data);
        message.success('更新成功');
      } else {
        await booksApi.create(data);
        message.success('添加成功');
      }
      navigate(-1);
    } catch (error) {
      message.error(isEdit ? '更新失败' : '添加失败');
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
      <Card title={isEdit ? '编辑书籍' : '添加书籍'}>
        <Form form={form} layout="vertical">
          <Form.Item name="dimension" label="维度">
            <Select allowClear placeholder="选择维度">
              <Option value="financial">财务</Option>
              <Option value="health">健康</Option>
              <Option value="time">时间</Option>
              <Option value="mind">心灵</Option>
              <Option value="relationships">关系</Option>
            </Select>
          </Form.Item>
          <Form.Item name="title" label="书名" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="author" label="作者">
            <Input />
          </Form.Item>
          <Form.Item name="status" label="状态" initialValue="todo">
            <Select>
              <Option value="todo">待读</Option>
              <Option value="reading">在读</Option>
              <Option value="finished">已读</Option>
            </Select>
          </Form.Item>
          <Form.Item name="startDate" label="开始">
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item name="estimatedFinishDate" label="预计">
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item name="finishDate" label="结束">
            <DatePicker style={{ width: '100%' }} />
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
