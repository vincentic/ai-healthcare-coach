import { useState, useEffect } from 'react';
import { useParams, useNavigate } from '../lib/navigation';
import { Card, Descriptions, Button, Table, Popconfirm, Rate } from 'antd';
import { message } from '../utils/message';
import { PlusOutlined } from '@ant-design/icons';
import { booksApi, notesApi } from '../api';

export default function BookDetailView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState<any>(null);
  const [notes, setNotes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, [id]);

  const loadData = async () => {
    if (!id) return;
    try {
      const [bookData, notesData] = await Promise.all([
        booksApi.getById(Number(id)),
        notesApi.getByBookId(Number(id)),
      ]);
      setBook(bookData);
      setNotes(notesData as any[]);
    } catch (error) {
      message.error('加载失败');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteNote = async (noteId: number) => {
    try {
      await notesApi.delete(noteId);
      message.success('删除成功');
      loadData();
    } catch (error) {
      message.error('删除失败');
    }
  };

  const noteColumns = [
    { title: '日期', dataIndex: 'noteDate', key: 'noteDate', render: (d: string) => d || '-' },
    { title: '页码', dataIndex: 'pageNumber', key: 'pageNumber' },
    { title: '标题', dataIndex: 'title', key: 'title' },
    { title: '类型', dataIndex: 'noteType', key: 'noteType' },
    { title: '笔记', dataIndex: 'content', key: 'content', ellipsis: true },
    {
      title: '操作',
      key: 'action',
      render: (_: any, record: any) => (
        <>
          <Button type="link" onClick={() => navigate(`/notes/${record.id}/edit`)}>
            编辑
          </Button>
          <Popconfirm title="确认删除？" onConfirm={() => handleDeleteNote(record.id)}>
            <Button type="link" danger>
              删除
            </Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  if (loading || !book) {
    return <div>加载中...</div>;
  }

  return (
    <div>
      <Button onClick={() => navigate('/books')}>返回书库</Button>

      <Card title={book.title} style={{ marginTop: 16 }}>
        <Descriptions column={2}>
          <Descriptions.Item label="作者">{book.author}</Descriptions.Item>
          <Descriptions.Item label="总页数">{book.totalPages}</Descriptions.Item>
          <Descriptions.Item label="状态">{book.status === 'finished' ? '已完成' : book.status === 'reading' ? '在读' : '待读'}</Descriptions.Item>
          <Descriptions.Item label="评分">{book.rating ? <Rate disabled defaultValue={book.rating} /> : '-'}</Descriptions.Item>
          <Descriptions.Item label="开始日期">{book.startDate || '-'}</Descriptions.Item>
          <Descriptions.Item label="完成日期">{book.finishDate || '-'}</Descriptions.Item>
          <Descriptions.Item label="分类">{book.category || '-'}</Descriptions.Item>
        </Descriptions>
        {book.readingGains && (
          <>
            <h4>读书收获</h4>
            <p>{book.readingGains}</p>
          </>
        )}
      </Card>

      <Card
        title="读书笔记"
        extra={<Button type="primary" icon={<PlusOutlined />} onClick={() => navigate(`/notes/add?bookId=${id}`)}>添加笔记</Button>}
        style={{ marginTop: 16 }}
      >
        <Table columns={noteColumns} dataSource={notes} rowKey="id" pagination={false} />
      </Card>
    </div>
  );
}
