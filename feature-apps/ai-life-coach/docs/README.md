# 五维成长系统设计文档

## 文件说明

| 文件 | 说明 | 使用方式 |
|------|------|----------|
| `schema.sql` | 完整数据库DDL脚本 | 直接在MySQL中执行创建所有表 |
| `uml.jpg` | UML实体关系图 | 直接查看数据库表结构 |
| `uml.puml` | PlantUML格式UML图 | 使用PlantUML工具导出其他格式 |
| `uml.dot` | Graphviz格式图 | 可用dot命令生成其他格式 |
| `design.html` | 界面原型HTML版 | 浏览器直接打开查看设计 |

## 核心设计

**human表** - 所有记录表通过 `human_id` 关联到单一用户主体，实现多用户数据隔离。

## 数据库表清单 (v0.9)

### 核心表 (1表)
- `human` - 用户主体表

### 财务模块 (10表)
- `financial_category` - 财务分类(一级/二级)
- `financial_account` - 账户信息表
- `financial_liability` - 负债表
- `financial_review` - 复盘记账主表
- `expense_details` - 支出明细表
- `income_details` - 收入明细表
- `career_planning` - 事业规划
- `daily_financial_review` - 每日财务复盘
- `financial_permission` - 财务权限表

### 健康模块 (7表)
- `health_records` - 通用健康记录
- `hygiene_records` - 清洁卫生记录
- `emotion_records` - 情绪复盘
- `exercise_records` - 运动复盘
- `diet_records` - 饮食复盘
- `sleep_records` - 睡眠复盘
- `intimate_records` - 成年性生活记录

### 时间模块 (2表)
- `time_records` - 时间记录
- `pomodoro_records` - 番茄钟记录

### 心灵模块 (6表)
- `growth_path_records` - 成长路径
- `knowledge_experience` - 知识体验
- `synchronicity_practice` - 共时性练习
- `healing_practice` - 疗愈实践
- `phil_stutz_tools` - Phil Stutz工具
- `coaching_tools` - 教练工具

### 关系模块 (6表)
- `relationship_records` - 通用关系记录
- `natural_relationships` - 自然关系
- `social_relationships` - 社会关系
- `family_relationships` - 家庭关系
- `friend_relationships` - 朋友关系
- `colleague_relationships` - 同事关系

### BookGrowth已有 (3表)
- `books` - 书籍
- `notes` - 笔记
- `reading_progress` - 阅读进度

**总计: 30表 + 3视图**

## 生成UML图

```bash
# 使用Graphviz生成
dot -Tjpg uml.dot -o uml.jpg
```
