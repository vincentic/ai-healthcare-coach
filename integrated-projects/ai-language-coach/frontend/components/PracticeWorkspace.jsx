'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { getCatalogStats, getScenarioCatalog } from '@/data/practiceCatalog'
import { createFallbackPracticeSession } from '@/data/practiceSessions'
import '@/components/speaking/ShadowReadingSteps.css'

const LANGUAGES = [
  { code: 'de', name: 'Deutsch', flag: 'DE' },
  { code: 'ja', name: '日本語', flag: 'JA' },
  { code: 'fr', name: 'Français', flag: 'FR' },
  { code: 'ko', name: '한국어', flag: 'KO' },
  { code: 'ru', name: 'Русский', flag: 'RU' },
  { code: 'es', name: 'Español', flag: 'ES' },
  { code: 'en', name: 'English', flag: 'EN' },
]

const SCENARIOS = [
  { key: 'greetings', label: '问候 / Greetings' },
  { key: 'restaurant', label: '餐厅 / Restaurant' },
  { key: 'shopping', label: '购物 / Shopping' },
  { key: 'directions', label: '问路 / Directions' },
  { key: 'travel', label: '旅行 / Travel' },
  { key: 'daily', label: '日常 / Daily Life' },
]

const REMOVED_SAVED_PHRASES = new Set([
  'de|greetings|schön, sie heute kennenzulernen.',
  'de|greetings|guten morgen, ich heiße kollege.',
  'de|greetings|guten morgen, ich heiße berlin.',
  'de|greetings|guten morgen, ich heiße anna.',
])

function getSavedPhraseKey(item) {
  return [
    item?.language || '',
    item?.scenario || '',
    item?.phrase || '',
  ].join('|').trim().toLowerCase()
}

function cleanSavedPhrases(items) {
  if (!Array.isArray(items)) return []
  return items.filter((item) => !REMOVED_SAVED_PHRASES.has(getSavedPhraseKey(item)))
}

function tokenizeGlossText(text) {
  if (!text) return []
  const cleaned = text.replace(/[.,!?。？、¿¡]/g, ' ').trim()
  if (!cleaned) return []

  if (/\s/.test(cleaned)) {
    return cleaned.split(/\s+/).filter(Boolean)
  }

  if (typeof Intl !== 'undefined' && Intl.Segmenter) {
    return Array.from(new Intl.Segmenter(undefined, { granularity: 'word' }).segment(cleaned))
      .filter((part) => part.isWordLike)
      .map((part) => part.segment)
  }

  return Array.from(cleaned)
}

function splitTemplateParts(template = '', slotValue = '') {
  if (!template.includes('{slot}')) return [template]
  const [before = '', after = ''] = template.split('{slot}')
  return [before, slotValue, after]
}

function buildWordGlossPairs(sentence = '', translation = '', item = null) {
  if (item?.phrase?.includes('{slot}')) {
    const sourceParts = splitTemplateParts(item.phrase, item.word)
    const englishParts = splitTemplateParts(item.englishPhrase || item.englishTranslation || item.translation, item.englishWord || item.word)
    const pairs = sourceParts.flatMap((part, partIndex) => {
      const sourceTokens = tokenizeGlossText(part)
      const englishTokens = tokenizeGlossText(englishParts[partIndex] || '')
      if (!sourceTokens.length) return []

      return sourceTokens.map((source, index) => {
        const start = Math.floor((index * englishTokens.length) / sourceTokens.length)
        const end = Math.max(start + 1, Math.floor(((index + 1) * englishTokens.length) / sourceTokens.length))
        return {
          source,
          english: englishTokens.slice(start, end).join(' ') || source,
        }
      })
    })

    if (pairs.length) return pairs
  }

  const sourceTokens = tokenizeGlossText(sentence)
  const englishTokens = tokenizeGlossText(translation)
  if (!sourceTokens.length) return []

  return sourceTokens.map((source, index) => {
    const start = Math.floor((index * englishTokens.length) / sourceTokens.length)
    const end = Math.max(start + 1, Math.floor(((index + 1) * englishTokens.length) / sourceTokens.length))
    return {
      source,
      english: englishTokens.slice(start, end).join(' ') || translation || '...',
    }
  })
}

