# life-consistency-coach

life-consistency-coach 是一个面向个人长期稳定运行的生活一致性教练系统。它把读书、健康、财务、时间、心灵、关系、每日回顾和工作日志放进同一个可追踪的操作台，帮助用户看到自己是否在持续、稳定、可复盘地前进。

它关注的不是一次性完成某个工具，而是三个问题：

- 今天是否有行动记录？
- 关键生活维度是否保持一致？
- 下一步是否足够清楚、可执行、可复盘？

## 核心模块

### 1. 读书与知识沉淀

- 维护书库和书籍详情
- 记录不同维度的阅读收获
- 将书籍与财务、健康、时间、心灵、关系等生活维度连接

### 2. 财务 Financial

财务模块不只记录收入支出，而是作为个人稳定系统的资源调度层。

当前规划包括：

- 财务总览：现金流、净资产、储蓄率、投资关注点
- 收入来源：主业收入、副业收入、投资收入、一次性收入
- 支出分析：固定支出、可变支出、学习投入、健康投入
- 资产负债：现金、投资、应收、负债、风险缓冲
- 财务决策：大额支出、职业选择、学习投资、家庭责任

推荐使用方式：

- 每周检查一次现金流
- 每月复盘一次资产负债
- 每次重大支出前写下理由、风险和替代方案
- 把财务目标与时间、健康、职业和关系一起判断

### 3. 打卡日历与每日回顾

每日回顾用于形成可持续的打卡系统。

包含字段：

- 联系、睡眠、饮食、帐目、清洁
- 情绪、运动、时间、身体
- 读书、输入、输出、新知、梦境
- 整体总结与下一步

打卡统计关注：

- 本月已打卡天数
- 当前连续打卡天数
- 最长连续打卡天数
- 本月完成率
- 近 30 天覆盖率
- 每天完成了多少个维度

目标不是追求完美打卡，而是让生活有最低限度的可见性。

### 4. 工作日志与进度变化

工作日志用于记录系统本身和现实项目的推进。

支持：

- 记录一次进步变化
- 标记所属模块
- 记录开始进度与当前进度
- 标记状态：进行中、已完成、受阻、观察中
- 写下变化记录和下一步
- 在 API 不可用时使用浏览器本地存储兜底

### 5. SCYS 内容资讯关联

系统关联 `scys.com` 作为外部内容资讯入口，用于追踪与个人成长、财务、产业、健康、教育和社会趋势相关的信息。

使用方式：

- 在项目关联中保留 SCYS 资讯入口
- 将值得长期跟踪的内容转成读书记录、工作日志或财务决策
- 避免只消费资讯，要把资讯转成判断、行动和复盘

SCYS 入口：

- https://scys.com

## 线上地址

- GitHub 仓库：https://github.com/vincentic/life-consistency-coach
- Vercel 生产站点：https://life-consistency-coach.vercel.app
- SCYS 内容资讯：https://scys.com

## 技术结构

```text
life-consistency-coach
├── frontend/          Next.js + React + Ant Design
├── backend/           NestJS API
├── mysql/             本地 MySQL 初始化与导出
├── scripts/           数据导出脚本
└── docs/              设计、Schema、UML 文档
```

## 系统层级

首页已经按 `docs/manual.md`、`docs/consistency.md`、`docs/resilence.md` 整合为三层操作方式：

- 高层：驱动力、价值层、自由层，用来决定方向和人生质量。
- 中层：领域层、战略层、项目层，用来维护责任并推进阶段成果。
- 底层：执行层、状态层、认知资产、成果资产、反馈层，用来完成今天的行动和复盘。

日常只运行三个入口：看日历、选一步、写发现。Consistency 负责稳定推进，Resilience 负责中断后的恢复和重启。

## 数据策略

当前系统支持两种运行状态：

- 在线 API 可用时：通过后端 API 读写数据
- API 不可用时：部分模块使用浏览器本地存储兜底

Vercel 静态前端不能直接连接本地 MySQL。若要支持真正的在线共享读写，需要部署：

- 公网可访问的后端 API
- 托管数据库或自托管公网数据库
- Vercel 环境变量 `VITE_API_BASE_URL`

本地 MySQL 摘要可通过脚本导出到前端静态目录：

```bash
scripts/export-mysql-data.sh
```

导出后会更新：

- `frontend/public/static-data/mysql-export-status.json`
- `frontend/public/static-data/mysql-summary.json`

## 本地开发

### 前端

```bash
npm --prefix frontend install
npm --prefix frontend run dev
```

### 后端

```bash
npm --prefix backend install
npm --prefix backend run start:dev
```

## 验证

```bash
npm --prefix frontend run build
```

说明：构建命令会执行 Next.js 生产构建与 TypeScript 检查。

## 部署

### GitHub 到 Vercel

1. 在 Vercel 创建或导入 `frontend` 项目，Framework 选择 Next.js。
2. 在 GitHub 仓库 Secrets 中配置：
   - `VERCEL_TOKEN`
   - `VERCEL_ORG_ID`
   - `VERCEL_PROJECT_ID`
   - `NEXT_PUBLIC_API_BASE_URL`（可选；没有公网后端时可以不填）
3. 本地验证前端构建：

```bash
npm --prefix frontend run build
```

4. 提交并推送到 `main`：

```bash
git add frontend/src/app/page.tsx frontend/src/views/DailyReviewsView.tsx frontend/src/index.css .github/workflows/deploy-vercel.yml README.md
git commit -m "Add layered life coach operating system"
git push origin main
```

5. GitHub Actions 会运行 `.github/workflows/deploy-vercel.yml`，先安装依赖、构建前端，再部署到 Vercel 生产环境。

### 手动部署

也可以在本地直接部署前端：

```bash
npx vercel frontend --prod
```

生产别名：

```bash
npx vercel alias set <deployment-url> life-consistency-coach.vercel.app
```

## 近期方向

- 完善财务模块的数据录入与统计
- 将每日回顾扩展为更细的打卡日历
- 将 SCYS 资讯转化为可收藏、可复盘、可行动的内容流
- 接入公网后端和托管数据库，实现跨设备同步
- 增加周复盘、月复盘和年度一致性报告
- 把 consistency 与 resilience 的训练循环内置到首页和复盘流程中
