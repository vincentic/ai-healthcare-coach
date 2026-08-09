const domains = [
  {
    name: '西医',
    role: '评估、诊断、急救、药物、康复医学',
    stage: '危机稳定',
    signal: '疼痛、失眠、惊恐、躯体症状、急性风险',
    color: 'blue',
  },
  {
    name: '护理',
    role: '连续照护、生命体征、生活支持、依从性陪伴',
    stage: '安全托底',
    signal: '需要日常照护、疾病管理、康复跟进',
    color: 'teal',
  },
  {
    name: '心理疗愈',
    role: 'CBT、DBT、叙事、萨提亚、存在主义与创伤工作',
    stage: '情绪整合',
    signal: '反刍、关系困境、创伤反应、意义感下降',
    color: 'violet',
  },
  {
    name: '东方心理学',
    role: '儒释道、中医心理、瑜伽、内观、森田疗法与本土化心疗',
    stage: '身心统合',
    signal: '需要文化契合的情志调节、修身正心、内在体验与精神成长',
    color: 'indigo',
  },
  {
    name: '中医',
    role: '辨证论治、气血津液、经络、食养与作息调理',
    stage: '系统调和',
    signal: '慢性失衡、体质调理、身心互相牵动',
    color: 'green',
  },
  {
    name: '戏剧疗愈',
    role: '回放剧场、被压迫者剧场、角色探索、即兴训练',
    stage: '关系重演',
    signal: '卡在旧角色、表达受限、关系模式重复',
    color: 'amber',
  },
  {
    name: '艺术疗愈',
    role: '绘画、音乐、曼陀罗、舞动、书写、隐喻与象征表达',
    stage: '非语言表达',
    signal: '语言说不清、情绪堵塞、需要温和外化',
    color: 'rose',
  },
  {
    name: '费登奎斯',
    role: '神经可塑性、动作觉察、身体图式重建',
    stage: '身体学习',
    signal: '紧绷、疼痛保护、动作模式僵化、自我感断裂',
    color: 'cyan',
  },
  {
    name: '呼吸 Marashira',
    role: '呼吸节律、鼻息觉察、腹背扩张与神经系统降载',
    stage: '快速安顿',
    signal: '急性焦虑、胸闷、过度唤醒、睡前难以放松、需要立刻回到身体',
    color: 'teal',
  },
  {
    name: '冥想',
    role: '静坐、观息、身体扫描、慈悲观与开放觉察',
    stage: '内在稳定',
    signal: '反刍增多、情绪卷入、注意力涣散、需要建立观察者位置',
    color: 'indigo',
  },
  {
    name: '正念',
    role: '当下觉察、非评判观察、日常行动中的注意力训练',
    stage: '日常觉察',
    signal: '自动驾驶、冲动反应、压力进食、关系中快速防御或逃避',
    color: 'green',
  },
  {
    name: '超觉',
    role: '咒音、深度休息、意识澄清与超个人体验',
    stage: '深层修复',
    signal: '长期疲惫、意义感下降、需要从更大视角安放自我经验',
    color: 'violet',
  },
  {
    name: '声音疗愈',
    role: '人声、颂钵、频率、节奏、五音与听觉安抚',
    stage: '听觉调节',
    signal: '语言表达困难、身体紧张、情绪堵塞、需要低认知负荷的安顿方式',
    color: 'amber',
  },
  {
    name: '气味香氛',
    role: '嗅觉记忆、芳香锚定、空间仪式与睡眠放松',
    stage: '环境安抚',
    signal: '入睡困难、环境压力大、需要建立安全感、边界感和日常练习入口',
    color: 'rose',
  },
];

const easternFoundations = [
  {
    name: '中国传统哲学',
    summary: '儒家强调修身正心与人际和谐，道家强调顺应自然与阴阳平衡，佛教与禅宗强调明心见性、内观和放下执念。',
    anchors: ['儒家：仁义与人格完善', '道家：无为、自然、阴阳', '禅宗：坐禅、公案、顿悟'],
  },
  {
    name: '印度哲学与瑜伽',
    summary: '以《瑜伽经》、佛教心理学和阿毗达摩为重要资源，通过体位、呼吸、冥想、慈悲和无我分析痛苦根源。',
    anchors: ['体位法与呼吸控制', '冥想与意识观察', '慈悲、无我与解脱'],
  },
  {
    name: '中医心理学',
    summary: '以形神合一、心主神明、七情五脏为核心，把心理活动放在精气、气血、脏腑和生活节律中理解。',
    anchors: ['形神合一', '心主神明', '七情与五脏'],
  },
];

const easternPractices = [
  ['冥想与内观', '静坐、呼吸调控、内观禅修、道教打坐', '观察思维与情绪的生灭，降低反刍与自动化反应，训练稳定觉察。'],
  ['情志调节疗法', '情志相胜、五音调理、绘画、曼陀罗、书法、音乐与艺术表达', '用五行、声音和象征表达调节怒、忧、思、悲、恐等情绪失衡。'],
  ['本土化心理疗法', '森田疗法、内观疗法、韩国 Han 释放仪式', '以顺其自然、为所当为、人际反思和集体仪式修复焦虑、强迫、关系冲突与文化创伤。'],
  ['身心整合实践', '瑜伽、气功、舞动、针灸、推拿、太冲等穴位调节', '通过身体、呼吸、经络和动作觉察促进气血调和与心理平衡。'],
];

const easternModern = [
  ['文字道与心疗术', '以汉字拆解引导自我觉察，连接阳明心学的知行合一，把文化符号转成心智练习。'],
  ['心药音频系统', '把传统心法转成标准化音频指令，用于自助式情绪管理、稳定提醒和日常练习。'],
  ['脑科学与测量验证', '用 fMRI、脑波研究和心理测量学观察冥想、呼吸和身心训练的效果。'],
];

const easternValues = [
  ['整体性思维', '身心统一，人与自然相互嵌入，避免把情绪、身体和关系割裂分析。'],
  ['超个人成长', '不只追求症状缓解，也重视精神觉醒、意义重建和慈悲实践。'],
  ['文化契合性', '从汉字、五行、儒释道、瑜伽和本土仪式进入，更容易被东方文化经验接住。'],
  ['互补而非替代', '东方心理学适合做身心调和与精神成长，也需要与医学评估、心理治疗和危机干预协同。'],
];

const culturePsychologyLayers = [
  {
    name: '生物学基础',
    thesis: '所有文化共享的底层可能性。',
    examples: ['大脑结构', '神经递质', '激素', '进化心理', '基本情绪', '依恋需求'],
  },
  {
    name: '文化解释心理',
    thesis: '文化影响人如何理解、表达和处理同一种心理体验。',
    examples: ['美国：表达情绪与寻求支持', '中国传统：克制、修身、反思', '日本：我慢与不给他人添麻烦'],
  },
  {
    name: '健康标准',
    thesis: '心理健康标准不完全脱离文化。',
    examples: ['西方：独立、自主、自我实现', '东亚：家庭责任、关系和谐、社会角色'],
  },
  {
    name: '语言组织经验',
    thesis: '语言不仅表达心理，也塑造人组织经验的方式。',
    examples: ['I feel...', '我觉得...', '我应该...', '人应该...'],
  },
  {
    name: '意义框架',
    thesis: '心理困扰常来自意义框架冲突，而不只是大脑机制。',
    examples: ['儒家：修身齐家', '道家：顺其自然', '佛教：认识苦与放下执著', '存在主义：意义需要自己创造'],
  },
  {
    name: '社会制度',
    thesis: '文化通过家庭、教育、工作、法律、宗教和价值观长期塑造心理模式。',
    examples: ['竞争环境可能诱发焦虑', '集体支持提供资源', '群体压力也会增加负担'],
  },
];