const MENTORING_MODULES = [
  {
    key: 'diagnosis',
    label: '目标诊断',
    enLabel: 'Goal Diagnosis',
    title: '目标诊断与学习路径',
    englishTitle: 'Goal Diagnosis and Learning Path',
    subtitle: '把宽泛学习愿望拆成 7/30/90 天可执行路径。',
    englishSubtitle: 'Turn a broad language goal into executable 7/30/90-day plans.',
    status: 'MVP 可落地',
    primaryAction: '生成学习路径',
    secondaryAction: '调整目标',
    previewTitle: '今日路径',
    preview: ['10 分钟问候场景输入', '15 分钟 Shadow Reading', '5 分钟个人句子输出'],
    metrics: ['目标清晰度 92%', '每日预算 20 分钟', '下次复盘 周日'],
    build: ['问卷/对话式目标采集', '水平、兴趣、时间预算建模', '每周根据行为自动调参'],
    frontend: ['GoalSetup', 'LearningPathTimeline', 'WeeklyFocusCard'],
    backend: ['learning_plan', 'profile', 'progress'],
  },
  {
    key: 'phrases',
    label: '短语库',
    enLabel: 'Phrase Library',
    title: '高频词与实用短语库',
    englishTitle: 'High-Frequency Words and Practical Phrase Library',
    subtitle: '优先组织能马上使用的表达，并支持标准语、变体和方言对照。',
    englishSubtitle: 'Prioritize expressions that can be used immediately across languages and variants.',
    status: '内容核心',
    primaryAction: '添加个人短语',
    secondaryAction: '比较变体',
    previewTitle: '样例短语',
    preview: ['唔该，俾个餐牌我睇下。', 'Standard: 麻烦给我看一下菜单。', 'Register: polite-casual'],
    metrics: ['短语 248 条', '场景 12 个', '待复习 18 条'],
    build: ['语言/变体/场景/等级索引', '例句、音频、用法提醒、搭配', '个人职业、兴趣、地点短语'],
    frontend: ['PhraseLibrary', 'PhraseDetail', 'VariantCompare'],
    backend: ['content', 'phrase_bank', 'taxonomy'],
  },
  {
    key: 'i1',
    label: 'i+1 选择',
    enLabel: 'i+1 Selector',
    title: 'i+1 内容选择器',
    englishTitle: 'i+1 Content Selector',
    subtitle: '让下一句刚好有点难，每次只引入少量新词、新句式或新音变。',
    englishSubtitle: 'Keep the next item just above the learner current level.',
    status: '自适应引擎',
    primaryAction: '获取下一句',
    secondaryAction: '查看难度',
    previewTitle: '下一条挑战',
    preview: ['New item: classifier 个', 'Review item: polite request', 'Focus: tone stability'],
    metrics: ['Known 76%', 'New items 2', 'Review items 3'],
    build: ['known/new/review items 标记', '词汇、语法、发音难度控制', '方言音系差异渐进引入'],
    frontend: ['DifficultyBadge', 'NextChallengePanel', 'KnownNewReviewList'],
    backend: ['i1_selector', 'spaced_repetition', 'content'],
  },
  {
    key: 'shadow',
    label: '跟读练习',
    enLabel: 'Shadow Practice',
    title: 'Shadow Reading 四步练习',
    englishTitle: 'Four-Step Shadow Reading Practice',
    subtitle: '保留 Listen、Shadow、Repeat、Apply 的核心学习循环。',
    englishSubtitle: 'Practice through Listen, Shadow, Repeat, and Apply.',
    status: '已接入',
    primaryAction: '开始四步练习',
    secondaryAction: '保存输出句',
    previewTitle: '练习流程',
    preview: ['Listen: 听 3 遍', 'Shadow: 同步跟读', 'Apply: 替换关键词造句'],
    metrics: ['完成率 68%', '听音 3/3', '保存句 42'],
    build: ['三遍听音与节奏感知', '同步跟读与录音', '替换关键词生成个人句子'],
    frontend: ['ShadowReadingSteps', 'AudioControls', 'ApplySentenceBox'],
    backend: ['practice_sessions', 'feedback', 'phrase_bank'],
  },
  {
    key: 'pronunciation',
    label: '发音教练',
    enLabel: 'Pronunciation Coach',
    title: '发音与声调教练',
    englishTitle: 'Pronunciation and Tone Coach',
    subtitle: '针对目标音、声调、重音、连读和母语迁移给出训练提示。',
    englishSubtitle: 'Train target sounds, tones, stress, linking, and native-language transfer.',
    status: '训练模块',
    primaryAction: '练习目标音',
    secondaryAction: '查看迁移提醒',
    previewTitle: '今日发音重点',
    preview: ['Cantonese: goi1 高平声', 'English: weak form of to', 'Japanese: pitch accent contrast'],
    metrics: ['目标音 6 个', '易错音 3 个', '准确度 81%'],
    build: ['最小对立组训练', '母语迁移提醒', '声调、入声、弱读、连读提示'],
    frontend: ['PronunciationCoach', 'ToneHintStrip', 'MinimalPairDrill'],
    backend: ['feedback', 'phonology_rules', 'speech_scoring'],
  },
  {
    key: 'output',
    label: '输出角色扮演',
    enLabel: 'Role Play',
    title: '主动输出与角色扮演',
    englishTitle: 'Active Output and Role Play',
    subtitle: '把输入材料转成可用表达，先模板再自由发挥。',
    englishSubtitle: 'Convert input into usable language through guided role play.',
    status: '输出核心',
    primaryAction: '开始角色扮演',
    secondaryAction: '生成自然表达',
    previewTitle: '角色场景',
    preview: ['你：游客，需要点餐', 'AI：餐厅服务员', '反馈：先沟通，再优化自然度'],
    metrics: ['对话 12 轮', '自然度 78%', '礼貌度 90%'],
    build: ['场景角色生成', '沟通优先的纠错反馈', '自然、礼貌、本地版本改写'],
    frontend: ['RolePlayChat', 'OutputPrompt', 'CorrectionPanel'],
    backend: ['feedback', 'conversation', 'learning_plan'],
  },
  {
    key: 'srs',
    label: '复习银行',
    enLabel: 'SRS Bank',
    title: 'SRS 间隔复习与个人短语银行',
    englishTitle: 'SRS Review and Personal Phrase Bank',
    subtitle: '把学过、说错、改写过的句子沉淀为长期记忆。',
    englishSubtitle: 'Turn learned, corrected, and personalized sentences into long-term memory.',
    status: '记忆系统',
    primaryAction: '开始今日复习',
    secondaryAction: '查看短语银行',
    previewTitle: '今日复习',
    preview: ['看中文说目标语 8 条', '听音选义 6 条', '录音复述 3 条'],
    metrics: ['到期 17 条', '掌握 64%', '困难 5 条'],
    build: ['Apply 句子自动保存', '根据难度安排下次复习', '听义、造句、录音复述题型'],
    frontend: ['PhraseBank', 'ReviewQueue', 'RecallCard'],
    backend: ['phrase_bank', 'spaced_repetition', 'practice_sessions'],
  },
  {
    key: 'import',
    label: '素材导入',
    enLabel: 'Content Import',
    title: '沉浸内容与素材导入',
    englishTitle: 'Immersive Content Import',
    subtitle: '把字幕、播客转写、短视频台词和文章变成可学习材料。',
    englishSubtitle: 'Turn real-world content into learnable input.',
    status: '内容入口',
    primaryAction: '导入素材',
    secondaryAction: '生成分级文本',
    previewTitle: '导入结果',
    preview: ['未知词 14 个', '高频短语 9 条', '可生成 5 句 i+1 练习'],
    metrics: ['素材 23 个', '抽取短语 186', '字幕对齐 91%'],
    build: ['文本/字幕/转写导入', '高频词和未知词抽取', '原文、简化版、逐句讲解版'],
    frontend: ['ContentImporter', 'TranscriptAligner', 'GradedReader'],
    backend: ['content_import', 'content', 'i1_selector'],
  },
  {
    key: 'progress',
    label: '进度复盘',
    enLabel: 'Weekly Review',
    title: '进度追踪与周复盘',
    englishTitle: 'Progress Tracking and Weekly Review',
    subtitle: '展示输入、输出、复习、发音和场景覆盖的真实变化。',
    englishSubtitle: 'Show meaningful learning progress beyond daily check-ins.',
    status: '复盘仪表盘',
    primaryAction: '生成周复盘',
    secondaryAction: '调整下周重点',
    previewTitle: '本周摘要',
    preview: ['餐厅场景覆盖 80%', '发音重点：声调稳定', '下周进入问路场景'],
    metrics: ['输入 86 句', '输出 34 句', '复习完成 72%'],
    build: ['输入/输出/复习统计', '本周掌握和薄弱表达', '按目标展示场景覆盖度'],
    frontend: ['WeeklyReview', 'ProgressDashboard', 'ScenarioCoverage'],
    backend: ['progress', 'practice_sessions', 'phrase_bank'],
  },
  {
    key: 'data',
    label: '资料管理',
    enLabel: 'Data Admin',
    title: '语言与方言资料管理',
    englishTitle: 'Language and Dialect Data Management',
    subtitle: '维护语言、变体、地区、场景、表达和使用限制。',
    englishSubtitle: 'Manage languages, variants, regions, scenarios, expressions, and usage constraints.',
    status: '管理后台',
    primaryAction: '新增表达',
    secondaryAction: '维护变体层级',
    previewTitle: '数据层级',
    preview: ['zh -> yue-Cantonese-Guangzhou', 'restaurant -> polite request', 'region: Guangzhou/Hong Kong common'],
    metrics: ['语言 8 个', '变体 18 个', '表达 620 条'],
    build: ['language -> variant -> region 层级', '多自然表达而非唯一答案', '正式度、年龄层、地区、禁忌标注'],
    frontend: ['ContentAdmin', 'VariantTaxonomy', 'ExpressionEditor'],
    backend: ['content', 'taxonomy', 'admin'],
  },
]

const PRACTICE_METHODS = [
  {
    key: 'narrow-goal',
    title: '目标极窄化',
    moduleKey: 'diagnosis',
    moduleLabel: '目标诊断',
    principle: '先把“学会一门语言”改写成 7/30/90 天能完成的真实场景任务。',
    routine: ['写出目标语言、场景和截止日期', '只保留当前目标需要的词、句式和发音点', '每周根据完成记录调整下一阶段'],
    evidence: '目标越窄，输入材料、输出任务和复习队列越容易形成闭环。',
  },
  {
    key: 'frequency-phrases',
    title: '高频词 + 实用短语',
    moduleKey: 'phrases',
    moduleLabel: '短语库',
    principle: '优先学习日常覆盖率最高、马上能说出口的表达，而不是按课本顺序平均用力。',
    routine: ['先抓前 500-1000 高频词和高频句式', '按问候、点餐、问路等场景整理', '把职业、兴趣、常去地点写进个人词库'],
    evidence: '前 1000-3000 高频词搭配常用短语，能覆盖大量日常理解和表达。',
  },
  {
    key: 'i1-input',
    title: 'i+1 可理解输入',
    moduleKey: 'i1',
    moduleLabel: 'i+1 选择',
    principle: '下一句要刚好有点难：大部分能懂，只多引入少量新词、新句式或新音变。',
    routine: ['标记已会、待复习和新内容', '每次只推进一个主要难点', '太简单就加长句，太难就回到例句和替换'],
    evidence: '稳定的轻微挑战比忽难忽易更适合持续积累语感。',
  },
  {
    key: 'shadowing',
    title: 'Shadow Reading 四步跟读',
    moduleKey: 'shadow',
    moduleLabel: '跟读练习',
    principle: '通过 Listen、Shadow、Repeat、Apply 同时训练听力、发音、节奏和可用输出。',
    routine: ['听 3 遍理解语义和节奏', '同步模仿语调、停顿和情绪', '替换关键词造自己的句子'],
    evidence: '短音频反复跟读，是把“听得懂”变成“说得出”的高效率桥梁。',
  },
  {
    key: 'pronunciation',
    title: '发音、声调和节奏',
    moduleKey: 'pronunciation',
    moduleLabel: '发音教练',
    principle: '早期集中校准目标音、声调、重音、连读和母语迁移，避免错误自动化。',
    routine: ['用最小对立组区分易混音', '录音回放对比母语者节奏', '把发音点放回完整句子练'],
    evidence: '发音不是装饰项，它直接影响听力辨音和口语自信。',
  },
  {
    key: 'active-output',
    title: '主动输出和角色扮演',
    moduleKey: 'output',
    moduleLabel: '输出角色扮演',
    principle: '输入打底，输出让语言变活；先用模板保证说清楚，再逐步追求自然。',
    routine: ['每天造 10-20 个和自己有关的句子', '用餐厅、购物、问路等角色场景对话', '让反馈先修正沟通，再优化地道度'],
    evidence: '没有输出，很多知识会停留在“认得出但调不出来”的状态。',
  },
  {
    key: 'srs-bank',
    title: 'SRS 间隔复习',
    moduleKey: 'srs',
    moduleLabel: '复习银行',
    principle: '把学过、说错、改写过的句子沉淀为个人短语银行，用间隔重复保温。',
    routine: ['保存 Apply 阶段的个人句子', '看中文说目标语、听音选义、看场景造句', '困难表达更早回来，熟练表达延后出现'],
    evidence: '少量多次的复习，通常比一次长时间硬背更稳。',
  },
  {
    key: 'immersion',
    title: '沉浸式输入和素材导入',
    moduleKey: 'import',
    moduleLabel: '素材导入',
    principle: '把手机、视频、播客、字幕、文章变成目标语环境，让学习材料来自真实生活。',
    routine: ['设备界面切成目标语', '导入字幕或短文抽取高频表达', '先理解大意，再挑少量高价值句子练'],
    evidence: '兴趣内容能提高接触频率，也能让表达更贴近真实使用场景。',
  },
  {
    key: 'feedback-review',
    title: '即时反馈和周复盘',
    moduleKey: 'progress',
    moduleLabel: '进度复盘',
    principle: '输出后立刻获得反馈，每周看输入量、输出量、复习完成率和场景覆盖。',
    routine: ['记录今天听了什么、说了什么、卡在哪里', '每周选 1-2 个薄弱场景回炉', '用可交付目标衡量进步'],
    evidence: '反馈让错误不固化，复盘让努力不只停留在打卡。',
  },
  {
    key: 'dialect-data',
    title: '语言变体和方言资料',
    moduleKey: 'data',
    moduleLabel: '资料管理',
    principle: '方言和变体不是标准语替换词，需要单独记录音系、表达、场景和使用限制。',
    routine: ['保留标准语、变体、地区和正式度', '同一意思允许多个自然表达', '标注适用人群、地区和禁忌提醒'],
    evidence: '好的资料结构能避免学到“能翻译但不自然”的表达。',
  },
]

