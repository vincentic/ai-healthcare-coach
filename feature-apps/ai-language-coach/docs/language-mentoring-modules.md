# Language Mentoring 功能模块设计

本文基于 `docs/guide.md` 中的语言学习方法整理：高频词和实用短语、i+1 可理解输入、Shadowing、主动输出、SRS 间隔复习、即时反馈。目标是把当前 Shadow Reading 项目扩展为一个覆盖标准语和方言的语言教育 mentoring 系统。

## 产品定位

Language Mentoring 不是单纯背词或刷题工具，而是一个陪练型语言教练。它根据学习者的目标、水平、兴趣、母语背景和目标变体，持续安排输入、跟读、输出、纠错和复习。

核心公式：

```text
高密度输入 + 高强度输出 + 即时反馈 + 间隔复习
```

## 学习对象模型

每个学习计划围绕以下字段生成：

- `target_language`：目标语言，如英语、日语、德语、粤语。
- `language_variant`：语言变体，如美式英语、英式英语、关西日语、台湾国语、粤语广州音、四川话。
- `native_language`：学习者母语，用于发音迁移和语法对比。
- `goal`：学习目标，如旅行、生存口语、考试、商务、兴趣阅读、家庭沟通。
- `level`：CEFR 或内部等级，拆为词汇、语法、听力、口语、发音维度。
- `scenario_priority`：优先场景，如问候、点餐、问路、购物、工作会议、亲友闲聊。
- `daily_time_budget`：每日可投入时间，用于生成 10/20/45 分钟计划。

## 功能模块

### 1. 目标诊断与学习路径

用途：把“我要学一门语言”拆成可执行的小目标。

能力：

- 通过问卷或对话收集学习目的、水平、兴趣和时间预算。
- 输出 7 天、30 天、90 天学习路径。
- 将目标极窄化，例如从“学会日语”转成“30 天内能完成便利店购物和餐厅点餐”。
- 根据学习行为每周自动调整重点。

### 2. 高频词与实用短语库

用途：优先学习最能立刻使用的表达。

能力：

- 按语言、方言、场景、等级组织高频词和短语。
- 每个词条包含例句、音频、中文释义、用法提醒、常见搭配。
- 支持“以我为中心”的个人词库：职业、爱好、常去地点、常说句子。
- 对方言提供标准语对照，例如普通话、粤语、台语、四川话表达差异。

示例字段：

```json
{
  "language": "zh",
  "variant": "yue-Cantonese-Guangzhou",
  "scenario": "restaurant",
  "phrase": "唔该，俾个餐牌我睇下。",
  "standard_equivalent": "麻烦给我看一下菜单。",
  "translation": "请给我看一下菜单。",
  "register": "polite-casual"
}
```

### 3. i+1 内容选择器

用途：保证材料“刚好有点难”，避免太简单或太挫败。

能力：

- 根据用户当前词汇、语法、发音掌握度选择下一句。
- 每次只引入少量新词、新句式或新音变。
- 标记 `known_items`、`new_items`、`review_items`。
- 方言学习中优先控制音系差异，例如入声、声调、连读、儿化、变调。

### 4. Shadow Reading 四步练习

用途：延续当前项目核心体验：Listen、Shadow、Repeat、Apply。

能力：

- Listen：听 3 遍，关注语义、节奏、重音和语调。
- Shadow：同步跟读，录音并保存。
- Repeat：针对发音、声调、连读、停顿做局部重复。
- Apply：用同一句式替换关键词，生成自己的句子。

方言增强：

- 展示标准语、方言原句、拼音/罗马化/IPA 辅助。
- 对比“同义不同说法”和“可互通/不可互通场景”。
- 标记地区、年龄、正式度差异，避免学到不合适的表达。

### 5. 发音与声调教练

用途：解决口语学习最容易固化的问题。

能力：

- 提供目标音、易错音、最小对立组训练。
- 针对学习者母语给出迁移提醒。
- 支持语调、重音、节奏、连读、弱读、变调。
- 方言支持声调系统、入声韵尾、儿化、鼻化、塞音尾等特征。

