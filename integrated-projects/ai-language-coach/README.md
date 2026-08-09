# Language Learning

从 AI Knowledge Coach 拆分出来的独立语言学习项目，当前聚焦 Shadow Reading 四步练习：Listen、Shadow、Repeat、Apply。

项目方向是一个面向语言教育和价值创造的 **language-mentoring** 系统：用高频词和实用短语、i+1 可理解输入、影子跟读、主动输出、间隔复习和即时反馈辅助语言学习，并逐步支持标准语、地区变体和方言。

更长期的产品定位是：帮助学习者把多语输入、跨文化困惑和身份反思，转化为可交付的外部价值，例如跨文化文章、课程、咨询、社群活动和方言/语言生存包。

## 功能

- 支持英语、西班牙语、法语、德语、日语、韩语、俄语
- 规划支持语言变体和方言，例如美式/英式英语、关西日语、台湾国语、粤语、闽南语、四川话等
- 支持问候、餐厅、购物、问路、旅行、日常生活场景
- 后端不可用时自动使用静态 i+1 练习数据
- 使用浏览器 Web Speech API 播放句子
- 保留 FastAPI 后端模块，后续可接入动态会话、i+1 自适应选择和练习记录

## 模块设计

详细模块方案见 [docs/language-mentoring-modules.md](docs/language-mentoring-modules.md)，包括：

- 目标诊断与学习路径
- 高频词与实用短语库
- i+1 内容选择器
- Shadow Reading 四步练习
- 发音与声调教练
- 主动输出与角色扮演
- SRS 间隔复习与个人短语银行
- 沉浸内容导入
- 进度追踪与周复盘
- 语言与方言资料管理

## 价值创造飞轮

基于 [docs/value.md](docs/value.md)，项目新增输入-输出-反思飞轮设计，详见 [docs/value-creation-flywheel.md](docs/value-creation-flywheel.md)。

核心飞轮：

```text
输入 -> 输出 -> 反思 -> 产品化 -> 反馈 -> 强化输入
```

对应模块：

- `Input Inbox`：收集语言材料、文化事件、方言表达和身份日记
- `Guided Output Studio`：把输入转成文章、脚本、课程片段或咨询提纲
- `Reflection Prompts`：引导视角转换、身份整合和文化脚本分析
- `MVP Builder`：把个人经验包装成最小可交付产品
- `Feedback Ledger`：记录外部反馈、收入信号和下一轮输入主题

## 本地运行

```bash
npm --prefix frontend install
npm run dev
```

默认访问：

```text
http://localhost:3000
```

## Vercel 部署

项目已提供根目录部署配置：

- `vercel.json`：从根目录安装和构建 `frontend` Next.js 应用
- `frontend/vercel.json`：当 Vercel Project Root Directory 选择 `frontend` 时使用
- `.vercelignore`：忽略本地缓存、构建产物和 Python 编译产物
- `frontend/.vercelignore`：忽略前端本地缓存和构建产物
- `.env.example`：记录可选后端环境变量

首次关联 Vercel 项目：

```bash
npm install -g vercel
npm run vercel:link
```

预览部署：

```bash
npm run vercel:deploy
```

生产部署：

```bash
npm run vercel:prod
```

如果 FastAPI 后端已部署到独立服务，在 Vercel Project Settings -> Environment Variables 中设置：

```text
BACKEND_URL=https://your-backend-domain.example.com
```

如果不设置 `BACKEND_URL`，前端会在后端 API 不可用时自动使用静态练习数据。

## 后端

```bash
cd backend
python -m uvicorn app.main:app --reload --port 5000
```

前端默认会把 `/api/*` 代理到 `http://localhost:5000/api/*`。如果部署到其它后端地址，可以设置：

```bash
BACKEND_URL=https://your-backend-domain.example.com
```

## 排错

如果页面显示初始化失败，确认已部署包含 `frontend/data/practiceSessions.js` 的提交。后端 API 不可用时，前端会自动进入静态练习模式。