const WORKSPACE_TABS = [
  {
    key: 'methods',
    label: '方法论',
    kicker: 'Framework',
    index: '01',
  },
  {
    key: 'practice',
    label: '训练台',
    kicker: 'Practice Lab',
    index: '02',
  },
  {
    key: 'resources',
    label: '资料库',
    kicker: 'Resources',
    index: '03',
  },
  {
    key: 'reference',
    label: '参考指南',
    kicker: 'Guides & Notes',
    index: '04',
  },
]

const ACQUISITION_FLOW = ['世界', '声音', '画面', '动作', '情绪', '情境', '意义', '输出']

const UNDERSTANDING_LEVELS = [
  { level: 'Level 1', title: '翻译模式', route: '声音 -> 文字 -> 中文 -> 意义', note: '适合查漏补缺，但听力会被拖慢。' },
  { level: 'Level 2', title: '直接语义', route: '声音 -> 意义', note: '听到就懂，不再逐词翻译。' },
  { level: 'Level 3', title: '情境理解', route: '声音 -> 画面 -> 意义', note: '推荐训练目标，用画面和动作承接声音。' },
  { level: 'Level 4', title: '世界模型', route: '声音 + 画面 + 人物 + 空间 + 情绪 -> Situation Model', note: '接近母语理解，语言直接触发现实判断。' },
]

const SUBTITLE_TRAINING_STAGES = [
  { title: '第一遍：无字幕', detail: '只回答谁、哪里、做什么、为什么，不暂停。' },
  { title: '第二遍：精听', detail: '关注高频词、连读、重音、节奏和语块。' },
  { title: '第三遍：查词', detail: '最多查 5 个真正影响理解的词。' },
  { title: '第四遍：再次无字幕', detail: '验证 Audio -> Meaning 是否开始自动化。' },
]

const LANGUAGE_FOCUS = [
  { language: '英语', focus: '连读、弱读', training: '语块和节奏' },
  { language: '粤语', focus: '声调、口语词', training: '听辨和 Shadowing' },
  { language: '德语', focus: '长句、句尾动词', training: '工作记忆和预测' },
  { language: '法语', focus: '连音', training: '音变感知' },
  { language: '西班牙语', focus: '语速', training: '高频输入' },
  { language: '日语', focus: '省略、敬语', training: '情境判断' },
  { language: '俄语', focus: '格变化', training: '自动化输出' },
  { language: '阿拉伯语', focus: '方言差异', training: '输入来源控制' },
]

