import { useState, useEffect } from 'react';
import { useNavigate, useParams } from '../lib/navigation';
import { Card, Form, Select, Button, Space, Input } from 'antd';
import { message } from '../utils/message';
import { ArrowLeftOutlined, BookOutlined } from '@ant-design/icons';
import { booksApi } from '../api';
import dayjs from 'dayjs';

const { Option } = Select;
const { TextArea } = Input;

const dimensionNames: Record<string, string> = {
  health: '健康',
  financial: '财务',
  time: '时间',
  mind: '心灵',
  relationships: '关系',
};

export default function AddBookRecordPage() {
  const navigate = useNavigate();
  const { dimension } = useParams<{ dimension: string }>();
  const [form] = Form.useForm();
  const [books, setBooks] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const dimensionName = dimensionNames[dimension || ''] || dimension;

  useEffect(() => {
    loadBooks();
  }, [dimension]);

  const loadBooks = async () => {
    try {
      const allBooks = await booksApi.getAll();
      setBooks((allBooks as any[]).filter((b: any) => b.dimension === dimension));
    } catch (error) {
      console.error('加载书籍列表失败', error);
    }
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      setLoading(true);
      const today = dayjs().format('YYYY-MM-DD');
      await booksApi.addDimensionLink(values.bookId, {
        dimension: dimension,
        readingGains: values.readingGains,
        recordDate: today,
      });
      message.success('添加成功');
      form.resetFields();
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
      <Card title={<><BookOutlined /> 添加{dimensionName}维度读书记录</>}>
        <Form form={form} layout="vertical">
          <Form.Item name="bookId" label="选择书籍" rules={[{ required: true }]}>
            <Select
              showSearch
              placeholder="搜索书籍"
              optionFilterProp="children"
              onSearch={loadBooks}
              filterOption={(input, option) =>
                (option?.children as unknown as string)?.toLowerCase().includes(input.toLowerCase())
              }
            >
              {books.map(b => (
                <Option key={b.id} value={b.id}>{b.title}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="readingGains" label="收获">
            <TextArea rows={16} placeholder="记录您的读书收获..." />
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
