import React, { useEffect, useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { timeManagementApi, TimeEntry } from '../api';
import { employeeApi, Employee } from '../api';
import { activityApi, Activity } from '../api';

const Dashboard: React.FC = () => {
  const [timeEntries, setTimeEntries] = useState<TimeEntry[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    fetchTimeEntries();
    fetchEmployees();
    fetchActivities();
  }, []);

  const fetchTimeEntries = async () => {
    try {
      const data = await timeManagementApi.getAll();
      setTimeEntries(data);
    } catch (error) {
      console.error('Error fetching time entries:', error);
    }
  };

  const fetchEmployees = async () => {
    try {
      const data = await employeeApi.getAll();
      setEmployees(data);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  const fetchActivities = async () => {
    try {
      const data = await activityApi.getAll();
      setActivities(data);
    } catch (error) {
      console.error('Error fetching activities:', error);
    }
  };

  const getTotalHours = () => {
    return timeEntries.reduce((total, entry) => {
      const startTime = new Date(entry.startTime);
      const endTime = new Date(entry.endTime);
      const hours = (endTime.getTime() - startTime.getTime()) / (1000 * 60 * 60);
      return total + hours;
    }, 0);
  };

  const getEmployeeHours = (employeeNo: string) => {
    return timeEntries
      .filter((entry) => entry.employeeNo === employeeNo)
      .reduce((total, entry) => {
        const startTime = new Date(entry.startTime);
        const endTime = new Date(entry.endTime);
        const hours = (endTime.getTime() - startTime.getTime()) / (1000 * 60 * 60);
        return total + hours;
      }, 0);
  };

  const getActivityHours = (activityCode: string) => {
    return timeEntries
      .filter((entry) => entry.activityCode === activityCode)
      .reduce((total, entry) => {
        const startTime = new Date(entry.startTime);
        const endTime = new Date(entry.endTime);
        const hours = (endTime.getTime() - startTime.getTime()) / (1000 * 60 * 60);
        return total + hours;
      }, 0);
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Total Hours
              </Typography>
              <Typography variant="h4">{getTotalHours().toFixed(2)}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Total Employees
              </Typography>
              <Typography variant="h4">{employees.length}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Total Activities
              </Typography>
              <Typography variant="h4">{activities.length}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Hours by Employee
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Employee</TableCell>
                    <TableCell align="right">Hours</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {employees.map((employee) => (
                    <TableRow key={employee.employeeNo}>
                      <TableCell>
                        {employee.surname} {employee.lastName}
                      </TableCell>
                      <TableCell align="right">
                        {getEmployeeHours(employee.employeeNo).toFixed(2)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Hours by Activity
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Activity</TableCell>
                    <TableCell align="right">Hours</TableCell>
                    <TableCell align="right">Available</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {activities.map((activity) => (
                    <TableRow key={activity.code}>
                      <TableCell>{activity.description}</TableCell>
                      <TableCell align="right">
                        {getActivityHours(activity.code).toFixed(2)}
                      </TableCell>
                      <TableCell align="right">
                        {activity.totalHoursAvailable}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard; 