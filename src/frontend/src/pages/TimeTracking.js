import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import axios from 'axios';
import { useFormik } from 'formik';
import * as yup from 'yup';

const validationSchema = yup.object({
  employeeNo: yup.string().required('Employee number is required'),
  activityCode: yup.string().required('Activity code is required'),
  description: yup.string().required('Description is required'),
  startTime: yup.date().required('Start time is required'),
  endTime: yup
    .date()
    .required('End time is required')
    .min(yup.ref('startTime'), 'End time must be after start time'),
});

function TimeTracking() {
  const [employees, setEmployees] = useState([]);
  const [activities, setActivities] = useState([]);
  const [timeEntries, setTimeEntries] = useState([]);

  const formik = useFormik({
    initialValues: {
      lineNo: '',
      employeeNo: '',
      activityCode: '',
      description: '',
      startTime: new Date(),
      endTime: new Date(),
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        await axios.post('http://localhost:3000/api/time-management', values);
        fetchTimeEntries();
        formik.resetForm();
      } catch (error) {
        console.error('Error saving time entry:', error);
      }
    },
  });

  useEffect(() => {
    fetchEmployees();
    fetchActivities();
    fetchTimeEntries();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/employees');
      setEmployees(response.data);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  const fetchActivities = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/activities');
      setActivities(response.data);
    } catch (error) {
      console.error('Error fetching activities:', error);
    }
  };

  const fetchTimeEntries = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/time-management');
      setTimeEntries(response.data);
    } catch (error) {
      console.error('Error fetching time entries:', error);
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
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel>Employee</InputLabel>
                    <Select
                      name="employeeNo"
                      value={formik.values.employeeNo}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.employeeNo &&
                        Boolean(formik.errors.employeeNo)
                      }
                    >
                      {employees.map((employee) => (
                        <MenuItem
                          key={employee.employeeNo}
                          value={employee.employeeNo}
                        >
                          {`${employee.surname} ${employee.lastName} (${employee.employeeNo})`}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel>Activity</InputLabel>
                    <Select
                      name="activityCode"
                      value={formik.values.activityCode}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.activityCode &&
                        Boolean(formik.errors.activityCode)
                      }
                    >
                      {activities.map((activity) => (
                        <MenuItem key={activity.code} value={activity.code}>
                          {`${activity.code} - ${activity.description}`}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Description"
                    name="description"
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.description &&
                      Boolean(formik.errors.description)
                    }
                    helperText={
                      formik.touched.description && formik.errors.description
                    }
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DateTimePicker
                      label="Start Time"
                      value={formik.values.startTime}
                      onChange={(value) =>
                        formik.setFieldValue('startTime', value)
                      }
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          fullWidth
                          error={
                            formik.touched.startTime &&
                            Boolean(formik.errors.startTime)
                          }
                          helperText={
                            formik.touched.startTime && formik.errors.startTime
                          }
                        />
                      )}
                    />
                  </LocalizationProvider>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DateTimePicker
                      label="End Time"
                      value={formik.values.endTime}
                      onChange={(value) =>
                        formik.setFieldValue('endTime', value)
                      }
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          fullWidth
                          error={
                            formik.touched.endTime &&
                            Boolean(formik.errors.endTime)
                          }
                          helperText={
                            formik.touched.endTime && formik.errors.endTime
                          }
                        />
                      )}
                    />
                  </LocalizationProvider>
                </Grid>

                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                  >
                    Save Time Entry
                  </Button>
                </Grid>
              </Grid>
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
                    <TableCell>Start Time</TableCell>
                    <TableCell>End Time</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {timeEntries.map((entry) => (
                    <TableRow key={entry.lineNo}>
                      <TableCell>
                        {employees.find((e) => e.employeeNo === entry.employeeNo)
                          ?.surname || entry.employeeNo}
                      </TableCell>
                      <TableCell>
                        {activities.find((a) => a.code === entry.activityCode)
                          ?.description || entry.activityCode}
                      </TableCell>
                      <TableCell>
                        {new Date(entry.startTime).toLocaleString()}
                      </TableCell>
                      <TableCell>
                        {new Date(entry.endTime).toLocaleString()}
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
}

export default TimeTracking; 