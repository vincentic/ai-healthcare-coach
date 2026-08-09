import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || '/api/v1';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - unwraps response.data
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

// Generic response type
type ApiResponse<T> = Promise<T>;

// Books API
export const booksApi = {
  getAll: (): ApiResponse<any[]> => api.get('/books'),
  getById: (id: number): ApiResponse<any> => api.get(`/books/${id}`),
  create: (data: any) => api.post('/books', data),
  update: (id: number, data: any) => api.put(`/books/${id}`, data),
  delete: (id: number) => api.delete(`/books/${id}`),
  getByStatus: (status: string) => api.get(`/books/status/${status}`),
  getByDimension: (dimension: string) => api.get(`/books/dimension/${dimension}`),
  addDimensionLink: (bookId: number, data: any) => api.post(`/books/${bookId}/dimensions`, data),
  getDimensionLinks: (bookId: number) => api.get(`/books/${bookId}/dimensions`),
  getDimensionLinksByDimension: (dimension: string): ApiResponse<any[]> => api.get(`/books/dimension-links/${dimension}`),
};

// Notes API
export const notesApi = {
  getAll: (): ApiResponse<any[]> => api.get('/notes'),
  getById: (id: number): ApiResponse<any> => api.get(`/notes/${id}`),
  create: (data: any) => api.post('/notes', data),
  update: (id: number, data: any) => api.put(`/notes/${id}`, data),
  delete: (id: number) => api.delete(`/notes/${id}`),
  getByBookId: (bookId: number): ApiResponse<any[]> => api.get(`/notes/book/${bookId}`),
};

// Statistics API
export const statisticsApi = {
  getGrowth: () => api.get('/statistics/growth'),
  getFinancial: (startDate: string, endDate: string) =>
    api.get(`/statistics/financial?startDate=${startDate}&endDate=${endDate}`),
  getHealth: (startDate: string, endDate: string) =>
    api.get(`/statistics/health?startDate=${startDate}&endDate=${endDate}`),
  getTime: (startDate: string, endDate: string) =>
    api.get(`/statistics/time?startDate=${startDate}&endDate=${endDate}`),
  getAll: (startDate: string, endDate: string) =>
    api.get(`/statistics?startDate=${startDate}&endDate=${endDate}`),
};

// Financial API
export const financialApi = {
  createRecord: (data: any) => api.post('/financial/record', data),
  getRecords: (startDate?: string, endDate?: string) =>
    api.get(`/financial/records?startDate=${startDate || ''}&endDate=${endDate || ''}`),
  createIncome: (data: any) => api.post('/financial/income', data),
  getIncome: (startDate?: string, endDate?: string) =>
    api.get(`/financial/income?startDate=${startDate || ''}&endDate=${endDate || ''}`),
  createExpense: (data: any) => api.post('/financial/expense', data),
  getExpenses: (startDate?: string, endDate?: string) =>
    api.get(`/financial/expenses?startDate=${startDate || ''}&endDate=${endDate || ''}`),
  getExpenseStats: (startDate: string, endDate: string) =>
    api.get(`/financial/expenses/stats?startDate=${startDate}&endDate=${endDate}`),
  createCareer: (data: any) => api.post('/financial/career', data),
  getCareerPlans: (status?: string) => api.get(`/financial/career?status=${status || ''}`),
  updateCareerProgress: (id: number, progress: number) =>
    api.put(`/financial/career/${id}/progress`, { progress }),
  createOrUpdateReview: (date: string, data: any) => api.post(`/financial/review/${date}`, data),
  getDailyReview: (date: string) => api.get(`/financial/review/${date}`),
  getMonthlyReview: (year: number, month: number) => api.get(`/financial/review/monthly/${year}/${month}`),
};