const cultureStack = [
  ['文明', '价值观'],
  ['宗教 / 哲学 / 伦理', '意义与规范'],
  ['文化规范', '表达方式与健康标准'],
  ['心理', '认知、情绪、人格'],
  ['身体机制', '大脑、神经、激素、生理'],
  ['演化生物学', '共同的人类基础'],
];

const cultureTakeaways = [
  ['相互塑造', '心理并不始终是文化原因，也不总是由文化决定；心理与文化是 mutually constitutive 的关系。'],
  ['WEIRD 限制', '现代主流心理学早期多来自西方、受教育、工业化、富裕、民主社会样本，不能默认代表所有人。'],
  ['多层互补', '《易经》、中医、佛学、西方哲学和神经科学，分别从世界观、生命观、心性观和生物机制解释人的心理。'],
];

const thoughtRouteStages = [
  {
    stage: '第一阶段',
    name: '建立世界观：变化',
    question: '世界是如何运作的？',
    books: ['《周易》经文', '高亨《周易古经今注》', '《易传（十翼）》', '王弼《周易注》', '朱熹《周易本义》', '南怀瑾《易经杂说》', '傅佩荣《解读易经》'],
    insight: '先读六十四卦与卦辞，理解变化、时位和天人关系。',
  },
  {
    stage: '第二阶段',
    name: '理解自然：道',
    question: '人应该如何顺应世界？',
    books: ['《道德经》', '《庄子》', '《列子》'],
    insight: '易经讲变化，老子讲顺变化，庄子讲活在变化里。',
  },
  {
    stage: '第三阶段',
    name: '理解生命：医',
    question: '为什么人生病？身体如何保持平衡？',
    books: ['《黄帝内经》', '《伤寒论》', '《千金要方》', '刘力红《思考中医》', '倪海厦《人纪》'],
    insight: '中医可视为易经与道家应用在人身上的生命模型。',
  },
  {
    stage: '第四阶段',
    name: '理解人：儒',
    question: '变化以后，人应该怎样做人？',
    books: ['《论语》', '《孟子》', '《大学》', '《中庸》', '《传习录》'],
    insight: '孔子建立秩序，孟子建立善，王阳明建立内心。',
  },
  {
    stage: '第五阶段',
    name: '理解心：佛',
    question: '为什么人会痛苦？',
    books: ['《阿含经》', '《金刚经》', '《心经》', '《中论》', '《六祖坛经》', '《瑜伽师地论》', '《唯识三十颂》'],
    insight: '从苦、空、缘起、觉照和唯识进入完整的东方心理模型。',
  },
  {
    stage: '第六阶段',
    name: '西方哲学',
    question: '理性、存在与伦理如何展开？',
    books: ['Plato《Republic》', 'Aristotle《Metaphysics》', 'Aristotle《Nicomachean Ethics》', 'Descartes《Meditations》', 'Spinoza《Ethics》', 'Hume《Treatise》', 'Kant《Critique of Pure Reason》', 'Hegel', 'Nietzsche', 'Heidegger', 'Wittgenstein'],
    insight: '从古希腊、近代主体性到现代语言和存在问题，比较东西方的认识路线。',
  },
  {
    stage: '第七阶段',
    name: '现代科学',
    question: '科学怎么看世界？',
    books: ['Darwin《Origin of Species》', 'Wiener《Cybernetics》', 'Kuhn《Structure of Scientific Revolutions》', 'Prigogine《Order out of Chaos》', 'Feynman《The Character of Physical Law》', 'Deutsch《The Beginning of Infinity》'],
    insight: '用演化、控制论、范式、复杂系统和物理法则重建现代世界观。',
  },
  {
    stage: '第八阶段',
    name: '现代心理学',
    question: '人的心如何运作？',
    books: ['William James《The Principles of Psychology》', 'Jung《Symbols of Transformation》', 'Frankl《Man’s Search for Meaning》', 'Kahneman《Thinking, Fast and Slow》', 'Davidson《The Emotional Life of Your Brain》'],
    insight: '把意识、象征、意义、判断偏差和情绪神经科学接回人的体验。',
  },
  {
    stage: '第九阶段',
    name: 'AI 时代',
    question: '机器如何理解、推理、行动与协作？',
    books: ['Wiener', 'von Neumann', 'Hofstadter《Gödel, Escher, Bach》', 'Pearl《The Book of Why》', 'Demis Hassabis 推荐书单', '现代 AI Agent'],
    insight: '从控制论、计算、因果、认知结构进入 AI Agent 与人机协作。',
  },
];

const civilizationBooks = [
  {
    group: '东方思想基础',
    books: ['《周易》', '《易传》', '《道德经》', '《庄子》', '《黄帝内经》', '《论语》', '《孟子》', '《传习录》', '《金刚经》', '《六祖坛经》'],
  },
  {
    group: '西方思想基础',
    books: ['Plato《Republic》', 'Aristotle《Metaphysics》', 'Descartes《Meditations》', 'Spinoza《Ethics》', 'Kant《Critique of Pure Reason》', 'Nietzsche《Thus Spoke Zarathustra》', 'Heidegger《Being and Time》', 'Darwin《On the Origin of Species》', 'Wiener《Cybernetics》', 'Kuhn《The Structure of Scientific Revolutions》'],
  },
  {
    group: '现代心智与 AI',
    books: ['James《The Principles of Psychology》', 'Jung《Symbols of Transformation》', 'Frankl《Man’s Search for Meaning》', 'Kahneman《Thinking, Fast and Slow》', 'Davidson《The Emotional Life of Your Brain》', 'Hofstadter《Gödel, Escher, Bach》', 'Pearl《The Book of Why》', 'Deutsch《The Beginning of Infinity》', 'Dennett《Consciousness Explained》', 'Russell《Human Compatible》'],
  },
];

const thoughtTree = [
  ['世界', '《周易》'],
  ['道家', '《道德经》《庄子》《列子》'],
  ['医学', '《黄帝内经》《伤寒论》'],
  ['儒家', '《论语》《孟子》《传习录》'],
  ['佛家', '《中论》《坛经》'],
  ['西方哲学', 'Plato / Kant / Heidegger'],
  ['现代科学', 'Darwin / Wiener / Kuhn'],
  ['心理学', 'James / Jung / Kahneman'],
  ['AI', 'Hofstadter / Pearl / Agent'],
];

const sideRoutes = [
  {
    name: '数学主线',
    detail: '欧几里得《几何原本》 -> 柯朗《什么是数学？》 -> 陶哲轩《Analysis I》或同等分析教材，用数学训练抽象思维。',
  },
  {
    name: '历史主线',
    detail: '陈寅恪、钱穆、余英时，帮助理解思想产生的历史语境。',
  },
];

