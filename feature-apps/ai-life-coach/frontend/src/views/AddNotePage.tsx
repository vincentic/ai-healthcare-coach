import { useState, useEffect } from 'react';
import { useNavigate, useParams, useSearchParams } from '../lib/navigation';
import { Card, Form, Input, DatePicker, Select, Button, Space } from 'antd';
import { message } from '../utils/message';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { notesApi, booksApi } from '../api';
import dayjs from 'dayjs';

const { Option } = Select;
const { TextArea } = Input;

export default function AddNotePage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id?: string }>();
  const [searchParams] = useSearchParams();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [books, setBooks] = useState<any[]>([]);

  const isEdit = !!id;
  const preSelectedBookId = searchParams.get('bookId');

  useEffect(() => {
    loadBooks();
    if (isEdit && id) {
      loadNote(id);
    } else if (preSelectedBookId) {
      form.setFieldsValue({ bookId: Number(preSelectedBookId) });
    }
  }, [id, preSelectedBookId]);

  const loadBooks = async () => {
    try {
      const data = await booksApi.getAll();
      setBooks(data);
    } catch (error) {
      console.error('加载书籍失败', error);
    }
  };

  const loadNote = async (noteId: string) => {
    try {
      const data = await notesApi.getById(Number(noteId));
      form.setFieldsValue({
        ...data,
        noteDate: data.noteDate ? dayjs(data.noteDate) : null,
      });
    } catch (error) {
      message.error('加载笔记失败');
    }
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      setLoading(true);
      const data = {
        ...values,
        noteDate: values.noteDate?.format('YYYY-MM-DD'),
      };

      if (isEdit && id) {
        await notesApi.update(Number(id), data);
        message.success('更新成功');
      } else {
        await notesApi.create(data);
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
      <Card title={isEdit ? '编辑笔记' : '添加笔记'}>
        <Form form={form} layout="vertical">
          <Form.Item name="bookId" label="书籍" rules={[{ required: true }]}>
            <Select showSearch placeholder="选择书籍">
              {books.map((book: any) => (
                <Option key={book.id} value={book.id}>{book.title}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="noteDate" label="日期">
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item name="pageNumber" label="页码">
            <Input type="number" />
          </Form.Item>
          <Form.Item name="title" label="标题" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="noteType" label="类型" initialValue="reflection">
            <Select>
              <Option value="summary">摘要</Option>
              <Option value="highlight">金句</Option>
              <Option value="reflection">反思</Option>
              <Option value="practice">实践</Option>
            </Select>
          </Form.Item>
          <Form.Item name="dimension" label="关联维度">
            <Select allowClear placeholder="选择关联维度">
              <Option value="financial">财务维度</Option>
              <Option value="health">健康维度</Option>
              <Option value="time">时间维度</Option>
              <Option value="mind">心灵维度</Option>
              <Option value="relationships">关系维度</Option>
            </Select>
          </Form.Item>
          <Form.Item name="chapter" label="章节">
            <Input />
          </Form.Item>
          <Form.Item name="tags" label="标签">
            <Input placeholder="用逗号分隔" />
          </Form.Item>
          <Form.Item name="content" label="收获" rules={[{ required: true }]}>
            <TextArea rows={15} />
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
