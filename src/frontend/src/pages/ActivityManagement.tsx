import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
  Paper,
  Switch,
  FormControlLabel,
} from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { activityApi, Activity } from '../api';

const validationSchema = yup.object({
  code: yup.string().required('Activity code is required'),
  description: yup.string().required('Description is required'),
  totalHoursAvailable: yup
    .number()
    .required('Total hours available is required')
    .min(0, 'Hours must be positive'),
  ignoreTotalHoursAvailableCheck: yup.boolean(),
});

const ActivityManagement: React.FC = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [open, setOpen] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);

  const formik = useFormik({
    initialValues: {
      code: '',
      description: '',
      totalHoursAvailable: 160,
      ignoreTotalHoursAvailableCheck: false,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        if (selectedActivity) {
          await activityApi.update(selectedActivity.code, values);
        } else {
          await activityApi.create(values);
        }
        fetchActivities();
        handleClose();
      } catch (error) {
        console.error('Error saving activity:', error);
      }
    },
  });

  useEffect(() => {
    fetchActivities();
  }, []);

  const fetchActivities = async () => {
    try {
      const data = await activityApi.getAll();
      setActivities(data);
    } catch (error) {
      console.error('Error fetching activities:', error);
    }
  };

  const handleOpen = (activity: Activity | null = null) => {
    setSelectedActivity(activity);
    if (activity) {
      formik.setValues(activity);
    } else {
      formik.resetForm();
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedActivity(null);
    formik.resetForm();
  };

  const handleDelete = async (code: string) => {
    try {
      await activityApi.delete(code);
      fetchActivities();
    } catch (error) {
      console.error('Error deleting activity:', error);
    }
  };

  const columns: GridColDef[] = [
    { field: 'code', headerName: 'Code', width: 130 },
    { field: 'description', headerName: 'Description', width: 200 },
    {
      field: 'totalHoursBooked',
      headerName: 'Hours Booked',
      width: 130,
      type: 'number',
    },
    {
      field: 'totalHoursAvailable',
      headerName: 'Hours Available',
      width: 130,
      type: 'number',
    },
    {
      field: 'ignoreTotalHoursAvailableCheck',
      headerName: 'Ignore Limit',
      width: 130,
      type: 'boolean',
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 200,
      renderCell: (params) => (
        <Box>
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={() => handleOpen(params.row)}
            sx={{ mr: 1 }}
          >
            Edit
          </Button>
          <Button
            variant="contained"
            color="error"
            size="small"
            onClick={() => handleDelete(params.row.code)}
          >
            Delete
          </Button>
        </Box>
      ),
    },
  ];

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">Activities</Typography>
        <Button variant="contained" color="primary" onClick={() => handleOpen()}>
          Add Activity
        </Button>
      </Box>

      <Paper sx={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={activities}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          disableSelectionOnClick
        />
      </Paper>

      <Dialog open={open} onClose={handleClose}>
        <form onSubmit={formik.handleSubmit}>
          <DialogTitle>
            {selectedActivity ? 'Edit Activity' : 'Add Activity'}
          </DialogTitle>
          <DialogContent>
            <TextField
              fullWidth
              margin="normal"
              label="Activity Code"
              name="code"
              value={formik.values.code}
              onChange={formik.handleChange}
              error={formik.touched.code && Boolean(formik.errors.code)}
              helperText={formik.touched.code && formik.errors.code}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Description"
              name="description"
              value={formik.values.description}
              onChange={formik.handleChange}
              error={
                formik.touched.description && Boolean(formik.errors.description)
              }
              helperText={formik.touched.description && formik.errors.description}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Total Hours Available"
              name="totalHoursAvailable"
              type="number"
              value={formik.values.totalHoursAvailable}
              onChange={formik.handleChange}
              error={
                formik.touched.totalHoursAvailable &&
                Boolean(formik.errors.totalHoursAvailable)
              }
              helperText={
                formik.touched.totalHoursAvailable &&
                formik.errors.totalHoursAvailable
              }
            />
            <FormControlLabel
              control={
                <Switch
                  checked={formik.values.ignoreTotalHoursAvailableCheck}
                  onChange={(event) =>
                    formik.setFieldValue(
                      'ignoreTotalHoursAvailableCheck',
                      event.target.checked
                    )
                  }
                  name="ignoreTotalHoursAvailableCheck"
                />
              }
              label="Ignore Hours Available Check"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit" variant="contained" color="primary">
              {selectedActivity ? 'Update' : 'Add'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
};

export default ActivityManagement; 