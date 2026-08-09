import Link from 'next/link';
import {
  AimOutlined,
  AppstoreOutlined,
  CalendarOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  CompassOutlined,
  DashboardOutlined,
  ExperimentOutlined,
  FireOutlined,
  FolderOpenOutlined,
  HeartOutlined,
  LineChartOutlined,
  ReadOutlined,
  RocketOutlined,
  SmileOutlined,
  SyncOutlined,
} from '@ant-design/icons';

export default function HomePage() {
  const layers = [
    {
      id: '0',
      title: '驱动力',
      question: '我以什么方式推动自己？',
      content: '自主、快乐、平静、痛苦信号',
      cadence: '随时觉察',
      icon: <FireOutlined />,
      href: '/mind',
    },
    {
      id: '1',
      title: '价值层',
      question: '什么值得我投入生命？',
      content: '价值观、身份、人生方向',
      cadence: '半年到数年',
      icon: <CompassOutlined />,
      href: '/mind',
    },
    {
      id: '2',
      title: '自由层',
      question: '我拥有多少真实选择？',
      content: '健康、心灵、时间、关系、财务',
      cadence: '月度到年度',
      icon: <HeartOutlined />,
      href: '/daily-reviews',
    },
    {
      id: '3',
      title: '领域层',
      question: '哪些责任需要持续维护？',
      content: '身体、工作、学习、关系、家庭、财务、环境',
      cadence: '每周到季度',
      icon: <AppstoreOutlined />,
      href: '/health',
    },
    {
      id: '4',
      title: '战略层',
      question: '当前阶段重点改变什么？',
      content: '年度主题、目标、优先级',
      cadence: '月度到年度',
      icon: <AimOutlined />,
      href: '/work-logs',
    },
    {
      id: '5',
      title: '项目层',
      question: '如何把目标变成阶段成果？',
      content: '项目、看板、完成标准',
      cadence: '每周',
      icon: <FolderOpenOutlined />,
      href: '/work-logs',
    },
    {
      id: '6',
      title: '执行层',
      question: '下一步是什么，何时发生？',
      content: '清单、日历、时间块、习惯',
      cadence: '每日',
      icon: <CheckCircleOutlined />,
      href: '/time',
    },
    {
      id: '7',
      title: '状态层',
      question: '此刻适合怎样行动？',
      content: '睡眠、能量、情绪、身体、注意力',
      cadence: '当下到每日',
      icon: <DashboardOutlined />,
      href: '/health',
    },
    {
      id: '8',
      title: '认知资产',
      question: '我知道和理解了什么？',
      content: '输入、理解、内容库、决策原则',
      cadence: '随时到每周',
      icon: <ReadOutlined />,
      href: '/books',
    },
    {
      id: '9',
      title: '成果资产',
      question: '我真正做成了什么？',
      content: '应用、输出、作品库',
      cadence: '项目完成时',
      icon: <RocketOutlined />,
      href: '/work-logs',
    },
    {
      id: '10',
      title: '反馈层',
      question: '发生什么，怎样调整？',
      content: '日记、周复盘、月度与周年复盘',
      cadence: '日到年',
      icon: <SyncOutlined />,
      href: '/daily-reviews',
    },
  ];

  const dailyActions = [
    { icon: <CalendarOutlined />, label: '看日历', desc: '今天必须发生什么', href: '/time' },
    { icon: <CheckCircleOutlined />, label: '选一步', desc: '今天最重要的下一步', href: '/work-logs' },
    { icon: <SmileOutlined />, label: '写发现', desc: '快乐、痛苦或一个调整', href: '/daily-reviews' },
  ];

  const reviewCycles = [
    { title: '每日', focus: '执行和留下少量证据', action: '只写一句发现', href: '/daily-reviews' },
    { title: '每周', focus: '发现规律、调整项目和计划', action: '发生 - 发现 - 调整', href: '/work-logs' },
    { title: '每月', focus: '查看五种自由趋势', action: '只改变一个结构', href: '/daily-reviews' },
    { title: '季度', focus: '检查目标、项目与作品', action: '保留一个主项目', href: '/work-logs' },
    { title: '生日/年度', focus: '回顾身份、关系和人生章节', action: '命名下一岁', href: '/mind' },
  ];

  const operatingPrinciples = [
    {
      title: 'Consistency',
      detail: '稳定推进，建立节律与习惯，避免每次都从零开始。',
      badge: '日常推进',
    },
    {
      title: 'Resilience',
      detail: '受挫后能恢复、重启和调整，让中断不会变成崩溃。',
      badge: '恢复能力',
    },
    {
      title: 'Adaptive Consistency',
      detail: '方向不变，方法可变；状态差时也能保持最低行动。',
      badge: '弹性一致',
    },
  ];

  const consistencyLevels = [
    {
      title: 'Forced',
      label: '刚性一致',
      detail: '靠压力维持，适合短期冲刺；一旦中断，容易把一次失误解释成失败。',
      action: '把“必须完成”改成标准版、最低版、恢复版。',
    },
    {
      title: 'Trained',
      label: '训练一致',
      detail: '用日历、清单、习惯和复盘形成节律，让行动不必每天重新谈判。',
      action: '固定时间块，只追踪少量关键证据。',
    },
    {
      title: 'Natural',
      label: '自然一致',
      detail: '方向、身份和环境已经彼此支持，行动开始像生活方式而不是硬撑。',
      action: '保留快乐和平静来源，让系统长期愿意运行。',
    },
  ];

  const resilienceLevels = [
    {
      title: 'Stability',
      label: '稳定性',
      detail: '压力出现时守住基本功能，让身体、情绪和行动保持可调度。',
      action: '先照顾睡眠、呼吸、饮食和最低行动。',
    },
    {
      title: 'Adaptability',
      label: '适应性',
      detail: '环境变化时调整方法、强度与节奏，让方向继续成立。',
      action: '为计划保留标准版、最低版和恢复版。',
    },
    {
      title: 'Transformability',
      label: '转化性',
      detail: '从扰动中更新结构，把挫折转化成新的边界、能力和选择。',
      action: '复盘扰动来源，重组支持、环境和下一步。',
    },
  ];

  const minimumLoop = [
    { title: '看日历', detail: '确认今天必须发生什么' },
    { title: '选一步', detail: '只选一个最重要下一步' },
    { title: '写发现', detail: '记录快乐、痛苦或一次调整' },
  ];

  const reviewTemplates = [
    {
      title: '早晨 3 分钟',
      items: ['今天最重要的一件事', '可能出现的干扰', '状态不好时的最低版本'],
      href: '/time',
    },
    {
      title: '挫折 90 秒',
      items: ['描述事实', '命名反应', '划分控制范围', '选择最小下一步'],
      href: '/daily-reviews',
    },
    {
      title: '晚上 5 分钟',
      items: ['今天什么扰动了我', '什么帮助我恢复', '下次怎样更低成本恢复'],
      href: '/daily-reviews',
    },
    {
      title: '周末 B5 双页',
      items: ['事实证据', '五种自由扫描', '发生-发现-调整', '下周修复与积累'],
      href: '/work-logs',
    },
  ];

  return (
    <div className="execution-system">
      <section className="system-hero">
        <div>
          <p className="page-kicker"><ExperimentOutlined /> Node A</p>
          <h2>驱动力：自主、快乐、平静</h2>
          <p className="page-intro">
            先看见自己用什么方式推动行动：自主提供选择，快乐提供吸引力，平静提供恢复空间。核心理念是动态平衡：当系统偏向控制、消耗或停滞时，用 adaptive counterbalance 找到相反但适配的调节力。
          </p>
        </div>
        <div className="hero-actions" aria-label="今日最小运行">
          {dailyActions.map((item) => (
            <Link key={item.label} href={item.href} className="daily-action">
              <span>{item.icon}</span>
              <strong>{item.label}</strong>
              <small>{item.desc}</small>
            </Link>
          ))}
        </div>
      </section>

      <section className="operating-principles" aria-label="运行原则">
        <article className="principle-card">
          <span className="principle-badge">Philosophy</span>
          <h3>Dynamic Balance</h3>
          <p>每个层级都不是越多越好，而是在失衡时用适配的反向力量校准：推进需要恢复，目标需要自由，结构需要弹性。</p>
        </article>
        {operatingPrinciples.map((item) => (
          <article key={item.title} className="principle-card">
            <span className="principle-badge">{item.badge}</span>
            <h3>{item.title}</h3>
            <p>{item.detail}</p>
          </article>
        ))}
      </section>

      <section className="training-section" aria-label="持续稳定与韧性训练">
        <div>
          <p className="page-kicker"><LineChartOutlined /> Consistency x Resilience</p>
          <h2>平时稳定推进，中断之后设计返回路径</h2>
          <p className="page-intro">
            真正的持续不是从不掉线，而是方向稳定、方法弹性、恢复路径预先存在。每天记录最低行动，每周复盘恢复成本。
          </p>
        </div>
        <div className="training-columns">
          <div className="training-column">
            <h3>3 Levels of Consistency</h3>
            {consistencyLevels.map((level) => (
              <article key={level.title} className="training-card">
                <span>{level.title}</span>
                <strong>{level.label}</strong>
                <p>{level.detail}</p>
                <small>{level.action}</small>
              </article>
            ))}
          </div>
          <div className="training-column">
            <h3>3 Pillars of Resilience</h3>
            {resilienceLevels.map((level) => (
              <article key={level.title} className="training-card">
                <span>{level.title}</span>
                <strong>{level.label}</strong>
                <p>{level.detail}</p>
                <small>{level.action}</small>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="system-flow" aria-label="系统链路">
        <span>驱动力</span>
        <span>价值与自由</span>
        <span>目标与责任领域</span>
        <span>项目与看板</span>
        <span>清单、日历、状态</span>
        <span>内容应用与作品</span>
        <span>复盘与个人规律</span>
      </section>

      <section className="loop-section" aria-label="最小执行循环">
        <div>
          <p className="page-kicker"><CheckCircleOutlined /> 最小执行循环</p>
          <h2>每天只做三件事</h2>
          <p className="page-intro">不需要一次性处理全部层级，先把今天的执行入口跑通，再把复盘和调整留给周末。</p>
        </div>
        <div className="loop-grid">
          {minimumLoop.map((item) => (
            <div key={item.title} className="loop-card">
              <strong>{item.title}</strong>
              <span>{item.detail}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="review-template-section" aria-label="复盘脚本">
        <div>
          <p className="page-kicker"><SyncOutlined /> Review Scripts</p>
          <h2>把文档变成每天可写的脚本</h2>
          <p className="page-intro">从早晨预设弹性，到挫折后的快速重启，再到晚上和周末复盘，系统只要求你记录下一次更自主的选择。</p>
        </div>
        <div className="review-template-grid">
          {reviewTemplates.map((template) => (
            <Link key={template.title} href={template.href} className="review-template-card">
              <strong>{template.title}</strong>
              <ul>
                {template.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </Link>
          ))}
        </div>
      </section>

      <section className="layer-grid" aria-label="层级总览">
        {layers.map((layer) => (
          <Link key={layer.id} href={layer.href} className="layer-card">
            <span className="layer-index">{layer.id}</span>
            <span className="layer-icon">{layer.icon}</span>
            <div>
              <h3>{layer.title}</h3>
              <p>{layer.question}</p>
            </div>
            <strong>{layer.content}</strong>
            <small>{layer.cadence}</small>
          </Link>
        ))}
      </section>

      <section className="cycle-section">
        <div>
          <h2><ClockCircleOutlined /> 运行周期</h2>
          <p className="page-intro">日常只运行最底层三个界面；周、月、季度和年度负责把行动重新校准到更高层。</p>
        </div>
        <div className="cycle-grid">
          {reviewCycles.map((cycle) => (
            <Link key={cycle.title} href={cycle.href} className="cycle-card">
              <strong>{cycle.title}</strong>
              <span>{cycle.focus}</span>
              <small>{cycle.action}</small>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
