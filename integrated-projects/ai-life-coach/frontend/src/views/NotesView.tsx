import { useState, useEffect } from 'react';
import { useNavigate } from '../lib/navigation';
import { Table, Card, Tag, Button, Popconfirm, Row, Col } from 'antd';
import { message } from '../utils/message';
import { EditOutlined, DeleteOutlined, PlusOutlined, AppstoreOutlined, BarsOutlined } from '@ant-design/icons';
import { notesApi, booksApi } from '../api';

export default function NotesView() {
  const navigate = useNavigate();
  const [notes, setNotes] = useState<any[]>([]);
  const [books, setBooks] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [viewMode, setViewMode] = useState<'list' | 'card'>('list');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [notesData, booksData] = await Promise.all([
        notesApi.getAll(),
        booksApi.getAll(),
      ]);
      setNotes(notesData);
      setBooks(booksData);
    } catch (error) {
      message.error('加载失败');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await notesApi.delete(id);
      message.success('删除成功');
      loadData();
    } catch (error) {
      message.error('删除失败');
    }
  };

  const getBookTitle = (bookId: number) => {
    const book = books.find((b: any) => b.id === bookId);
    return book?.title || '未知书籍';
  };

  const noteTypeMap: Record<string, { text: string; color: string }> = {
    summary: { text: '摘要', color: 'blue' },
    highlight: { text: '金句', color: 'gold' },
    reflection: { text: '反思', color: 'green' },
    practice: { text: '实践', color: 'purple' },
  };

  const dimensionMap: Record<string, { text: string; color: string }> = {
    financial: { text: '财务', color: 'green' },
    health: { text: '健康', color: 'red' },
    time: { text: '时间', color: 'blue' },
    mind: { text: '心灵', color: 'purple' },
    relationships: { text: '关系', color: 'orange' },
  };

  const columns = [
    { title: '日期', dataIndex: 'noteDate', key: 'noteDate', width: 120 },
    { title: '书名', key: 'bookTitle', render: (_: any, record: any) => getBookTitle(record.bookId) },
    { title: '页码', dataIndex: 'pageNumber', key: 'pageNumber', width: 80 },
    { title: '标题', dataIndex: 'title', key: 'title' },
    { title: '类型', dataIndex: 'noteType', key: 'noteType', width: 100, render: (type: string) => {
      const t = noteTypeMap[type] || { text: type, color: 'default' };
      return <Tag color={t.color}>{t.text}</Tag>;
    }},
    { title: '维度', dataIndex: 'dimension', key: 'dimension', width: 80, render: (dimension: string) => {
      if (!dimension) return '-';
      const d = dimensionMap[dimension] || { text: dimension, color: 'default' };
      return <Tag color={d.color}>{d.text}</Tag>;
    }},
    { title: '内容', dataIndex: 'content', key: 'content', ellipsis: true },
    {
      title: '操作',
      key: 'action',
      width: 150,
      render: (_: any, record: any) => (
        <>
          <Button type="link" icon={<EditOutlined />} onClick={() => navigate(`/notes/${record.id}/edit`)}>
            编辑
          </Button>
          <Popconfirm title="确认删除？" onConfirm={() => handleDelete(record.id)}>
            <Button type="link" danger icon={<DeleteOutlined />}>
              删除
            </Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
        <h2><EditOutlined /> 读书实践</h2>
        <div>
          <Button.Group>
            <Button icon={<BarsOutlined />} onClick={() => setViewMode('list')} type={viewMode === 'list' ? 'primary' : 'default'} />
            <Button icon={<AppstoreOutlined />} onClick={() => setViewMode('card')} type={viewMode === 'card' ? 'primary' : 'default'} />
          </Button.Group>
          <Button type="primary" icon={<PlusOutlined />} onClick={() => navigate('/notes/add')} style={{ marginLeft: 8 }}>
            添加笔记
          </Button>
        </div>
      </div>

      {viewMode === 'list' ? (
        <Table columns={columns} dataSource={notes} rowKey="id" loading={loading} />
      ) : (
        <Row gutter={[16, 16]}>
          {notes.map((note: any) => (
            <Col xs={24} sm={12} md={8} key={note.id}>
              <Card
                title={note.title}
                extra={
                  <>
                    <Button type="link" size="small" onClick={() => navigate(`/notes/${note.id}/edit`)}>编辑</Button>
                    <Popconfirm title="确认删除？" onConfirm={() => handleDelete(note.id)}>
                      <Button type="link" size="small" danger>删除</Button>
                    </Popconfirm>
                  </>
                }
              >
                <p><strong>书籍：</strong>{getBookTitle(note.bookId)}</p>
                <p><strong>日期：</strong>{note.noteDate || '-'}</p>
                <p><strong>页码：</strong>{note.pageNumber || '-'}</p>
                <Tag color={noteTypeMap[note.noteType]?.color}>{noteTypeMap[note.noteType]?.text}</Tag>
                <p style={{ marginTop: 8 }}>{note.content?.substring(0, 100)}...</p>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
}