示例：

- 粤语：六至九声、入声韵尾 `-p/-t/-k`。
- 闽南语：连续变调。
- 四川话：平翘舌弱化、声调对应关系。
- 美式英语：弱读、连读、flap t。

### 6. 主动输出与角色扮演

用途：把输入内容转成可用语言。

能力：

- 根据场景生成对话角色，如点餐、问路、面试、闲聊。
- 支持“先给模板，再自由发挥”的输出流程。
- AI mentor 在对话中纠错：先保证沟通，再优化自然度。
- 输出后生成更地道版本、礼貌版本、方言版本。

反馈维度：

- 是否表达清楚。
- 是否符合场景和语气。
- 是否有明显语法或词汇错误。
- 是否像本地人会说的话。

### 7. SRS 间隔复习与个人短语银行

用途：把短期练习转成长期记忆。

能力：

- 自动把学过的句子、替换句、错题加入短语银行。
- 根据回忆难度安排复习时间。
- 支持听音选义、看中文说目标语、看场景造句、录音复述。
- 对方言短语记录使用地区、适用人群和标准语对应表达。

### 8. 沉浸内容与素材导入

用途：把真实内容变成可学习材料。

能力：

- 导入文本、字幕、短视频台词、播客转写。
- 自动抽取高频词、未知词、实用短语。
- 生成分级版本：原文、简化版、逐句讲解版。
- 方言内容支持字幕对齐、标准语翻译和文化注释。

### 9. 进度追踪与周复盘

用途：让学习者知道自己在变强，而不是只看到打卡。

能力：

- 统计输入量、输出量、复习完成率、发音难点、场景覆盖度。
- 每周生成复盘：已掌握表达、仍需复习表达、下周重点。
- 按目标展示能力变化，例如“餐厅点餐覆盖 80% 常见场景”。

### 10. 语言与方言资料管理

用途：让系统可扩展到更多语言变体。

能力：

- 维护 `language -> variant -> dialect_region -> scenario -> phrase` 层级。
- 同一语义下允许多个自然表达，而不是唯一标准答案。
- 存储正式度、年龄层、地区、语气、禁忌或过时提醒。
- 标注是否适合初学者、是否适合跨地区使用。

## 方言支持原则

方言不是“标准语换几个词”，需要独立建模。

- 音系独立：声母、韵母、声调、连读、变调都要可配置。
- 表达独立：同一意思可能有不同句式和语气习惯。
- 场景独立：家庭、市场、朋友聊天、正式服务场景的可用表达不同。
- 文化独立：称呼、客套、委婉表达需要单独解释。
- 标准语对照：用于帮助学习者迁移，但不能替代方言原句。

推荐优先支持：

- 中文方言：粤语、闽南语、四川话、上海话、东北话、台湾国语。
- 英语变体：美式、英式、澳式、印度英语。
- 西语变体：西班牙、墨西哥、阿根廷、哥伦比亚。
- 阿拉伯语变体：现代标准阿拉伯语、埃及、黎凡特、海湾。

## 推荐开发优先级

### MVP

1. 扩展语言选择器，加入 `language_variant`。
2. 扩展静态练习数据，支持标准语和方言对照。
3. 在 Shadow Reading 页面展示变体、罗马化、标准语对应表达。
4. 保存 Apply 阶段生成的个人短语。

### 第二阶段

1. 建立短语银行和 SRS 复习接口。
2. 增加发音/声调提示数据结构。
3. 增加角色扮演输出练习。
4. 生成 7 天和 30 天学习计划。

### 第三阶段

1. 接入真实语音识别和发音评分。
2. 支持素材导入和自动抽取高频表达。
3. 建立方言资料管理后台。
4. 根据用户表现动态调整 i+1 内容。

## 建议数据结构

