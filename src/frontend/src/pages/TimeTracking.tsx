import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { timeManagementApi, TimeEntry } from '../api';
import { employeeApi, Employee } from '../api';
import { activityApi, Activity } from '../api';

const validationSchema = yup.object({
  employeeNo: yup.string().required('Employee is required'),
  activityCode: yup.string().required('Activity is required'),
  description: yup.string().required('Description is required'),
  startTime: yup.date().required('Start time is required'),
  endTime: yup
    .date()
    .required('End time is required')
    .min(yup.ref('startTime'), 'End time must be after start time'),
});

const TimeTracking: React.FC = () => {
  const [timeEntries, setTimeEntries] = useState<TimeEntry[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);

  const formik = useFormik({
    initialValues: {
      employeeNo: '',
      activityCode: '',
      description: '',
      startTime: new Date(),
      endTime: new Date(),
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        await timeManagementApi.create(values);
        fetchTimeEntries();
        formik.resetForm();
      } catch (error) {
        console.error('Error saving time entry:', error);
      }
    },
  });

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

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Time Tracking
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              New Time Entry
            </Typography>
            <form onSubmit={formik.handleSubmit}>
              <TextField
                fullWidth
                margin="normal"
                select
                label="Employee"
                name="employeeNo"
                value={formik.values.employeeNo}
                onChange={formik.handleChange}
                error={formik.touched.employeeNo && Boolean(formik.errors.employeeNo)}
                helperText={formik.touched.employeeNo && formik.errors.employeeNo}
                SelectProps={{
                  native: true,
                }}
              >
                <option value="">Select Employee</option>
                {employees.map((employee) => (
                  <option key={employee.employeeNo} value={employee.employeeNo}>
                    {employee.surname} {employee.lastName}
                  </option>
                ))}
              </TextField>

              <TextField
                fullWidth
                margin="normal"
                select
                label="Activity"
                name="activityCode"
                value={formik.values.activityCode}
                onChange={formik.handleChange}
                error={formik.touched.activityCode && Boolean(formik.errors.activityCode)}
                helperText={formik.touched.activityCode && formik.errors.activityCode}
                SelectProps={{
                  native: true,
                }}
              >
                <option value="">Select Activity</option>
                {activities.map((activity) => (
                  <option key={activity.code} value={activity.code}>
                    {activity.description}
                  </option>
                ))}
              </TextField>

              <TextField
                fullWidth
                margin="normal"
                label="Description"
                name="description"
                value={formik.values.description}
                onChange={formik.handleChange}
                error={formik.touched.description && Boolean(formik.errors.description)}
                helperText={formik.touched.description && formik.errors.description}
              />

              <DateTimePicker
                label="Start Time"
                value={formik.values.startTime}
                onChange={(date) => formik.setFieldValue('startTime', date)}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    margin: 'normal',
                    error: formik.touched.startTime && Boolean(formik.errors.startTime),
                    helperText: formik.touched.startTime && formik.errors.startTime,
                  },
                }}
              />

              <DateTimePicker
                label="End Time"
                value={formik.values.endTime}
                onChange={(date) => formik.setFieldValue('endTime', date)}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    margin: 'normal',
                    error: formik.touched.endTime && Boolean(formik.errors.endTime),
                    helperText: formik.touched.endTime && formik.errors.endTime,
                  },
                }}
              />

              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 2 }}
              >
                Add Time Entry
              </Button>
            </form>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Recent Time Entries
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Employee</TableCell>
                    <TableCell>Activity</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell>Start Time</TableCell>
                    <TableCell>End Time</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {timeEntries.map((entry) => {
                    const employee = employees.find(
                      (e) => e.employeeNo === entry.employeeNo
                    );
                    const activity = activities.find(
                      (a) => a.code === entry.activityCode
                    );
                    return (
                      <TableRow key={entry.lineNo}>
                        <TableCell>
                          {employee
                            ? `${employee.surname} ${employee.lastName}`
                            : entry.employeeNo}
                        </TableCell>
                        <TableCell>
                          {activity ? activity.description : entry.activityCode}
                        </TableCell>
                        <TableCell>{entry.description}</TableCell>
                        <TableCell>
                          {new Date(entry.startTime).toLocaleString()}
                        </TableCell>
                        <TableCell>
                          {new Date(entry.endTime).toLocaleString()}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default TimeTracking; 