const SCENE_SERIES_RECOMMENDATIONS = [
  {
    key: 'cantonese-beginner',
    language: '粤语',
    level: '初级',
    target: '生活高频 500：先建立声音系统和真实口语反应',
    seriesTitle: '港式生活生存剧集',
    bestFor: '普通话学习者，先减少对汉字的依赖，用画面、人物动作和语气理解粤语。',
    recommendedShows: [
      { title: '爱回家之开心速递', type: '处境剧', fit: '家庭、办公室、邻里、朋友寒暄，高频口语密度高。' },
      { title: '男亲女爱', type: '处境喜剧', fit: '办公室轻社交、吐槽、约时间和关系语气。' },
      { title: '同事三分亲', type: '处境剧', fit: '职场寒暄、同事请求、误会和电话确认。' },
      { title: '香港爱情故事', type: '生活剧', fit: '租房、家庭、情侣沟通和城市生活表达。' },
      { title: '餐餐有宋家', type: '家庭处境剧', fit: '家庭饭桌、称呼、日常请求和情绪表达。' },
      { title: '香港电台生活短剧', type: '短剧/节目', fit: '社会服务、看医生、邻里和真实语速输入。' },
    ],
    scenes: ['茶餐厅点餐', '便利店结账', '街市买菜', '地铁问路', '家庭寒暄', '朋友约时间', '看医生', '租房维修', '办公室轻社交', '电话确认'],
    dramaScenes: [
      { scene: '茶餐厅点餐', title: '早晨赶返工', plot: '主角赶时间，店员听错冻奶茶和热奶茶。', focus: ['点单', '改口', '催促'] },
      { scene: '便利店结账', title: '八达通唔够钱', plot: '排队结账时余额不足，需要改用现金并道歉。', focus: ['付款', '道歉', '确认金额'] },
      { scene: '街市买菜', title: '今日咩菜新鲜', plot: '摊主推荐青菜，主角问价、讲数量、请求便宜一点。', focus: ['问价', '数量', '讨价还价'] },
      { scene: '地铁问路', title: '转错线', plot: '主角坐错方向，向站务员确认出口和换乘。', focus: ['方向', '出口', '重复确认'] },
      { scene: '家庭寒暄', title: '返屋企食饭', plot: '家人问近况，主角回应工作、天气和饭菜。', focus: ['近况', '感受', '夸赞'] },
      { scene: '朋友约时间', title: '一阵得唔得', plot: '朋友临时改约，双方协调时间和地点。', focus: ['约定', '改时间', '拒绝'] },
      { scene: '看医生', title: '喉咙痛两日', plot: '主角描述症状、持续时间和用药情况。', focus: ['症状', '时间', '医嘱'] },
      { scene: '租房维修', title: '冷气漏水', plot: '租客打电话给房东，约师傅上门。', focus: ['报修', '预约', '描述问题'] },
      { scene: '办公室轻社交', title: '新同事第一日', plot: '新同事入职，互相介绍并约午饭。', focus: ['介绍', '寒暄', '邀请'] },
      { scene: '电话确认', title: '外卖送错地址', plot: '电话里确认地址、楼层和订单。', focus: ['电话开场', '地址', '纠错'] },
    ],
    episodePlan: ['1-2 集：招呼、称呼、感谢、请求', '3-5 集：点餐、购物、问价、找零', '6-8 集：交通、时间、地点、方向', '9-10 集：家庭、朋友、情绪和拒绝'],
    method: ['第一遍无字幕抓人物和动作', '第二遍听声调和句尾语气', '第三遍只查 5 个影响理解的口语词', '第四遍 Shadow 10 句高频表达'],
    examples: ['唔该', '几多钱', '去边度', '得唔得', '而家', '一阵', '冇问题', '慢慢讲'],
  },
  {
    key: 'english-b1',
    language: '英语',
    level: 'B1',
    target: '生活高频 500：从会说句子推进到自然互动',
    seriesTitle: 'Everyday English Situation Series',
    bestFor: '已经能表达基本意思，但需要补语块、弱读、连读和自然回应。',
    recommendedShows: [
      { title: 'Extra English', type: '学习情景剧', fit: 'B1 友好，生活场景清楚，适合无字幕四遍训练。' },
      { title: 'Friends', type: '情景喜剧', fit: '咖啡店、朋友寒暄、约时间、表达意见和玩笑语气。' },
      { title: 'The Big Bang Theory', type: '情景喜剧', fit: '室友、朋友计划、解释观点；语速偏快，适合 B1+。' },
      { title: 'Modern Family', type: '家庭喜剧', fit: '家庭寒暄、亲子沟通、误会和让步表达。' },
      { title: 'How I Met Your Mother', type: '情景喜剧', fit: '朋友聚会、约会、故事叙述和观点表达。' },
      { title: 'English Conversation sitcom clips', type: '短片合集', fit: '电话预约、退换货、银行、酒店等服务场景。' },
    ],
    scenes: ['咖啡店闲聊', '超市退换货', '电话预约', '同事 small talk', '邮件后续', '健身房咨询', '看病描述症状', '银行账户', '旅行入住', '表达意见和让步'],
    dramaScenes: [
      { scene: '咖啡店闲聊', title: 'The Usual Order', plot: '熟客和店员聊周末计划，并临时换饮品。', focus: ['small talk', 'ordering', 'preference'] },
      { scene: '超市退换货', title: 'The Wrong Size', plot: '主角拿着小票说明尺寸不合，希望换货。', focus: ['return', 'receipt', 'policy'] },
      { scene: '电话预约', title: 'Can We Move It?', plot: '主角打电话改牙医预约，确认新时间。', focus: ['booking', 'rescheduling', 'confirmation'] },
      { scene: '同事 small talk', title: 'Monday Elevator Talk', plot: '电梯里遇到同事，聊天气、周末和今天安排。', focus: ['greeting', 'weekend', 'workday'] },
      { scene: '邮件后续', title: 'Just Following Up', plot: '项目没回复，主角礼貌跟进并提出截止时间。', focus: ['follow-up', 'deadline', 'polite request'] },
      { scene: '健身房咨询', title: 'First Trial Class', plot: '主角询问会员价格、课程时间和取消规则。', focus: ['membership', 'schedule', 'questions'] },
      { scene: '看病描述症状', title: 'It Started Yesterday', plot: '主角描述头痛、发烧和过敏史。', focus: ['symptoms', 'duration', 'medical history'] },
      { scene: '银行账户', title: 'A Card Problem', plot: '银行卡被拒，主角向柜员解释并重设密码。', focus: ['account', 'problem', 'verification'] },
      { scene: '旅行入住', title: 'Early Check-in', plot: '主角提前到酒店，询问房间和行李寄存。', focus: ['check-in', 'luggage', 'request'] },
      { scene: '表达意见和让步', title: 'I See Your Point', plot: '朋友讨论旅行计划，主角不同意但提出折中方案。', focus: ['opinion', 'agreement', 'compromise'] },
    ],
    episodePlan: ['1-2 集：请求、确认、澄清', '3-4 集：安排时间、改约、道歉', '5-7 集：服务场景和问题解决', '8-10 集：观点表达、建议、轻度争论'],
    method: ['第一遍无字幕抓关系和目的', '第二遍标出 chunks 而不是单词', '第三遍查 5 个高频短语动词或搭配', '第四遍复述场景并替换个人信息'],
    examples: ['I was wondering if...', 'Could you help me with...', 'That works for me', 'Let me check', 'I am not sure about that', 'It depends', 'Can we reschedule?'],
  },
  {
    key: 'german-a1',
    language: '德语',
    level: 'A1',
    target: '生活高频 500：用简单句建立词序、格和句尾预测',
    seriesTitle: 'Deutsch A1 Alltag Mini-Serie',
    bestFor: '刚开始德语，需要用重复场景熟悉动词位置、名词性别和常见生活句。',
    recommendedShows: [
      { title: 'Nicos Weg A1', type: 'DW 学习剧', fit: 'A1 首选，覆盖自我介绍、问路、购物、预约和日常关系。' },
      { title: 'Extra auf Deutsch', type: '学习情景剧', fit: '慢速生活喜剧，适合 A1-A2 做 Shadowing。' },
      { title: 'Deutsch lernen mit der DW', type: '学习视频', fit: '可按主题补发音、词汇和基础句式。' },
      { title: 'Easy German Super Easy German', type: '街访/短片', fit: '真实街头输入，适合反复听高频问答。' },
      { title: 'Mein Weg nach Deutschland', type: 'Goethe 学习短剧', fit: '办事、租房、工作和公共服务场景。' },
      { title: 'Jojo sucht das Glück', type: '学习剧', fit: 'A2 前后衔接，适合学完 A1 后继续听生活剧情。' },
    ],
    scenes: ['自我介绍', '面包店点单', '超市购物', '问路乘车', '预约医生', '租房看房', '天气计划', '工作日程', '餐厅买单', '邻居寒暄'],
    dramaScenes: [
      { scene: '自我介绍', title: 'Neu in der Stadt', plot: '主角第一天上课，介绍姓名、国家、职业和住处。', focus: ['heißen', 'kommen aus', 'wohnen'] },
      { scene: '面包店点单', title: 'Zwei Brötchen, bitte', plot: '主角买早餐，问价格并选择带走。', focus: ['möchten', 'bitte', 'zahlen'] },
      { scene: '超市购物', title: 'Wo ist die Milch?', plot: '主角找牛奶、鸡蛋和收银台。', focus: ['wo ist', 'brauchen', 'kaufen'] },
      { scene: '问路乘车', title: 'Zum Bahnhof', plot: '主角问车站方向，确认坐哪路车。', focus: ['gehen', 'nehmen', 'rechts links'] },
      { scene: '预约医生', title: 'Ich habe einen Termin', plot: '主角前台报到，说明预约和症状。', focus: ['Termin', 'haben', 'Schmerzen'] },
      { scene: '租房看房', title: 'Die Wohnung ist hell', plot: '主角看房，问租金、房间和入住时间。', focus: ['Miete', 'Zimmer', 'frei'] },
      { scene: '天气计划', title: 'Es regnet heute', plot: '朋友讨论天气，决定改去室内活动。', focus: ['Wetter', 'heute', 'Plan'] },
      { scene: '工作日程', title: 'Um neun Uhr', plot: '主角确认会议时间、地点和任务。', focus: ['Uhrzeit', 'Meeting', 'machen'] },
      { scene: '餐厅买单', title: 'Die Rechnung, bitte', plot: '主角饭后买单，询问刷卡和小票。', focus: ['Rechnung', 'Karte', 'Quittung'] },
      { scene: '邻居寒暄', title: 'Guten Morgen im Treppenhaus', plot: '楼道遇到邻居，打招呼并聊天气。', focus: ['Gruß', 'Wetter', 'kurz sprechen'] },
    ],
    episodePlan: ['1-2 集：sein、haben、heißen 和基础问句', '3-5 集：möchten、brauchen、kaufen、zahlen', '6-8 集：地点、时间、方向和可分动词', '9-10 集：预约、原因、简单从句输入'],
    method: ['第一遍看画面猜动作和目标', '第二遍精听动词位置和名词冠词', '第三遍只查 5 个核心名词或动词', '第四遍用同一框架替换地点、时间、物品'],
    examples: ['Ich hätte gern...', 'Wo ist...', 'Ich brauche...', 'Wie viel kostet...', 'Ich habe einen Termin', 'Können Sie das bitte wiederholen?'],
  },
]

const REFERENCE_TABS = [
  { type: 'doc', key: 'mentoring', label: '功能设计', enLabel: 'Module Design' },
  { type: 'doc', key: 'value', label: '价值飞轮', enLabel: 'Value Flywheel' },
  { type: 'doc', key: 'guide', label: '学习指南', enLabel: 'Learning Guide' },
  { type: 'doc', key: 'origin', label: '价值笔记', enLabel: 'Value Notes' },
]