```json
{
  "id": "yue-restaurant-menu-001",
  "target_language": "zh",
  "language_variant": "yue-Cantonese-Guangzhou",
  "scenario": "restaurant",
  "level": "beginner",
  "sentence": "唔该，俾个餐牌我睇下。",
  "romanization": "m4 goi1, bei2 go3 caan1 paai2 ngo5 tai2 haa5.",
  "standard_equivalent": "麻烦给我看一下菜单。",
  "translation": "请给我看一下菜单。",
  "word_tips": [
    {
      "word": "唔该",
      "tip": "礼貌请求，相当于普通话的“麻烦/谢谢”。"
    }
  ],
  "phonology_tips": [
    {
      "focus": "tone",
      "tip": "留意 goi1 的高平声，不要降调。"
    }
  ],
  "register": "polite-casual",
  "region": "Guangzhou/Hong Kong common",
  "i1_focus": ["request phrase", "classifier 个"]
}
```

## 与当前项目的关系

当前项目已经具备：

- Shadow Reading 四步练习页面。
- 多语言和场景选择。
- 后端不可用时的静态 i+1 数据。
- FastAPI 后端路由雏形。

下一步最自然的扩展，是把语言选择从 `language` 升级为 `language + variant`，再把练习数据从单句扩展为带发音、变体、标准语对照和复习信息的 mentor 内容单元。

## 实现蓝图

### 前端模块

1. `LanguageVariantSelector`
   - 在语言选择之外增加变体选择，例如 `English / American`、`Chinese / Cantonese Guangzhou`。
   - 当用户切换变体时，同步更新场景、练习句和发音提示。

2. `MentorSessionWorkspace`
   - 承载完整学习流程：目标、输入、跟读、复述、应用、反馈、复习入口。
   - 可由当前 `PracticeWorkspace` 演进而来，避免重写核心交互。

3. `ShadowReadingSteps`
   - 保留 Listen、Shadow、Repeat、Apply 四步。
   - 新增标准语对照、罗马化/音标、地区标签和正式度标签。

4. `PhraseBank`
   - 展示用户保存的个人短语、错题句、替换句和复习状态。
   - 支持按语言、变体、场景、掌握度筛选。

5. `WeeklyReview`
   - 展示本周输入量、输出量、复习完成率、发音难点和场景覆盖度。
   - 输出下周建议练习方向。

### 后端模块

1. `content`
   - 管理 mentor 内容单元，包括句子、短语、场景、变体、讲解和发音提示。
   - 提供按 `language`、`variant`、`scenario`、`level` 查询的接口。

2. `i1_selector`
   - 根据用户已掌握内容选择下一条 i+1 练习材料。
   - 控制每次新词、新句式和发音重点的数量。

3. `practice_sessions`
   - 记录每次练习的阶段、录音状态、Apply 句子和完成情况。
   - 为复盘和 SRS 提供行为数据。

4. `phrase_bank`
   - 保存用户主动收藏、AI 纠错生成、Apply 阶段生成的短语。
   - 为每条短语记录复习间隔、难度和下次复习时间。

5. `feedback`
   - 生成语义、语法、自然度、礼貌程度和发音提示反馈。
   - 早期可以用规则和静态提示，后续接入 ASR/LLM。

6. `learning_plan`
   - 根据目标诊断生成 7 天、30 天、90 天学习计划。
   - 每周根据练习记录调整场景优先级。

### API 草案

```text
GET  /api/languages
GET  /api/languages/{language}/variants
GET  /api/practice/next?language=&variant=&scenario=&level=
POST /api/practice/sessions
POST /api/practice/sessions/{id}/steps
GET  /api/phrase-bank
POST /api/phrase-bank
PATCH /api/phrase-bank/{id}/review
GET  /api/progress/weekly
POST /api/learning-plan
```

### 代码落地顺序

1. 扩展 `frontend/data/practiceSessions.js`：把静态练习数据升级为 mentor 内容单元。
2. 扩展 `frontend/components/PracticeWorkspace.jsx`：增加语言变体、标准语对照和个人短语保存入口。
3. 扩展 `backend/app/routes/practice.py`：让 `/api/practice` 支持 `variant` 和 i+1 内容选择。
4. 新增 `backend/app/routes/phrase_bank.py`：提供个人短语银行接口。
5. 扩展 `backend/app/engine/selector.py`：实现基于已掌握内容的下一句选择。
6. 扩展 `backend/app/engine/spaced_repetition.py`：把练习结果转成复习计划。
7. 新增周复盘接口和前端 `WeeklyReview` 视图。

