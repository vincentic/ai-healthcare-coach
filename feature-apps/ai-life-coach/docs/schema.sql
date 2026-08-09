-- =============================================
-- 五维成长系统 (Five-Dimensional Growth System)
-- 数据库表结构 v0.8
-- =============================================

-- =============================================
-- 核心主体表 - 人的基本信息
-- =============================================
CREATE TABLE IF NOT EXISTS human (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL COMMENT '姓名',
    gender VARCHAR(10) COMMENT '性别',
    birth_date DATE COMMENT '出生日期',
    height_cm INT COMMENT '身高(cm)',
    weight_kg DECIMAL(5,1) COMMENT '体重(kg)',
    blood_type VARCHAR(10) COMMENT '血型',
    occupation VARCHAR(100) COMMENT '职业',
    email VARCHAR(100) COMMENT '邮箱',
    phone VARCHAR(20) COMMENT '电话',
    address VARCHAR(255) COMMENT '地址',
    avatar_url VARCHAR(500) COMMENT '头像URL',
    status VARCHAR(20) DEFAULT 'active' COMMENT '状态:active/inactive',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_name (name),
    INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='用户主体表';

-- =============================================
-- 财务模块表结构 (v0.9)
-- =============================================

-- 财务分类表 (一级/二级分类)
CREATE TABLE IF NOT EXISTS financial_category (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    human_id BIGINT NOT NULL COMMENT '用户ID',
    parent_id BIGINT DEFAULT NULL COMMENT '上级分类ID',
    category_level TINYINT NOT NULL COMMENT '分类层级(1:一级,2:二级)',
    category_name VARCHAR(50) NOT NULL COMMENT '分类名称',
    category_type VARCHAR(20) NOT NULL COMMENT 'income/expense',
    sort_order INT DEFAULT 0 COMMENT '排序',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_human_id (human_id),
    INDEX idx_parent_id (parent_id),
    INDEX idx_category_type (category_type),
    FOREIGN KEY (human_id) REFERENCES human(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='财务分类表';

-- 账户信息表
CREATE TABLE IF NOT EXISTS financial_account (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    human_id BIGINT NOT NULL COMMENT '用户ID',
    account_name VARCHAR(50) NOT NULL COMMENT '账户名称',
    account_type VARCHAR(30) NOT NULL COMMENT 'cash/bank/alipay/wechat/credit_card/investment',
    balance DECIMAL(12,2) DEFAULT 0 COMMENT '余额',
    bank_name VARCHAR(100) COMMENT '开户行',
    card_number VARCHAR(50) COMMENT '卡号',
    notes VARCHAR(500) COMMENT '备注',
    status VARCHAR(20) DEFAULT 'active' COMMENT '状态:active/closed',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_human_id (human_id),
    INDEX idx_account_type (account_type),
    INDEX idx_status (status),
    FOREIGN KEY (human_id) REFERENCES human(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='账户信息表';

-- 负债表
CREATE TABLE IF NOT EXISTS financial_liability (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    human_id BIGINT NOT NULL COMMENT '用户ID',
    liability_type VARCHAR(50) NOT NULL COMMENT 'credit_card/loan/mortgage/car_loan/other',
    liability_name VARCHAR(100) COMMENT '负债名称',
    total_amount DECIMAL(12,2) NOT NULL COMMENT '负债总额',
    remaining_amount DECIMAL(12,2) COMMENT '剩余未还金额',
    interest_rate DECIMAL(5,2) COMMENT '利率(%)',
    repayment_method VARCHAR(50) COMMENT '还款方式',
    repayment_date DATE COMMENT '下次还款日期',
    repayment_amount DECIMAL(12,2) COMMENT '每期还款金额',
    notes VARCHAR(500) COMMENT '备注',
    status VARCHAR(20) DEFAULT 'active' COMMENT '状态:active/cleared',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_human_id (human_id),
    INDEX idx_liability_type (liability_type),
    INDEX idx_status (status),
    FOREIGN KEY (human_id) REFERENCES human(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='负债表';

-- 复盘记账主表
CREATE TABLE IF NOT EXISTS financial_review (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    human_id BIGINT NOT NULL COMMENT '用户ID',
    record_date DATE NOT NULL COMMENT '记录日期',
    record_time TIME NOT NULL COMMENT '记录时间',
    name VARCHAR(255) NOT NULL COMMENT '名称/摘要',
    type VARCHAR(20) NOT NULL COMMENT 'income/expense',
    amount DECIMAL(12,2) NOT NULL COMMENT '金额',
    category_id BIGINT COMMENT '分类ID',
    account_id BIGINT NOT NULL COMMENT '账户ID',
    counterparty VARCHAR(100) COMMENT '对方/交易对象',
    notes VARCHAR(500) COMMENT '备注',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_human_id (human_id),
    INDEX idx_record_date (record_date),
    INDEX idx_type (type),
    INDEX idx_category_id (category_id),
    INDEX idx_account_id (account_id),
    FOREIGN KEY (human_id) REFERENCES human(id) ON DELETE CASCADE,
    FOREIGN KEY (category_id) REFERENCES financial_category(id) ON DELETE SET NULL,
    FOREIGN KEY (account_id) REFERENCES financial_account(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='复盘记账主表';

-- 支出明细表
CREATE TABLE IF NOT EXISTS expense_details (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    review_id BIGINT NOT NULL COMMENT '主表ID',
    human_id BIGINT NOT NULL COMMENT '用户ID',
    item_name VARCHAR(255) COMMENT '商品/服务名称',
    unit_price DECIMAL(10,2) COMMENT '单价',
    quantity DECIMAL(10,2) DEFAULT 1 COMMENT '数量',
    total_amount DECIMAL(12,2) NOT NULL COMMENT '小计金额',
    payment_method VARCHAR(50) COMMENT '付款方式',
    expense_date DATE NOT NULL COMMENT '支出日期',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_review_id (review_id),
    INDEX idx_human_id (human_id),
    INDEX idx_expense_date (expense_date),
    FOREIGN KEY (review_id) REFERENCES financial_review(id) ON DELETE CASCADE,
    FOREIGN KEY (human_id) REFERENCES human(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='支出明细表';

-- 收入明细表
CREATE TABLE IF NOT EXISTS income_details (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    review_id BIGINT NOT NULL COMMENT '主表ID',
    human_id BIGINT NOT NULL COMMENT '用户ID',
    income_source VARCHAR(100) COMMENT '收入来源',
    account_id BIGINT NOT NULL COMMENT '收款账户ID',
    counterparty VARCHAR(100) COMMENT '付款方',
    income_date DATE NOT NULL COMMENT '收入日期',
    notes VARCHAR(500) COMMENT '备注',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_review_id (review_id),
    INDEX idx_human_id (human_id),
    INDEX idx_account_id (account_id),
    FOREIGN KEY (review_id) REFERENCES financial_review(id) ON DELETE CASCADE,
    FOREIGN KEY (human_id) REFERENCES human(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='收入明细表';

-- 事业规划表
CREATE TABLE IF NOT EXISTS career_planning (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    human_id BIGINT NOT NULL COMMENT '用户ID',
    plan_type VARCHAR(50) NOT NULL COMMENT 'goal/skill/target/milestone',
    title VARCHAR(255) NOT NULL COMMENT '标题',
    description TEXT COMMENT '描述',
    target_date DATE COMMENT '目标日期',
    status VARCHAR(20) DEFAULT 'pending' COMMENT 'pending/in_progress/completed',
    progress INT DEFAULT 0 COMMENT '进度百分比',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_human_id (human_id),
    INDEX idx_plan_type (plan_type),
    INDEX idx_status (status),
    INDEX idx_target_date (target_date),
    FOREIGN KEY (human_id) REFERENCES human(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='事业规划表';

-- 每日财务复盘表
CREATE TABLE IF NOT EXISTS daily_financial_review (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    human_id BIGINT NOT NULL COMMENT '用户ID',
    review_date DATE NOT NULL COMMENT '复盘日期',
    total_income DECIMAL(12,2) DEFAULT 0 COMMENT '当日收入总额',
    total_expense DECIMAL(12,2) DEFAULT 0 COMMENT '当日支出总额',
    balance DECIMAL(12,2) DEFAULT 0 COMMENT '结余金额',
    balance_rate DECIMAL(5,2) COMMENT '结余率',
    reflection TEXT COMMENT '反思内容',
    improvement_plan TEXT COMMENT '改善计划',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    UNIQUE INDEX idx_human_review_date (human_id, review_date),
    FOREIGN KEY (human_id) REFERENCES human(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='每日财务复盘表';

-- 财务权限表 (多用户共享时的权限控制)
CREATE TABLE IF NOT EXISTS financial_permission (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    human_id BIGINT NOT NULL COMMENT '用户ID(所有者)',
    shared_human_id BIGINT NOT NULL COMMENT '被授权用户ID',
    permission_type VARCHAR(20) NOT NULL COMMENT 'visible/readonly/editable',
    granted_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    expires_at DATETIME COMMENT '权限过期时间',
    INDEX idx_human_id (human_id),
    INDEX idx_shared_human_id (shared_human_id),
    FOREIGN KEY (human_id) REFERENCES human(id) ON DELETE CASCADE,
    FOREIGN KEY (shared_human_id) REFERENCES human(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='财务权限表';

-- =============================================
-- 预置财务分类数据
-- =============================================
INSERT INTO financial_category (human_id, parent_id, category_level, category_name, category_type, sort_order) VALUES
-- 支出一级分类
(NULL, NULL, 1, '支出', 'expense', 1),
-- 支出二级分类
(NULL, 1, 2, '餐饮', 'expense', 1),
(NULL, 1, 2, '购物', 'expense', 2),
(NULL, 1, 2, '交通', 'expense', 3),
(NULL, 1, 2, '日用', 'expense', 4),
(NULL, 1, 2, '房租', 'expense', 5),
(NULL, 1, 2, '娱乐', 'expense', 6),
(NULL, 1, 2, '医疗', 'expense', 7),
(NULL, 1, 2, '教育', 'expense', 8),
(NULL, 1, 2, '通讯', 'expense', 9),
-- 收入一级分类
(NULL, NULL, 1, '收入', 'income', 2),
-- 收入二级分类
(NULL, 11, 2, '工资', 'income', 1),
(NULL, 11, 2, '奖金', 'income', 2),
(NULL, 11, 2, '副业', 'income', 3),
(NULL, 11, 2, '理财', 'income', 4),
(NULL, 11, 2, '生活补贴', 'income', 5);

-- =============================================
-- 健康模块表结构
-- =============================================

-- 健康记录表 (通用健康数据)
CREATE TABLE IF NOT EXISTS health_records (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    human_id BIGINT NOT NULL COMMENT '用户ID',
    record_type VARCHAR(50) NOT NULL COMMENT 'exercise/sleep/weight/blood_pressure/blood_sugar',
    value DECIMAL(10,2) NOT NULL COMMENT '数值',
    unit VARCHAR(20) COMMENT '单位',
    record_date DATE NOT NULL COMMENT '记录日期',
    notes VARCHAR(500) COMMENT '备注',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_human_id (human_id),
    INDEX idx_record_type (record_type),
    INDEX idx_record_date (record_date),
    FOREIGN KEY (human_id) REFERENCES human(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='健康记录表';

-- 清洁卫生记录表
CREATE TABLE IF NOT EXISTS hygiene_records (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    human_id BIGINT NOT NULL COMMENT '用户ID',
    hygiene_type VARCHAR(50) NOT NULL COMMENT 'menstruation/shave/hair_care/dental/skin_care/body_care/laundry/socks/cleaning_home/eye_care/mind_clearing',
    hair_wash_date DATE COMMENT '洗发日期',
    hair_wash_frequency VARCHAR(20) COMMENT '洗发频率评估(过多/正常/过少)',
    record_date DATE NOT NULL COMMENT '记录日期',
    notes VARCHAR(500) COMMENT '备注',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_human_id (human_id),
    INDEX idx_hygiene_type (hygiene_type),
    INDEX idx_record_date (record_date),
    FOREIGN KEY (human_id) REFERENCES human(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='清洁卫生记录表';

-- 情绪复盘记录表
CREATE TABLE IF NOT EXISTS emotion_records (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    human_id BIGINT NOT NULL COMMENT '用户ID',
    trigger_event VARCHAR(500) COMMENT '引发情绪的事件',
    emotion_type VARCHAR(50) COMMENT '情绪类型',
    emotion_level INT COMMENT '情绪强度1-10',
    inner_needs TEXT COMMENT '内心需要觉察的内容',
    reflection TEXT COMMENT '反思内容',
    record_date DATE NOT NULL COMMENT '记录日期',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_human_id (human_id),
    INDEX idx_emotion_type (emotion_type),
    INDEX idx_emotion_level (emotion_level),
    INDEX idx_record_date (record_date),
    FOREIGN KEY (human_id) REFERENCES human(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='情绪复盘记录表';

-- 运动复盘记录表
CREATE TABLE IF NOT EXISTS exercise_records (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    human_id BIGINT NOT NULL COMMENT '用户ID',
    steps INT COMMENT '步数',
    exercise_type VARCHAR(50) COMMENT '运动类型',
    duration_minutes INT COMMENT '运动时长',
    target_achievement DECIMAL(5,2) COMMENT '目标达成率',
    feeling TEXT COMMENT '运动感受',
    record_date DATE NOT NULL COMMENT '记录日期',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_human_id (human_id),
    INDEX idx_record_date (record_date),
    FOREIGN KEY (human_id) REFERENCES human(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='运动复盘记录表';

-- 饮食复盘记录表
CREATE TABLE IF NOT EXISTS diet_records (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    human_id BIGINT NOT NULL COMMENT '用户ID',
    meal_type VARCHAR(20) NOT NULL COMMENT 'breakfast/lunch/dinner/snack',
    meal_time TIME NOT NULL COMMENT '进食时间',
    location VARCHAR(100) COMMENT '进食地点',
    food_content VARCHAR(500) COMMENT '食物内容',
    food_category VARCHAR(50) COMMENT '食物分类',
    cost DECIMAL(10,2) COMMENT '餐费花费',
    record_date DATE NOT NULL COMMENT '记录日期',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_human_id (human_id),
    INDEX idx_meal_type (meal_type),
    INDEX idx_record_date (record_date),
    FOREIGN KEY (human_id) REFERENCES human(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='饮食复盘记录表';

-- 睡眠复盘记录表
CREATE TABLE IF NOT EXISTS sleep_records (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    human_id BIGINT NOT NULL COMMENT '用户ID',
    sleep_time TIME NOT NULL COMMENT '入睡时间',
    wake_time TIME NOT NULL COMMENT '醒来时间',
    sleep_duration INT COMMENT '睡眠总时长(分钟)',
    fall_asleep_duration INT COMMENT '入睡时长(分钟)',
    night_wake_count INT COMMENT '起夜次数',
    sleep_disturbance VARCHAR(500) COMMENT '睡眠干扰因素',
    record_date DATE NOT NULL COMMENT '记录日期',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_human_id (human_id),
    INDEX idx_record_date (record_date),
    FOREIGN KEY (human_id) REFERENCES human(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='睡眠复盘记录表';

-- 成年性生活记录表
CREATE TABLE IF NOT EXISTS intimate_records (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    human_id BIGINT NOT NULL COMMENT '用户ID',
    record_date DATE NOT NULL COMMENT '记录日期',
    notes VARCHAR(500) COMMENT '备注',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_human_id (human_id),
    INDEX idx_record_date (record_date),
    FOREIGN KEY (human_id) REFERENCES human(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='成年性生活记录表';

-- =============================================
-- 时间模块表结构
-- =============================================

-- 时间记录表
CREATE TABLE IF NOT EXISTS time_records (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    human_id BIGINT NOT NULL COMMENT '用户ID',
    task_name VARCHAR(255) NOT NULL COMMENT '任务名称',
    duration_minutes INT NOT NULL COMMENT '时长(分钟)',
    category VARCHAR(50) COMMENT '分类',
    record_date DATE NOT NULL COMMENT '记录日期',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_human_id (human_id),
    INDEX idx_category (category),
    INDEX idx_record_date (record_date),
    FOREIGN KEY (human_id) REFERENCES human(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='时间记录表';

-- 番茄钟记录表
CREATE TABLE IF NOT EXISTS pomodoro_records (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    human_id BIGINT NOT NULL COMMENT '用户ID',
    task_name VARCHAR(255) NOT NULL COMMENT '任务名称',
    pomodoro_count INT DEFAULT 1 COMMENT '番茄数量',
    duration_minutes INT NOT NULL COMMENT '专注时长',
    break_duration INT COMMENT '休息时长',
    status VARCHAR(20) DEFAULT 'completed' COMMENT 'completed/abandoned',
    record_date DATE NOT NULL COMMENT '记录日期',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_human_id (human_id),
    INDEX idx_record_date (record_date),
    FOREIGN KEY (human_id) REFERENCES human(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='番茄钟记录表';

-- =============================================
-- 心灵模块表结构
-- =============================================

-- 成长路径记录表
CREATE TABLE IF NOT EXISTS growth_path_records (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    human_id BIGINT NOT NULL COMMENT '用户ID',
    path_type VARCHAR(50) NOT NULL COMMENT 'inner_first/outer_first/sync',
    title VARCHAR(255) NOT NULL COMMENT '标题',
    description TEXT COMMENT '描述',
    status VARCHAR(20) DEFAULT 'in_progress' COMMENT '状态',
    record_date DATE NOT NULL COMMENT '记录日期',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_human_id (human_id),
    INDEX idx_path_type (path_type),
    INDEX idx_record_date (record_date),
    FOREIGN KEY (human_id) REFERENCES human(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='成长路径记录表';

-- 知识体验表
CREATE TABLE IF NOT EXISTS knowledge_experience (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    human_id BIGINT NOT NULL COMMENT '用户ID',
    record_type VARCHAR(50) NOT NULL COMMENT 'knowledge/experience/feynman/simon',
    title VARCHAR(255) NOT NULL COMMENT '主题/事件',
    content TEXT COMMENT '内容描述',
    duration_minutes INT COMMENT '时长',
    understanding_level INT COMMENT '理解程度(1-10)',
    reflection TEXT COMMENT '反思',
    record_date DATE NOT NULL COMMENT '记录日期',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_human_id (human_id),
    INDEX idx_record_type (record_type),
    INDEX idx_record_date (record_date),
    FOREIGN KEY (human_id) REFERENCES human(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='知识体验表';

-- 共时性练习表
CREATE TABLE IF NOT EXISTS synchronicity_practice (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    human_id BIGINT NOT NULL COMMENT '用户ID',
    practice_type VARCHAR(50) NOT NULL COMMENT 'flow/meditation/yoga/tao',
    title VARCHAR(255) NOT NULL COMMENT '活动描述',
    duration_minutes INT COMMENT '时长',
    state_description TEXT COMMENT '状态描述',
    balance_level INT COMMENT '平衡程度(1-10)',
    record_date DATE NOT NULL COMMENT '记录日期',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_human_id (human_id),
    INDEX idx_practice_type (practice_type),
    INDEX idx_record_date (record_date),
    FOREIGN KEY (human_id) REFERENCES human(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='共时性练习表';

-- 疗愈实践表 (霍金斯能量层级体系)
CREATE TABLE IF NOT EXISTS healing_practice (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    human_id BIGINT NOT NULL COMMENT '用户ID',
    healing_type VARCHAR(50) NOT NULL COMMENT 'cbt/dbt/eft/emdr/feldenkrais/satir/jung/lacan/mindfulness/shaman/yoga/psychodrama/social_drama/zen/taoism/christian/yoga_royal',
    hawkins_level INT COMMENT '霍金斯能量层级',
    title VARCHAR(255) NOT NULL COMMENT '主题',
    technique VARCHAR(100) COMMENT '具体技术',
    content TEXT COMMENT '内容描述',
    duration_minutes INT COMMENT '时长',
    progress INT DEFAULT 0 COMMENT '进展百分比',
    feeling TEXT COMMENT '感受',
    insight TEXT COMMENT '洞察',
    record_date DATE NOT NULL COMMENT '记录日期',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_human_id (human_id),
    INDEX idx_healing_type (healing_type),
    INDEX idx_hawkins_level (hawkins_level),
    INDEX idx_record_date (record_date),
    FOREIGN KEY (human_id) REFERENCES human(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='疗愈实践表';

-- Phil Stutz The Tools 记录表
CREATE TABLE IF NOT EXISTS phil_stutz_tools (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    human_id BIGINT NOT NULL COMMENT '用户ID',
    tool_name VARCHAR(50) NOT NULL COMMENT 'barry/michel/star/relationship_generator/flow/inverse_prayer/upgrade/inner_banker',
    application_scenario TEXT COMMENT '应用情境',
    content TEXT COMMENT '预见/场景内容',
    energy_level INT COMMENT '能量提升程度(1-10)',
    anxiety_source VARCHAR(255) COMMENT '焦虑来源',
    body_part VARCHAR(100) COMMENT '身体部位',
    symptom_description TEXT COMMENT '症状描述',
    uncertainty_type VARCHAR(100) COMMENT '不确定性类型',
    acceptance_level INT COMMENT '接纳程度(1-10)',
    relationship_object VARCHAR(100) COMMENT '关系对象',
    ideal_scene TEXT COMMENT '理想场景画面',
    activity_type VARCHAR(100) COMMENT '活动类型',
    challenge_level INT COMMENT '挑战程度(1-10)',
    focus_level INT COMMENT '专注程度(1-10)',
    flow_experience TEXT COMMENT '心流体验',
    worry_content TEXT COMMENT '担忧内容',
    transformation_result TEXT COMMENT '转化结果',
    mindset_change TEXT COMMENT '心态转变',
    problem_challenge TEXT COMMENT '问题/挑战',
    upgrade_perspective TEXT COMMENT '升级视角',
    growth_gain TEXT COMMENT '成长收获',
    resource_type VARCHAR(100) COMMENT '整合资源类型',
    value_evaluation TEXT COMMENT '价值评估',
    inner_strength INT COMMENT '内在力量增强(1-10)',
    record_date DATE NOT NULL COMMENT '记录日期',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_human_id (human_id),
    INDEX idx_tool_name (tool_name),
    INDEX idx_record_date (record_date),
    FOREIGN KEY (human_id) REFERENCES human(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='PhilStutz工具记录表';

-- 教练工具记录表
CREATE TABLE IF NOT EXISTS coaching_tools (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    human_id BIGINT NOT NULL COMMENT '用户ID',
    tool_type VARCHAR(50) NOT NULL COMMENT 'thrust_resistance/u_theory/balance_wheel/btc_fight_flight_freeze/nlp/chomsky',
    application_scenario TEXT COMMENT '应用场景',
    driving_forces TEXT COMMENT '推动力因素',
    resistance_forces TEXT COMMENT '阻力因素',
    combined_analysis TEXT COMMENT '合力分析',
    decision_direction VARCHAR(100) COMMENT '决策方向',
    stage VARCHAR(50) COMMENT '阶段(观察/感知/自然流现/共同创造)',
    experience_depth INT COMMENT '体验深度(1-10)',
    collective_wisdom TEXT COMMENT '集体智慧收获',
    dimension_name VARCHAR(100) COMMENT '维度名称',
    dimension_scores TEXT COMMENT '各维度满意度JSON',
    imbalance_area VARCHAR(100) COMMENT '失衡区域',
    adjustment_action TEXT COMMENT '调整行动',
    trigger_event TEXT COMMENT '触发事件',
    response_type VARCHAR(20) COMMENT '反应类型(战/逃/僵)',
    body_response TEXT COMMENT '身体反应',
    regulation_method TEXT COMMENT '调节方法',
    recovery_status VARCHAR(50) COMMENT '恢复情况',
    nlp_technique VARCHAR(100) COMMENT 'NLP技术',
    transformation_effect TEXT COMMENT '转化效果',
    language_pattern TEXT COMMENT '语言模式觉察',
    grammar_practice TEXT COMMENT '转换练习',
    communication_improvement TEXT COMMENT '沟通改善',
    record_date DATE NOT NULL COMMENT '记录日期',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_human_id (human_id),
    INDEX idx_tool_type (tool_type),
    INDEX idx_record_date (record_date),
    FOREIGN KEY (human_id) REFERENCES human(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='教练工具记录表';

-- =============================================
-- 关系模块表结构
-- =============================================

-- 关系记录表 (通用)
CREATE TABLE IF NOT EXISTS relationship_records (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    human_id BIGINT NOT NULL COMMENT '用户ID',
    person_name VARCHAR(100) NOT NULL COMMENT '联系人',
    interaction_type VARCHAR(50) COMMENT '互动类型',
    notes VARCHAR(500) COMMENT '备注',
    record_date DATE NOT NULL COMMENT '记录日期',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_human_id (human_id),
    INDEX idx_person_name (person_name),
    INDEX idx_record_date (record_date),
    FOREIGN KEY (human_id) REFERENCES human(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='关系记录表';

-- 自然关系复盘表
CREATE TABLE IF NOT EXISTS natural_relationships (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    human_id BIGINT NOT NULL COMMENT '用户ID',
    activity_type VARCHAR(50) COMMENT 'hiking/gardening/walk/observation',
    duration_minutes INT COMMENT '时长',
    insight TEXT COMMENT '感悟内容',
    environment_change VARCHAR(500) COMMENT '环境变化观察',
    record_date DATE NOT NULL COMMENT '记录日期',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_human_id (human_id),
    INDEX idx_activity_type (activity_type),
    INDEX idx_record_date (record_date),
    FOREIGN KEY (human_id) REFERENCES human(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='自然关系复盘表';

-- 社会关系复盘表
CREATE TABLE IF NOT EXISTS social_relationships (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    human_id BIGINT NOT NULL COMMENT '用户ID',
    activity_type VARCHAR(50) COMMENT 'volunteer/community/event',
    social_role VARCHAR(100) COMMENT '社会角色',
    role_satisfaction INT COMMENT '角色满意度(1-10)',
    contribution_type VARCHAR(50) COMMENT '贡献类型',
    contribution_impact TEXT COMMENT '影响描述',
    record_date DATE NOT NULL COMMENT '记录日期',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_human_id (human_id),
    INDEX idx_activity_type (activity_type),
    INDEX idx_record_date (record_date),
    FOREIGN KEY (human_id) REFERENCES human(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='社会关系复盘表';

-- 家庭关系复盘表
CREATE TABLE IF NOT EXISTS family_relationships (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    human_id BIGINT NOT NULL COMMENT '用户ID',
    family_member VARCHAR(100) COMMENT '家庭成员',
    interaction_activity VARCHAR(500) COMMENT '互动活动',
    topic VARCHAR(255) COMMENT '谈话话题',
    conversation_result TEXT COMMENT '对话结果',
    family_matter_type VARCHAR(50) COMMENT '家庭事务类型',
    effort_harvest VARCHAR(500) COMMENT '付出/收获',
    record_date DATE NOT NULL COMMENT '记录日期',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_human_id (human_id),
    INDEX idx_family_member (family_member),
    INDEX idx_record_date (record_date),
    FOREIGN KEY (human_id) REFERENCES human(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='家庭关系复盘表';

-- 朋友关系复盘表
CREATE TABLE IF NOT EXISTS friend_relationships (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    human_id BIGINT NOT NULL COMMENT '用户ID',
    friend_name VARCHAR(100) COMMENT '朋友姓名',
    contact_method VARCHAR(50) COMMENT '联系方式',
    contact_content TEXT COMMENT '联系内容',
    maintenance_activity VARCHAR(500) COMMENT '维护活动',
    maintenance_frequency VARCHAR(20) COMMENT '频率评估',
    support_type VARCHAR(50) COMMENT '支持类型',
    support_feeling TEXT COMMENT '感受',
    record_date DATE NOT NULL COMMENT '记录日期',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_human_id (human_id),
    INDEX idx_friend_name (friend_name),
    INDEX idx_record_date (record_date),
    FOREIGN KEY (human_id) REFERENCES human(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='朋友关系复盘表';

-- 同事关系复盘表
CREATE TABLE IF NOT EXISTS colleague_relationships (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    human_id BIGINT NOT NULL COMMENT '用户ID',
    colleague_name VARCHAR(100) COMMENT '同事姓名',
    collaboration_content TEXT COMMENT '协作内容',
    social_activity VARCHAR(500) COMMENT '职场社交活动',
    activity_gain TEXT COMMENT '收获',
    relationship_satisfaction INT COMMENT '满意度(1-10)',
    satisfaction_reason TEXT COMMENT '原因',
    record_date DATE NOT NULL COMMENT '记录日期',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_human_id (human_id),
    INDEX idx_colleague_name (colleague_name),
    INDEX idx_record_date (record_date),
    FOREIGN KEY (human_id) REFERENCES human(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='同事关系复盘表';

-- =============================================
-- BookGrowth 读书模块 (已存在表结构)
-- =============================================

-- 注意: books, notes, reading_progress 表需要在BookGrowth项目中创建
-- 以下为BookGrowth表结构，仅作参考引用

-- 书本表 (BookGrowth)
-- CREATE TABLE IF NOT EXISTS books (
--     id BIGINT PRIMARY KEY AUTO_INCREMENT,
--     human_id BIGINT NOT NULL COMMENT '用户ID',
--     title VARCHAR(255) NOT NULL COMMENT '书名',
--     author VARCHAR(100) COMMENT '作者',
--     total_pages INT COMMENT '总页数',
--     start_date DATE COMMENT '开始阅读日期',
--     finish_date DATE COMMENT '完成日期',
--     reading_gains TEXT COMMENT '读书收获',
--     status VARCHAR(20) DEFAULT 'unread' COMMENT 'unread/reading/finished',
--     rating INT COMMENT '评分1-5',
--     created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
--     updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
--     INDEX idx_human_id (human_id),
--     INDEX idx_status (status),
--     FOREIGN KEY (human_id) REFERENCES human(id) ON DELETE CASCADE
-- ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='书本表';

-- 笔记表 (BookGrowth)
-- CREATE TABLE IF NOT EXISTS notes (
--     id BIGINT PRIMARY KEY AUTO_INCREMENT,
--     human_id BIGINT NOT NULL COMMENT '用户ID',
--     book_id BIGINT NOT NULL COMMENT '书本ID',
--     title VARCHAR(255) NOT NULL COMMENT '笔记标题',
--     content TEXT COMMENT '笔记内容',
--     note_type VARCHAR(50) COMMENT 'note_type:summary/insight/quote',
--     chapter VARCHAR(255) COMMENT '章节',
--     tags VARCHAR(500) COMMENT '标签',
--     note_date DATE COMMENT '笔记日期',
--     page_number INT COMMENT '页码',
--     created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
--     updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
--     INDEX idx_human_id (human_id),
--     INDEX idx_book_id (book_id),
--     INDEX idx_note_date (note_date),
--     FOREIGN KEY (human_id) REFERENCES human(id) ON DELETE CASCADE,
--     FOREIGN KEY (book_id) REFERENCES books(id) ON DELETE CASCADE
-- ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='笔记表';

-- =============================================
-- 视图定义 (用于统计查询)
-- =============================================

-- 月度财务统计视图
CREATE OR REPLACE VIEW v_monthly_financial AS
SELECT
    human_id,
    DATE_FORMAT(record_date, '%Y-%m') AS month,
    type,
    SUM(amount) AS total_amount,
    COUNT(*) AS record_count
FROM financial_records
GROUP BY human_id, DATE_FORMAT(record_date, '%Y-%m'), type;

-- 月度健康统计视图
CREATE OR REPLACE VIEW v_monthly_health AS
SELECT
    human_id,
    record_type,
    DATE_FORMAT(record_date, '%Y-%m') AS month,
    AVG(value) AS avg_value,
    MAX(value) AS max_value,
    MIN(value) AS min_value,
    COUNT(*) AS record_count
FROM health_records
GROUP BY human_id, record_type, DATE_FORMAT(record_date, '%Y-%m');

-- 关系维护统计视图
CREATE OR REPLACE VIEW v_relationship_stats AS
SELECT
    human_id,
    person_name,
    COUNT(*) AS interaction_count,
    MAX(record_date) AS last_interaction
FROM relationship_records
GROUP BY human_id, person_name;