const tianjiVisualGuide = {
  thesis: '倪海厦《天纪》讲八卦时大量使用图像思维，但这些图像主要来自课堂手绘板书、白板示意图和传统《易经》图式，而不是一套完整彩色插图书。',
  note: '学习时更适合把课程板书、经典对应表和传统图像资料并读，自己整理成八卦象意图谱。',
  boardImages: [
    'https://images.openai.com/static-rsc-4/gloIWLphdLwDVuRFCscLIOyMU9cEa-lEEDLiMT7-6ow2KOgoVCd48E98avO54Zp4ftEL78va_3HU70stLfe3uE8Wqess5Tdo3uD0Wo8yTeGKQnhdjpzgUeXuO1rxf2iwt8JlAhFEpPgz_7B5sWbEhb_x0dc3zyqk996hDGIZrLYqOKcSCS-Q-fPECtemms55?purpose=fullsize',
    'https://images.openai.com/static-rsc-4/dY8ylkZbTexyo1JYQXBqUpA9rz3AjKqWwNrbMxTcNbYAb9L6smCaQWH6Td_2K8856szLIy_DgEmLjEL4Efn_6THa6ZAQ7TDg2SPXBwbClMMdb8F_KxvgA8LTZ1NzRtvcSKKWMqCisNfOjE7ebOWkvei6ovmMcHWNIwPZd-plkz1p8anh8xwaOSIl5IAMsPFE?purpose=fullsize',
    'https://images.openai.com/static-rsc-4/Whv162CqauVZ0HhG2S--oKevmQO8u8v5SZliW4lOCO-5nOWFABSbk50rn3R3iWAZNgF4H8LIDCqMLtbMO1aIzSifkIxm--I4u8XibZ323zCcyfFFReVmjgRTO4EeGJKcTUKwFbgRsSIttKahy1ZEr3PTv4OTFrxWzobXN1KhfDjwGPknH7bTwggZGwGXGP5x?purpose=fullsize',
  ],
  recurringBoards: ['先天八卦图（伏羲）', '后天八卦图（文王）', '河图', '洛书', '太极图', '十二地支', '天干', '二十四山', '五行关系', '八卦配人体', '八卦配方位'],
};

const shuoguaBagua = [
  ['乾 ☰', '天', '父', '首', '马'],
  ['坤 ☷', '地', '母', '腹', '牛'],
  ['震 ☳', '雷', '长男', '足', '龙'],
  ['巽 ☴', '风', '长女', '股', '鸡'],
  ['坎 ☵', '水', '中男', '耳', '猪'],
  ['离 ☲', '火', '中女', '目', '雉'],
  ['艮 ☶', '山', '少男', '手', '狗'],
  ['兑 ☱', '泽', '少女', '口', '羊'],
];

const yixiangImages = [
  'https://images.openai.com/static-rsc-4/2OYMwB_FQgIbIG3TnQKNRTddxbnQvQLj5cgxTCs-uJxAxwtgKjaQQhFZCdMKP6VuQmi1SQ3gdCo7fBywZTOkgequb4apgn2d3r7jdxjlW1ygRNE2tXYccCqRfxH6z9WgaG1DR3ksRZ5jm6i3au8qFXzHqccmYhz-_Qy_rF4uCK0aZjzf2BFbKJDeBzRVBn5P?purpose=fullsize',
  'https://images.openai.com/static-rsc-4/AWqA6Q7nClXZet5QAqSYGhpYS6uKVWefIPwOVlUHK5IKYbtnCg4V99MdptrGlV0oPWCPAnTuau8MuuEN-6Jb1whardsg-YNONNjNt4ED4ddC-8yi3f9rH5f87zSz0FCUy4NYyHGUeysL0Y6dIhndHenZbdq0fiStB5US_SiPgZtWvZPzE4NcE8cqOi9cHXY4?purpose=fullsize',
  'https://images.openai.com/static-rsc-4/V-ddEsekntG7FsJbnXSFQ89MehgWm80Z8Dt11cvnsSUV_99NauBZowEIgl4OwcMYP6hfwtiKpEocDLLWF8e-9BAXGGFJx6X-72daxgNQKMTPTWfcWnxpWnWCbYmNPxb0AZauBNp-Dug0gp2xqW0rCBgS3Cj6bUEGQ5ZAV2IargqeRnaI6gya7sA-PUlZ9fvy?purpose=fullsize',
  'https://images.openai.com/static-rsc-4/lNszJkqt9sNvp8Nw2yho8OxjhbO41JykJfyMcoVku7dSW-o3QmkoDHyAGXJLS_eJP6bBmpqhyb1aHz7zeq5pWLUveuQoTVndTsqqIWVDvr-JTws50nOpf5qhlJcWRC6-LXC3DtG8V3zWJxPIkXwhZHmfC9OvKx7SsNz_dbd4GVa-4UqO1AXMi3ZE0RZ1L4ju?purpose=fullsize',
  'https://images.openai.com/static-rsc-4/3j7zvYrS2FKswQrXQG2i77drzAFfytqa1w6AndXmssHKpXNmybNrgjNzHzlUyf3zx0SVTkLEqqvTcfYG-J51EM-Ze0k6rk1awO6KdTm_V3cDS-EGHZLzD6YQpbnmbhnFKvkYA7puvz4r4R9ll3Myd_QeYgehO7yjbxNaAiuuwFaQ3_xGV6X2GNfhDXyimFXk?purpose=fullsize',
];

const yiMedicineSources = [
  ['倪海厦《天纪》课程板书', '最直接理解他的讲解逻辑，反复看到先后天八卦、河图洛书、天干地支、二十四山和人体方位。'],
  ['《说卦传》', '八卦象意的经典来源，建立自然、人物、身体、动物等核心对应。'],
  ['《易象图说》', '传统图像化理解，把山、水、雷、风、天、地、人物、房屋直接画出来。'],
  ['《焦氏易林》', '提供每卦的意象和故事，例如乾为龙、天、君王，坎为江河、盗贼、陷阱。'],
  ['《周易尚氏学》', '尚秉和的象学体系完整，部分思路与倪海厦讲象相通，但不能混为同一体系。'],
  ['《御纂周易折中》', '清代官方汇编资料，图文较丰富，适合做传统材料校准。'],
];

const tianjiKnowledgeNetwork = [
  ['太极', '一切象意的源头'],
  ['两仪（阴阳）', '分出阴阳动静'],
  ['四象', '少阴、少阳、老阴、老阳形成四类变化态'],
  ['八卦', '连接自然、家庭、人体与方位'],
  ['五行 / 方位 / 家庭', '把象意扩展成关系网络'],
  ['人体 / 季节 / 天干地支', '进入医、易、道的交叉解释'],
  ['中医 / 风水 / 天纪', '在实践层面校准应用边界'],
];

const baguaAtlasTemplate = [
  '卦象（☰ ☷ ☵ 等）',
  '自然景象',
  '人物形象',
  '动物',
  '五行',
  '方位',
  '季节',
  '人体部位',
  '脏腑经络',
  '《说卦传》原文',
  '倪海厦课堂重点',
  '一幅传统国画风格插图',
];