---

# Language Mentoring Functional Module Design

This document turns the language-learning method in `docs/guide.md` into a product and implementation plan. The system starts from the current Shadow Reading experience and grows into a mentoring platform for standard languages, regional variants, and dialects.

## Product Positioning

Language Mentoring is not just a vocabulary app or a drill tool. It is a practice-oriented language coach that continuously arranges input, shadowing, output, correction, and review based on the learner's goal, level, interests, native language, and target variant.

Core formula:

```text
High-density input + high-intensity output + instant feedback + spaced review
```

## Learner Profile

Each learning plan is generated from these fields:

- `target_language`: The target language, such as English, Japanese, German, or Cantonese.
- `language_variant`: The target variant, such as American English, British English, Kansai Japanese, Taiwan Mandarin, Guangzhou Cantonese, or Sichuanese.
- `native_language`: The learner's native language, used for pronunciation transfer and grammar contrast.
- `goal`: Travel, survival speaking, exams, business, reading, family communication, or another concrete outcome.
- `level`: CEFR or an internal level split into vocabulary, grammar, listening, speaking, and pronunciation.
- `scenario_priority`: Priority scenarios such as greetings, ordering food, asking directions, shopping, meetings, or family chat.
- `daily_time_budget`: Daily study time, used to generate 10, 20, or 45 minute plans.

## Functional Modules

### 1. Goal Diagnosis And Learning Path

Purpose: turn "I want to learn a language" into executable micro-goals.

Capabilities:

- Collect goal, level, interests, native language, and time budget through a short questionnaire or conversation.
- Generate 7-day, 30-day, and 90-day paths.
- Narrow broad goals into usable scenarios, such as "order food and shop in convenience stores within 30 days."
- Adjust priorities every week based on actual practice behavior.

### 2. High-Frequency Words And Practical Phrase Library

Purpose: prioritize expressions that learners can use immediately.

Capabilities:

- Organize words and phrases by language, variant, scenario, and level.
- Store examples, audio, translation, usage notes, and collocations.
- Support a personal phrase library based on the learner's job, hobbies, places, and daily sentences.
- For dialects, provide standard-language equivalents without treating them as replacements for the dialect expression.

### 3. i+1 Content Selector

Purpose: keep materials just slightly above the learner's current level.

Capabilities:

- Select the next sentence based on vocabulary, grammar, listening, speaking, and pronunciation mastery.
- Introduce only a small number of new words, patterns, or sound changes per exercise.
- Mark `known_items`, `new_items`, and `review_items`.
- For dialects, control phonological gaps such as tones, checked finals, linking, rhotacization, or tone sandhi.

### 4. Shadow Reading Four-Step Practice

Purpose: preserve the core project experience: Listen, Shadow, Repeat, Apply.

Capabilities:

- Listen: hear the sentence multiple times and notice meaning, rhythm, stress, and intonation.
- Shadow: speak along with the audio and save a recording.
- Repeat: isolate difficult pronunciation, tones, linking, rhythm, or pauses.
- Apply: replace keywords and produce a personal sentence from the same pattern.

Dialect enhancements:

- Show the standard-language equivalent, dialect sentence, romanization, pinyin, or IPA when useful.
- Contrast "same meaning, different expression" across variants.
- Mark region, age group, formality, and register to avoid awkward usage.

### 5. Pronunciation And Tone Coach

Purpose: prevent pronunciation errors from becoming permanent habits.

Capabilities:

- Train target sounds, common errors, and minimal pairs.
- Provide native-language-specific transfer reminders.
- Support intonation, stress, rhythm, linking, reduction, tone sandhi, and checked endings.
- Model dialect-specific features such as Cantonese tones, Minnan tone sandhi, Sichuanese tone correspondences, and American English flap `t`.

