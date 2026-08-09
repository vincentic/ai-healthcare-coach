-- Five-Dimensional Growth System Database Schema
-- MySQL 8.0

CREATE DATABASE IF NOT EXISTS growth_system CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE growth_system;

-- Books Table
CREATE TABLE IF NOT EXISTS books (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL,
    totalPages INT DEFAULT 0,
    startDate DATE,
    finishDate DATE,
    readingGains TEXT,
    status VARCHAR(20) DEFAULT 'todo',
    rating INT,
    category VARCHAR(50),
    description TEXT,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Notes Table
CREATE TABLE IF NOT EXISTS notes (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    bookId BIGINT NOT NULL,
    noteDate DATE,
    pageNumber INT,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    noteType VARCHAR(20) DEFAULT 'reflection',
    chapter VARCHAR(255),
    tags VARCHAR(255),
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (bookId) REFERENCES books(id) ON DELETE CASCADE
);

-- Book Dimension Links Table
CREATE TABLE IF NOT EXISTS book_dimension_links (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    bookId BIGINT NOT NULL,
    dimension VARCHAR(20) NOT NULL,
    impactLevel INT DEFAULT 3,
    impactDescription TEXT,
    appliedAction TEXT,
    changeResult TEXT,
    readingGains TEXT,
    recordDate DATE NOT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (bookId) REFERENCES books(id) ON DELETE CASCADE
);

-- Financial Records Table
CREATE TABLE IF NOT EXISTS financial_records (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    type VARCHAR(20) NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    category VARCHAR(50),
    description VARCHAR(255),
    recordDate DATE NOT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Income Sources Table
CREATE TABLE IF NOT EXISTS income_sources (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    sourceType VARCHAR(50) NOT NULL,
    sourceName VARCHAR(100),
    amount DECIMAL(10,2) NOT NULL,
    incomeDate DATE NOT NULL,
    sourceUnit VARCHAR(100),
    description VARCHAR(255),
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Expense Analysis Table
CREATE TABLE IF NOT EXISTS expense_analysis (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    expenseType VARCHAR(50) NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    threshold DECIMAL(10,2),
    isLargeExpense TINYINT DEFAULT 0,
    expenseDate DATE NOT NULL,
    notes VARCHAR(500),
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Career Planning Table
CREATE TABLE IF NOT EXISTS career_planning (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    planType VARCHAR(50) NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    targetDate DATE,
    status VARCHAR(20) DEFAULT 'pending',
    progress INT DEFAULT 0,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Daily Financial Review Table
CREATE TABLE IF NOT EXISTS daily_financial_review (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    reviewDate DATE NOT NULL UNIQUE,
    totalIncome DECIMAL(10,2) DEFAULT 0,
    totalExpense DECIMAL(10,2) DEFAULT 0,
    balance DECIMAL(10,2) DEFAULT 0,
    balanceRate DECIMAL(5,2),
    reflection TEXT,
    improvementPlan TEXT,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Daily Reviews Table
CREATE TABLE IF NOT EXISTS daily_reviews (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    reviewDate DATE NOT NULL UNIQUE,
    contactReview TEXT,
    sleepReview TEXT,
    dietReview TEXT,
    accountReview TEXT,
    cleaningReview TEXT,
    emotionReview TEXT,
    exerciseReview TEXT,
    timeReview TEXT,
    bodyReview TEXT,
    readingReview TEXT,
    inputReview TEXT,
    outputReview TEXT,
    newKnowledgeReview TEXT,
    dreamReview TEXT,
    summary TEXT,
    nextAction TEXT,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Health Records Table
CREATE TABLE IF NOT EXISTS health_records (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    recordType VARCHAR(20) DEFAULT 'health',
    person VARCHAR(100),
    location VARCHAR(255),
    content TEXT,
    exerciseType VARCHAR(20),
    gains TEXT,
    recordDate DATE NOT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Hygiene Records Table
CREATE TABLE IF NOT EXISTS hygiene_records (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    hygieneType VARCHAR(50) NOT NULL,
    recordDate DATE NOT NULL,
    gains TEXT,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Emotion Records Table
CREATE TABLE IF NOT EXISTS emotion_records (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    triggerEvent VARCHAR(255),
    emotionType VARCHAR(50),
    emotionLevel INT,
    innerNeeds TEXT,
    reflection TEXT,
    recordDate DATE NOT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Diet Records Table
CREATE TABLE IF NOT EXISTS diet_records (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    mealType VARCHAR(20) NOT NULL,
    mealTime TIME NOT NULL,
    location VARCHAR(100),
    foodContent VARCHAR(255),
    foodCategory VARCHAR(50),
    cost DECIMAL(10,2),
    recordDate DATE NOT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Sleep Records Table
CREATE TABLE IF NOT EXISTS sleep_records (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    sleepTime TIME NOT NULL,
    wakeTime TIME NOT NULL,
    sleepDuration INT,
    fallAsleepDuration INT,
    nightWakeCount INT DEFAULT 0,
    sleepDisturbance VARCHAR(255),
    recordDate DATE NOT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Intimate Records Table
CREATE TABLE IF NOT EXISTS intimate_records (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    recordDate DATE NOT NULL,
    notes VARCHAR(500),
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Time Records Table
CREATE TABLE IF NOT EXISTS time_records (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    taskName VARCHAR(255) NOT NULL,
    durationMinutes INT NOT NULL,
    category VARCHAR(50),
    recordDate DATE NOT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Healing Practice Table
CREATE TABLE IF NOT EXISTS healing_practice (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    bookId BIGINT,
    healingType VARCHAR(50) NOT NULL,
    title VARCHAR(255) NOT NULL,
    technique VARCHAR(100),
    content TEXT,
    durationMinutes INT,
    progress INT DEFAULT 0,
    feeling TEXT,
    insight TEXT,
    recordDate DATE NOT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (bookId) REFERENCES books(id) ON DELETE SET NULL
);

-- Growth Path Records Table
CREATE TABLE IF NOT EXISTS growth_path_records (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    pathType VARCHAR(50) NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    status VARCHAR(20) DEFAULT 'in_progress',
    recordDate DATE NOT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Knowledge Experience Table
CREATE TABLE IF NOT EXISTS knowledge_experience (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    recordType VARCHAR(255) NOT NULL,
    gains TEXT,
    recordDate DATE NOT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Synchronicity Practice Table
CREATE TABLE IF NOT EXISTS synchronicity_practice (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    practiceType VARCHAR(50) NOT NULL,
    title VARCHAR(255) NOT NULL,
    durationMinutes INT,
    stateDescription TEXT,
    balanceLevel INT,
    recordDate DATE NOT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Relationship Records Table
CREATE TABLE IF NOT EXISTS relationship_records (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    personName VARCHAR(100) NOT NULL,
    interactionType VARCHAR(50),
    category VARCHAR(50),
    notes TEXT,
    recordDate DATE NOT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for common queries
CREATE INDEX idx_books_status ON books(status);
CREATE INDEX idx_books_finishDate ON books(finishDate);
CREATE INDEX idx_notes_bookId ON notes(bookId);
CREATE INDEX idx_notes_noteDate ON notes(noteDate);
CREATE INDEX idx_financial_recordDate ON financial_records(recordDate);
CREATE INDEX idx_health_recordDate ON health_records(recordDate);
CREATE INDEX idx_time_recordDate ON time_records(recordDate);
CREATE INDEX idx_healing_recordDate ON healing_practice(recordDate);
CREATE INDEX idx_relationship_recordDate ON relationship_records(recordDate);
