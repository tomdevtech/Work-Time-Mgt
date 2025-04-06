import apiClient from './apiClient';

export interface Employee {
  employeeNo: string;
  surname: string;
  lastName: string;
  role: string;
  streetName: string;
  zipCode: string;
  city: string;
  totalCountHoursPerMonth: number;
}

export const employeeApi = {
  getAll: async (): Promise<Employee[]> => {
    const response = await apiClient.get('/employees');
    return response.data;
  },

  getById: async (employeeNo: string): Promise<Employee> => {
    const response = await apiClient.get(`/employees/${employeeNo}`);
    return response.data;
  },

  create: async (employee: Omit<Employee, 'employeeNo'>): Promise<Employee> => {
    const response = await apiClient.post('/employees', employee);
    return response.data;
  },

  update: async (employeeNo: string, employee: Partial<Employee>): Promise<Employee> => {
    const response = await apiClient.patch(`/employees/${employeeNo}`, employee);
    return response.data;
  },

  delete: async (employeeNo: string): Promise<void> => {
    await apiClient.delete(`/employees/${employeeNo}`);
  }
}; 