const medicineRepresentatives = [
  {
    group: '现代华人中医与医文化',
    focus: '经典、临床、教育与文化传播',
    people: [
      {
        name: '邓铁涛',
        role: '国医大师、广州中医药大学代表人物，擅长心脑血管疾病、脾胃学说、中医教育与学术传承。',
        works: ['《邓铁涛医学文集》', '《邓铁涛临床经验辑要》', '《邓铁涛医案与研究》', '《邓铁涛学术经验集》'],
        courses: ['广州中医药大学与名老中医传承相关公开资料', '国医大师邓铁涛学术思想与临床经验专题课程 / 讲座'],
        note: '站内重点读其医案、学术经验与中医教育思想，不把单本书当作完整体系。',
      },
      {
        name: '黄煌',
        role: '南京中医药大学经方学者，强调方证、药证、体质与临床可操作的经方医学。',
        works: ['《中医十大类方》', '《经方的魅力》', '《张仲景50味药证》', '《黄煌经方使用手册》', '《黄煌经方医案》', '《黄煌经方沙龙》系列'],
        courses: ['黄煌经方讲座 / 经方医学课程', '黄煌经方医学学术思想公开课与会议讲座', '南京中医药大学经方医学相关课程资料'],
        note: '适合作为经方入门到临床方证思维的路线，但需与经典原文和临床规范并读。',
      },
      {
        name: '孔乐凯',
        role: '中医内容传播与课程型学习入口，适合放在“现代课程化中医学习”线索中观察。',
        works: ['公开可检索的纸质专著资料较少，暂以其公开课程和内容栏目作为学习入口'],
        courses: ['孔乐凯中医基础 / 中医思维类公开课程线索', '孔乐凯经方、舌诊、体质或辨证相关课程线索', '以其官方主页、视频号、课程平台实际标题为准'],
        note: '公开搜索索引不稳定，站内先列为待持续核验人物；后续若提供官方链接，可补全准确课程名和作品名。',
      },
      {
        name: '任应秋',
        role: '中医理论体系建设代表，《内经》研究专家，重视经典文献整理与中医基础理论。',
        works: ['《任应秋医学全集》', '《黄帝内经章句索引》', '《中医各家学说》相关教材与讲义'],
        courses: ['中医基础理论、内经学、各家学说相关教材课程'],
        note: '适合放在经典理论和学院派基础训练中阅读。',
      },
      {
        name: '刘力红',
        role: '经方医学、扶阳学派传播者，海外中文读者影响较大。',
        works: ['《思考中医》', '《开启中医之门》', '《扶阳论坛》相关整理资料'],
        courses: ['经典中医、扶阳学派、经方临床相关公开讲座与课程'],
        note: '适合激发经典中医兴趣，也要与临床教材和原典互相校准。',
      },
      {
        name: '倪海厦',
        role: '美国执业多年，中文互联网与海外华人经方学习入口。',
        works: ['《人纪》系列', '《天纪》系列', '《地纪》系列', '针灸、伤寒、金匮、本草相关讲义'],
        courses: ['《人纪》针灸 / 伤寒 / 金匮 / 神农本草课程', '《天纪》易经、八卦、风水与医易道课程'],
        note: '课程辨识度高，适合作为图像化和系统化入口；医疗应用仍需专业边界。',
      },
      {
        name: '李辛',
        role: '中医临床与身心调养传播者，强调身心状态、生活方式与中医观察。',
        works: ['《儿童健康讲记》', '《经典中医启蒙》', '《回到本源》'],
        courses: ['经典中医启蒙、儿童健康、情志与生活方式调养相关课程'],
        note: '适合连接日常照护、家庭健康和身心状态观察。',
      },
      {
        name: '杨定一',
        role: '身心医学、整体健康与静心实践传播者。',
        works: ['《真原医》', '《全部的你》', '《静坐》', '《丰盛》'],
        courses: ['全部生命系列、静坐与身心整合相关音频 / 课程'],
        note: '站内用于身心整合与静心实践线索，不替代临床医学判断。',
      },
      {
        name: '吴清忠',
        role: '中医保健与大众健康管理传播者。',
        works: ['《人体使用手册》', '《人体复原工程》'],
        courses: ['大众养生、作息、经络保健和生活方式管理相关公开课程'],
        note: '适合作为健康管理入口，具体疾病仍需专业诊疗。',
      },
      {
        name: '张其成',
        role: '中医文化、易学与国学传播者，连接医易道文化脉络。',
        works: ['《中医哲学基础》', '《易道主干》', '《黄帝内经养生智慧》', '《国学五经》相关著作'],
        courses: ['中医哲学、易学、黄帝内经、国学经典相关公开课'],
        note: '适合建立医、易、道、儒之间的文明解释框架。',
      },
    ],
  },
  {
    group: '欧美中医教材与研究',
    focus: '西方医学界、针灸教育和学术研究',
    people: [
      {
        name: 'Ted Kaptchuk',
        role: '哈佛医学院研究者，将中医理论介绍给西方医学界，并研究安慰剂机制。',
        works: ['The Web That Has No Weaver', 'Placebo Studies 相关论文与课程资料'],
        courses: ['Harvard placebo studies / integrative medicine 相关公开讲座'],
        note: '适合理解中医如何被西方医学、人类学和临床研究重新解释。',
      },
      {
        name: 'Giovanni Maciocia',
        role: '欧美中医院校教材代表人物。',
        works: ['The Foundations of Chinese Medicine', 'Diagnosis in Chinese Medicine', 'The Practice of Chinese Medicine', 'Obstetrics and Gynecology in Chinese Medicine'],
        courses: ['Maciocia Online 相关中医基础、诊断、妇科和临床课程'],
        note: '适合作为英文体系化教材入口。',
      },
      {
        name: 'Peter Deadman',
        role: '针灸教材标准参考书代表。',
        works: ['A Manual of Acupuncture', 'Live Well Live Long', 'The Journal of Chinese Medicine 相关资料'],
        courses: ['A Manual of Acupuncture 在线穴位学习资源', '气功、养生与针灸相关课程'],
        note: '适合针灸穴位、经络和养生实践入门。',
      },
      {
        name: 'Volker Scheid',
        role: '医学史、医学人类学和中国医学现代化研究者。',
        works: ['Chinese Medicine in Contemporary China', 'Currents of Tradition in Chinese Medicine', 'Integrating East Asian Medicine into Contemporary Healthcare 相关研究'],
        courses: ['东亚医学史、医学人类学、整合医学相关大学课程与讲座'],
        note: '适合理解中医现代化、制度化和跨文化传播。',
      },
    ],
  },
  {
    group: '东亚传统医学支流',
    focus: '日本汉方、韩国韩医与区域医学传统',
    people: [
      {
        name: '吉益东洞 Yasui Todo',
        role: '江户时代汉方医学代表，重视《伤寒论》和方证对应。',
        works: ['《类聚方》', '《药征》', '《方极》'],
        courses: ['日本汉方、方证对应、古方派相关研究课程'],
        note: '适合比较中国经方与日本古方派的差异。',
      },
      {
        name: '大塚敬节 Keisetsu Otsuka',
        role: '现代日本汉方大师，推动汉方临床整理与教育。',
        works: ['《汉方诊疗医典》', '《症候による漢方治療の実際》', '《漢方医学》相关著作'],
        courses: ['日本汉方诊疗与腹诊相关课程资料'],
        note: '适合连接现代日本汉方临床与教材化表达。',
      },
      {
        name: '李济马 Lee Je-ma',
        role: '韩国四象医学创立者。',
        works: ['《东医寿世保元》'],
        courses: ['韩国四象医学、体质医学相关课程与研究资料'],
        note: '适合比较体质医学在东亚不同传统中的展开。',
      },
      {
        name: 'J.R. Worsley',
        role: '五行针灸 Five Element Acupuncture 创立者，对欧美针灸教育影响较大。',
        works: ['Classical Five-Element Acupuncture', 'Traditional Acupuncture 系列教材与讲义'],
        courses: ['Classical Five Element Acupuncture 训练体系与学院课程'],
        note: '适合观察中医五行理论在欧美针灸教育中的再组织。',
      },
    ],
  },
];

