import { useState } from 'react';
import { useNavigate, useParams } from '../lib/navigation';
import { Card, Form, Input, Select, Button, TimePicker, InputNumber, Space } from 'antd';
import { message } from '../utils/message';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { healthApi } from '../api';
import dayjs from 'dayjs';

const { Option } = Select;
const { TextArea } = Input;

type RecordType = 'health' | 'hygiene' | 'sleep' | 'diet' | 'emotion' | 'intimate' | 'exercise';

const typeNames: Record<RecordType, string> = {
  health: '安全',
  hygiene: '清洁',
  sleep: '睡眠',
  diet: '饮食',
  emotion: '情绪',
  intimate: '亲密',
  exercise: '运动',
};

export default function AddHealthRecordPage() {
  const navigate = useNavigate();
  const { type } = useParams<{ type: RecordType }>();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const typeName = typeNames[type || 'health'] || type;

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      setLoading(true);
      const today = dayjs().format('YYYY-MM-DD');

      let data: any = { recordDate: today };

      switch (type) {
        case 'health':
          data = { ...data, person: values.person, location: values.location, content: values.content };
          await healthApi.createRecord(data);
          break;
        case 'hygiene':
          data = {
            ...data,
            hygieneType: values.hygieneType,
            gains: values.gains,
          };
          await healthApi.createHygiene(data);
          break;
        case 'sleep':
          data = {
            ...data,
            sleepTime: values.sleepTime?.format('HH:mm'),
            wakeTime: values.wakeTime?.format('HH:mm'),
            sleepDuration: values.sleepDuration,
            fallAsleepDuration: values.fallAsleepDuration,
            nightWakeCount: values.nightWakeCount,
            sleepDisturbance: values.sleepDisturbance,
          };
          await healthApi.createSleep(data);
          break;
        case 'diet':
          data = {
            ...data,
            mealType: values.mealType,
            mealTime: values.mealTime?.format('HH:mm'),
            location: values.location,
            foodContent: values.foodContent,
            foodCategory: values.foodCategory,
            cost: values.cost,
          };
          await healthApi.createDiet(data);
          break;
        case 'emotion':
          data = {
            ...data,
            triggerEvent: values.triggerEvent,
            emotionType: values.emotionType,
            emotionLevel: values.emotionLevel,
            innerNeeds: values.innerNeeds,
            reflection: values.reflection,
          };
          await healthApi.createEmotion(data);
          break;
        case 'exercise':
          data = { ...data, recordType: 'exercise', exerciseType: values.exerciseType, gains: values.gains };
          await healthApi.createRecord(data);
          break;
      }

      message.success('添加成功');
      navigate(-1);
    } catch (error) {
      message.error('添加失败');
    } finally {
      setLoading(false);
    }
  };

  const renderForm = () => {
    switch (type) {
      case 'health':
        return (
          <>
            <Form.Item name="person" label="人物" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name="location" label="地点">
              <Input />
            </Form.Item>
            <Form.Item name="content" label="内容">
              <TextArea rows={4} />
            </Form.Item>
          </>
        );
      case 'hygiene':
        return (
          <>
            <Form.Item name="hygieneType" label="清洁类型" rules={[{ required: true }]}>
              <Select>
                <Option value="hair_care">护发</Option>
                <Option value="eye_care">护眼</Option>
                <Option value="body_care">护体</Option>
                <Option value="dental">护齿</Option>
                <Option value="shave">护须</Option>
                <Option value="heart">护心</Option>
                <Option value="home">护所</Option>
              </Select>
            </Form.Item>
            <Form.Item name="gains" label="收获">
              <TextArea rows={4} />
            </Form.Item>
          </>
        );
      case 'sleep':
        return (
          <>
            <Form.Item name="sleepTime" label="入睡时间" rules={[{ required: true }]}>
              <TimePicker format="HH:mm" style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item name="wakeTime" label="醒来时间" rules={[{ required: true }]}>
              <TimePicker format="HH:mm" style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item name="sleepDuration" label="睡眠总时长(分钟)">
              <InputNumber min={0} style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item name="fallAsleepDuration" label="入睡时长(分钟)">
              <InputNumber min={0} style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item name="nightWakeCount" label="起夜次数">
              <InputNumber min={0} style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item name="sleepDisturbance" label="睡眠干扰">
              <TextArea rows={2} />
            </Form.Item>
          </>
        );
      case 'diet':
        return (
          <>
            <Form.Item name="mealType" label="餐次" rules={[{ required: true }]}>
              <Select>
                <Option value="breakfast">早餐</Option>
                <Option value="lunch">午餐</Option>
                <Option value="dinner">晚餐</Option>
                <Option value="snack">零食</Option>
              </Select>
            </Form.Item>
            <Form.Item name="mealTime" label="进食时间" rules={[{ required: true }]}>
              <TimePicker format="HH:mm" style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item name="location" label="进食地点">
              <Input />
            </Form.Item>
            <Form.Item name="foodContent" label="食物内容">
              <TextArea rows={2} />
            </Form.Item>
            <Form.Item name="foodCategory" label="食物分类">
              <Input />
            </Form.Item>
            <Form.Item name="cost" label="餐费花费">
              <InputNumber min={0} precision={2} style={{ width: '100%' }} />
            </Form.Item>
          </>
        );
      case 'emotion':
        return (
          <>
            <Form.Item name="triggerEvent" label="触发事件">
              <TextArea rows={2} />
            </Form.Item>
            <Form.Item name="emotionType" label="情绪类型">
              <Input />
            </Form.Item>
            <Form.Item name="emotionLevel" label="情绪强度(1-10)">
              <InputNumber min={1} max={10} style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item name="innerNeeds" label="内心需要觉察">
              <TextArea rows={3} />
            </Form.Item>
            <Form.Item name="reflection" label="反思">
              <TextArea rows={3} />
            </Form.Item>
          </>
        );
      case 'exercise':
        return (
          <>
            <Form.Item name="exerciseType" label="运动类型" rules={[{ required: true }]}>
              <Select>
                <Option value="strength">力量训练</Option>
                <Option value="cardio">有氧运动</Option>
                <Option value="flexibility">柔韧性</Option>
                <Option value="balance">平衡训练</Option>
                <Option value="sports">球类运动</Option>
                <Option value="other">其他</Option>
              </Select>
            </Form.Item>
            <Form.Item name="gains" label="收获">
              <TextArea rows={4} />
            </Form.Item>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <Button icon={<ArrowLeftOutlined />} onClick={() => navigate(-1)}>
          返回
        </Button>
      </div>
      <Card title={`添加${typeName}记录`}>
        <Form form={form} layout="vertical">
          {renderForm()}
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
