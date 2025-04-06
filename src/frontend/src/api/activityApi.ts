import apiClient from './apiClient';

export interface Activity {
  code: string;
  description: string;
  totalHoursAvailable: number;
  ignoreTotalHoursAvailableCheck: boolean;
  totalHoursBooked?: number;
}

export const activityApi = {
  getAll: async (): Promise<Activity[]> => {
    const response = await apiClient.get('/activities');
    return response.data;
  },

  getById: async (code: string): Promise<Activity> => {
    const response = await apiClient.get(`/activities/${code}`);
    return response.data;
  },

  create: async (activity: Omit<Activity, 'code'>): Promise<Activity> => {
    const response = await apiClient.post('/activities', activity);
    return response.data;
  },

  update: async (code: string, activity: Partial<Activity>): Promise<Activity> => {
    const response = await apiClient.patch(`/activities/${code}`, activity);
    return response.data;
  },

  delete: async (code: string): Promise<void> => {
    await apiClient.delete(`/activities/${code}`);
  }
}; 