const medicineStudyRoute = [
  ['经典基础', '《黄帝内经》 -> 《伤寒论》 -> 《金匮要略》'],
  ['现代华人体系', '邓铁涛、黄煌、孔乐凯、刘力红、倪海厦、李辛、张其成'],
  ['身心整合', '杨定一、吴清忠与身心调养类材料，注意与临床医学边界分清'],
  ['欧美教材', 'Ted Kaptchuk -> Giovanni Maciocia -> Peter Deadman'],
  ['东亚支流', '吉益东洞 -> 大塚敬节 -> 李济马'],
  ['历史与跨文化研究', 'Volker Scheid 与医学人类学、医学现代化研究'],
];

const layers = [
  {
    level: '低频与危机',
    task: '先活下来，先安全，先稳定。',
    tools: '西医急诊、精神科评估、护理支持、CBT/DBT、睡眠与饮食修复',
  },
  {
    level: '中频与功能',
    task: '重建边界、关系、节律和行动能力。',
    tools: '叙事疗法、萨提亚、教练技术、中医调理、费登奎斯动作觉察',
  },
  {
    level: '高频与创造',
    task: '让生命重新产生意义、表达和服务。',
    tools: '存在主义、戏剧疗愈、艺术疗愈、即兴训练、儒家修身实践',
  },
  {
    level: '甚高频与超越',
    task: '从更大的视角观照自我、关系与世界。',
    tools: '正念内观、佛家观照、道家无为、慈悲实践、伦理自律',
  },
];

const checks = [
  ['情绪基调', '今天主导状态是焦虑、低落、愤怒、麻木、平静，还是有活力？'],
  ['思维模式', '现在更像反刍、灾难化、清晰分析、开放探索，还是意义感断裂？'],
  ['身体感受', '身体是紧绷、疼痛、疲惫、失眠、空掉，还是逐渐回到可感知状态？'],
  ['行为与关系', '今天更倾向退缩、攻击、讨好、求救、稳定协作，还是创造表达？'],
];

const ethics = [
  ['不越界', '本站用于知识导航与自我觉察，不替代医生、护士、心理咨询师或心理治疗师的诊断与治疗。'],
  ['先安全', '若存在自伤风险、严重躯体症状或精神危机，请立即联系当地急救与专业机构。'],
  ['尊重自主', '任何工具都必须服务于当下真实需要，而不是用理论给人贴标签。'],
  ['匹配承受力', '对他人使用任何疗愈语言，都要匹配对方当下承受力与需求。'],
];

const integratedModules = [
  {
    name: '身心冥想',
    role: '稳定、觉察与身体安顿',
    stage: '身心统合',
    summary: '把呼吸、正念、身体觉察、情绪调节和生活化修行放进疗愈路径，作为低风险、可日课化的身心稳定训练。',
    methods: ['呼吸安顿', '正念觉察', '情绪急救', '身体触发地图'],
    boundary: '适合日常稳定与自我觉察；遇到创伤闪回、严重失眠或精神危机时优先专业评估。',
  },
  {
    name: '教练引导',
    role: '目标澄清、资源激活与行动陪跑',
    stage: '功能重建',
    summary: '把倾听、提问、反馈、会谈结构和督导复盘纳入疗愈后的功能恢复与成长支持，帮助人重新形成选择和行动。',
    methods: ['教练姿态', '30 分钟会谈结构', '问题卡', '伦理转介'],
    boundary: '教练不替代心理治疗、医学诊断、法律或财务建议；临床风险与依赖关系需要转介。',
  },
  {
    name: '曼陀罗疗愈',
    role: '象征整理、情绪外化与中心感重建',
    stage: '非语言表达',
    summary: '用圆形结构、色彩、重复图案和中心构图承载混乱体验，把难以言说的情绪转成可观察、可命名、可安放的视觉秩序。',
    methods: ['圆形容器', '色彩记录', '象征命名', '完成感整理'],
    boundary: '适合温和表达与自我整理；若图像内容触发强烈创伤反应，应停止练习并寻求专业支持。',
  },
  {
    name: '舞动疗愈',
    role: '身体释放、关系表达与生命力恢复',
    stage: '身体表达',
    summary: '通过自由动作、节奏、空间方向和身体边界练习，让情绪从僵住、压抑或过度控制中恢复流动。',
    methods: ['自由舞动', '节奏调节', '身体边界', '动作复盘'],
    boundary: '适合低强度身体表达与情绪流动；疼痛、眩晕、解离或强烈失控感出现时应立刻停下。',
  },
];

const spiritualEnergyPrinciples = [
  ['精神能量', '清明度 × 稳定度 × 意义感 × 慈悲度'],
  ['真实效力', '清醒 × 慈悲 × 行动 / 依赖感、逃避现实、自我神化'],
  ['核心转化', '经文或声音 -> 注意力改变 -> 身体状态改变 -> 选择改变 -> 生活改变'],
];

const buddhistTextInsights = [
  ['长期筛选', '经典在数百年至上千年的诵读、解释和实践中被反复检验，留下来的句子通常意义密度高。'],
  ['节律重复', '缓慢诵读让呼吸变稳、内在语言减少，注意力从分散回到统一。'],
  ['观察位置', '从“我正在被痛苦吞没”转向“我看见痛苦、念头与欲望正在生灭”。'],
  ['更大尺度', '无常、缘起、空性和慈悲会降低自我防卫，释放原本用于焦虑和比较的心理资源。'],
  ['实践共同体', '寺院、仪轨、祖师解释和个人困境投射，共同形成延续千年的意义系统。'],
];

