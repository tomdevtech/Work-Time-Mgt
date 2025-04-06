import apiClient from './apiClient';

export interface TimeEntry {
  lineNo: string;
  employeeNo: string;
  activityCode: string;
  description: string;
  startTime: Date;
  endTime: Date;
}

export const timeManagementApi = {
  getAll: async (): Promise<TimeEntry[]> => {
    const response = await apiClient.get('/time-management');
    return response.data;
  },

  getById: async (lineNo: string): Promise<TimeEntry> => {
    const response = await apiClient.get(`/time-management/${lineNo}`);
    return response.data;
  },

  create: async (timeEntry: Omit<TimeEntry, 'lineNo'>): Promise<TimeEntry> => {
    const response = await apiClient.post('/time-management', timeEntry);
    return response.data;
  },

  update: async (lineNo: string, timeEntry: Partial<TimeEntry>): Promise<TimeEntry> => {
    const response = await apiClient.patch(`/time-management/${lineNo}`, timeEntry);
    return response.data;
  },

  delete: async (lineNo: string): Promise<void> => {
    await apiClient.delete(`/time-management/${lineNo}`);
  }
}; 