import { useState, useEffect, useMemo } from 'react';
import { Table, Button, Input, Select, Popconfirm, Row, Col, Space } from 'antd';
import { message } from '../utils/message';
import { PlusOutlined, EditOutlined, DeleteOutlined, SearchOutlined, ReloadOutlined, FileTextOutlined, RocketOutlined } from '@ant-design/icons';
import { booksApi } from '../api';
import { useNavigate } from '../lib/navigation';
import { Tag } from 'antd';
import dayjs from 'dayjs';
import { SystemNodeIntro } from '../components/SystemNodeIntro';

const { Option } = Select;

export default function BooksView() {
  const [books, setBooks] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Filter states
  const [searchTitle, setSearchTitle] = useState('');
  const [searchAuthor, setSearchAuthor] = useState('');
  const [filterStatus, setFilterStatus] = useState<string | undefined>();
  const [filterDimension, setFilterDimension] = useState<string | undefined>();

  useEffect(() => {
    loadBooks();
  }, []);

  const loadBooks = async () => {
    setLoading(true);
    try {
      const data = await booksApi.getAll() as any[];
      setBooks(data);
    } catch (error) {
      message.error('加载书籍失败');
    } finally {
      setLoading(false);
    }
  };

  // Filter books client-side
  const filteredBooks = useMemo(() => {
    return books.filter((book: any) => {
      const matchTitle = !searchTitle || book.title?.toLowerCase().includes(searchTitle.toLowerCase());
      const matchAuthor = !searchAuthor || book.author?.toLowerCase().includes(searchAuthor.toLowerCase());
      const matchStatus = !filterStatus || book.status === filterStatus;
      const matchDimension = !filterDimension || book.dimension === filterDimension;
      return matchTitle && matchAuthor && matchStatus && matchDimension;
    });
  }, [books, searchTitle, searchAuthor, filterStatus, filterDimension]);

  const handleDelete = async (id: number) => {
    try {
      await booksApi.delete(id);
      message.success('删除成功');
      loadBooks();
    } catch (error) {
      message.error('删除失败');
    }
  };

  const handleStatusChange = async (id: number, status: string) => {
    try {
      await booksApi.update(id, { status });
      message.success('状态更新成功');
      loadBooks();
    } catch (error) {
      message.error('状态更新失败');
    }
  };

  const handleReset = () => {
    setSearchTitle('');
    setSearchAuthor('');
    setFilterStatus(undefined);
    setFilterDimension(undefined);
  };

  const dimensionMap: Record<string, { text: string; color: string }> = {
    financial: { text: '财务', color: 'green' },
    health: { text: '健康', color: 'red' },
    time: { text: '时间', color: 'blue' },
    mind: { text: '心灵', color: 'purple' },
    relationships: { text: '关系', color: 'orange' },
  };

  const formatDate = (date: string | null | undefined) => {
    if (!date) return '-';
    return dayjs(date).format('YY/MM/DD');
  };

  const columns = [
    {
      title: '维度',
      dataIndex: 'dimension',
      key: 'dimension',
      width: 80,
      render: (dimension: string) => {
        if (!dimension) return '-';
        const d = dimensionMap[dimension] || { text: dimension, color: 'default' };
        return <Tag color={d.color}>{d.text}</Tag>;
      },
    },
    { title: '书名', dataIndex: 'title', key: 'title', width: 180, ellipsis: true },
    { title: '作者', dataIndex: 'author', key: 'author', width: 120, ellipsis: true },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 80,
      render: (status: string, record: any) => {
        return (
          <Select
            value={status}
            onChange={(value) => handleStatusChange(record.id, value)}
            size="small"
            style={{ width: 70 }}
          >
            <Option value="todo">待读</Option>
            <Option value="reading">在读</Option>
            <Option value="finished">已读</Option>
          </Select>
        );
      },
    },
    { title: '开始', dataIndex: 'startDate', key: 'startDate', width: 80, render: (d: string) => formatDate(d) },
    { title: '预计', dataIndex: 'estimatedFinishDate', key: 'estimatedFinishDate', width: 80, render: (d: string) => formatDate(d) },
    { title: '结束', dataIndex: 'finishDate', key: 'finishDate', width: 80, render: (d: string) => formatDate(d) },
    {
      title: '操作',
      key: 'action',
      width: 100,
      fixed: 'right' as const,
      render: (_: any, record: any) => (
        <>
          <Button type="link" icon={<EditOutlined />} onClick={() => navigate(`/books/${record.id}/edit`)} />
          <Button type="link" icon={<FileTextOutlined />} onClick={() => navigate(`/books/${record.id}`)} />
          <Popconfirm title="确认删除？" onConfirm={() => handleDelete(record.id)}>
            <Button type="link" danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </>
      ),
    },
  ];

  return (
    <div>
      <SystemNodeIntro
        icon={<RocketOutlined />}
        kicker="Node F"
        title="内容应用与作品"
        description="把输入转成理解、方法、应用和作品；书库不是收藏清单，而是支持决策和输出的认知资产。这里的 adaptive counterbalance 是：输入过多就转应用，输出空转就补理解。"
        points={['输入进入内容库', '理解转成方法', '应用沉淀作品', '作品证明能力']}
        steps={[
          { title: '筛选输入', detail: '只保留能改变判断、行动或作品质量的内容。' },
          { title: '转成方法', detail: '把一个观点写成可复用原则、清单、模板或决策标准。' },
          { title: '形成作品', detail: '把应用结果放回项目或作品库，让能力有证据。' },
        ]}
      />

      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
        <h2>认知资产库</h2>
        <Button type="primary" icon={<PlusOutlined />} onClick={() => navigate('/books/add')}>
          添加书籍
        </Button>
      </div>

      {/* Filter Section */}
      <div className="toolbar-panel">
        <Row gutter={16}>
          <Col xs={24} sm={12} md={6}>
            <Select
              placeholder="筛选维度"
              style={{ width: '100%' }}
              value={filterDimension}
              onChange={setFilterDimension}
              allowClear
            >
              <Option value="financial">财务</Option>
              <Option value="health">健康</Option>
              <Option value="time">时间</Option>
              <Option value="mind">心灵</Option>
              <Option value="relationships">关系</Option>
            </Select>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Input
              placeholder="搜索书名"
              prefix={<SearchOutlined />}
              value={searchTitle}
              onChange={(e) => setSearchTitle(e.target.value)}
              allowClear
            />
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Input
              placeholder="搜索作者"
              prefix={<SearchOutlined />}
              value={searchAuthor}
              onChange={(e) => setSearchAuthor(e.target.value)}
              allowClear
            />
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Select
              placeholder="筛选状态"
              style={{ width: '100%' }}
              value={filterStatus}
              onChange={setFilterStatus}
              allowClear
            >
              <Option value="todo">待读</Option>
              <Option value="reading">在读</Option>
              <Option value="finished">已读</Option>
            </Select>
          </Col>
        </Row>
        <Row gutter={16} style={{ marginTop: 8 }}>
          <Col>
            <Space>
              <Button icon={<ReloadOutlined />} onClick={handleReset}>
                重置
              </Button>
              <span className="muted-text">共 {filteredBooks.length} 本书</span>
            </Space>
          </Col>
        </Row>
      </div>

      <Table columns={columns} dataSource={filteredBooks} rowKey="id" loading={loading} scroll={{ x: 900 }} />
    </div>
  );
}