const rhythmPractices = [
  {
    name: '梵呗',
    path: '声音路径',
    effect: '用人声、经文、延长呼气和重复节律统一身心。',
    practice: '坐直或站直，呼气时缓慢念一句佛号或短偈，持续 5-10 分钟，结束后静坐 2 分钟。',
    fit: '情绪混乱、语言性思维太多、独处焦虑时。',
  },
  {
    name: '古琴',
    path: '声音路径',
    effect: '在声音出现、变化、消散和空白之间训练细腻觉察。',
    practice: '完整聆听 10 分钟，注意每个声音从出现到消失，不把它当作工作背景音。',
    fit: '信息过载、审美疲劳、需要恢复感受力时。',
  },
  {
    name: '巴赫',
    path: '声音路径',
    effect: '用复调、比例、重复和解决为混乱的大脑建立秩序。',
    practice: '听 10-15 分钟，挑一个声部追踪主题如何返回、紧张如何形成和解决。',
    fit: '脑内混乱、需要恢复理性结构、学习或创作前。',
  },
  {
    name: '格里高利圣咏',
    path: '声音路径',
    effect: '通过单声旋律、长呼气和祈祷语境降低自我噪声。',
    practice: '安静听 8-12 分钟，让呼吸自然跟随乐句，结束后保留 1 分钟安静。',
    fit: '孤独、精神疲惫、需要敬畏感和归属感时。',
  },
  {
    name: '步行',
    path: '身体路径',
    effect: '用双侧交替运动让视觉、呼吸和思绪重新流动。',
    practice: '定心步行数左右脚，开放步行不戴耳机，思考步行只带一个问题出门。',
    fit: '焦虑反刍、感受麻木、需要解决一个真实问题时。',
  },
  {
    name: '呼吸',
    path: '身体路径',
    effect: '用柔和节律和略长呼气降低身体唤醒程度。',
    practice: '鼻吸约 4 秒，鼻呼或轻柔口呼约 6 秒，不憋气，不猛烈深呼吸。',
    fit: '胸口紧、思维加速、工作前或睡前。',
  },
  {
    name: '站桩',
    path: '身体路径',
    effect: '在不动中看见多余用力，恢复重心、边界和持续注意力。',
    practice: '双脚与肩同宽、膝微屈、脊柱舒展，扫描脚底到眼睛，发现紧张只减少 10% 的力。',
    fit: '浮躁、身体感弱、长期坐电脑前、意志忽紧忽松时。',
  },
];

const statePracticeMatches = [
  ['焦虑、胸口紧、思维加速', '呼吸 + 缓慢步行', '先降低身体唤醒。'],
  ['情绪杂乱、孤独、需要安顿', '梵呗或圣咏', '用人声、节律和意义承接情绪。'],
  ['信息过载、感受麻木', '古琴 + 自然步行', '恢复细微感知。'],
  ['思路混乱、缺少结构', '巴赫 + 思考步行', '重建复杂中的秩序。'],
  ['浮躁、身体悬空感', '站桩 + 呼吸', '恢复重心和身体边界。'],
  ['睡前无法停止思考', '古琴或圣咏 + 柔和呼气', '从概念思维转向听觉和身体。'],
  ['工作开始困难', '站桩 3 分钟 + 巴赫 10 分钟', '先稳定，再进入结构性注意。'],
];

const dailyRhythm = [
  ['站桩 5 分钟', '确认自己身在何处。'],
  ['呼吸 5 分钟', '吸气自然，呼气稍长。'],
  ['聆听或唱诵 8 分钟', '每天只选一种音乐或诵读。'],
  ['静默 2 分钟', '观察余韵，不立即看手机。'],
];