// Health API
export const healthApi = {
  createRecord: (data: any) => api.post('/health/record', data),
  getRecords: (type?: string, startDate?: string, endDate?: string): ApiResponse<any[]> =>
    api.get(`/health/records?type=${type || ''}&startDate=${startDate || ''}&endDate=${endDate || ''}`),
  createHygiene: (data: any) => api.post('/health/hygiene', data),
  getHygiene: (type?: string): ApiResponse<any[]> => api.get(`/health/hygiene?type=${type || ''}`),
  createEmotion: (data: any) => api.post('/health/emotion', data),
  getEmotions: (startDate?: string, endDate?: string): ApiResponse<any[]> =>
    api.get(`/health/emotions?startDate=${startDate || ''}&endDate=${endDate || ''}`),
  createDiet: (data: any) => api.post('/health/diet', data),
  getDiets: (date?: string): ApiResponse<any[]> => api.get(`/health/diets?date=${date || ''}`),
  createSleep: (data: any) => api.post('/health/sleep', data),
  getSleep: (startDate?: string, endDate?: string): ApiResponse<any[]> =>
    api.get(`/health/sleep?startDate=${startDate || ''}&endDate=${endDate || ''}`),
  createIntimate: (data: any) => api.post('/health/intimate', data),
  getIntimate: (startDate?: string, endDate?: string): ApiResponse<any[]> =>
    api.get(`/health/intimate?startDate=${startDate || ''}&endDate=${endDate || ''}`),
  getStats: (startDate: string, endDate: string) =>
    api.get(`/health/stats?startDate=${startDate}&endDate=${endDate}`),
};

// Time API
export const timeApi = {
  create: (data: any) => api.post('/time', data),
  getAll: (startDate?: string, endDate?: string, category?: string) =>
    api.get(`/time?startDate=${startDate || ''}&endDate=${endDate || ''}&category=${category || ''}`),
  getByDate: (date: string): ApiResponse<any[]> => api.get(`/time/date/${date}`),
  getStats: (startDate: string, endDate: string) =>
    api.get(`/time/stats?startDate=${startDate}&endDate=${endDate}`),
  delete: (id: number) => api.delete(`/time/${id}`),
};

// Mind API
export const mindApi = {
  createHealing: (data: any) => api.post('/mind/healing', data),
  getHealing: (type?: string, bookId?: number): ApiResponse<any[]> =>
    api.get(`/mind/healing?type=${type || ''}&bookId=${bookId || ''}`),
  createPath: (data: any) => api.post('/mind/path', data),
  getPaths: (status?: string) => api.get(`/mind/path?status=${status || ''}`),
  createKnowledge: (data: any) => api.post('/mind/knowledge', data),
  getKnowledge: (type?: string, bookId?: number): ApiResponse<any[]> =>
    api.get(`/mind/knowledge?type=${type || ''}&bookId=${bookId || ''}`),
  createSynchronicity: (data: any) => api.post('/mind/synchronicity', data),
  getSynchronicity: (type?: string) => api.get(`/mind/synchronicity?type=${type || ''}`),
  getStats: (startDate: string, endDate: string) =>
    api.get(`/mind/stats?startDate=${startDate}&endDate=${endDate}`),
};

// Relationships API
export const relationshipsApi = {
  create: (data: any) => api.post('/relationships', data),
  getAll: (category?: string, startDate?: string, endDate?: string): ApiResponse<any[]> =>
    api.get(`/relationships?category=${category || ''}&startDate=${startDate || ''}&endDate=${endDate || ''}`),
  getByPerson: (name: string) => api.get(`/relationships/person/${name}`),
  getStats: (startDate: string, endDate: string) =>
    api.get(`/relationships/stats?startDate=${startDate}&endDate=${endDate}`),
  delete: (id: number) => api.delete(`/relationships/${id}`),
};

// Work Logs API
export const workLogsApi = {
  create: (data: any) => api.post('/work-logs', data),
  getAll: (module?: string, startDate?: string, endDate?: string): ApiResponse<any[]> =>
    api.get(`/work-logs?module=${module || ''}&startDate=${startDate || ''}&endDate=${endDate || ''}`),
  getStats: (startDate?: string, endDate?: string): ApiResponse<any> =>
    api.get(`/work-logs/stats?startDate=${startDate || ''}&endDate=${endDate || ''}`),
  delete: (id: number) => api.delete(`/work-logs/${id}`),
};

// Daily Reviews API
export const dailyReviewsApi = {
  createOrUpdate: (date: string, data: any) => api.post(`/daily-reviews/${date}`, data),
  getAll: (startDate?: string, endDate?: string): ApiResponse<any[]> =>
    api.get(`/daily-reviews?startDate=${startDate || ''}&endDate=${endDate || ''}`),
  getByDate: (date: string): ApiResponse<any> => api.get(`/daily-reviews/${date}`),
  delete: (id: number) => api.delete(`/daily-reviews/${id}`),
};

export default api;