### 6. Active Output And Role Play

Purpose: convert input into usable language.

Capabilities:

- Generate role-play conversations for scenarios such as restaurants, directions, interviews, or casual chat.
- Start with templates, then gradually move into free output.
- Correct output in a mentor style: communication first, naturalness second.
- Generate clearer, more natural, more polite, or more local versions of the same sentence.

### 7. SRS Review And Personal Phrase Bank

Purpose: turn short-term practice into long-term memory.

Capabilities:

- Automatically save learned sentences, Apply sentences, and corrected mistakes into a phrase bank.
- Schedule reviews based on recall difficulty.
- Support listening-to-meaning, Chinese-to-target-language recall, scenario-based sentence creation, and recorded retelling.
- For dialect phrases, store region, user group, register, and standard-language equivalent.

### 8. Immersive Content Import

Purpose: turn real-world materials into learnable content.

Capabilities:

- Import text, subtitles, video lines, podcast transcripts, and user notes.
- Extract high-frequency words, unknown words, and useful phrases.
- Generate graded versions: original, simplified, and line-by-line explanation.
- For dialect materials, align subtitles, translate into the standard language, and add cultural notes.

### 9. Progress Tracking And Weekly Review

Purpose: show real progress instead of only check-ins.

Capabilities:

- Track input volume, output volume, review completion, pronunciation issues, and scenario coverage.
- Generate weekly reviews with mastered expressions, weak expressions, and next-week priorities.
- Display progress by goal, such as "80% coverage of common restaurant-ordering scenarios."

### 10. Language And Dialect Data Management

Purpose: make the system extensible to more language variants.

Capabilities:

- Maintain a `language -> variant -> dialect_region -> scenario -> phrase` hierarchy.
- Allow multiple natural expressions for the same meaning instead of one "correct" answer.
- Store formality, age group, region, tone, taboo, and outdated-expression warnings.
- Mark whether an expression is beginner-friendly or usable across regions.

## Implementation Blueprint

### Frontend

- `LanguageVariantSelector`: choose both language and regional variant.
- `MentorSessionWorkspace`: orchestrate goal, input, shadowing, output, feedback, and review.
- `ShadowReadingSteps`: extend the existing four-step interface with variant metadata and pronunciation notes.
- `PhraseBank`: manage saved phrases, corrected mistakes, Apply sentences, and SRS state.
- `WeeklyReview`: show progress, weak spots, and next-week recommendations.

### Backend

- `content`: store mentor content units and query them by language, variant, scenario, and level.
- `i1_selector`: pick the next practice item based on known, new, and review items.
- `practice_sessions`: record step completion, recordings, Apply sentences, and outcomes.
- `phrase_bank`: store personal phrases and review scheduling fields.
- `feedback`: provide semantic, grammar, naturalness, politeness, and pronunciation feedback.
- `learning_plan`: generate and update 7-day, 30-day, and 90-day plans.

### Suggested APIs

```text
GET  /api/languages
GET  /api/languages/{language}/variants
GET  /api/practice/next?language=&variant=&scenario=&level=
POST /api/practice/sessions
POST /api/practice/sessions/{id}/steps
GET  /api/phrase-bank
POST /api/phrase-bank
PATCH /api/phrase-bank/{id}/review
GET  /api/progress/weekly
POST /api/learning-plan
```

### Development Priority

MVP:

1. Upgrade language selection from `language` to `language + variant`.
2. Extend static practice data with standard-language equivalents, romanization, pronunciation tips, and review metadata.
3. Show variant-aware content in the Shadow Reading page.
4. Save Apply-stage sentences into a personal phrase bank.

Phase 2:

1. Add SRS review APIs and phrase-bank UI.
2. Add pronunciation and tone hint structures.
3. Add role-play output practice.
4. Generate 7-day and 30-day learning plans.

Phase 3:

1. Integrate speech recognition and pronunciation scoring.
2. Support content import and automatic phrase extraction.
3. Build a language and dialect data management interface.
4. Dynamically adjust i+1 content based on user performance.