export default function Home() {
  return (
    <main>
      <section className="hero" aria-labelledby="hero-title">
        <nav className="topbar" aria-label="主导航">
          <a href="#map">体系地图</a>
          <a href="#integrated">整合模块</a>
          <a href="#spiritual-rhythm">精神节律</a>
          <a href="#eastern">东方心理学</a>
          <a href="#culture">文化心理</a>
          <a href="#thought-route">思想路线</a>
          <a href="#yi-medicine">易医图像</a>
          <a href="#layers">实践层级</a>
          <a href="#state">状态判断</a>
          <a href="#ethics">伦理边界</a>
        </nav>

        <div className="heroGrid">
          <div className="heroCopy">
            <p className="eyebrow">AI Care Coach</p>
            <h1 id="hero-title">医学、护理、心理与身心艺术疗愈整合导航</h1>
            <p className="lead">
              用一套清晰的框架，把西医、中医、护理、心理疗愈、身心冥想、教练引导、曼陀罗、舞动、东方心理学、戏剧疗愈、艺术疗愈与费登奎斯放到同一张实践地图中。
            </p>
            <div className="heroActions" aria-label="页面快捷入口">
              <a className="primaryAction" href="#map">进入体系地图</a>
              <a className="secondaryAction" href="#state">判断当前状态</a>
            </div>
          </div>

          <aside className="principlePanel" aria-label="核心原则">
            <p className="panelLabel">核心心法</p>
            <strong>先稳定，再发展，后超越。</strong>
            <span>任何工具都必须服务于当下真实需要，而不是用理论给人贴标签。</span>
          </aside>
        </div>
      </section>

      <section className="notice" aria-label="医疗与心理安全提醒">
        <strong>重要提醒</strong>
        <p>
          本站用于知识导航与自我觉察，不替代医生、护士、心理咨询师或心理治疗师的诊断与治疗。若存在自伤风险、严重躯体症状或精神危机，请立即联系当地急救与专业机构。
        </p>
      </section>

      <section id="spiritual-rhythm" className="sectionBlock" aria-labelledby="spiritual-rhythm-title">
        <div className="sectionHeader">
          <p className="eyebrow">Spiritual Rhythm Care</p>
          <h2 id="spiritual-rhythm-title">精神能量与身心节律疗愈模块</h2>
          <p>
            佛经、梵呗、古琴、巴赫、圣咏、步行、呼吸与站桩看似来自不同传统，但都在用节律、重复、呼吸和身体秩序，把分散的注意力重新组织起来。
          </p>
        </div>

        <div className="energyFormulaGrid">
          {spiritualEnergyPrinciples.map(([name, formula]) => (
            <article key={name}>
              <span>{name}</span>
              <strong>{formula}</strong>
            </article>
          ))}
        </div>

        <div className="spiritualSplit">
          <article className="spiritualPanel">
            <p className="eyebrow">Why Text Feels Powerful</p>
            <h3>佛经的“高能量”更像心理转化力</h3>
            <p>
              它不必被理解成物理仪器可测的神秘辐射；更准确地说，它持续把人的心理状态从狭窄、混乱和执著，带向开阔、稳定与慈悲。
            </p>
            <div className="insightList">
              {buddhistTextInsights.map(([name, detail]) => (
                <section key={name}>
                  <strong>{name}</strong>
                  <p>{detail}</p>
                </section>
              ))}
            </div>
          </article>

          <article className="spiritualPanel">
            <p className="eyebrow">Daily Cycle</p>
            <h3>摄入、静化、追问、转化</h3>
            <ol className="dailyRhythmList">
              <li>
                <strong>摄入 3 分钟</strong>
                <span>只读一小段，例如“应无所住，而生其心”。</span>
              </li>
              <li>
                <strong>静化 5 分钟</strong>
                <span>放慢呼吸，默念或诵读，暂时不解释。</span>
              </li>
              <li>
                <strong>追问 3 分钟</strong>
                <span>我现在住在哪个念头上？它让我付出什么代价？如果放松一点，我会怎样行动？</span>
              </li>
              <li>
                <strong>转化 4 分钟</strong>
                <span>立刻做一个具体动作：回复、整理、道歉、停止争辩或专注五分钟。</span>
              </li>
            </ol>
          </article>
        </div>

        <div className="rhythmPracticeGrid">
          {rhythmPractices.map((practice) => (
            <article key={practice.name}>
              <div className="cardTopline">
                <h3>{practice.name}</h3>
                <span>{practice.path}</span>
              </div>
              <p>{practice.effect}</p>
              <dl>
                <dt>日常练习</dt>
                <dd>{practice.practice}</dd>
                <dt>适合状态</dt>
                <dd>{practice.fit}</dd>
              </dl>
            </article>
          ))}
        </div>

        <div className="matchTableWrap" aria-label="状态与实践匹配表">
          <table>
            <thead>
              <tr>
                <th>当前状态</th>
                <th>首选方法</th>
                <th>原因</th>
              </tr>
            </thead>
            <tbody>
              {statePracticeMatches.map(([state, method, reason]) => (
                <tr key={state}>
                  <td>{state}</td>
                  <td>{method}</td>
                  <td>{reason}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="dailyPracticePanel">
          <div>
            <p className="eyebrow">20 Minute Practice</p>
            <h3>一个可执行的日课</h3>
            <p>不追求高能体验，只记录练习前身体强度、练习后清明程度，以及接下来最值得做的一件事。</p>
          </div>
          <ol>
            {dailyRhythm.map(([step, detail]) => (
              <li key={step}>
                <strong>{step}</strong>
                <span>{detail}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="integrated" className="sectionBlock" aria-labelledby="integrated-title">
        <div className="sectionHeader">
          <p className="eyebrow">Integrated Modules</p>
          <h2 id="integrated-title">身心冥想、教练引导、曼陀罗与舞动</h2>
          <p>
            身心冥想负责稳定与觉察，教练引导负责目标澄清与行动恢复，曼陀罗负责象征整理，舞动负责身体表达。它们属于医护疗愈中的温和实践和成长支持，而不是替代诊疗。
          </p>
        </div>

        <div className="integratedGrid">
          {integratedModules.map((module) => (
            <article className="integratedCard" key={module.name}>
              <div className="cardTopline">
                <h3>{module.name}</h3>
                <span>{module.stage}</span>
              </div>
              <strong>{module.role}</strong>
              <p>{module.summary}</p>
              <div className="methodTags">
                {module.methods.map((method) => (
                  <span key={method}>{method}</span>
                ))}
              </div>
              <dl>
                <dt>边界</dt>
                <dd>{module.boundary}</dd>
              </dl>
            </article>
          ))}
        </div>
      </section>

      <section id="map" className="sectionBlock" aria-labelledby="map-title">
        <div className="sectionHeader">
          <p className="eyebrow">Cross-system Map</p>
          <h2 id="map-title">交叉联系地图</h2>
          <p>每个体系都有自己的强项。关键不是谁更高级，而是谁更适合此刻的问题、风险和资源。</p>
        </div>

        <div className="domainGrid">
          {domains.map((domain) => (
            <article className={`domainCard ${domain.color}`} key={domain.name}>
              <div className="cardTopline">
                <h3>{domain.name}</h3>
                <span>{domain.stage}</span>
              </div>
              <p>{domain.role}</p>
              <dl>
                <dt>适用信号</dt>
                <dd>{domain.signal}</dd>
              </dl>
            </article>
          ))}
        </div>
      </section>

      <section id="eastern" className="sectionBlock" aria-labelledby="eastern-title">
        <div className="sectionHeader">
          <p className="eyebrow">Eastern Psychology</p>
          <h2 id="eastern-title">东方心理学：身心、文化与精神成长</h2>
          <p>东方心理学以中国、印度、日本等传统文化中的哲学、医学和修行实践为基础，与现代心理学互补。它更强调整体性、内在体验、情志调节和精神成长。</p>
        </div>

        <div className="foundationGrid">
          {easternFoundations.map((foundation) => (
            <article className="foundationCard" key={foundation.name}>
              <h3>{foundation.name}</h3>
              <p>{foundation.summary}</p>
              <div>
                {foundation.anchors.map((anchor) => (
                  <span key={anchor}>{anchor}</span>
                ))}
              </div>
            </article>
          ))}
        </div>

        <div className="practiceGrid">
          {easternPractices.map(([name, method, use]) => (
            <article className="practiceCard" key={name}>
              <span>{method}</span>
              <h3>{name}</h3>
              <p>{use}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="sectionBlock compact" aria-labelledby="modern-title">
        <div className="sectionHeader">
          <p className="eyebrow">Modern Application</p>
          <h2 id="modern-title">现代创新与应用价值</h2>
          <p>东方心理学不是停留在传统概念里，而是可以转成工具、训练、测量和跨文化心理服务。</p>
        </div>

        <div className="modernGrid">
          {easternModern.map(([name, detail]) => (
            <article className="modernCard" key={name}>
              <h3>{name}</h3>
              <p>{detail}</p>
            </article>
          ))}
        </div>

        <div className="valueGrid">
          {easternValues.map(([name, detail]) => (
            <article className="valueCard" key={name}>
              <span>{name}</span>
              <p>{detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="culture" className="sectionBlock compact" aria-labelledby="culture-title">
        <div className="sectionHeader">
          <p className="eyebrow">Culture Psychology</p>
          <h2 id="culture-title">心理与文化相互塑造</h2>
          <p>心理并不始终是文化原因，文化也不是凭空产生。更准确地说，生物学提供可能性，文化塑造表达方式，个人经验又不断修正二者之间的关系。</p>
        </div>

        <div className="cultureGrid">
          {culturePsychologyLayers.map((layer) => (
            <article className="cultureCard" key={layer.name}>
              <h3>{layer.name}</h3>
              <p>{layer.thesis}</p>
              <div>
                {layer.examples.map((example) => (
                  <span key={example}>{example}</span>
                ))}
              </div>
            </article>
          ))}
        </div>

        <div className="stackPanel">
          <div>
            <p className="eyebrow">Multi-layer System</p>
            <h3>从文明到生物机制</h3>
            <p>易、医、道、佛、西方思想和现代科学不是彼此替代，而是在不同层面解释人的心理。</p>
          </div>
          <ol>
            {cultureStack.map(([name, meaning]) => (
              <li key={name}>
                <strong>{name}</strong>
                <span>{meaning}</span>
              </li>
            ))}
          </ol>
        </div>

        <div className="takeawayGrid">
          {cultureTakeaways.map(([name, detail]) => (
            <article className="takeawayCard" key={name}>
              <span>{name}</span>
              <p>{detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="thought-route" className="sectionBlock compact" aria-labelledby="thought-route-title">
        <div className="sectionHeader">
          <p className="eyebrow">Worldview Route</p>
          <h2 id="thought-route-title">思想路线：世界观到 AI</h2>
          <p>不要按学科孤立学习，而按人类如何认识世界的顺序推进。每本书都回答一个更深的问题：世界如何变化，人如何生活，心如何运作，科学如何解释，AI 如何行动。</p>
        </div>

        <div className="thoughtStageGrid">
          {thoughtRouteStages.map((stage) => (
            <article className="thoughtStageCard" key={stage.name}>
              <span>{stage.stage}</span>
              <h3>{stage.name}</h3>
              <strong>{stage.question}</strong>
              <p>{stage.insight}</p>
              <div>
                {stage.books.map((book) => (
                  <em key={book}>{book}</em>
                ))}
              </div>
            </article>
          ))}
        </div>

        <div className="thoughtTreePanel">
          <div>
            <p className="eyebrow">Knowledge Tree</p>
            <h3>整体知识树</h3>
            <p>世界观经由易、道、医、儒、佛进入哲学、科学、心理学，最后汇入 AI。</p>
          </div>
          <ol>
            {thoughtTree.map(([node, works]) => (
              <li key={node}>
                <strong>{node}</strong>
                <span>{works}</span>
              </li>
            ))}
          </ol>
        </div>

        <div className="medicineRoutePanel">
          <div>
            <p className="eyebrow">Medicine Lineage</p>
            <h3>医学代表人物与著作</h3>
            <p>第三阶段“理解生命”不只读经典，也要看中医在华人临床、国际教材、日本汉方、韩国韩医、针灸传播和现代身心疗愈中的不同展开。</p>
          </div>
          <ol>
            {medicineStudyRoute.map(([name, route]) => (
              <li key={name}>
                <strong>{name}</strong>
                <span>{route}</span>
              </li>
            ))}
          </ol>
        </div>

        <div className="medicineRepresentativeGrid">
          {medicineRepresentatives.map((group) => (
            <article key={group.group}>
              <header>
                <span>{group.focus}</span>
                <h3>{group.group}</h3>
              </header>
              <div>
                {group.people.map((person) => (
                  <section key={person.name}>
                    <strong>{person.name}</strong>
                    <p>{person.role}</p>
                    <div className="representativeMeta">
                      <b>代表作品 / 书籍</b>
                      <ul>
                        {person.works.map((work) => (
                          <li key={work}>{work}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="representativeMeta">
                      <b>课程 / 公开资料</b>
                      <ul>
                        {person.courses.map((course) => (
                          <li key={course}>{course}</li>
                        ))}
                      </ul>
                    </div>
                    <em>{person.note}</em>
                  </section>
                ))}
              </div>
            </article>
          ))}
        </div>

        <div className="civilizationBooksGrid">
          {civilizationBooks.map((item) => (
            <article key={item.group}>
              <h3>{item.group}</h3>
              <ol>
                {item.books.map((book) => (
                  <li key={book}>{book}</li>
                ))}
              </ol>
            </article>
          ))}
        </div>

        <div className="sideRouteGrid">
          {sideRoutes.map((route) => (
            <article key={route.name}>
              <span>{route.name}</span>
              <p>{route.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="yi-medicine" className="sectionBlock compact" aria-labelledby="yi-medicine-title">
        <div className="sectionHeader">
          <p className="eyebrow">Yi Medicine Images</p>
          <h2 id="yi-medicine-title">《天纪》八卦图像与医易道知识图谱</h2>
          <p>倪海厦讲八卦不是孤立解释符号，而是建立一个象意网络。学习时要把课程板书、经典对应表、传统图像和医易道应用边界放在一起看。</p>
        </div>

        <div className="tianjiPanel">
          <div>
            <p className="eyebrow">Tianji Visual Thinking</p>
            <h3>倪海厦《天纪》八卦图像学习</h3>
            <p>{tianjiVisualGuide.thesis}</p>
            <p>{tianjiVisualGuide.note}</p>
            <div className="methodTags">
              {tianjiVisualGuide.recurringBoards.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </div>
          <div className="yiImageGrid board">
            {tianjiVisualGuide.boardImages.map((image, index) => (
              <img key={image} src={image} alt={`倪海厦《天纪》课程板书 ${index + 1}`} loading="lazy" />
            ))}
          </div>
        </div>

        <div className="shuoguaTableWrap">
          <table className="shuoguaTable">
            <thead>
              <tr>
                <th>卦</th>
                <th>自然</th>
                <th>人</th>
                <th>身体</th>
                <th>动物</th>
              </tr>
            </thead>
            <tbody>
              {shuoguaBagua.map(([gua, nature, person, body, animal]) => (
                <tr key={gua}>
                  <th>{gua}</th>
                  <td>{nature}</td>
                  <td>{person}</td>
                  <td>{body}</td>
                  <td>{animal}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="yixiangPanel">
          <div className="sectionHeader">
            <p className="eyebrow">Yi Xiang Tu Shuo</p>
            <h3>《易象图说》：用图像进入“象”</h3>
            <p>古人直接把山、水、雷、风、天、地、人物与房屋画出来，正对应“学《易》先学象”的路径。</p>
          </div>
          <div className="yiImageGrid five">
            {yixiangImages.map((image, index) => (
              <img key={image} src={image} alt={`《易象图说》传统图像资料 ${index + 1}`} loading="lazy" />
            ))}
          </div>
        </div>

        <div className="yiSourceGrid">
          {yiMedicineSources.map(([name, detail], index) => (
            <article key={name}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <h3>{name}</h3>
              <p>{detail}</p>
            </article>
          ))}
        </div>

        <div className="thoughtTreePanel yiNetworkPanel">
          <div>
            <p className="eyebrow">Image Network</p>
            <h3>《天纪》真正的知识结构</h3>
            <p>每讲一个卦，都会联想到人体、五行、十二地支、节气、方位、家庭成员、疾病、中药与风水，而不是只解释一个符号。</p>
          </div>
          <ol>
            {tianjiKnowledgeNetwork.map(([node, detail]) => (
              <li key={node}>
                <strong>{node}</strong>
                <span>{detail}</span>
              </li>
            ))}
          </ol>
        </div>

        <div className="atlasPanel">
          <div>
            <p className="eyebrow">Long-term Project</p>
            <h3>八卦象意图谱</h3>
            <p>长期学习医、易、道体系时，可以以倪海厦《天纪》为主线，把每个卦整理成一页。比单纯看视频或文字更容易形成完整的象思维。</p>
          </div>
          <div className="methodTags">
            {baguaAtlasTemplate.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </div>
      </section>

      <section id="layers" className="sectionBlock compact" aria-labelledby="layers-title">
        <div className="sectionHeader">
          <p className="eyebrow">Practice Ladder</p>
          <h2 id="layers-title">从危机到觉醒的实践层级</h2>
        </div>

        <div className="layerList">
          {layers.map((layer, index) => (
            <article className="layerItem" key={layer.level}>
              <span className="layerIndex">{String(index + 1).padStart(2, '0')}</span>
              <div>
                <h3>{layer.level}</h3>
                <p>{layer.task}</p>
              </div>
              <small>{layer.tools}</small>
            </article>
          ))}
        </div>
      </section>

      <section id="state" className="sectionBlock split" aria-labelledby="state-title">
        <div className="sectionHeader">
          <p className="eyebrow">Self Check</p>
          <h2 id="state-title">四维状态判断</h2>
          <p>先判断自己在哪个层级，再选择工具。低频时要保护和稳定，高频时再谈意义与超越。</p>
        </div>

        <div className="checkGrid">
          {checks.map(([check, prompt]) => (
            <article className="checkCard" key={check}>
              <h3>{check}</h3>
              <p>{prompt}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="ethics" className="ethics" aria-labelledby="ethics-title">
        <div>
          <p className="eyebrow">Ethics</p>
          <h2 id="ethics-title">伦理应用心法</h2>
          <p>最高能量的状态，恰恰表现为对最低能量状态的包容与慈悲。</p>
        </div>
        <div className="ethicsGrid">
          {ethics.map(([principle, detail]) => (
            <article key={principle}>
              <strong>{principle}</strong>
              <p>{detail}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