export default function PracticeWorkspace({ docs }) {
  const [activeTab, setActiveTab] = useState('methods')
  const [activeReference, setActiveReference] = useState('mentoring')
  const [activeResourceModule, setActiveResourceModule] = useState('diagnosis')
  const [theme, setTheme] = useState('light')
  const [language, setLanguage] = useState('de')
  const [scenario, setScenario] = useState('greetings')
  const [sessionData, setSessionData] = useState(null)
  const [stepProgress, setStepProgress] = useState({
    listen: false,
    shadow: false,
    repeat: false,
    apply: false,
  })
  const [error, setError] = useState(null)
  const [i1Context, setI1Context] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [listenCount, setListenCount] = useState(0)
  const [fallbackMode, setFallbackMode] = useState(false)
  const [trainingLog, setTrainingLog] = useState([])

  const docsByKey = useMemo(() => {
    return docs.reduce((index, doc) => {
      index[doc.key] = doc
      return index
    }, {})
  }, [docs])

  useEffect(() => {
    const storedTheme = window.localStorage.getItem('theme')
    setTheme(storedTheme || 'light')
  }, [])

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    window.localStorage.setItem('theme', theme)
  }, [theme])

  useEffect(() => {
    const storedLog = window.localStorage.getItem('languageCoachTrainingLog')
    if (storedLog) {
      try {
        setTrainingLog(JSON.parse(storedLog))
      } catch (err) {
        console.error('Training log parse error:', err)
      }
    }
  }, [])

  const recordTrainingEvent = useCallback((event) => {
    setTrainingLog((current) => {
      const next = [
        {
          id: `event-${Date.now()}-${current.length}`,
          at: new Date().toISOString(),
          language,
          scenario,
          ...event,
        },
        ...current,
      ].slice(0, 200)

      window.localStorage.setItem('languageCoachTrainingLog', JSON.stringify(next))
      return next
    })
  }, [language, scenario])

  const initializeSession = useCallback(async () => {
    try {
      setError(null)
      setSessionData(null)
      const params = new URLSearchParams({
        user_id: '1',
        language: language,
        scenario: scenario,
      })

      const response = await fetch(`/api/shadow/session/start?${params}`, {
        method: 'POST',
      })

      if (!response.ok) throw new Error('Failed to start session')

      const data = await response.json()
      setSessionData(data)
      setI1Context(data.i1_context)
      setStepProgress({ listen: false, shadow: false, repeat: false, apply: false })
      setListenCount(0)
      setFallbackMode(false)
      recordTrainingEvent({
        type: 'session_start',
        label: '开始练习',
        sentence: data.sentence,
      })
    } catch (err) {
      console.error('Error initializing session:', err)
      const fallbackData = createFallbackPracticeSession(language, scenario)
      setSessionData(fallbackData)
      setI1Context(fallbackData.i1_context)
      setStepProgress({ listen: false, shadow: false, repeat: false, apply: false })
      setListenCount(0)
      setFallbackMode(true)
      setError(null)
      recordTrainingEvent({
        type: 'session_start',
        label: '开始静态练习',
        sentence: fallbackData.sentence,
      })
    }
  }, [language, scenario, recordTrainingEvent])

  useEffect(() => {
    initializeSession()
  }, [initializeSession])

  const playAudio = async (sentence = sessionData?.sentence) => {
    if (!sentence) return
    try {
      setIsPlaying(true)
      const utterance = new SpeechSynthesisUtterance(sentence)
      utterance.lang = language
      utterance.rate = 0.8
      speechSynthesis.speak(utterance)
      utterance.onend = () => {
        setIsPlaying(false)
        setListenCount((prev) => {
          const next = prev + 1
          if (next >= 3) {
            setStepProgress((p) => ({ ...p, listen: true }))
          }
          recordTrainingEvent({
            type: 'listen',
            label: '完成一次听音',
            count: next,
            sentence,
          })
          return next
        })
      }
    } catch (err) {
      console.error('Audio error:', err)
      setIsPlaying(false)
    }
  }

  const allCompleted = stepProgress.listen && stepProgress.shadow &&
    stepProgress.repeat && stepProgress.apply

  const openModule = useCallback((moduleKey) => {
    if (moduleKey === 'shadow') {
      setActiveTab('practice')
      return
    }

    setActiveResourceModule(moduleKey)
    setActiveTab('resources')
  }, [])

  return (
    <div className="workspace-shell">
      <aside className="workspace-sidebar" aria-label="Feature navigation">
        <div className="brand-block">
          <p className="brand-eyebrow">Language Mentoring</p>
          <h1>语言导师工作台</h1>
        </div>

        <nav className="workspace-nav">
          {WORKSPACE_TABS.map((tab) => (
            <button
              key={tab.key}
              type="button"
              className={`workspace-tab ${activeTab === tab.key ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.key)}
            >
              <span className="workspace-tab-index">{tab.index}</span>
              <span className="workspace-tab-text">
                <strong>{tab.label}</strong>
                <small>{tab.kicker}</small>
              </span>
            </button>
          ))}
        </nav>

        <button
          type="button"
          className="theme-toggle"
          onClick={() => setTheme((current) => current === 'dark' ? 'light' : 'dark')}
          aria-label="Toggle light and dark theme"
        >
          <span>{theme === 'dark' ? '暗夜黑 / Night' : '象牙白 / Ivory'}</span>
          <strong>{theme === 'dark' ? '切换象牙白' : '切换暗夜黑'}</strong>
        </button>
      </aside>

      <main className="workspace-main">
        {activeTab === 'methods' ? (
          <PracticeMethodsPanel openModule={openModule} />
        ) : activeTab === 'practice' ? (
          <PracticePanel
            language={language}
            setLanguage={setLanguage}
            scenario={scenario}
            setScenario={setScenario}
            sessionData={sessionData}
            stepProgress={stepProgress}
            setStepProgress={setStepProgress}
            error={error}
            i1Context={i1Context}
            isPlaying={isPlaying}
            listenCount={listenCount}
            fallbackMode={fallbackMode}
            initializeSession={initializeSession}
            playAudio={playAudio}
            allCompleted={allCompleted}
            trainingLog={trainingLog}
            recordTrainingEvent={recordTrainingEvent}
            setListenCount={setListenCount}
          />
        ) : activeTab === 'resources' ? (
          <ResourcesPanel
            activeModule={activeResourceModule}
            setActiveModule={setActiveResourceModule}
            openPractice={() => setActiveTab('practice')}
            language={language}
            setLanguage={setLanguage}
            scenario={scenario}
            setScenario={setScenario}
            trainingLog={trainingLog}
          />
        ) : activeTab === 'reference' ? (
          <ReferenceGuidePanel
            docsByKey={docsByKey}
            activeReference={activeReference}
            setActiveReference={setActiveReference}
          />
        ) : (
          <DocPanel doc={null} />
        )}
      </main>
    </div>
  )
}

function PracticeMethodsPanel({ openModule }) {
  return (
    <section className="methods-page">
      <div className="doc-header">
        <p className="section-kicker">Practice Methods</p>
        <h2>实践方法 / Learning Methods</h2>
      </div>

      <div className="methods-hero">
        <div>
          <p className="section-kicker">Structured Language Acquisition Framework</p>
          <h3>声音 + 画面 + 动作 + 情绪 {'->'} 情境 {'->'} 意义</h3>
          <p>
            这套页面把高频短语、i+1、无字幕影视、Shadowing、主动输出、SRS 和复盘统一到一个情境学习模型里：
            少走“声音 {'->'} 翻译 {'->'} 意义”，多建立“Audio {'->'} Situation {'->'} Meaning”。
          </p>
        </div>
        <button type="button" className="module-primary-btn" onClick={() => openModule('import')}>
          导入情境素材
        </button>
      </div>

      <div className="acquisition-flow" aria-label="Acquisition flow">
        {ACQUISITION_FLOW.map((step) => (
          <span key={step}>{step}</span>
        ))}
      </div>

      <section className="framework-section">
        <div className="framework-header">
          <p className="section-kicker">Understanding ladder</p>
          <h3>四种理解路径</h3>
        </div>
        <div className="understanding-grid">
          {UNDERSTANDING_LEVELS.map((item) => (
            <article key={item.level} className="understanding-card">
              <span>{item.level}</span>
              <h4>{item.title}</h4>
              <code>{item.route}</code>
              <p>{item.note}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="framework-section">
        <div className="framework-header">
          <p className="section-kicker">No-subtitle cycle</p>
          <h3>无字幕影视四遍训练</h3>
        </div>
        <div className="stage-grid">
          {SUBTITLE_TRAINING_STAGES.map((stage, index) => (
            <article key={stage.title} className="stage-card">
              <span>{String(index + 1).padStart(2, '0')}</span>
              <h4>{stage.title}</h4>
              <p>{stage.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="framework-section">
        <div className="framework-header">
          <p className="section-kicker">Language-specific focus</p>
          <h3>不同语言的训练重点</h3>
        </div>
        <div className="language-focus-grid">
          {LANGUAGE_FOCUS.map((item) => (
            <div key={item.language} className="language-focus-item">
              <strong>{item.language}</strong>
              <span>{item.focus}</span>
              <small>{item.training}</small>
            </div>
          ))}
        </div>
      </section>

      <div className="methods-grid">
        {PRACTICE_METHODS.map((method, index) => (
          <article key={method.key} className="method-card">
            <div className="method-card-top">
              <span>{String(index + 1).padStart(2, '0')}</span>
              <button type="button" onClick={() => openModule(method.moduleKey)}>
                {method.moduleLabel}
              </button>
            </div>
            <h3>{method.title}</h3>
            <p>{method.principle}</p>
            <div className="method-routine">
              <strong>怎么实践</strong>
              <ul>
                {method.routine.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <small>{method.evidence}</small>
          </article>
        ))}
      </div>
    </section>
  )
}

function ResourcesPanel({
  activeModule,
  setActiveModule,
  openPractice,
  language,
  setLanguage,
  scenario,
  setScenario,
  trainingLog,
}) {
  const selectedModule = MENTORING_MODULES.find((module) => module.key === activeModule) ||
    MENTORING_MODULES[0]

  return (
    <section className="module-page">
      <div className="doc-header">
        <p className="section-kicker">Resources and tools</p>
        <h2>资料库 / Method Modules</h2>
      </div>

      <SceneSeriesRecommendations />

      <div className="resource-module-tabs" aria-label="Method module tabs">
        {MENTORING_MODULES.map((module, index) => (
          <button
            key={module.key}
            type="button"
            className={`resource-module-tab ${activeModule === module.key ? 'active' : ''}`}
            onClick={() => {
              if (module.key === 'shadow') {
                openPractice()
                return
              }
              setActiveModule(module.key)
            }}
          >
            <span>{String(index + 1).padStart(2, '0')}</span>
            <strong>{module.label}</strong>
            <small>{module.enLabel}</small>
          </button>
        ))}
      </div>

      <ModuleWorkspace
        module={selectedModule}
        openPractice={openPractice}
        language={language}
        setLanguage={setLanguage}
        scenario={scenario}
        setScenario={setScenario}
        trainingLog={trainingLog}
      />
    </section>
  )
}

function SceneSeriesRecommendations() {
  return (
    <section className="scene-series-panel">
      <div className="framework-header">
        <p className="section-kicker">High-frequency scene series</p>
        <h3>生活高频 500 场景剧集推荐</h3>
      </div>
      <div className="scene-series-grid">
        {SCENE_SERIES_RECOMMENDATIONS.map((track) => (
          <article key={track.key} className="scene-series-card">
            <div className="scene-series-title">
              <span>{track.level}</span>
              <h4>{track.language} · {track.seriesTitle}</h4>
            </div>
            <p>{track.target}</p>
            <small>{track.bestFor}</small>

            <div className="scene-series-block">
              <strong>真实剧集/课程素材</strong>
              <div className="recommended-show-list">
                {track.recommendedShows.map((show) => (
                  <div key={`${track.key}-${show.title}`} className="recommended-show-item">
                    <span>{show.type}</span>
                    <strong>{show.title}</strong>
                    <p>{show.fit}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="scene-series-block">
              <strong>每个生活场景剧推荐</strong>
              <div className="drama-scene-list">
                {track.dramaScenes.map((item) => (
                  <div key={`${track.key}-${item.scene}`} className="drama-scene-item">
                    <span>{item.scene}</span>
                    <strong>{item.title}</strong>
                    <p>{item.plot}</p>
                    <small>{item.focus.join(' / ')}</small>
                  </div>
                ))}
              </div>
            </div>

            <div className="scene-series-block">
              <strong>剧集拆分</strong>
              <ul>
                {track.episodePlan.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="scene-series-block">
              <strong>训练方法</strong>
              <ul>
                {track.method.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="scene-series-block">
              <strong>高频样例</strong>
              <div className="scene-chip-list compact">
                {track.examples.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

function ModuleFeaturePanel({ module, openPractice, language, setLanguage, scenario, setScenario, trainingLog }) {
  if (module.key === 'shadow') {
    return null
  }

  return (
    <section className="module-page">
      <div className="doc-header">
        <p className="section-kicker">Language Mentoring Module</p>
        <h2>{module.title}</h2>
      </div>
      <ModuleWorkspace
        module={module}
        openPractice={openPractice}
        language={language}
        setLanguage={setLanguage}
        scenario={scenario}
        setScenario={setScenario}
        trainingLog={trainingLog}
      />
    </section>
  )
}

function ModuleWorkspace({ module, openPractice, language, setLanguage, scenario, setScenario, trainingLog = [] }) {
  return (
    <div className="module-detail">
      <div className="module-hero">
        <div>
          <p className="section-kicker">{module.status}</p>
          <h3>{module.title}</h3>
          <p className="module-english-title">{module.englishTitle}</p>
        </div>
        <div className="module-actions" aria-label="Module actions">
          <button
            type="button"
            className="module-primary-btn"
            onClick={module.key === 'shadow'
              ? openPractice
              : () => document.querySelector('.functional-panel')?.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
              })}
          >
            {module.key === 'shadow' ? '打开跟读练习' : module.primaryAction}
          </button>
          <button
            type="button"
            className="module-secondary-btn"
            onClick={() => document.querySelector('.module-dashboard')?.scrollIntoView({
              behavior: 'smooth',
              block: 'start',
            })}
          >
            {module.secondaryAction}
          </button>
        </div>
      </div>

      <p className="module-subtitle">
        {module.subtitle}
        <span>{module.englishSubtitle}</span>
      </p>

      <div className="module-dashboard">
        <section className="module-preview">
          <div className="module-card-header">
            <p className="section-kicker">Live Preview</p>
            <h4>{module.previewTitle}</h4>
          </div>
          <ul>
            {module.preview.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="module-metrics" aria-label="Module metrics">
          {module.metrics.map((metric) => (
            <div key={metric} className="metric-pill">
              <span>{metric}</span>
            </div>
          ))}
        </section>
      </div>

      <ModuleFunctionalWorkspace
        module={module}
        openPractice={openPractice}
        language={language}
        setLanguage={setLanguage}
        scenario={scenario}
        setScenario={setScenario}
        trainingLog={trainingLog}
      />
    </div>
  )
}

function ModuleFunctionalWorkspace({
  module,
  openPractice,
  language,
  setLanguage,
  scenario,
  setScenario,
  trainingLog,
}) {
  const [goal, setGoal] = useState('30 天内完成餐厅点餐和问路交流')
  const [level, setLevel] = useState('A1')
  const [dailyMinutes, setDailyMinutes] = useState(20)
  const [customPhrase, setCustomPhrase] = useState('')
  const [selectedPhraseId, setSelectedPhraseId] = useState('')
  const [savedPhrases, setSavedPhrases] = useState([])
  const [phraseBankLoaded, setPhraseBankLoaded] = useState(false)
  const [importText, setImportText] = useState('Guten Morgen. Ich möchte einen Kaffee bestellen. Wo ist der Bahnhof?')
  const [roleInput, setRoleInput] = useState('我想点一杯咖啡。')
  const [reviewIndex, setReviewIndex] = useState(0)
  const [adminExpression, setAdminExpression] = useState('region: Berlin / register: polite')

  const catalogItems = useMemo(() => getScenarioCatalog(scenario, language), [scenario, language])
  const phraseOptions = useMemo(() => catalogItems.slice(0, 40), [catalogItems])
  const nextItem = catalogItems[(reviewIndex + 3) % catalogItems.length] || catalogItems[0]
  const nextItemGloss = useMemo(() => {
    return buildWordGlossPairs(nextItem?.sentence, nextItem?.englishTranslation || nextItem?.translation, nextItem)
  }, [nextItem])
  const extractedTerms = importText
    .replace(/[.,!?。？、]/g, '')
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 12)

  useEffect(() => {
    const stored = window.localStorage.getItem('languageCoachPhraseBank')
    if (!stored) {
      setPhraseBankLoaded(true)
      return
    }

    try {
      setSavedPhrases(cleanSavedPhrases(JSON.parse(stored)))
    } catch (err) {
      console.error('Phrase bank parse error:', err)
    } finally {
      setPhraseBankLoaded(true)
    }
  }, [])

  useEffect(() => {
    if (!phraseOptions.length) return
    setSelectedPhraseId((current) => {
      if (phraseOptions.some((item) => item.id === current)) return current
      return phraseOptions[0].id
    })
  }, [phraseOptions])

  useEffect(() => {
    if (!phraseBankLoaded) return
    window.localStorage.setItem('languageCoachPhraseBank', JSON.stringify(savedPhrases))
  }, [phraseBankLoaded, savedPhrases])

  const addPhrase = () => {
    const selectedItem = phraseOptions.find((item) => item.id === selectedPhraseId) || phraseOptions[0]
    const phraseText = customPhrase.trim() || selectedItem?.sentence?.trim()
    if (!phraseText) return

    const phraseRecord = {
      id: `${language}-${scenario}-${phraseText}`,
      phrase: phraseText,
      language,
      scenario,
      word: selectedItem?.word || '',
      translation: selectedItem?.translation || '',
      savedAt: new Date().toISOString(),
    }

    setSavedPhrases((current) => [
      phraseRecord,
      ...current.filter((item) => item.phrase !== phraseRecord.phrase),
    ].slice(0, 24))
    setCustomPhrase('')
  }

  const removePhrase = (phraseRecord) => {
    setSavedPhrases((current) => current.filter((item) => {
      return item.savedAt !== phraseRecord.savedAt || item.phrase !== phraseRecord.phrase
    }))
  }

  if (module.key === 'diagnosis') {
    return (
      <section className="functional-panel">
        <h4>目标诊断与路径生成</h4>
        <div className="functional-grid">
          <label>学习目标<input value={goal} onChange={(event) => setGoal(event.target.value)} /></label>
          <label>当前等级<select value={level} onChange={(event) => setLevel(event.target.value)}><option>A1</option><option>A2</option><option>B1</option><option>B2</option></select></label>
          <label>每日分钟<input type="number" min="5" max="90" value={dailyMinutes} onChange={(event) => setDailyMinutes(event.target.value)} /></label>
        </div>
        <div className="generated-plan">
          <strong>生成路径</strong>
          <span>7 天：每天 {dailyMinutes} 分钟，完成 {scenario} 高频输入和 4 步跟读。</span>
          <span>30 天：围绕“{goal}”完成 6 个场景循环。</span>
          <span>90 天：等级从 {level} 推进到下一阶段，并加入角色扮演。</span>
        </div>
      </section>
    )
  }

  if (module.key === 'phrases') {
    return (
      <section className="functional-panel">
        <h4>个人短语银行</h4>
        <div className="functional-grid">
          <label>语言<select value={language} onChange={(event) => setLanguage(event.target.value)}>{LANGUAGES.map((item) => <option key={item.code} value={item.code}>{item.name}</option>)}</select></label>
          <label>场景<select value={scenario} onChange={(event) => setScenario(event.target.value)}>{SCENARIOS.map((item) => <option key={item.key} value={item.key}>{item.label}</option>)}</select></label>
          <label>短语下拉<select value={selectedPhraseId} onChange={(event) => setSelectedPhraseId(event.target.value)}>{phraseOptions.map((item) => <option key={item.id} value={item.id}>{item.sentence}</option>)}</select></label>
        </div>
        <label className="phrase-custom-input">新增短语<input value={customPhrase} onChange={(event) => setCustomPhrase(event.target.value)} placeholder={nextItem?.sentence} /></label>
        <button type="button" className="module-primary-btn inline-action" onClick={addPhrase}>添加到短语库</button>
        <div className="phrase-bank-header">
          <strong>已保存短语银行</strong>
          <span>{savedPhrases.length} 条</span>
        </div>
        <div className="functional-list phrase-bank-list">
          {savedPhrases.length ? savedPhrases.map((item) => (
            <span key={`${item.id}-${item.savedAt}`}>
              <span className="phrase-bank-item-text">
                <strong>{item.phrase}</strong>
                <small>{item.language.toUpperCase()} · {item.scenario}{item.translation ? ` · ${item.translation}` : ''}</small>
              </span>
              <button type="button" className="phrase-bank-delete" onClick={() => removePhrase(item)}>删除</button>
            </span>
          )) : <span>请选择下拉短语或输入自定义短语，然后点击添加。</span>}
        </div>
      </section>
    )
  }

  if (module.key === 'i1') {
    return (
      <section className="functional-panel">
        <h4>i+1 下一句选择器</h4>
        <div className="challenge-card">
          <p>{nextItem?.sentence}</p>
          <div className="word-gloss-list" aria-label="Word by word English translation">
            {nextItemGloss.map((item, index) => (
              <span key={`${item.source}-${index}`} className="word-gloss-chip">
                <strong>{item.source}</strong>
                <small>{item.english}</small>
              </span>
            ))}
          </div>
          <small>{nextItem?.trainingTip}</small>
          <div className="catalog-item-meta"><span>{nextItem?.level}</span><span>{nextItem?.word}</span><span>{nextItem?.scenarioLabel}</span></div>
        </div>
        <button type="button" className="module-primary-btn inline-action" onClick={() => setReviewIndex((current) => current + 1)}>换下一句</button>
      </section>
    )
  }

  if (module.key === 'pronunciation') {
    return (
      <section className="functional-panel">
        <h4>发音与声调训练</h4>
        <div className="pronunciation-board">
          {catalogItems.slice(0, 6).map((item) => (
            <button key={item.id} type="button" className="drill-chip">{item.word}<small>{item.sentence}</small></button>
          ))}
        </div>
      </section>
    )
  }

  if (module.key === 'output') {
    return (
      <section className="functional-panel">
        <h4>角色扮演输出</h4>
        <div className="roleplay-box">
          <p><strong>AI Mentor：</strong>你在 {scenario} 场景中，需要用 {language.toUpperCase()} 完成自然表达。</p>
          <textarea value={roleInput} onChange={(event) => setRoleInput(event.target.value)} rows={3} />
          <p><strong>反馈：</strong>先表达清楚，再替换为更自然版本：{nextItem?.sentence}</p>
        </div>
      </section>
    )
  }

  if (module.key === 'srs') {
    return (
      <section className="functional-panel">
        <h4>SRS 今日复习</h4>
        <div className="review-card">
          <span>{nextItem?.translation}</span>
          <strong>{nextItem?.sentence}</strong>
          <div className="review-actions">
            <button type="button" onClick={() => setReviewIndex((current) => current + 1)}>认识</button>
            <button type="button" onClick={() => setReviewIndex((current) => current + 2)}>困难</button>
          </div>
        </div>
      </section>
    )
  }

  if (module.key === 'import') {
    return (
      <section className="functional-panel">
        <h4>素材导入与抽取</h4>
        <textarea value={importText} onChange={(event) => setImportText(event.target.value)} rows={4} />
        <div className="functional-list">{extractedTerms.map((term) => <span key={term}>{term}</span>)}</div>
      </section>
    )
  }

  if (module.key === 'progress') {
    return (
      <section className="functional-panel">
        <h4>周复盘</h4>
        <div className="progress-grid">
          <span>练习记录：{trainingLog.length}</span>
          <span>听音次数：{trainingLog.filter((event) => event.type === 'listen').length}</span>
          <span>保存句子：{trainingLog.filter((event) => event.type === 'apply_save').length}</span>
          <span>建议：下周优先复习 {scenario}</span>
        </div>
      </section>
    )
  }

  if (module.key === 'data') {
    return (
      <section className="functional-panel">
        <h4>语言与方言资料管理</h4>
        <div className="functional-grid">
          <label>语言<select value={language} onChange={(event) => setLanguage(event.target.value)}>{LANGUAGES.map((item) => <option key={item.code} value={item.code}>{item.name}</option>)}</select></label>
          <label>场景<select value={scenario} onChange={(event) => setScenario(event.target.value)}>{SCENARIOS.map((item) => <option key={item.key} value={item.key}>{item.label}</option>)}</select></label>
          <label>表达元数据<input value={adminExpression} onChange={(event) => setAdminExpression(event.target.value)} /></label>
        </div>
        <div className="challenge-card"><p>{nextItem?.sentence}</p><small>{adminExpression}</small></div>
      </section>
    )
  }

  return (
    <section className="functional-panel">
      <h4>打开已实现练习</h4>
      <button type="button" className="module-primary-btn inline-action" onClick={openPractice}>进入跟读练习</button>
    </section>
  )
}

function ReferenceGuidePanel({ docsByKey, activeReference, setActiveReference }) {
  const selectedTab = REFERENCE_TABS.find((tab) => tab.key === activeReference) ||
    REFERENCE_TABS[0]
  const selectedDoc = docsByKey[activeReference]

  return (
    <section className="reference-page">
      <div className="doc-header">
        <p className="section-kicker">Reference Guide</p>
        <h2>参考指南 / Guides & Notes</h2>
      </div>

      <div className="reference-layout">
        <aside className="reference-tabs" aria-label="Reference guide tabs">
          {REFERENCE_TABS.map((tab, index) => (
            <button
              key={tab.key}
              type="button"
              className={`reference-tab ${activeReference === tab.key ? 'active' : ''}`}
              onClick={() => setActiveReference(tab.key)}
            >
              <span>{String(index + 1).padStart(2, '0')}</span>
              <strong>{tab.label}</strong>
              <small>{tab.enLabel}</small>
            </button>
          ))}
        </aside>

        <div className="reference-detail">
          <div className="module-hero">
            <div>
              <p className="section-kicker">{selectedDoc?.file || selectedTab.enLabel}</p>
              <h3>{selectedTab.label}</h3>
              <p className="module-english-title">{selectedTab.enLabel}</p>
            </div>
          </div>

          <div className="reference-guide-shell">
            {selectedDoc ? (
              <article
                className="markdown-body"
                dangerouslySetInnerHTML={{ __html: selectedDoc.html }}
              />
            ) : (
              <p>未找到参考文档。</p>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

function ModuleList({ title, items, code = false }) {
  return (
    <section className="module-list">
      <h4>{title}</h4>
      <ul>
        {items.map((item) => (
          <li key={item}>{code ? <code>{item}</code> : item}</li>
        ))}
      </ul>
    </section>
  )
}

function PracticePanel({
  language,
  setLanguage,
  scenario,
  setScenario,
  sessionData,
  stepProgress,
  setStepProgress,
  error,
  i1Context,
  isPlaying,
  listenCount,
  fallbackMode,
  initializeSession,
  playAudio,
  allCompleted,
  trainingLog,
  recordTrainingEvent,
  setListenCount,
}) {
  const [applyText, setApplyText] = useState('')
  const [practiceIndex, setPracticeIndex] = useState(0)
  const catalogItems = useMemo(() => getScenarioCatalog(scenario, language), [scenario, language])
  const catalogStats = useMemo(() => getCatalogStats(language), [language])
  const activePracticeItem = catalogItems[practiceIndex % catalogItems.length]
  const practiceSentence = activePracticeItem?.sentence || sessionData?.sentence || ''
  const practiceTranslation = activePracticeItem?.englishTranslation ||
    sessionData?.englishTranslation ||
    sessionData?.translation ||
    ''
  const practiceWordTips = activePracticeItem
    ? activePracticeItem.sentence
      .replace(/[.,!?。？、]/g, '')
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 5)
      .map((word) => ({ word, tip: activePracticeItem.trainingTip }))
    : sessionData?.word_tips

  useEffect(() => {
    setPracticeIndex(0)
  }, [language, scenario])

  const toggleStep = (stepKey, checked) => {
    setStepProgress((current) => ({ ...current, [stepKey]: checked }))
    recordTrainingEvent({
      type: checked ? 'step_complete' : 'step_uncheck',
      label: checked ? '完成步骤' : '取消步骤',
      step: stepKey,
      sentence: practiceSentence,
    })
  }

  const switchPracticeExample = (offset) => {
    if (!catalogItems.length) return
    setPracticeIndex((current) => {
      const next = (current + offset + catalogItems.length) % catalogItems.length
      const nextItem = catalogItems[next]
      recordTrainingEvent({
        type: 'example_switch',
        label: offset > 0 ? '切换下一句' : '切换上一句',
        sentence: nextItem.sentence,
      })
      return next
    })
    setListenCount(0)
    setStepProgress({ listen: false, shadow: false, repeat: false, apply: false })
  }

  const saveApplySentence = () => {
    if (!applyText.trim()) return
    recordTrainingEvent({
      type: 'apply_save',
      label: '保存应用句',
      sentence: applyText.trim(),
    })
    setApplyText('')
  }

  return (
    <section className="practice-page">
      <div className="page-title-row">
        <div>
          <p className="section-kicker">Adaptive speaking cycle</p>
          <h2>影子跟读练习 / Shadow Reading</h2>
        </div>
      </div>

      <div className="lang-scenario-selector">
        <div className="lang-selector" aria-label="Language selector">
          {LANGUAGES.map((l) => (
            <button
              key={l.code}
              type="button"
              className={`lang-btn ${language === l.code ? 'active' : ''}`}
              onClick={() => setLanguage(l.code)}
              title={l.name}
            >
              {l.flag}
            </button>
          ))}
        </div>
        <div className="scenario-selector" aria-label="Scenario selector">
          {SCENARIOS.map((s) => (
            <button
              key={s.key}
              type="button"
              className={`scenario-btn ${scenario === s.key ? 'active' : ''}`}
              onClick={() => setScenario(s.key)}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      <section className="phrase-catalog-panel">
        <div className="phrase-catalog-header">
          <div>
            <p className="section-kicker">High-frequency catalog</p>
            <h3>场景高频词短语句子库</h3>
          </div>
          <div className="catalog-counts">
            <span>全语言 {catalogStats.total} 条</span>
            <span>当前语言 {catalogStats.currentLanguageTotal} 条</span>
            <span>当前场景 {catalogItems.length} 条</span>
          </div>
        </div>
        <div className="phrase-catalog-list" aria-label="Scenario phrase catalog">
          {catalogItems.map((item) => (
            <article key={item.id} className="phrase-catalog-item">
              <div className="catalog-item-meta">
                <span>{item.id}</span>
                <span>{item.level}</span>
                <span>{item.scenarioLabel}</span>
              </div>
              <h4>{item.word}</h4>
              <p className="catalog-phrase">{item.phrase}</p>
              <p className="catalog-sentence">{item.sentence}</p>
              <p className="catalog-english">{item.englishTranslation}</p>
              <p className="catalog-tip">{item.trainingTip}</p>
            </article>
          ))}
        </div>
      </section>

      <TrainingDataPanel trainingLog={trainingLog} />

      {error && (
        <div className="error-banner">
          <p>{error}</p>
          <button type="button" onClick={initializeSession}>Retry</button>
        </div>
      )}

      {!sessionData && !error && (
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Finding your optimal i+1 challenge...</p>
        </div>
      )}

      {sessionData && (
        <>
          <div className="practice-header">
            <div className="example-switcher">
              <button type="button" onClick={() => switchPracticeExample(-1)} aria-label="Previous example">‹</button>
              <span>Static i+1 · {practiceIndex + 1}/{catalogItems.length}</span>
              <button type="button" onClick={() => switchPracticeExample(1)} aria-label="Next example">›</button>
            </div>
            <h3>{practiceSentence}</h3>
            <p className="translation">{practiceTranslation}</p>
            {i1Context && (
              <span className="difficulty-badge">
                {i1Context.overall_i_label || 'Adaptive'}
              </span>
            )}
            {fallbackMode && (
              <p className="step-hint">
                当前使用静态练习模式 / Static mode is active because the backend API is not connected.
              </p>
            )}
          </div>

          <div className="practice-checklist">
            <ChecklistRow
              number="1"
              title="听音 / Listen"
              description={`听 3 遍，关注语义、节奏、重音和语调。当前 ${listenCount}/3 次`}
              checked={stepProgress.listen}
              onChange={(checked) => toggleStep('listen', checked)}
            >
              <button type="button" className="mini-action-btn" onClick={() => playAudio(practiceSentence)} disabled={isPlaying}>
                {isPlaying ? '播放中...' : '播放音频'}
              </button>
            </ChecklistRow>

            <ChecklistRow
              number="2"
              title="跟读 / Shadow"
              description="同步模仿原音，尽量贴近节奏、停顿和情绪。"
              checked={stepProgress.shadow}
              onChange={(checked) => toggleStep('shadow', checked)}
            />

            <ChecklistRow
              number="3"
              title="复练 / Repeat"
              description="针对发音、语调、连读和流利度做局部练习。"
              checked={stepProgress.repeat}
              onChange={(checked) => toggleStep('repeat', checked)}
            />

            <ChecklistRow
              number="4"
              title="应用 / Apply"
              description="替换关键词，生成你自己的句子。"
              checked={stepProgress.apply}
              onChange={(checked) => toggleStep('apply', checked)}
            />
          </div>

          {practiceWordTips && (
            <div className="word-tips compact-word-tips">
              {practiceWordTips.slice(0, 5).map((tip, i) => (
                <span key={i} className="word-tip" title={tip.tip}>{tip.word}</span>
              ))}
            </div>
          )}

          <div className="apply-checklist-panel">
            <textarea
              className="apply-input"
              placeholder="写下你的目标语句子 / Write your own sentence..."
              rows={3}
              value={applyText}
              onChange={(event) => setApplyText(event.target.value)}
            />
            <button type="button" className="save-btn" onClick={saveApplySentence}>保存到短语银行</button>
          </div>

          {allCompleted && (
            <div className="completion-banner">
              <h3>四步练习完成</h3>
              <p>You have finished the Shadow Reading cycle.</p>
              <button type="button" onClick={initializeSession} className="next-btn">开始新练习</button>
            </div>
          )}
        </>
      )}
    </section>
  )
}

function ChecklistRow({ number, title, description, checked, onChange, children }) {
  return (
    <label className={`checklist-row ${checked ? 'checked' : ''}`}>
      <input
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
      />
      <span className="checklist-number">{number}</span>
      <span className="checklist-content">
        <strong>{title}</strong>
        <small>{description}</small>
      </span>
      {children && <span className="checklist-action">{children}</span>}
    </label>
  )
}

function TrainingDataPanel({ trainingLog }) {
  const sessionCount = trainingLog.filter((event) => event.type === 'session_start').length
  const listenCount = trainingLog.filter((event) => event.type === 'listen').length
  const applyCount = trainingLog.filter((event) => event.type === 'apply_save').length
  const visibleEvents = trainingLog
    .filter((event) => !['session_start', 'listen', 'example_switch'].includes(event.type))
    .slice(0, 2)

  return (
    <section className="training-data-panel">
      <div className="training-data-header">
        <div>
          <p className="section-kicker">Training data</p>
          <h3>训练数据记录</h3>
        </div>
        <div className="training-stats">
          <span>练习 {sessionCount}</span>
          <span>听音 {listenCount}</span>
          <span>保存 {applyCount}</span>
        </div>
      </div>
      <div className="training-log-list">
        {visibleEvents.map((event) => (
          <div key={event.id} className="training-log-item">
            <strong>{event.label}</strong>
            <span>{event.language} / {event.scenario}</span>
            <small>{new Date(event.at).toLocaleString()}</small>
          </div>
        ))}
        {visibleEvents.length === 0 && (
          <p className="empty-training-log">
            自动听音和切换记录已汇总到上方数字，关键保存和步骤完成会显示在这里。
          </p>
        )}
      </div>
    </section>
  )
}

function DocPanel({ doc }) {
  if (!doc) {
    return (
      <section className="doc-panel">
        <p className="section-kicker">Documentation</p>
        <h2>Document not found</h2>
      </section>
    )
  }

  return (
    <section className="doc-panel">
      <div className="doc-header">
        <p className="section-kicker">{doc.file}</p>
        <h2>{doc.title}</h2>
      </div>
      <article
        className="markdown-body"
        dangerouslySetInnerHTML={{ __html: doc.html }}
      />
    </section>
  )
}
